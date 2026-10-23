import { embedOptions, embedRouteSearch, routeEmbedSnippet, routeEmbedUrl } from '../lib/route-embed';

const select = document.querySelector<HTMLSelectElement>('#route-select')!;
const search = document.querySelector<HTMLInputElement>('#route-search')!;
const picker = document.querySelector<HTMLElement>('#route-picker')!;
const pickerButton = document.querySelector<HTMLButtonElement>('#selected-route')!;
const searchPanel = document.querySelector<HTMLElement>('#route-search-panel')!;
const results = document.querySelector<HTMLUListElement>('#route-results')!;
const branding = document.querySelector<HTMLInputElement>('#show-branding')!;
const partner = document.querySelector<HTMLInputElement>('#partner-tag')!;
const code = document.querySelector<HTMLTextAreaElement>('#embed-code')!;
const preview = document.querySelector<HTMLIFrameElement>('#route-preview')!;
const copy = document.querySelector<HTMLButtonElement>('#copy-code')!;
const copyStatus = document.querySelector<HTMLElement>('#copy-status')!;
const allOptions = Array.from(select.options);
let selectedSlug = select.value;
let copyGeneration = 0;
let previewSettings = '';

const initial = new URLSearchParams(location.search);
const initialOptions = embedOptions(initial);
branding.checked = initialOptions.branding;
partner.value = initialOptions.partner;
document.querySelector<HTMLInputElement>(`input[name="theme"][value="${initialOptions.theme}"]`)!.checked = true;
document.querySelector<HTMLInputElement>(`input[name="layout"][value="${initialOptions.layout}"]`)!.checked = true;
document.querySelector<HTMLInputElement>(`input[name="accent"][value="${initialOptions.accent}"]`)!.checked = true;
const requested = allOptions.find(option => option.value === initial.get('route'));
if (requested) { select.value = requested.value; selectedSlug = requested.value; }
picker.hidden = false;
select.hidden = true;
pickerButton.setAttribute('aria-label', 'Change river route');
pickerButton.setAttribute('aria-describedby', 'selected-name selected-reach selected-state');

function configurePreview() {
  preview.contentWindow?.postMessage({ type: 'paddletoday:embed:configure', query: previewSettings }, location.origin);
}
preview.addEventListener('load', configurePreview);

function update() {
  copyGeneration++;
  const route = allOptions.find(option => option.value === selectedSlug)!;
  const params = new URLSearchParams({
    theme: document.querySelector<HTMLInputElement>('input[name="theme"]:checked')!.value,
    layout: document.querySelector<HTMLInputElement>('input[name="layout"]:checked')!.value,
    accent: document.querySelector<HTMLInputElement>('input[name="accent"]:checked')!.value,
    branding: branding.checked ? '1' : '0', partner: partner.value,
  });
  const options = embedOptions(params);
  const previewUrl = routeEmbedUrl(location.origin, selectedSlug, options);
  previewUrl.searchParams.set('preview', '1');
  previewSettings = previewUrl.searchParams.toString();
  // Keep the observation and image in place when only the presentation changes.
  if (new URL(preview.src).pathname !== previewUrl.pathname) preview.src = previewUrl.href;
  else configurePreview();
  preview.title = `${route.dataset.name} — route card preview`;
  code.value = routeEmbedSnippet(routeEmbedUrl('https://paddletoday.com', selectedSlug, options), route.dataset.name!);
  document.querySelector('#selected-name')!.textContent = route.dataset.name!;
  document.querySelector('#selected-reach')!.textContent = route.dataset.reach!;
  document.querySelector('#selected-state')!.textContent = route.dataset.state!;
  copy.querySelector('[data-copy-label]')!.textContent = 'Copy embed code';
  copyStatus.textContent = '';
  document.querySelector('#partner-attribution')!.textContent = options.partner
    ? `Referral tag: ${options.partner}. Included in your copied embed code.`
    : 'Add a tag to compare this partner’s referrals. Untagged cards are grouped together.';
  document.querySelector('#share-status')!.textContent = '';
  document.querySelector<HTMLElement>('#preview-link-fallback')!.hidden = true;
  const state = new URLSearchParams(previewSettings);
  state.delete('preview');
  state.set('route', selectedSlug);
  history.replaceState(null, '', `${location.pathname}?${state}`);
}

function toggleSearch(open: boolean, restoreFocus = false) {
  searchPanel.hidden = !open;
  pickerButton.setAttribute('aria-expanded', String(open));
  if (open) { renderResults(); search.focus(); search.select(); }
  else if (restoreFocus) pickerButton.focus();
}

