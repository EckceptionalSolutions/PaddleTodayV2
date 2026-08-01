import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { canonicalRiverRouteLineFromFeature } from '../src/lib/canonical-river-geometries.js';

type Endpoint = {
  routeId: string; routeName: string; reach: string; state: string;
  endpoint: 'putIn' | 'takeOut' | 'accessPoint'; endpointName: string; latitude: number; longitude: number;
  matchedRiverName: string | null; distanceFeetToMatchedRiver: number | null;
  nearestMatchedLatitude: number | null; nearestMatchedLongitude: number | null;
  nearestWaterwayName: string | null; distanceFeetToNearestWaterway: number | null;
  nearestWaterwayLatitude: number | null; nearestWaterwayLongitude: number | null;
  nearestWaterbodyName: string | null; distanceFeetToNearestWaterbody: number | null;
  nearestWaterbodyLatitude: number | null; nearestWaterbodyLongitude: number | null;
  endpointOnWaterbody: boolean; severity: string; note: string;
  coordinateEvidenceRole?: 'authoritative-area-anchor' | 'authoritative-water-entry' | null;
  coordinateEvidenceSourceUrl?: string | null;
  coordinateEvidenceDetail?: string | null;
  sourceLinks?: Array<{ label: string; url: string; provider?: string }>;
  authoritativeAccessCandidates?: Array<{
    provider: string; featureId: string; name: string | null; officialName?: string | null; latitude: number; longitude: number;
    sourceUrl: string; distanceFromCurrentFeet?: number; distanceFromMatchedRiverPointFeet?: number | null;
    administrator?: string | number | null;
    waterbody?: string | null; parkingToAccessFeet?: number | null;
    coordinateRole?: string | null; sourceType?: string | null; riverMile?: number | null;
    uncertaintyFeet?: number | null; matchedRiverDistanceFeet?: number | null;
  }>;
  suggestion?: {
    kind: string; name: string | null; latitude: number; longitude: number; distanceFeet: number | null;
    confidence: string; score: number; autoApplyEligible: boolean;
    waterConfidence: string; waterScore: number; accessConfidence: string; accessScore: number;
    limitingFactor: 'water-location' | 'access-location' | 'balanced'; evidenceScore: number;
    evidence: Array<{ signal: string; effect: number; detail: string; source: string }>;
  };
  nearbyAuthoritativeCandidates?: Endpoint['authoritativeAccessCandidates'];
  researchClues?: Array<{
    kind: string; name: string | null; latitude: number; longitude: number; distanceFeet: number | null;
    confidence: string; score: number; waterConfidence: string; waterScore: number;
    accessConfidence: string; accessScore: number; sourceUrl?: string;
    evidence: Array<{ signal: string; effect: number; detail: string; source: string }>;
  }>;
};
type AuditReport = { endpoints: Endpoint[]; generatedAt: string };
type RouteGeometryFeature = {
  type: 'Feature';
  properties?: Record<string, unknown>;
  geometry?: {
    type: 'LineString' | 'MultiLineString';
    coordinates: number[][] | number[][][];
  };
};

const root = process.cwd();
const reportPath = path.join(root, 'docs', 'route-coordinate-river-audit.json');
const outputPath = path.join(root, 'docs', 'route-coordinate-failure-review.html');
const researchPath = path.join(root, 'docs', 'route-coordinate-needs-research.json');
const suggestionsPath = path.join(root, 'docs', 'route-coordinate-suggestions.json');
const geometryRoot = path.join(root, 'node_modules', '.cache', 'route-coordinate-review-geometries', 'routes');

function htmlEscape(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character] ?? character));
}
function jsonForScript(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }

