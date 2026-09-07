import { readFavorites, updateFavoriteNotes } from './favorites-store.js';
import { showActionFeedback } from './action-feedback.js';

export function bindFavoriteNotes() {
  const dialog = document.querySelector('[data-favorite-notes-dialog]');
  const form = dialog?.querySelector('form');
  const input = dialog?.querySelector('textarea');
  const title = dialog?.querySelector('[data-notes-title]');
  const status = dialog?.querySelector('[data-notes-status]');
  if (!(dialog instanceof HTMLDialogElement) || !(input instanceof HTMLTextAreaElement) || !form) return;
  let slug = '';
  document.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-favorite-notes]') : null;
    if (!(button instanceof HTMLButtonElement)) return;
    event.preventDefault();
    const favorite = readFavorites().find((item) => item.slug === button.dataset.favoriteNotes);
    if (!favorite) return;
    slug = favorite.slug;
    input.value = favorite.notes || '';
    title.textContent = `Notes for ${favorite.name || 'this route'}`;
    status.textContent = '';
    dialog.showModal();
    input.focus();
  });
  dialog.querySelector('[data-notes-cancel]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    // Saving refreshes the cards; return focus to the newly rendered control.
    const button = Array.from(document.querySelectorAll('[data-favorite-notes]')).find((item) => item.dataset.favoriteNotes === slug);
    button?.focus({ preventScroll: true });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      updateFavoriteNotes(slug, input.value);
      dialog.close();
      showActionFeedback(input.value.trim() ? 'Personal note saved.' : 'Personal note removed.');
    } catch (error) {
      status.textContent = readFavorites().some((item) => item.slug === slug)
        ? 'Could not save your note. Check browser storage and try again. Your draft is still here.'
        : error.message;
    }
  });
}
