import { initSummaryBoard } from './summary-board.js';

initSummaryBoard();

// Enable controls only once their handlers and restored search state are ready.
// Native details disclosures can still open immediately while the module loads.
for (const control of document.querySelectorAll('[data-explore-wait]')) {
  if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLButtonElement) {
    control.disabled = false;
  }
}
