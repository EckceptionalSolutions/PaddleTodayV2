/** Build the editable store creative package. No network access or store publishing. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'docs/store-assets/refresh-2026-09');
const content = JSON.parse(await readFile(path.join(output, 'content.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const write = async (name, value) => {
  const target = path.join(output, name);
  await mkdir(path.dirname(target), {recursive:true});
  await writeFile(target, value);
};
const relativeAsset = value => '../../../../' + value.replaceAll('\\', '/');
const css = `*{box-sizing:border-box}html,body{margin:0}body{font-family:Arial,Helvetica,sans-serif}.art{position:relative;overflow:hidden;width:var(--w);height:var(--h);background:#123f37;color:#fff9ec}.art.cream{background:#f4f0e5;color:#173e35}.caption{position:absolute;left:6.2%;right:6.2%;top:2.1%;height:15.3%;z-index:2}.wordmark{display:flex;align-items:center;gap:14px;font-size:calc(var(--w)*.024);font-weight:700;letter-spacing:.02em;margin-bottom:calc(var(--h)*.013)}.sun{display:inline-block;width:calc(var(--w)*.021);height:calc(var(--w)*.021);background:#f3ca59;border-radius:100%}h1{font-size:calc(var(--w)*.077);line-height:1.02;letter-spacing:-.047em;margin:0;font-weight:800}.line{display:block;white-space:nowrap}.forest h1 .line:last-child{color:#f3ce68}.screen{position:absolute;left:5%;right:5%;top:19%;bottom:2.2%;border-radius:calc(var(--w)*.026);background:#f3f0e7;overflow:hidden;box-shadow:0 14px 35px #08271d35;border:2px solid #c5d6c33d}.screen img{width:100%;height:auto;display:block}.ipad .screen{left:6%;right:6%;top:19%;bottom:3%}.ipad h1{font-size:calc(var(--w)*.068)}.ipad .screen img{height:100%;width:100%;object-fit:contain}.feature{width:1024px;height:500px;background:#123f37;color:#fff9ec;position:relative;overflow:hidden}.feature-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 57%}.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,48,41,.97) 0%,rgba(10,48,41,.89) 43%,rgba(10,48,41,.2) 100%)}.feature-copy{position:absolute;left:80px;top:65px;right:65px}.feature .wordmark{font-size:23px;margin-bottom:38px}.feature .sun{width:19px;height:19px}.feature h1{font-size:66px;line-height:1.02;letter-spacing:-2.8px}.feature h1 span{color:#f3ce68}.feature p{font-size:23px;line-height:1.4;margin:25px 0 0;font-weight:600}`;

const limits = {name:30,subtitle:30,shortDescription:80,promotionalText:170,keywords:100,description:4000};
const validation = {status:content.status,metadata:{},images:[],missingCaptures:[]};
for(const [field,limit] of Object.entries(limits)){
  const value=content.metadata[field];
  if(value.length>limit) throw new Error(`${field} exceeds ${limit}`);
  validation.metadata[field]={characters:value.length,limit};
}
for(const [platform,fields] of Object.entries({apple:{'name.txt':'name','subtitle.txt':'subtitle','promotional-text.txt':'promotionalText','keywords.txt':'keywords','description.txt':'description'},'google-play':{'title.txt':'name','short-description.txt':'shortDescription','full-description.txt':'description'}})){
  for(const [name,field] of Object.entries(fields)) await write(`copy/${platform}/${name}`,content.metadata[field]);
}
await write('source/art.css',css + '\n.screen{left:50%;right:auto;width:var(--screen-width);transform:translateX(-50%)}.screen img{height:100%;object-fit:contain}.ipad .screen{left:50%;right:auto;width:var(--screen-width)}');
await writeFile(path.join(root,'docs/mobile-store-listing-draft.md'), `# Mobile Store Listing Draft\n\nRevised September 14, 2026. Generated from [content.json](store-assets/refresh-2026-09/content.json) using \`node scripts/build-store-refresh.mjs\`. These are local copy drafts, not published metadata.\n\n## Store Display Name\n\n${content.metadata.name}\n\nBrand and installed app name remain PaddleToday. This display-name expansion is proposed for the store refresh.\n\n## Apple Subtitle\n\n${content.metadata.subtitle}\n\n## Google Play Short Description\n\n${content.metadata.shortDescription}\n\n## Full Description — Both Stores\n\n${content.metadata.description}\n\n## Apple Promotional Text\n\n${content.metadata.promotionalText}\n\n## Apple Keywords\n\n${content.metadata.keywords}\n\n## Release Notes\n\nWrite release notes for the actual version being submitted. Store copy changes alone do not justify claims of new app features. Alerts, comparisons, calendar, GPX, and float-plan copy remain outside this baseline until confirmed in each shipping build.\n\n## URLs\n\n- Support: https://paddletoday.com/contact/\n- Marketing: https://paddletoday.com/\n- Privacy: https://paddletoday.com/privacy/\n- Terms: https://paddletoday.com/terms/\n\n## Review Package\n\n- [Visual gallery](store-assets/refresh-2026-09/index.html)\n- [Copy files and capture handoff](store-assets/refresh-2026-09/README.md)\n- [Character counts and image dimensions](store-assets/refresh-2026-09/validation.json)\n`);
const shell = (title,body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(title)}</title><link rel="stylesheet" href="art.css"></head><body>${body}</body></html>`;
const formats=[{id:'iphone',source:'ios',width:1290,height:2796,folder:'app-store'},{id:'ipad',source:'ipad',width:2048,height:2732,folder:'app-store'},{id:'android',source:'android',width:1080,height:1920,folder:'google-play'}];
const jobs=[];
for(const format of formats){
  for(const panel of content.panels){
    const file=panel[format.source];
    if(!file){validation.missingCaptures.push({platform:format.id,panel:panel.id,reason:panel.captureNote});continue;}
    const source=`docs/store-screenshots/${format.folder}/${file}`;
    const sourceBuffer=await readFile(path.join(root,source)); // PNG source dimensions preserve the full capture
    const sourceWidth=sourceBuffer.readUInt32BE(16),sourceHeight=sourceBuffer.readUInt32BE(20);
    const screenWidth=Math.floor(Math.min(format.width*.9,format.height*(format.id==='ipad'?.78:.788)*sourceWidth/sourceHeight));
    const name=`${format.id}-${panel.id}`;
    const html=shell(panel.headline.join(' '),`<main class="art ${panel.theme} ${format.id}" style="--w:${format.width}px;--h:${format.height}px;--screen-width:${screenWidth}px"><header class="caption"><div class="wordmark"><span class="sun"></span>PaddleToday</div><h1>${panel.headline.map(line=>`<span class="line">${escape(line)}</span>`).join('')}</h1></header><div class="screen"><img src="${relativeAsset(source)}" alt="${escape(panel.alt)}"></div></main>`);
    await write(`source/${name}.html`,html);
    jobs.push({name,format,panel,source});
  }
}
await write('source/feature-graphic.html',shell('Find your next river day',`<main class="feature"><img class="feature-photo" src="${relativeAsset('public/gallery/rice-creek-peltier-to-long-lake/rice-creek-1.jpg')}" alt="River scenery"><div class="shade"></div><div class="feature-copy"><div class="wordmark"><span class="sun"></span>PaddleToday</div><h1>Find your next<br><span>river day.</span></h1><p>Conditions explained.<br>Trips made easier.</p></div></main>`));
jobs.push({name:'feature-graphic',format:{id:'feature',width:1024,height:500},source:'public/gallery/rice-creek-peltier-to-long-lake/rice-creek-1.jpg'});

const browser=await chromium.launch({headless:true});
try{
  for(const job of jobs){
    const page=await browser.newPage({viewport:{width:job.format.width,height:job.format.height},deviceScaleFactor:1});
    await page.goto(pathToFileURL(path.join(output,`source/${job.name}.html`)).href);
    await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
    const problems=await page.evaluate(()=>{
      const errors=[];
      for(const line of document.querySelectorAll('.line')) if(line.scrollWidth>line.clientWidth+1) errors.push('Headline overflows');
      const heading=document.querySelector('.caption');const screen=document.querySelector('.screen');
      if(heading&&screen&&heading.getBoundingClientRect().bottom>screen.getBoundingClientRect().top) errors.push('Caption overlaps screenshot');
      return errors;
    });
    if(problems.length) throw new Error(`${job.name}: ${problems.join(', ')}`);
    await mkdir(path.join(output,'drafts'),{recursive:true});
    await page.screenshot({path:path.join(output,`drafts/${job.name}.png`),omitBackground:false});
    const data=await readFile(path.join(output,`drafts/${job.name}.png`));
    const width=data.readUInt32BE(16),height=data.readUInt32BE(20);
    if(width!==job.format.width||height!==job.format.height) throw new Error('Unexpected PNG dimensions');
    validation.images.push({file:`drafts/${job.name}.png`,width,height,source:job.source,status:job.panel?'needs-fresh-native-capture':'design-review',alt:job.panel?.alt??'River scenery with the message: Find your next river day. Conditions explained. Trips made easier.',note:job.panel?.captureNote??'Original repository river photograph; no condition values or UI claims.'});
    await page.close();
  }
  const galleryStyle=`*{box-sizing:border-box}body{margin:0;background:#f4f0e5;color:#173e35;font:16px Arial,sans-serif}main{max-width:1550px;margin:auto;padding:44px}h1{font-size:48px;letter-spacing:-2px;margin:15px 0}h2{margin-top:46px;font-size:28px}.eyebrow{font-size:12px;letter-spacing:2px;font-weight:700}.intro{max-width:840px;line-height:1.65}.notice{padding:18px 22px;border-left:4px solid #ba812b;background:#ffedbf;line-height:1.5}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.card{margin:0}.card img{width:100%;display:block;border-radius:12px;border:1px solid #d4d6c9}.card figcaption{padding:13px 2px;font-size:13px;line-height:1.5}.card b{display:block;font-size:15px;margin-bottom:7px}.feature{max-width:1024px;width:100%;border-radius:12px}a{color:#216253}.actions{display:flex;gap:20px;flex-wrap:wrap;margin:22px 0}code{background:#e3e6d9;padding:2px 5px}@media(max-width:800px){main{padding:24px}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}h1{font-size:36px}}`;
  const sections=formats.map(f=>`<section><h2>${{iphone:'iPhone · 1290 × 2796',ipad:'iPad · 2048 × 2732',android:'Android phone · 1080 × 1920'}[f.id]}</h2><div class="grid">${jobs.filter(j=>j.format.id===f.id).map(j=>`<figure class="card"><a href="drafts/${j.name}.png"><img src="drafts/${j.name}.png" alt="${escape(j.panel.alt)}"></a><figcaption><b>${escape(j.panel.headline.join(' '))}</b>${escape(j.panel.captureNote)}<br><a href="source/${j.name}.html">Editable layout</a></figcaption></figure>`).join('')}</div></section>`).join('');
  await write('index.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PaddleToday store refresh</title><style>${galleryStyle}</style></head><body><main><div class="eyebrow">PADDLETODAY / STORE REFRESH / SEPTEMBER 2026</div><h1>Choose where to paddle today.</h1><p class="intro">A coordinated description and screenshot package built around a clear decision: compare river conditions, understand the score, and plan the trip.</p><div class="notice"><b>Design drafts — fresh native captures required.</b> The screenshots retain original UI and values. Apple captures have inconsistent scores and May dates. Android access and populated Weekend captures are missing. These files are not an upload-ready screenshot set.</div><nav class="actions"><a href="copy/apple/description.txt">Apple description</a><a href="copy/google-play/full-description.txt">Google description</a><a href="content.json">Edit copy and sources</a><a href="README.md">Capture handoff</a></nav><h2>Google Play feature graphic · 1024 × 500</h2><a href="drafts/feature-graphic.png"><img class="feature" src="drafts/feature-graphic.png" alt="Find your next river day. Conditions explained. Trips made easier."></a>${sections}</main></body></html>`);
  // Overview uses the already rendered artwork, not resized source screenshots.
  const overview=await browser.newPage({viewport:{width:1170,height:920},deviceScaleFactor:1});
  const first=jobs.filter(j=>j.format.id==='iphone').slice(0,3);
  await overview.setContent(`<!doctype html><html><head><style>body{margin:0;background:#e8ece2;color:#173e35;font-family:Arial,sans-serif;padding:32px 44px}h1{font-size:34px;margin:0 0 8px}p{margin:0 0 24px;font-size:16px}.row{display:flex;gap:26px}.row img{height:745px;width:auto;border-radius:14px;box-shadow:0 4px 20px #173e3514}</style></head><body><h1>PaddleToday · store creative drafts</h1><p>Benefit-led layouts. Original captures retained; fresh native screenshots required.</p><div class="row">${await Promise.all(first.map(async j=>`<img src="data:image/png;base64,${(await readFile(path.join(output,`drafts/${j.name}.png`))).toString('base64')}" alt="${escape(j.panel.alt)}">`)).then(a=>a.join(''))}</div></body></html>`);
  await overview.evaluate(async()=>Promise.all([...document.images].map(i=>i.decode())));
  await overview.screenshot({path:path.join(output,'preview.png')});
  await overview.close();
  const gallery=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1});
  await gallery.goto(pathToFileURL(path.join(output,'index.html')).href);
  const missingGalleryImages=await gallery.evaluate(()=>[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
  if(missingGalleryImages.length) throw new Error(`Gallery images failed to load: ${missingGalleryImages.join(', ')}`);
  await mkdir(path.join(output,'qa'),{recursive:true});
  for(let index=0;index<formats.length;index++){
    await gallery.locator('.grid').nth(index).screenshot({path:path.join(output,`qa/${formats[index].id}-contact.png`)});
  }
  await gallery.close();
}finally{await browser.close();}
await write('validation.json',JSON.stringify(validation,null,2)+'\n');
console.log(`Built ${validation.images.length} images and platform copy files in ${output}`);
console.log(`Missing native captures: ${validation.missingCaptures.map(c=>`${c.platform}/${c.panel}`).join(', ')}`);
