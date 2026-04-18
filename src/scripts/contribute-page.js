const CONTRIBUTE_MAX_FILES = 12;
const CONTRIBUTE_MAX_BYTES = 4 * 1024 * 1024;
const CONTRIBUTE_ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const CONTRIBUTE_COOLDOWN_MS = 30 * 1000;

const form = document.querySelector('[data-contribute-form]');
const nameInput = document.querySelector('[data-contribute-name]');
const emailInput = document.querySelector('[data-contribute-email]');
const routeSelect = document.querySelector('[data-contribute-route]');
const tripDateInput = document.querySelector('[data-contribute-trip-date]');
const filesInput = document.querySelector('[data-contribute-files]');
const notesInput = document.querySelector('[data-contribute-notes]');
const rightsInput = document.querySelector('[data-contribute-rights]');
const consentInput = document.querySelector('[data-contribute-consent]');
const companyInput = document.querySelector('[data-contribute-company]');
const submitButton = document.querySelector('[data-contribute-submit]');
const statusNode = document.querySelector('[data-contribute-status]');
const selectionNode = document.querySelector('[data-contribute-selection]');
const uploadList = document.querySelector('[data-contribute-upload-list]');
const uploadGrid = document.querySelector('[data-contribute-upload-grid]');

let selectedUploads = [];

function setStatus(message, tone = '') {
  if (!(statusNode instanceof HTMLElement)) return;
  statusNode.textContent = message;
  statusNode.classList.toggle('route-photo-form__status--success', tone === 'success');
  statusNode.classList.toggle('route-photo-form__status--error', tone === 'error');
}

function setSubmitting(submitting) {
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = submitting;
  }
}

function validateFiles(files) {
  if (files.length === 0) {
    return 'Add at least one photo to upload.';
  }

  if (files.length > CONTRIBUTE_MAX_FILES) {
    return `Upload up to ${CONTRIBUTE_MAX_FILES} photos at a time.`;
  }

  for (const file of files) {
    if (!CONTRIBUTE_ALLOWED_TYPES.has(file.type)) {
      return 'Photos must be JPG, PNG, or WebP.';
    }
    if (file.size > CONTRIBUTE_MAX_BYTES) {
      return 'Each photo must be 4 MB or smaller.';
    }
  }

  return '';
}

function summarizeSelection() {
  if (!(selectionNode instanceof HTMLElement)) return;

  if (selectedUploads.length === 0) {
    selectionNode.textContent = 'No files selected yet.';
    return;
  }

  selectionNode.textContent = `${selectedUploads.length} photo${selectedUploads.length === 1 ? '' : 's'} ready to upload.`;
}

function renderUploadGrid() {
  if (!(uploadGrid instanceof HTMLElement) || !(uploadList instanceof HTMLElement)) return;

  uploadList.hidden = selectedUploads.length === 0;
  if (selectedUploads.length === 0) {
    uploadGrid.innerHTML = '';
    return;
  }

  uploadGrid.innerHTML = selectedUploads
    .map(
      (item) => `
        <article class="contribute-upload-card" data-upload-id="${item.id}">
          <div class="contribute-upload-card__media">
            <img src="${item.previewUrl}" alt="${escapeHtml(item.file.name)}" loading="lazy" />
          </div>
          <div class="contribute-upload-card__meta">
            <p class="contribute-upload-card__name">${escapeHtml(item.file.name)}</p>
            <p class="muted contribute-upload-card__size">${formatBytes(item.file.size)}</p>
          </div>
          <label class="contribute-upload-card__caption">
            <span>Photo caption</span>
            <input
              type="text"
              maxlength="140"
              placeholder="Example: Put-in at Hidden Falls"
              value="${escapeAttribute(item.caption)}"
              data-upload-caption
            />
          </label>
        </article>
      `
    )
    .join('');

  for (const input of Array.from(uploadGrid.querySelectorAll('[data-upload-caption]'))) {
    if (!(input instanceof HTMLInputElement)) continue;
    input.addEventListener('input', () => {
      const card = input.closest('[data-upload-id]');
      if (!(card instanceof HTMLElement)) return;
      const entry = selectedUploads.find((item) => item.id === card.dataset.uploadId);
      if (!entry) return;
      entry.caption = input.value.trim();
    });
  }
}

