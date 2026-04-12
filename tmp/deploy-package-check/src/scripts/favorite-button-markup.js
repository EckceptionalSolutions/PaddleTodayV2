import { FAVORITE_STAR_PATH } from '../lib/favorites-icon.js';

function escapeAttribute(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function favoriteButtonMarkup(
  favorite,
  {
    className = 'favorite-toggle favorite-toggle--card',
    unsavedLabel = 'Save',
    savedLabel = 'Saved',
    hidden = false,
  } = {}
) {
  return `
    <button
      class="${escapeAttribute(className)}"
      type="button"
      data-favorite-button
      data-favorite-slug="${escapeAttribute(favorite.slug)}"
      data-favorite-name="${escapeAttribute(favorite.name)}"
      data-favorite-reach="${escapeAttribute(favorite.reach)}"
      data-favorite-state="${escapeAttribute(favorite.state)}"
      data-favorite-region="${escapeAttribute(favorite.region)}"
      data-favorite-url="${escapeAttribute(favorite.url || `/rivers/${encodeURIComponent(favorite.slug)}/`)}"
      data-unsaved-label="${escapeAttribute(unsavedLabel)}"
      data-saved-label="${escapeAttribute(savedLabel)}"
      ${hidden ? 'hidden' : ''}
    >
      <span class="favorite-toggle__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="${FAVORITE_STAR_PATH}"></path>
        </svg>
      </span>
      <span class="favorite-toggle__label" data-favorite-label>${escapeAttribute(unsavedLabel)}</span>
    </button>
  `;
}
