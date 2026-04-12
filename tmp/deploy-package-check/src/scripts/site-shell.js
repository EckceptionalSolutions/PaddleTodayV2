import { favoriteCount, subscribeFavorites } from './favorites-store.js';

const favoritesLink = document.querySelector('[data-site-favorites-link]');
const favoritesCount = document.querySelector('[data-site-favorites-count]');

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

renderFavoritesNav();
subscribeFavorites(renderFavoritesNav);