function clearPreviews() {
  for (const item of selectedUploads) {
    if (item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
  }
  selectedUploads = [];
}

function syncSelectedUploads() {
  if (!(filesInput instanceof HTMLInputElement)) return;

  clearPreviews();
  const files = Array.from(filesInput.files || []);
  const validationError = validateFiles(files);
  if (validationError) {
    summarizeSelection();
    renderUploadGrid();
    setStatus(validationError, 'error');
    return;
  }

  selectedUploads = files.map((file, index) => ({
    id: `${Date.now()}-${index}-${file.name}`,
    file,
    previewUrl: URL.createObjectURL(file),
    caption: '',
  }));

  summarizeSelection();
  renderUploadGrid();
  setStatus(`${selectedUploads.length} photo${selectedUploads.length === 1 ? '' : 's'} ready to upload.`);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '';
  return `${(bytes / (1024 * 1024)).toFixed(bytes >= 1024 * 1024 ? 1 : 2)} MB`;
}

if (
  form instanceof HTMLFormElement &&
  nameInput instanceof HTMLInputElement &&
  emailInput instanceof HTMLInputElement &&
  routeSelect instanceof HTMLSelectElement &&
  filesInput instanceof HTMLInputElement &&
  rightsInput instanceof HTMLInputElement &&
  consentInput instanceof HTMLInputElement
) {
  filesInput.addEventListener('change', syncSelectedUploads);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nowTs = Date.now();
    const lastTs = Number(window.localStorage.getItem('contribute-photo-cooldown') || '0');
    if (Number.isFinite(lastTs) && nowTs - lastTs < CONTRIBUTE_COOLDOWN_MS) {
      setStatus('Please wait a few seconds before uploading more photos.', 'error');
      return;
    }

    const contributorName = nameInput.value.trim();
    const contributorEmail = emailInput.value.trim();
    const riverSlug = routeSelect.value.trim();
    const tripDate = tripDateInput instanceof HTMLInputElement ? tripDateInput.value.trim() : '';
    const notes = notesInput instanceof HTMLTextAreaElement ? notesInput.value.trim() : '';
    const validationError = validateFiles(selectedUploads.map((item) => item.file));

    if (contributorName.length < 2) {
      setStatus('Add your name.', 'error');
      nameInput.focus();
      return;
    }

    if (!contributorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contributorEmail)) {
      setStatus('Enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    if (!riverSlug) {
      setStatus('Choose the river or route these photos belong to.', 'error');
      routeSelect.focus();
      return;
    }

    if (validationError) {
      setStatus(validationError, 'error');
      filesInput.focus();
      return;
    }

    if (!rightsInput.checked) {
      setStatus('Confirm you took the photos or have permission to share them.', 'error');
      rightsInput.focus();
      return;
    }

    if (!consentInput.checked) {
      setStatus("Confirm that it's okay for Paddle Today to contact you about this submission.", 'error');
      consentInput.focus();
      return;
    }

    setSubmitting(true);
    setStatus(`Uploading ${selectedUploads.length} photo${selectedUploads.length === 1 ? '' : 's'}...`);

    try {
      const files = await Promise.all(
        selectedUploads.map(async ({ file, caption }) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          caption,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );

      const response = await fetch('/api/route-photo-submissions', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          riverSlug,
          contributorName,
          contributorEmail,
          tripDate,
          tripSentiment: '',
          tripReport: '',
          notes,
          rightsConfirmed: rightsInput.checked,
          reviewConsent: consentInput.checked,
          company: companyInput instanceof HTMLInputElement ? companyInput.value.trim() : '',
          files,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload?.ok !== true) {
        throw new Error(payload?.message || 'Could not store this photo submission.');
      }

      window.localStorage.setItem('contribute-photo-cooldown', String(nowTs));
      form.reset();
      clearPreviews();
      summarizeSelection();
      renderUploadGrid();
      setStatus('Thanks. Your photos are in the review queue.', 'success');
    } catch (error) {
      console.error('Failed to submit contributed photos.', error);
      setStatus(error instanceof Error ? error.message : 'Could not upload these photos right now.', 'error');
    } finally {
      setSubmitting(false);
    }
  });
}
