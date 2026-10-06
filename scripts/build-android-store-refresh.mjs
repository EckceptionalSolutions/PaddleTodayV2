/** Render October Android store assets from genuine native captures. No publishing. */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'docs/store-assets/refresh-2026-10/android');
const content = JSON.parse(await readFile(path.join(output, 'content.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const write = async (name, value) => {
  const target = path.join(output, name);
  await mkdir(path.dirname(target), {recursive:true});
  await writeFile(target, value);
};
const hash = data => createHash('sha256').update(data).digest('hex');
const css = `*{box-sizing:border-box}html,body{margin:0}body{font-family:Arial,Helvetica,sans-serif}.art{position:relative;width:1080px;height:1920px;background:#123f37;color:#fff9ec}.cream{background:#f4f0e5;color:#173e35}.caption{position:absolute;left:67px;right:67px;top:40px;height:294px}.wordmark{display:flex;align-items:center;gap:14px;font-size:26px;font-weight:700;letter-spacing:.02em;margin-bottom:25px}.sun{width:23px;height:23px;background:#f3ca59;border-radius:50%}h1{font-size:83px;line-height:1.02;letter-spacing:-3.9px;margin:0;font-weight:800}.line{display:block;white-space:nowrap}.forest h1 .line:last-child{color:#f3ce68}.screen{position:absolute;top:365px;left:50%;transform:translateX(-50%);width:851px;height:1513px;box-shadow:0 14px 35px #08271d35}.screen img{display:block;width:100%;height:100%;object-fit:contain}.feature{width:1024px;height:500px;position:relative;background:#123f37;color:#fff9ec;overflow:hidden}.feature-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 57%}.shade{position:absolute;inset:0;background:linear-gradient(90deg,#0a3029f7 0%,#0a3029e3 43%,#0a302933 100%)}.feature-copy{position:absolute;left:105px;top:78px;right:90px}.feature .wordmark{font-size:23px;margin-bottom:28px}.feature h1{font-size:62px;line-height:1.02;letter-spacing:-2.8px}.feature h1 span{color:#f3ce68}.feature p{font-size:23px;line-height:1.4;margin:23px 0 0;font-weight:600}`;
const shell = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escape(title)}</title><link rel="stylesheet" href="art.css"></head><body>${body}</body></html>`;
await write('source/art.css', css);
const jobs = [];
for (const panel of content.panels) {
  const name = `android-${panel.id}`;
  const source = `raw/${name}.png`;
  const buffer = await readFile(path.join(output, source));
  const metadata = await sharp(buffer).metadata();
  if (metadata.width !== 1080 || metadata.height !== 1920) throw new Error(`${source}: unexpected native capture size`);
  const html = shell(panel.headline.join(' '), `<main class="art ${panel.theme}"><header class="caption"><div class="wordmark"><span class="sun"></span>PaddleToday</div><h1>${panel.headline.map(line => `<span class="line">${escape(line)}</span>`).join('')}</h1></header><div class="screen"><img src="../${source}" alt="${escape(panel.alt)}"></div></main>`);
  await write(`source/${name}.html`, html);
  jobs.push({name,source,panel,width:1080,height:1920,sourceSha256:hash(buffer),capturedAt:(await stat(path.join(output,source))).mtime.toISOString()});
}
const featureSource = 'public/gallery/rice-creek-peltier-to-long-lake/rice-creek-1.jpg';
await write('source/feature-graphic.html', shell('Find your next river day', `<main class="feature"><img class="feature-photo" src="../../../../../${featureSource}" alt="River scenery"><div class="shade"></div><div class="feature-copy"><div class="wordmark"><span class="sun"></span>PaddleToday</div><h1>Find your next<br><span>river day.</span></h1><p>Conditions explained.<br>Trips made easier.</p></div></main>`));
jobs.push({name:'feature-graphic',source:featureSource,width:1024,height:500,sourceSha256:hash(await readFile(path.join(root, featureSource))),panel:{alt:'River scenery with the message: Find your next river day. Conditions explained. Trips made easier.'}});

const validation = {status:'rendered-from-native-captures-awaiting-listing-review',generatedAt:new Date().toISOString(),app:content.app,device:content.device,policyReference:'https://support.google.com/googleplay/android-developer/answer/9866151?hl=en',policyCheckedAt:'2026-10-02',taglineRegionPercent:15.3125,images:[]};
const browser = await chromium.launch({headless:true});
try {
  for (const job of jobs) {
    const page = await browser.newPage({viewport:{width:job.width,height:job.height},deviceScaleFactor:1});
    await page.goto(pathToFileURL(path.join(output,`source/${job.name}.html`)).href);
    await page.evaluate(async () => {await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode()));});
    const problems = await page.evaluate(() => {
      const errors=[];
      for(const line of document.querySelectorAll('.line')) if(line.scrollWidth > line.clientWidth) errors.push('headline overflow');
      for(const image of document.images) if(!image.complete || !image.naturalWidth) errors.push('missing image');
      const caption=document.querySelector('.caption');
      if(caption && caption.querySelector('h1').getBoundingClientRect().bottom > caption.getBoundingClientRect().bottom) errors.push('caption overflow');
      return errors;
    });
    if(problems.length) throw new Error(`${job.name}: ${problems.join(', ')}`);
    const rendered = await page.screenshot({omitBackground:false});
    const png = await sharp(rendered).removeAlpha().png({palette:false}).toBuffer();
    await write(`upload/${job.name}.png`, png);
    const metadata = await sharp(png).metadata();
    if(metadata.width !== job.width || metadata.height !== job.height || metadata.hasAlpha || metadata.channels !== 3 || metadata.depth !== 'uchar') throw new Error(`${job.name}: invalid export format`);
    validation.images.push({file:`upload/${job.name}.png`,width:metadata.width,height:metadata.height,format:'24-bit RGB PNG; no alpha',bytes:png.length,sha256:hash(png),source:job.source,sourceSha256:job.sourceSha256,capturedAt:job.capturedAt,fullNativeCapturePreserved:job.name.startsWith('android-'),alt:job.panel.alt,note:job.panel.note});
    await page.close();
  }
  const galleryCss=`*{box-sizing:border-box}body{margin:0;background:#f4f0e5;color:#173e35;font:16px Arial,sans-serif}main{max-width:1450px;margin:auto;padding:40px}h1{font-size:44px;letter-spacing:-1.5px;margin:10px 0}p{max-width:900px;line-height:1.6}.eyebrow{font-size:12px;letter-spacing:2px;font-weight:700}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.card{margin:0}.card img{width:100%;display:block}.card figcaption{padding:14px 2px;font-size:13px;line-height:1.5}.card b{display:block;font-size:16px;margin-bottom:6px}a{color:#216253}.actions{display:flex;gap:24px;margin:24px 0;flex-wrap:wrap}.feature{width:100%;max-width:1024px;margin-top:12px}@media(max-width:800px){main{padding:20px}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}h1{font-size:32px}}`;
  await write('index.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PaddleToday Android store screenshots</title><style>${galleryCss}</style></head><body><main><div class="eyebrow">PADDLETODAY / ANDROID / OCTOBER 2026</div><h1>Choose where to paddle today.</h1><p>Six fresh screenshots captured on a Samsung Galaxy A14 running PaddleToday 1.1.3 (27), October 2, 2026. Full native captures are preserved. Current calls and weekend forecasts describe different times.</p><nav class="actions"><a href="paddletoday-google-play-2026-10.zip">Download upload ZIP</a><a href="README.md">Upload guide</a><a href="content.json">Copy and capture notes</a><a href="validation.json">Export details</a></nav><div class="grid">${content.panels.map(p=>`<figure class="card"><a href="upload/android-${p.id}.png"><img src="upload/android-${p.id}.png" alt="${escape(p.alt)}"></a><figcaption><b>${escape(p.headline.join(' '))}</b>${escape(p.note)}<br><a href="raw/android-${p.id}.png">Native capture</a> · <a href="source/android-${p.id}.html">Editable layout</a></figcaption></figure>`).join('')}</div><h2>Feature graphic · 1024 × 500</h2><a href="upload/feature-graphic.png"><img class="feature" src="upload/feature-graphic.png" alt="${escape(jobs.at(-1).panel.alt)}"></a><p>Local package for listing review. No store changes have been submitted. Fresh Apple device captures remain outstanding.</p></main></body></html>`);
  const page=await browser.newPage({viewport:{width:1320,height:1750},deviceScaleFactor:1});
  await page.goto(pathToFileURL(path.join(output,'index.html')).href);
  await page.evaluate(async()=>Promise.all([...document.images].map(i=>i.decode())));
  await page.locator('.grid').screenshot({path:path.join(output,'preview.png')});
  await page.setViewportSize({width:390,height:844});
  const missing=await page.evaluate(()=>[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
  if(missing.length) throw new Error('Gallery has missing images');
  await page.close();
} finally {await browser.close();}
await write('validation.json',JSON.stringify(validation,null,2)+'\n');
await write('upload/alt-text.txt',validation.images.map(i=>`${path.basename(i.file)}\n${i.alt}\n`).join('\n'));
console.log(`Rendered ${validation.images.length} assets in ${output}`);