async function run() {
  const report = JSON.parse(await readFile(reportPath, 'utf8')) as AuditReport;
  let suggestions: Array<{
    routeId: string; endpoint: string; endpointName: string; reason?: string;
    canonicalAccessStatus?: string | null; recommended?: Endpoint['suggestion'];
    sourceLinks?: Endpoint['sourceLinks'];
    authoritativeAccessCandidates?: Endpoint['authoritativeAccessCandidates'];
    nearbyAuthoritativeCandidates?: Endpoint['nearbyAuthoritativeCandidates'];
    candidates?: Endpoint['researchClues'];
  }> = [];
  try { suggestions = (JSON.parse(await readFile(suggestionsPath, 'utf8')) as { items?: typeof suggestions }).items ?? []; } catch { /* suggestions are optional */ }
  const suggestionByKey = new Map(suggestions.map((item) => [`${item.routeId}:${item.endpoint}:${item.endpointName}`, item]));
  const endpoints = report.endpoints.map((endpoint) => {
    const suggestionItem = suggestionByKey.get(`${endpoint.routeId}:${endpoint.endpoint}:${endpoint.endpointName}`);
    return {
      ...endpoint,
      note: suggestionItem?.reason ?? endpoint.note,
      suggestion: suggestionItem?.recommended,
      canonicalAccessStatus: suggestionItem?.canonicalAccessStatus ?? null,
      sourceLinks: suggestionItem?.sourceLinks ?? [],
      authoritativeAccessCandidates: suggestionItem?.authoritativeAccessCandidates ?? [],
      nearbyAuthoritativeCandidates: suggestionItem?.nearbyAuthoritativeCandidates ?? [],
      researchClues: (suggestionItem?.candidates ?? []).filter((candidate) =>
        candidate.kind === 'osm-road-bridge'
        || candidate.kind === 'nearest-nhd-waterbody'
        || candidate.kind === 'nearest-named-waterway'
        || candidate.kind === 'matched-river-centerline'),
    };
  }).filter((endpoint) => endpoint.severity === 'failure'
    || endpoint.canonicalAccessStatus === 'conflict'
    || endpoint.canonicalAccessStatus === 'area-anchor-only'
    || endpoint.canonicalAccessStatus === 'authoritative-access-mismatch');
  const routeEndpoints: Record<string, Record<string, Endpoint>> = {};
  for (const endpoint of report.endpoints) {
    routeEndpoints[endpoint.routeId] ??= {};
    routeEndpoints[endpoint.routeId][endpoint.endpoint] = endpoint;
  }
  const geometries: Record<string, RouteGeometryFeature | null> = {};
  await Promise.all([...new Set(endpoints.map((endpoint) => endpoint.routeId))].map(async (routeId) => {
    try { geometries[routeId] = JSON.parse(await readFile(path.join(geometryRoot, `${routeId}.json`), 'utf8')) as RouteGeometryFeature; }
    catch { geometries[routeId] = null; }
  }));
  const activeReaches: Record<string, ReturnType<typeof canonicalRiverRouteLineFromFeature>> = {};
  const routeTraceStatus: Record<string, {
    mode: string;
    endpointSnapMaxFeet: number | null;
    reliable: boolean;
  }> = {};
  for (const routeId of Object.keys(geometries)) {
    const pair = routeEndpoints[routeId];
    const feature = geometries[routeId];
    const routePoints = [pair?.putIn, pair?.takeOut].filter(
      (point): point is Endpoint => Boolean(point && Number.isFinite(point.latitude) && Number.isFinite(point.longitude)),
    );
    const endpointSnapMaxFeet = Number(feature?.properties?.endpointSnapMaxFeet);
    const reliable = Number.isFinite(endpointSnapMaxFeet) && endpointSnapMaxFeet <= 500;
    routeTraceStatus[routeId] = {
      mode: String(feature?.properties?.traceMode ?? 'unavailable'),
      endpointSnapMaxFeet: Number.isFinite(endpointSnapMaxFeet) ? endpointSnapMaxFeet : null,
      reliable,
    };
    activeReaches[routeId] = feature && routePoints.length === 2 && reliable
      ? canonicalRiverRouteLineFromFeature(feature, routePoints)
      : null;
  }
  const payload = jsonForScript({ generatedAt: report.generatedAt, endpoints, routeEndpoints, geometries, activeReaches, routeTraceStatus });
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Paddle Today · Coordinate verification queue</title><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"><style>
:root{font-family:system-ui,sans-serif;color:#17211b;background:#f4f7f4}*{box-sizing:border-box}body{margin:0}header{padding:18px 24px;background:#173f35;color:#fff}h1{margin:0 0 5px;font-size:22px}header p{margin:0;color:#c8e3d2;font-size:13px}.layout{display:grid;grid-template-columns:380px 1fr;height:calc(100vh - 82px)}aside{overflow:auto;padding:14px;background:#fff;border-right:1px solid #dce6df}.controls{display:grid;gap:7px}.controls input,.controls select{width:100%;padding:9px;border:1px solid #c8d5cc;border-radius:7px}.summary{font-size:12px;color:#53645a;margin:10px 0}.item{display:block;width:100%;text-align:left;border:1px solid #dce6df;background:#fbfdfb;border-radius:8px;margin:7px 0;padding:10px;cursor:pointer}.item:hover,.item.active{border-color:#2c8b61;background:#eff9f1}.item strong,.item small{display:block}.item strong{font-size:13px}.item small{color:#627268;margin-top:3px}.distance{color:#a23d21!important;font-weight:700}.main{position:relative}.map{position:absolute;inset:0}.panel{position:absolute;z-index:1000;top:14px;right:14px;width:min(420px,calc(100% - 28px));background:#fffffff2;border:1px solid #ccd9d0;border-radius:10px;padding:14px;box-shadow:0 4px 18px #1232}.panel h2{margin:0 0 5px;font-size:17px}.panel p{margin:5px 0;font-size:13px;line-height:1.4}.panel a{color:#176b4b}.coords{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}.coords label{font-size:11px;color:#53645a}.coords input{display:block;width:100%;padding:6px;border:1px solid #c8d5cc;border-radius:5px}.copy{padding:7px 9px;border:0;border-radius:5px;background:#176b4b;color:#fff;cursor:pointer}.triage{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.triage button{padding:6px 8px;border:0;border-radius:5px;cursor:pointer}.accept{background:#d8f1df}.research{background:#fff0cf}.skip{background:#f7d9d2}.legend{display:flex;flex-wrap:wrap;gap:10px;font-size:11px;color:#4e6055}.dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px}.red{background:#d0442e}.orange{background:#e08a28}.blue{background:#2a73b8}.green{background:#2b9561}
</style></head><body><header><h1>Paddle Today · Coordinate verification queue</h1><p>${endpoints.length} endpoints requiring verification · generated ${htmlEscape(report.generatedAt)} · click a row to inspect the endpoint against route geometry and NHD context</p></header><div class="layout"><aside><div class="controls"><input id="search" type="search" placeholder="Filter route, reach, or endpoint…"></div><div id="summary" class="summary"></div><div id="list"></div></aside><main class="main"><div id="map" class="map"></div><section id="panel" class="panel"><h2>Select an endpoint</h2><p>Choose an endpoint from the verification queue.</p></section></main></div><script id="payload" type="application/json">${payload}</script><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script>
const data=JSON.parse(document.getElementById('payload').textContent), endpoints=data.endpoints, geometries=data.geometries;const map=L.map('map',{preferCanvas:true}).setView([44,-92],6);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);let layers=[],selected=-1;
const reviewKey=e=>e.routeId+':'+e.endpoint+':'+e.endpointName;const saved=JSON.parse(localStorage.getItem('paddletoday:coordinate-review:v1')||'{}');const statuses=saved.statuses||{};const drafts=saved.drafts||{};endpoints.forEach(e=>{e.appLatitude=e.latitude;e.appLongitude=e.longitude;const d=drafts[reviewKey(e)];if(d){e.latitude=d.latitude;e.longitude=d.longitude}});function persist(){localStorage.setItem('paddletoday:coordinate-review:v1',JSON.stringify({statuses,drafts}))}const confidenceRank={high:0,medium:1,low:2,none:3};const safeCount=endpoints.filter(e=>e.suggestion?.autoApplyEligible).length;document.querySelector('.controls').insertAdjacentHTML('beforeend','<select id="status-filter"><option value="open">Open and unresolved</option><option value="all">All failures</option><option value="accepted">Accepted</option><option value="research">Needs research</option><option value="skipped">Skipped</option></select><select id="sort-order"><option value="confidence">Confidence: high to low</option><option value="distance">Distance: nearest first</option><option value="route">Route name</option></select><button id="accept-safe" class="copy" '+(safeCount?'':'disabled')+'>Accept safe auto-fixes ('+safeCount+')</button><button id="export" class="copy">Export accepted corrections</button>');function clearLayers(){layers.forEach((layer)=>map.removeLayer(layer));layers=[]}function link(lat,lon,text){return '<a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query='+lat+','+lon+'">'+text+'</a>'}function marker(lat,lon,color,label){const m=L.circleMarker([lat,lon],{radius:8,color:'#fff',weight:2,fillColor:color,fillOpacity:.95}).bindTooltip(label).addTo(map);layers.push(m)}
function correctionText(e){return e.endpoint+': '+e.latitude.toFixed(6)+', '+e.longitude.toFixed(6)+' // '+e.routeId+' · '+e.endpointName}function redraw(index){show(index)}function show(index){selected=index;const e=endpoints[index];clearLayers();const geometry=geometries[e.routeId];if(geometry){const line=L.geoJSON(geometry,{style:{color:'#6e9480',weight:3,opacity:.2,dashArray:'5 7'}}).bindTooltip('Full NHD source geometry (context only)').addTo(map);layers.push(line);map.fitBounds(line.getBounds().pad(.18))}else map.setView([e.latitude,e.longitude],13);marker(e.latitude,e.longitude,'#d0442e','Endpoint: '+e.endpointName);if(e.nearestMatchedLatitude!==null)marker(e.nearestMatchedLatitude,e.nearestMatchedLongitude,'#e08a28','Matched '+(e.matchedRiverName||'flowline'));if(e.nearestWaterwayLatitude!==null)marker(e.nearestWaterwayLatitude,e.nearestWaterwayLongitude,'#2a73b8','Nearest '+(e.nearestWaterwayName||'waterway'));if(e.nearestWaterbodyLatitude!==null)marker(e.nearestWaterbodyLatitude,e.nearestWaterbodyLongitude,'#2b9561','Nearest NHD waterbody');document.getElementById('panel').innerHTML='<h2>'+e.routeName+' · '+e.endpoint+'</h2><p><strong>'+e.endpointName+'</strong><br>'+e.reach+' · '+e.state+'</p><p>'+e.note+'</p><div class="coords"><label>Latitude<input id="coord-lat" type="number" step="0.000001" value="'+e.latitude.toFixed(6)+'"></label><label>Longitude<input id="coord-lon" type="number" step="0.000001" value="'+e.longitude.toFixed(6)+'"></label></div><button id="copy-correction" class="copy">Copy coordinate correction</button> <span id="copy-status"></span><p>Endpoint: '+link(e.latitude,e.longitude,e.latitude.toFixed(6)+', '+e.longitude.toFixed(6))+'<br>Matched flowline: '+(e.distanceFeetToMatchedRiver===null?'none':Math.round(e.distanceFeetToMatchedRiver)+' ft')+'<br>Nearest named waterway: '+(e.nearestWaterwayName||'none')+' ('+(e.distanceFeetToNearestWaterway===null?'—':Math.round(e.distanceFeetToNearestWaterway)+' ft')+')</p><p>Click the map to move this endpoint marker. The dashboard does not edit source files.</p><p><a target="_blank" rel="noreferrer" href="https://www.google.com/search?q='+encodeURIComponent(e.endpointName+' '+e.routeName+' '+e.state)+'">Search access source</a></p><div class="legend"><span><i class="dot red"></i>endpoint being corrected</span><span><i class="dot green"></i>active route reach</span><span>faint dashed line = source river context</span></div>';document.getElementById('coord-lat').addEventListener('change',()=>{e.latitude=Number(document.getElementById('coord-lat').value);redraw(index)});document.getElementById('coord-lon').addEventListener('change',()=>{e.longitude=Number(document.getElementById('coord-lon').value);redraw(index)});document.getElementById('copy-correction').addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText(correctionText(e));status.textContent='Copied'}catch{status.textContent='Copy unavailable; use the coordinate fields above'}})}
map.on('click',(event)=>{if(selected<0)return;endpoints[selected].latitude=event.latlng.lat;endpoints[selected].longitude=event.latlng.lng;show(selected)});function render(){const query=document.getElementById('search').value.toLowerCase();let visible=endpoints.map((e,i)=>({e,i})).filter(({e})=>(e.routeId+' '+e.routeName+' '+e.reach+' '+e.endpointName).toLowerCase().includes(query));const sort=document.getElementById('sort-order')?.value||'confidence';visible.sort((a,b)=>{if(sort==='route')return a.e.routeName.localeCompare(b.e.routeName)||a.e.endpointName.localeCompare(b.e.endpointName);if(sort==='distance')return (a.e.distanceFeetToMatchedRiver??Infinity)-(b.e.distanceFeetToMatchedRiver??Infinity);return (confidenceRank[a.e.suggestion?.confidence||'none']-confidenceRank[b.e.suggestion?.confidence||'none'])||((b.e.suggestion?.score||0)-(a.e.suggestion?.score||0))||((a.e.distanceFeetToMatchedRiver??Infinity)-(b.e.distanceFeetToMatchedRiver??Infinity))});document.getElementById('summary').textContent=visible.length+' of '+endpoints.length+' failures shown · '+safeCount+' pass the autonomous safety gate';document.getElementById('list').innerHTML=visible.map(({e,i})=>'<button class="item '+(i===selected?'active':'')+'" data-index="'+i+'"><strong>'+e.routeName+' · '+e.endpoint+'</strong><small>'+e.endpointName+' · '+e.routeId+'</small><small class="distance">'+(e.suggestion?('overall '+e.suggestion.confidence+' ('+e.suggestion.score+'/100) · water '+e.suggestion.waterConfidence+' ('+e.suggestion.waterScore+') · access '+e.suggestion.accessConfidence+' ('+e.suggestion.accessScore+')'):'no candidate')+' · '+(e.distanceFeetToMatchedRiver===null?'No matched flowline':Math.round(e.distanceFeetToMatchedRiver)+' ft from '+(e.matchedRiverName||'matched flowline'))+'</small></button>').join('');document.querySelectorAll('[data-index]').forEach((button)=>button.addEventListener('click',()=>show(Number(button.dataset.index))))}document.getElementById('search').addEventListener('input',render);document.getElementById('sort-order').addEventListener('change',render);render();if(endpoints.length)show(0);
function applyStatusFilter(){const filter=document.getElementById('status-filter').value;document.querySelectorAll('[data-index]').forEach(button=>{const status=statuses[reviewKey(endpoints[Number(button.dataset.index)])];button.style.display=filter==='all'||(filter==='open'&&!status)||status===filter?'':'none'})}function setStatus(status){if(selected<0)return;statuses[reviewKey(endpoints[selected])]=status;persist();render();applyStatusFilter()}function exportCorrections(){const rows=endpoints.filter(e=>statuses[reviewKey(e)]==='accepted').map(e=>({routeId:e.routeId,endpoint:e.endpoint,endpointName:e.endpointName,latitude:e.latitude,longitude:e.longitude}));const blob=new Blob([JSON.stringify(rows,null,2)+'\\n'],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='route-coordinate-corrections.json';a.click();URL.revokeObjectURL(url)}const observer=new MutationObserver(()=>{if(selected<0||document.getElementById('accept'))return;document.getElementById('panel').insertAdjacentHTML('beforeend','<div class="triage"><button id="accept" class="accept">Accept (A)</button><button id="research" class="research">Needs research (R)</button><button id="skip" class="skip">Skip (S)</button></div>');document.getElementById('accept').onclick=()=>setStatus('accepted');document.getElementById('research').onclick=()=>setStatus('research');document.getElementById('skip').onclick=()=>setStatus('skipped')});observer.observe(document.getElementById('panel'),{childList:true});map.on('click',(event)=>{if(selected<0)return;endpoints[selected].latitude=event.latlng.lat;endpoints[selected].longitude=event.latlng.lng;drafts[reviewKey(endpoints[selected])]={latitude:event.latlng.lat,longitude:event.latlng.lng};persist();show(selected)});document.getElementById('status-filter').addEventListener('change',()=>{render();applyStatusFilter()});document.getElementById('export').addEventListener('click',exportCorrections);document.addEventListener('keydown',(event)=>{if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName))return;if(event.key.toLowerCase()==='j')show(Math.min(endpoints.length-1,selected+1));if(event.key.toLowerCase()==='k')show(Math.max(0,selected-1));if(event.key.toLowerCase()==='a')setStatus('accepted');if(event.key.toLowerCase()==='r')setStatus('research');if(event.key.toLowerCase()==='s')setStatus('skipped')});if(selected>=0)show(selected);</script></body></html>`;
  const contextScript = `<script>(function(){function renderCurrentRoute(){const e=endpoints[selected],pair=data.routeEndpoints[e?.routeId];if(!pair)return;const old=document.getElementById('route-context');if(old)return;const putIn=pair.putIn,takeOut=pair.takeOut,trace=data.routeTraceStatus[e.routeId]||{},traceText=e.coordinateEvidenceRole==='authoritative-area-anchor'?'Provisional source-river context only — this endpoint is an area centroid and cannot validate an endpoint-bounded route trace.':e.canonicalAccessStatus==='authoritative-access-mismatch'?'Provisional source-river context only — the current point contradicts the exact named government access and cannot validate an endpoint-bounded route trace.':trace.reliable?(trace.mode==='network-traced'?'Topology-verified river trace':'Named-river trace')+' · endpoints within '+Math.round(trace.endpointSnapMaxFeet)+' ft of the trace':'No trustworthy endpoint-bounded river trace; only faint source context is shown.';document.getElementById('panel').insertAdjacentHTML('afterbegin','<div id="route-context" style="background:#eef7f0;border:1px solid #c9dfce;border-radius:6px;padding:8px;margin-bottom:8px;font-size:12px"><strong>Current app coordinates</strong><br>Put-in: '+putIn.latitude.toFixed(6)+', '+putIn.longitude.toFixed(6)+'<br>Take-out: '+takeOut.latitude.toFixed(6)+', '+takeOut.longitude.toFixed(6)+'<br><strong>River highlight:</strong> '+traceText+'</div>');marker(putIn.latitude,putIn.longitude,'#7b4ab5','Current app put-in: '+putIn.endpointName);marker(takeOut.latitude,takeOut.longitude,'#157a76','Current app take-out: '+takeOut.endpointName)}const observer=new MutationObserver(()=>{if(selected>=0)renderCurrentRoute()});observer.observe(document.getElementById('panel'),{childList:true});renderCurrentRoute()})();</script>`;
  const activeScript = `<script>(function(){function drawActiveReach(){if(window.__activeReachLayer)map.removeLayer(window.__activeReachLayer);const e=endpoints[selected],reach=data.activeReaches[e?.routeId],trace=data.routeTraceStatus[e?.routeId];if(e?.coordinateEvidenceRole==='authoritative-area-anchor'||e?.canonicalAccessStatus==='authoritative-access-mismatch'||!reach?.geometry?.coordinates||!trace?.reliable)return;const coordinates=reach.geometry.coordinates.map(coordinate=>[coordinate[1],coordinate[0]]),label=trace.mode==='network-traced'?'Topology-verified active reach':'Named-river active reach';window.__activeReachLayer=L.polyline(coordinates,{color:'#145c3b',weight:7,opacity:.95}).bindTooltip(label+' clipped between the current app put-in and take-out').addTo(map);layers.push(window.__activeReachLayer)}new MutationObserver(drawActiveReach).observe(document.getElementById('panel'),{childList:true});drawActiveReach();})();</script>`;
  const editingHelpScript = `<script>(function(){const panel=document.getElementById('panel');const observer=new MutationObserver(()=>{if(selected<0||document.getElementById('editing-help'))return;const e=endpoints[selected];panel.insertAdjacentHTML('afterbegin','<div id="editing-help" style="background:#fff8df;border:1px solid #ead38a;border-radius:6px;padding:9px;margin-bottom:8px;font-size:12px;line-height:1.35"><strong>How to correct this endpoint</strong><br>1. Click the exact river/bridge intersection on the map. The red marker and coordinate fields become the proposed replacement.<br>2. Confirm the red marker is on the water, then choose <b>Accept</b> and export the correction file.<br><span style="color:#7b4ab5">Purple</span> = current app put-in · <span style="color:#157a76">teal</span> = current app take-out · <span style="color:#d0442e">red</span> = endpoint being edited. The dashboard never edits source files automatically.</div>');const actions=document.createElement('div');actions.style='display:flex;gap:6px;flex-wrap:wrap;margin:6px 0';actions.innerHTML='<button id="use-river-point" class="copy">Use nearest connected river point</button><button id="reset-app-point" class="copy" style="background:#66756c">Reset to app coordinate</button>';panel.insertBefore(actions,panel.querySelector('.coords'));const shortcut=document.getElementById('use-river-point'),identityMismatch=e.canonicalAccessStatus==='authoritative-access-mismatch';if(e.coordinateEvidenceRole==='authoritative-area-anchor'||identityMismatch){shortcut.disabled=true;shortcut.style.background='#8b958f';shortcut.textContent=identityMismatch?'River-point shortcut disabled for access identity mismatch':'River-point shortcut disabled for area centroid';shortcut.title=identityMismatch?'The nearby river point belongs to the wrong stored location; use the independently verified named access candidate.':'The endpoint-bounded topology trace is not trustworthy when the stored point is an area centroid.'}shortcut.onclick=()=>{const current=endpoints[selected];if(current.coordinateEvidenceRole==='authoritative-area-anchor'||current.canonicalAccessStatus==='authoritative-access-mismatch'||current.nearestMatchedLatitude===null)return;current.latitude=current.nearestMatchedLatitude;current.longitude=current.nearestMatchedLongitude;drafts[reviewKey(current)]={latitude:current.latitude,longitude:current.longitude};persist();show(selected)};document.getElementById('reset-app-point').onclick=()=>{const current=endpoints[selected];current.latitude=current.appLatitude;current.longitude=current.appLongitude;delete drafts[reviewKey(current)];persist();show(selected)}});observer.observe(panel,{childList:true});})();</script>`;
  const suggestionScript = `<script>(function(){const panel=document.getElementById('panel');const observer=new MutationObserver(()=>{if(selected<0||document.getElementById('suggestion-box'))return;const e=endpoints[selected];if(!e.suggestion)return;const box=document.createElement('div');box.id='suggestion-box';box.style='background:#eaf4ff;border:1px solid #b8d5ef;border-radius:6px;padding:8px;margin:6px 0;font-size:12px;line-height:1.35';const evidence=e.suggestion.evidence.map(item=>'<li><b>'+(item.effect>=0?'+':'')+item.effect+'</b> '+(item.url?'<a target="_blank" rel="noreferrer" href="'+item.url+'">'+item.detail+'</a>':item.detail)+'</li>').join('');const sources=(e.sourceLinks||[]).map(item=>'<li><a target="_blank" rel="noreferrer" href="'+item.url+'">'+item.label+'</a></li>').join('');const official=(e.authoritativeAccessCandidates||[]);const officialRows=official.map(item=>'<li><a target="_blank" rel="noreferrer" href="'+item.sourceUrl+'">'+(item.name||item.featureId)+'</a>'+(item.officialName&&item.officialName!==item.name?'<br><b>Official published label:</b> '+item.officialName:'')+'<br>'+item.latitude.toFixed(6)+', '+item.longitude.toFixed(6)+(item.waterbody?'<br>Official waterbody: '+item.waterbody:'')+(item.distanceFromCurrentFeet===undefined?'':' · '+Math.round(item.distanceFromCurrentFeet)+' ft from app point')+(item.parkingToAccessFeet===undefined||item.parkingToAccessFeet===null?'':' · '+Math.round(item.parkingToAccessFeet)+' ft parking-to-access')+'</li>').join('');marker(e.suggestion.latitude,e.suggestion.longitude,'#2563b8','Suggested water entry: '+e.endpointName);if(official[0])marker(official[0].latitude,official[0].longitude,'#7c5a20','Official access/parking anchor: '+(official[0].officialName||official[0].name||official[0].featureId));const limit=e.suggestion.limitingFactor==='access-location'?'The river position is plausible, but the named access location is not independently established.':e.suggestion.limitingFactor==='water-location'?'The access evidence is plausible, but its connection to the intended route water is not established.':'Water and access evidence are balanced.';box.innerHTML='<strong>Suggested water-entry candidate</strong><br>'+e.suggestion.kind+' · '+(e.suggestion.distanceFeet===null?'unknown distance':Math.round(e.suggestion.distanceFeet)+' ft')+'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:7px 0"><span><b>Overall</b><br>'+e.suggestion.confidence+' · '+e.suggestion.score+'/100</span><span><b>On intended water</b><br>'+e.suggestion.waterConfidence+' · '+e.suggestion.waterScore+'/100</span><span><b>Correct access</b><br>'+e.suggestion.accessConfidence+' · '+e.suggestion.accessScore+'/100</span></div><span>'+limit+'</span><br>'+e.suggestion.latitude.toFixed(6)+', '+e.suggestion.longitude.toFixed(6)+(e.suggestion.autoApplyEligible?'<br><b style="color:#176b4b">Passes autonomous-apply safety gate</b>':'<br><span style="color:#8a5320">Requires review; both claims must be independently supported</span>')+(officialRows?'<div style="background:#fff8df;border:1px solid #ead38a;border-radius:5px;padding:6px;margin-top:7px"><b>Official access/parking anchor — not automatically the water entry</b><ul style="padding-left:18px;margin:5px 0">'+officialRows+'</ul></div>':'')+'<details style="margin-top:6px"><summary>Evidence details (legacy sum '+e.suggestion.evidenceScore+'/100)</summary><ul style="padding-left:18px;margin:5px 0">'+evidence+'</ul></details>'+(sources?'<details style="margin-top:6px"><summary>Route and access sources</summary><ul style="padding-left:18px;margin:5px 0">'+sources+'</ul></details>':'');const button=document.createElement('button');button.className='copy';button.textContent='Use suggested water-entry coordinate';button.style.marginTop='6px';button.onclick=()=>{e.latitude=e.suggestion.latitude;e.longitude=e.suggestion.longitude;drafts[reviewKey(e)]={latitude:e.latitude,longitude:e.longitude};persist();show(selected)};box.appendChild(document.createElement('br'));box.appendChild(button);panel.insertBefore(box,panel.querySelector('.coords'))});observer.observe(panel,{childList:true});})();</script>`;
  const batchScript = `<script>(function(){const button=document.getElementById('accept-safe');button.addEventListener('click',()=>{let accepted=0;endpoints.forEach(e=>{if(!e.suggestion?.autoApplyEligible)return;e.latitude=e.suggestion.latitude;e.longitude=e.suggestion.longitude;drafts[reviewKey(e)]={latitude:e.latitude,longitude:e.longitude};statuses[reviewKey(e)]='accepted';accepted+=1});persist();render();applyStatusFilter();button.textContent='Accepted '+accepted+' safe auto-fix'+(accepted===1?'':'es')})})();</script>`;
  const mapClarityScript = `<script>(function(){const originalFitBounds=map.fitBounds.bind(map);map.fitBounds=function(){const e=endpoints[selected];if(e)map.setView([e.latitude,e.longitude],14);else originalFitBounds.apply(map,arguments)};marker=function(lat,lon,color,label){if(!(label.indexOf('Endpoint: ')===0||label.indexOf('Current app ')===0||label.indexOf('Suggested water entry: ')===0))return;const m=L.circleMarker([lat,lon],{radius:8,color:'#fff',weight:2,fillColor:color,fillOpacity:.95}).bindTooltip(label).addTo(map);layers.push(m)};setTimeout(()=>{if(selected>=0)show(selected)},0)})();</script>`;
  const roleAwareSuggestionScript = suggestionScript
    .replaceAll('Official access/parking anchor', 'Official coordinate evidence')
    .replace(
      "item.latitude.toFixed(6)+', '+item.longitude.toFixed(6)",
      "item.latitude.toFixed(6)+', '+item.longitude.toFixed(6)+(item.coordinateRole?'<br>Role: '+item.coordinateRole.replaceAll('-', ' '):'')+(item.uncertaintyFeet===undefined||item.uncertaintyFeet===null?'':' · ±'+Math.round(item.uncertaintyFeet)+' ft')",
    );
  const researchLeadScript = `<script>(function(){const panel=document.getElementById('panel');function esc(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}function row(item,label){const current=item.distanceFromCurrentFeet===undefined?'':Math.round(item.distanceFromCurrentFeet)+' ft from app point';const river=item.distanceFromMatchedRiverPointFeet===undefined||item.distanceFromMatchedRiverPointFeet===null?'':Math.round(item.distanceFromMatchedRiverPointFeet)+' ft from audited river point';const distances=[current,river].filter(Boolean).join(' · ');const officialLabel=item.officialName&&item.officialName!==item.name?'<br><b>Official published label:</b> '+esc(item.officialName):'';return '<li style="margin-bottom:7px"><b>'+esc(label)+'</b>: '+esc(item.name||item.kind||item.featureId)+officialLabel+'<br><code>'+Number(item.latitude).toFixed(6)+', '+Number(item.longitude).toFixed(6)+'</code>'+(distances?'<br>'+esc(distances):'')+(item.sourceUrl?'<br><a target="_blank" rel="noreferrer" href="'+esc(item.sourceUrl)+'">Open source record</a>':'')+' <button type="button" class="pan-lead" data-lat="'+Number(item.latitude)+'" data-lon="'+Number(item.longitude)+'">Pan only</button></li>'}function renderLeads(){if(selected<0||document.getElementById('research-leads'))return;const e=endpoints[selected];const exact=e.suggestion?[]:(e.authoritativeAccessCandidates||[]);const nearby=e.nearbyAuthoritativeCandidates||[];const clues=(e.researchClues||[]).filter(item=>!e.suggestion||item.kind!==e.suggestion.kind||item.latitude!==e.suggestion.latitude||item.longitude!==e.suggestion.longitude).slice(0,3);if(!exact.length&&!nearby.length&&!clues.length)return;const box=document.createElement('div');box.id='research-leads';box.style='background:#fff8df;border:1px solid #ead38a;border-radius:6px;padding:8px;margin:6px 0;font-size:12px;line-height:1.35';box.innerHTML='<strong>Research leads — not verified corrections</strong><br><span>These points help locate the access or crossing. Panning to one does not change the proposed coordinate.</span>'+(exact.length?'<div style="margin-top:7px"><b>Name-matched official access/parking evidence</b><ul style="padding-left:18px;margin:5px 0">'+exact.map(item=>row(item,'Official anchor')).join('')+'</ul></div>':'')+(nearby.length?'<div style="margin-top:7px"><b>Nearby official locations with different names</b><br>Identity is not established; proximity alone is insufficient.<ul style="padding-left:18px;margin:5px 0">'+nearby.map(item=>row(item,'Possible alternative')).join('')+'</ul></div>':'')+(clues.length?'<details style="margin-top:7px"><summary>Mapped bridge and water clues</summary><ul style="padding-left:18px;margin:5px 0">'+clues.map(item=>row(item,item.kind.replaceAll('-',' '))).join('')+'</ul></details>':'');box.querySelectorAll('.pan-lead').forEach(button=>button.addEventListener('click',()=>map.setView([Number(button.dataset.lat),Number(button.dataset.lon)],16)));panel.insertBefore(box,panel.querySelector('.coords'))}new MutationObserver(renderLeads).observe(panel,{childList:true});renderLeads()})();</script>`;
  const roleAwareResearchLeadScript = researchLeadScript
    .replace('Name-matched official access/parking evidence', 'Name-matched official coordinate evidence')
    .replace(
      "exact.map(item=>row(item,'Official anchor'))",
      "exact.map(item=>row(item,item.coordinateRole==='authoritative-area-anchor'?'Official area anchor (not access)':'Official access/parking anchor'))",
    );
  const areaAnchorWarningScript = `<script>(function(){const panel=document.getElementById('panel');function renderWarning(){if(selected<0||document.getElementById('area-anchor-warning'))return;const e=endpoints[selected];if(e.coordinateEvidenceRole!=='authoritative-area-anchor')return;const box=document.createElement('div');box.id='area-anchor-warning';box.style='background:#fff0ed;border:2px solid #c94b35;border-radius:6px;padding:9px;margin:6px 0;font-size:12px;line-height:1.4';box.innerHTML='<strong>Current app point is an area centroid, not a launch</strong><br>The published coordinate identifies the WMA/property or fishing area as a whole. It does not establish parking, shoreline access, or a water-entry point. This endpoint remains withheld until the actual access is researched.'+(e.coordinateEvidenceSourceUrl?'<br><a target="_blank" rel="noreferrer" href="'+e.coordinateEvidenceSourceUrl+'">Open the official area record</a>':'');panel.insertBefore(box,panel.querySelector('#research-leads')||panel.querySelector('.coords'))}new MutationObserver(renderWarning).observe(panel,{childList:true});renderWarning()})();</script>`;
  const identityMismatchWarningScript = `<script>(function(){const panel=document.getElementById('panel');function renderWarning(){if(selected<0||document.getElementById('identity-mismatch-warning'))return;const e=endpoints[selected];if(e.canonicalAccessStatus!=='authoritative-access-mismatch')return;const box=document.createElement('div');box.id='identity-mismatch-warning';box.style='background:#fff0ed;border:2px solid #c94b35;border-radius:6px;padding:9px;margin:6px 0;font-size:12px;line-height:1.4';box.innerHTML='<strong>Current app point contradicts the exact named government access</strong><br>Being near some river segment is not enough: the authoritative facility is more than one mile away. The old route trace and nearest-river shortcut are disabled. Verify the official facility and its separate water-entry candidate before accepting a correction.';panel.insertBefore(box,panel.querySelector('#suggestion-box')||panel.querySelector('#research-leads')||panel.querySelector('.coords'))}new MutationObserver(renderWarning).observe(panel,{childList:true});renderWarning()})();</script>`;
  await writeFile(outputPath, html.replace('</script></body></html>', `</script>${contextScript}${activeScript}${editingHelpScript}${roleAwareSuggestionScript}${roleAwareResearchLeadScript}${areaAnchorWarningScript}${identityMismatchWarningScript}${batchScript}${mapClarityScript}</body></html>`));
  await writeFile(researchPath, `${JSON.stringify({
    generatedAt: report.generatedAt,
    status: 'needs-research',
    count: endpoints.length,
    items: endpoints.map((endpoint) => ({
      routeId: endpoint.routeId,
      routeName: endpoint.routeName,
      reach: endpoint.reach,
      state: endpoint.state,
      endpoint: endpoint.endpoint,
      endpointName: endpoint.endpointName,
      current: { latitude: endpoint.latitude, longitude: endpoint.longitude },
      auditReason: endpoint.note,
      matchedRiverName: endpoint.matchedRiverName,
      distanceFeetToMatchedRiver: endpoint.distanceFeetToMatchedRiver,
      nearestWaterwayName: endpoint.nearestWaterwayName,
      distanceFeetToNearestWaterway: endpoint.distanceFeetToNearestWaterway,
      endpointOnWaterbody: endpoint.endpointOnWaterbody,
      coordinateEvidenceRole: endpoint.coordinateEvidenceRole ?? null,
      coordinateEvidenceSourceUrl: endpoint.coordinateEvidenceSourceUrl ?? null,
      coordinateEvidenceDetail: endpoint.coordinateEvidenceDetail ?? null,
      canonicalAccessStatus: endpoint.canonicalAccessStatus,
      suggestedWaterEntry: endpoint.suggestion ? {
        kind: endpoint.suggestion.kind,
        name: endpoint.suggestion.name,
        latitude: endpoint.suggestion.latitude,
        longitude: endpoint.suggestion.longitude,
        moveFeet: endpoint.suggestion.distanceFeet,
        confidence: endpoint.suggestion.confidence,
        score: endpoint.suggestion.score,
        waterConfidence: endpoint.suggestion.waterConfidence,
        waterScore: endpoint.suggestion.waterScore,
        accessConfidence: endpoint.suggestion.accessConfidence,
        accessScore: endpoint.suggestion.accessScore,
        limitingFactor: endpoint.suggestion.limitingFactor,
        evidence: endpoint.suggestion.evidence,
      } : null,
      authoritativeAccessAnchors: endpoint.authoritativeAccessCandidates ?? [],
      nearbyAuthoritativeAlternatives: endpoint.nearbyAuthoritativeCandidates ?? [],
      mappedResearchClues: endpoint.researchClues ?? [],
      sourceLinks: endpoint.sourceLinks ?? [],
      researchReason: endpoint.suggestion
        ? `Best candidate is ${endpoint.suggestion.confidence} overall (${endpoint.suggestion.score}/100): water ${endpoint.suggestion.waterConfidence} (${endpoint.suggestion.waterScore}/100), access ${endpoint.suggestion.accessConfidence} (${endpoint.suggestion.accessScore}/100). The limiting claim is ${endpoint.suggestion.limitingFactor}.`
        : 'No correction candidate was available from the current evidence sources.',
    })),
  }, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)} with ${endpoints.length} verification item(s).`);
}
run().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exit(1); });
// route context marker enhancement is injected into the generated page below.
