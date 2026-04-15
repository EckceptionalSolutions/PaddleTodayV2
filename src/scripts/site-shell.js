import { favoriteCount, subscribeFavorites } from './favorites-store.js';

const favoritesLink = document.querySelector('[data-site-favorites-link]');
const favoritesCount = document.querySelector('[data-site-favorites-count]');
const searchDialog = document.querySelector('[data-site-search]');
const searchResults = document.querySelector('[data-site-search-results]');
const searchInput = document.querySelector('[data-site-search-input]');
const searchHint = document.querySelector('[data-site-search-hint]');
const searchOpenButtons = Array.from(document.querySelectorAll('[data-site-search-open]'));
const searchCloseButtons = Array.from(document.querySelectorAll('[data-site-search-close], [data-site-search-dismiss]'));
const searchIndexNode = document.querySelector('[data-site-search-index]');

let searchIndex = [];
let lastFocusedElement = null;

function renderFavoritesNav() {
  if (!(favoritesLink instanceof HTMLAnchorElement)) {
    return;
  }

  const count = favoriteCount();
  favoritesLink.hidden = count <= 0;

  if (favoritesCount instanceof HTMLElement) {
    favoritesCount.textContent = count > 0 ? `(${count})` : '';
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value) {
  return normalizeText(value)
    .split(' ')
    .map((token) => token.trim())
    .filter(Boolean);
}

function loadSearchIndex() {
  if (!(searchIndexNode instanceof HTMLScriptElement)) {
    searchIndex = [];
    return;
  }

  try {
    const parsed = JSON.parse(searchIndexNode.textContent || '[]');
    searchIndex = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Could not parse site search index.', error);
    searchIndex = [];
  }
}

function defaultSearchResults() {
  const rivers = searchIndex.filter((item) => item.kind === 'river').slice(0, 6);
  const routes = searchIndex.filter((item) => item.kind === 'route').slice(0, 4);
  return [...rivers, ...routes];
}

function searchMatches(query) {
  const terms = tokenize(query);
  if (terms.length === 0) {
    return defaultSearchResults();
  }

  return searchIndex
    .map((item) => {
      const haystack = normalizeText(item.searchText || `${item.title} ${item.subtitle} ${item.meta}`);
      let score = 0;

      for (const term of terms) {
        if (!haystack.includes(term)) {
          return null;
        }

        score += 2;
        if (normalizeText(item.title).startsWith(term)) {
          score += 4;
        }
        if (normalizeText(item.subtitle || '').includes(term)) {
          score += 1;
        }
      }

      if (item.kind === 'river') {
        score += 0.5;
      }

      return { item, score };
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.item.title.localeCompare(right.item.title);
    })
    .slice(0, 10)
    .map((entry) => entry.item);
}

function resultMarkup(item) {
  return `
    <a class="site-search-dialog__result" href="${escapeHtml(item.href)}">
      <span class="site-search-dialog__result-kind site-search-dialog__result-kind--${escapeHtml(item.kind)}">${escapeHtml(item.kindLabel)}</span>
      <span class="site-search-dialog__result-body">
        <strong class="site-search-dialog__result-title">${escapeHtml(item.title)}</strong>
        <span class="site-search-dialog__result-subtitle">${escapeHtml(item.subtitle || '')}</span>
        <span class="site-search-dialog__result-meta">${escapeHtml(item.meta || '')}</span>
      </span>
    </a>
  `;
}

function renderSearchResults(query = '') {
  if (!(searchResults instanceof HTMLElement)) {
    return;
  }

  const results = searchMatches(query);
  const trimmedQuery = query.trim();

  if (searchHint instanceof HTMLElement) {
    searchHint.textContent = trimmedQuery
      ? `${results.length} ${results.length === 1 ? 'match' : 'matches'}`
      : 'Try Snake, Root, Faribault, or Pine City.';
  }

  if (results.length === 0) {
    searchResults.innerHTML = `
      <div class="site-search-dialog__empty">
        <strong>No matches yet.</strong>
        <p class="muted">Try a river name, route name, town, or area.</p>
      </div>
    `;
    return;
  }

  searchResults.innerHTML = results.map(resultMarkup).join('');
}

function openSearch() {
  if (!(searchDialog instanceof HTMLElement)) {
    return;
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  searchDialog.hidden = false;
  document.body.classList.add('site-search-open');
  window.setTimeout(() => {
    if (searchInput instanceof HTMLInputElement) {
      searchInput.focus();
      searchInput.select();
    }
  }, 20);
  renderSearchResults(searchInput instanceof HTMLInputElement ? searchInput.value : '');
}

function closeSearch() {
  if (!(searchDialog instanceof HTMLElement)) {
    return;
  }

  searchDialog.hidden = true;
  document.body.classList.remove('site-search-open');
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function bindSearch() {
  loadSearchIndex();

  for (const button of searchOpenButtons) {
    if (!(button instanceof HTMLButtonElement)) continue;
    button.addEventListener('click', () => {
      openSearch();
    });
  }

  for (const button of searchCloseButtons) {
    if (!(button instanceof HTMLElement)) continue;
    button.addEventListener('click', () => {
      closeSearch();
    });
  }

  if (searchInput instanceof HTMLInputElement) {
    searchInput.addEventListener('input', () => {
      renderSearchResults(searchInput.value);
    });
  }

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTypingTarget = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;

    if (event.key === 'Escape' && searchDialog instanceof HTMLElement && !searchDialog.hidden) {
      closeSearch();
      return;
    }

    if (isTypingTarget) {
      return;
    }

    if (event.key === '/' && !(searchDialog instanceof HTMLElement && !searchDialog.hidden)) {
      event.preventDefault();
      openSearch();
    }
  });
}

renderFavoritesNav();
subscribeFavorites(renderFavoritesNav);
bindSearch();
