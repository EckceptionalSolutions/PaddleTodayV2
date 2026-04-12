import {
  isFavorite,
  normalizeFavoriteEntry,
  subscribeFavorites,
  toggleFavorite,
} from './favorites-store.js';

const FAVORITE_BUTTON_SELECTOR = '[data-favorite-button]';
const boundRoots = new WeakSet();

function favoriteEntryFromButton(button) {
  return normalizeFavoriteEntry({
    slug: button.dataset.favoriteSlug,
    name: button.dataset.favoriteName,
    reach: button.dataset.favoriteReach,
    state: button.dataset.favoriteState,
    region: button.dataset.favoriteRegion,
    url: button.dataset.favoriteUrl,
  });
}

function favoriteLabel(button, saved) {
  return saved
    ? button.dataset.savedLabel || 'Saved'
    : button.dataset.unsavedLabel || 'Save';
}

export function decorateFavoriteButton(button, favorite) {
  if (!(button instanceof HTMLElement)) {
    return;
  }

  const normalized = normalizeFavoriteEntry(favorite);
  if (!normalized) {
    button.hidden = true;
    return;
  }

  button.hidden = false;
  button.dataset.favoriteSlug = normalized.slug;
  button.dataset.favoriteName = normalized.name;
  button.dataset.favoriteReach = normalized.reach;
  button.dataset.favoriteState = normalized.state;
  button.dataset.favoriteRegion = normalized.region;
  button.dataset.favoriteUrl = normalized.url;
  updateFavoriteButton(button);
}

export function updateFavoriteButton(button) {
  if (!(button instanceof HTMLElement)) {
    return;
  }

  const favorite = favoriteEntryFromButton(button);
  if (!favorite) {
    button.hidden = true;
    return;
  }

  const saved = isFavorite(favorite.slug);
  const label = favoriteLabel(button, saved);
  const labelNode = button.querySelector('[data-favorite-label]');
  if (labelNode instanceof HTMLElement) {
    labelNode.textContent = label;
  }

  button.hidden = false;
  button.classList.toggle('is-saved', saved);
  button.setAttribute('aria-pressed', saved ? 'true' : 'false');
  button.setAttribute(
    'aria-label',
    `${saved ? 'Remove from favorites' : 'Save to favorites'}: ${favorite.name || 'Route'}${favorite.reach ? `, ${favorite.reach}` : ''}`
  );
  button.title = saved ? 'Remove from favorites' : 'Save to favorites';
}

export function refreshFavoriteButtons(root = document) {
  const buttons = root.querySelectorAll(FAVORITE_BUTTON_SELECTOR);
  for (const button of buttons) {
    updateFavoriteButton(button);
  }
}

export function bindFavoriteButtons(root = document, { onToggle } = {}) {
  if (boundRoots.has(root)) {
    refreshFavoriteButtons(root);
    return () => {};
  }

  const clickHandler = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest(FAVORITE_BUTTON_SELECTOR);
    if (!(button instanceof HTMLElement)) {
      return;
    }

    if (root !== document && !root.contains(button)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const favorite = favoriteEntryFromButton(button);
    if (!favorite) {
      return;
    }

    const saved = toggleFavorite(favorite);
    refreshFavoriteButtons(root);
    if (typeof onToggle === 'function') {
      onToggle({
        button,
        favorite,
        saved,
      });
    }
  };

  root.addEventListener('click', clickHandler);
  subscribeFavorites(() => {
    refreshFavoriteButtons(root);
  });
  boundRoots.add(root);
  refreshFavoriteButtons(root);

  return () => {
    root.removeEventListener('click', clickHandler);
    boundRoots.delete(root);
  };
}