function renderResults() {
  const query = embedRouteSearch(search.value);
  const matches = allOptions.filter(option => query.slug ? option.value === query.slug
    : query.tokens.every(token => `${option.dataset.search} ${option.value}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(token)));
  if (!search.value.trim()) matches.sort((a, b) => Number(b.value === selectedSlug) - Number(a.value === selectedSlug));
  const shown = matches.slice(0, 12);
  results.replaceChildren();
  for (const option of shown) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.route = option.value;
    button.setAttribute('aria-pressed', String(option.value === selectedSlug));
    const name = document.createElement('strong'); name.textContent = option.dataset.name!;
    const reach = document.createElement('span'); reach.textContent = option.dataset.reach!;
    const state = document.createElement('small'); state.textContent = option.dataset.state!;
    button.append(name, reach, state);
    button.addEventListener('click', () => {
      selectedSlug = option.value; select.value = selectedSlug; update(); toggleSearch(false, true);
    });
    item.append(button); results.append(item);
  }
  document.querySelector('#route-count')!.textContent = matches.length
    ? `${matches.length.toLocaleString('en-US')} matching ${matches.length === 1 ? 'route' : 'routes'}${matches.length > shown.length ? `. Showing ${shown.length}; add a state or access point to narrow your search.` : '.'}`
    : 'No matching routes. Try a river name or state.';
}

pickerButton.addEventListener('click', () => toggleSearch(searchPanel.hidden));
search.addEventListener('input', renderResults);
picker.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !searchPanel.hidden) { event.preventDefault(); toggleSearch(false, true); }
  if (searchPanel.hidden) return;
  const buttons = Array.from(results.querySelectorAll('button'));
  const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
  if (event.key === 'ArrowDown' && buttons.length) {
    event.preventDefault(); buttons[Math.min(index + 1, buttons.length - 1)].focus();
  } else if (event.key === 'ArrowUp' && index >= 0) {
    event.preventDefault(); if (index === 0) search.focus(); else buttons[index - 1].focus();
  }
});
document.addEventListener('click', event => { if (!picker.contains(event.target as Node)) toggleSearch(false); });
select.addEventListener('change', () => { if (select.value) { selectedSlug = select.value; update(); } });
document.querySelectorAll('input[name="theme"], input[name="layout"], input[name="accent"]').forEach(input => input.addEventListener('change', update));
branding.addEventListener('change', update);
partner.addEventListener('input', update);
partner.addEventListener('change', () => { partner.value = embedOptions(new URLSearchParams({ partner: partner.value })).partner; });
document.querySelectorAll<HTMLButtonElement>('[data-preview-width]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-preview-width]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector<HTMLElement>('#preview-wrap')!.style.maxWidth = `${button.dataset.previewWidth}px`;
}));
copy.addEventListener('click', async () => {
  const generation = ++copyGeneration;
  try {
    await navigator.clipboard.writeText(code.value);
    if (generation !== copyGeneration) return;
    copy.querySelector('[data-copy-label]')!.textContent = 'Copied!';
    copyStatus.textContent = 'Ready to paste into your website’s HTML block.';
  } catch {
    if (generation !== copyGeneration) return;
    document.querySelector<HTMLDetailsElement>('#code-details')!.open = true;
    code.focus(); code.select();
    copyStatus.textContent = 'Code selected. Press Ctrl+C or Command+C to copy.';
  }
});
document.querySelector('#copy-preview')!.addEventListener('click', async () => {
  const generation = copyGeneration;
  const shareUrl = new URL(location.pathname, location.origin);
  shareUrl.search = new URLSearchParams({ route: selectedSlug, ...Object.fromEntries(new URLSearchParams(previewSettings)) }).toString();
  const shareStatus = document.querySelector('#share-status')!;
  try {
    await navigator.clipboard.writeText(shareUrl.href);
    if (generation === copyGeneration) shareStatus.textContent = 'Configuration link copied, with your route and style settings.';
  } catch {
    if (generation !== copyGeneration) return;
    document.querySelector<HTMLElement>('#preview-link-fallback')!.hidden = false;
    const input = document.querySelector<HTMLInputElement>('#preview-link')!;
    input.value = shareUrl.href; input.focus(); input.select();
    shareStatus.textContent = 'Link selected. Press Ctrl+C or Command+C to copy.';
  }
});
const stepLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.builder-jump a'));
let scrollQueued = false;
function markCurrentStep() {
  const current = [...stepLinks].reverse().find(link => document.querySelector(link.hash)!.getBoundingClientRect().top <= 170) ?? stepLinks[0];
  stepLinks.forEach(link => {
    link.classList.toggle('is-active', link === current);
    if (link === current) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(markCurrentStep); } }, { passive: true });
markCurrentStep();
update();
