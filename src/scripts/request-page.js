import { trackEvent } from './analytics.js';
import { getBrowserApiClient } from './browser-api-client.js';
import { createSubmissionCooldown } from './submission-cooldown.js';

const form = document.querySelector('[data-request-form]');
const status = document.querySelector('[data-request-status]');
const submitButton = document.querySelector('[data-request-submit]');
const emailLink = document.querySelector('[data-request-email-link]');
const kicker = document.querySelector('[data-request-kicker]');
const title = document.querySelector('[data-request-title]');
const lede = document.querySelector('[data-request-lede]');
const formTitle = document.querySelector('[data-request-form-title]');
const formNote = document.querySelector('[data-request-form-note]');

const REQUEST_EMAIL = 'hello@paddletoday.com';
const cooldown = createSubmissionCooldown('paddletoday:routeRequest:lastTs');
let submitting = false;

applyRequestContext();

if (form instanceof HTMLFormElement) {
  attachValidationListeners(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting) return;

    if (cooldown.isActive()) {
      setStatus('Please wait a few seconds before sending another request.');
      return;
    }

    const formData = new FormData(form);
    const routeName = String(formData.get('routeName') || '').trim();
    const state = String(formData.get('state') || '').trim();
    const putIn = String(formData.get('putIn') || '').trim();
    const takeOut = String(formData.get('takeOut') || '').trim();
    const sources = String(formData.get('sources') || '').trim();
    const notes = String(formData.get('notes') || '').trim();
    const replyEmail = String(formData.get('replyEmail') || '').trim();
    const company = String(formData.get('company') || '').trim();

    const validationError = validateForm({ routeName, state, replyEmail });
    if (validationError) {
      setStatus(validationError);
      return;
    }

    const payload = {
      routeName,
      state,
      putIn,
      takeOut,
      sources,
      notes,
      replyEmail,
      company,
    };

    setSubmitting(true);

    try {
      const data = await getBrowserApiClient().createRiverRequest(payload);
      if (data.stored !== true) {
        throw new Error('Route request was not stored.');
      }

      cooldown.recordSuccess();
      form.reset();
      if (emailLink instanceof HTMLAnchorElement) emailLink.href = `mailto:${REQUEST_EMAIL}`;
      setStatus('Request received. Thank you.');
      trackEvent('Submit route request', {
        state,
        label: requestModeLabel(),
      });
    } catch {
      fallbackToEmail({ routeName, state, putIn, takeOut, sources, notes, replyEmail });
    } finally {
      setSubmitting(false);
      if (status instanceof HTMLElement && (document.activeElement === document.body || document.activeElement === submitButton)) {
        status.tabIndex = -1;
        status.focus({ preventScroll: true });
      }
    }
  });
}

function applyRequestContext() {
  const params = new URLSearchParams(window.location.search);
  const mode = String(params.get('mode') || '').trim().toLowerCase();
  const isUpdate = mode === 'update';

  if (form instanceof HTMLFormElement) {
    prefillField(form, 'routeName', params.get('routeName'));
    prefillField(form, 'state', params.get('state'));
    prefillField(form, 'putIn', params.get('putIn'));
    prefillField(form, 'takeOut', params.get('takeOut'));
    prefillField(form, 'sources', params.get('sources'));
    prefillField(form, 'replyEmail', params.get('replyEmail'));

    const notesParam = params.get('notes');
    if (notesParam) {
      prefillField(form, 'notes', notesParam);
    } else if (isUpdate) {
      prefillField(
        form,
        'notes',
        'I noticed this might need an update:\n- \n\nWhat changed or looked wrong:\n- \n'
      );
    }
    const optional = form.querySelector('details');
    if (optional && ['putIn', 'takeOut', 'sources', 'notes'].some((name) => getField(name)?.value.trim())) {
      optional.open = true;
    }
  }

  if (!isUpdate) {
    return;
  }

  setText(kicker, 'Report a change');
  setText(title, 'Flag something that needs an update.');
  setText(lede, 'Use this form if you spot an outdated access note, hazard, shuttle detail, or threshold note on an existing route page.');
  setText(formTitle, 'What changed');
  setText(formNote, 'Tell us what looked wrong, what changed, and any source or local context that helps.');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.textContent = 'Send update';
  }
}

function setStatus(message) {
  if (status instanceof HTMLElement) {
    status.textContent = message;
  }
}

function setSubmitting(isSubmitting) {
  submitting = isSubmitting;
  form?.setAttribute('aria-busy', String(isSubmitting));
  if (!(submitButton instanceof HTMLButtonElement)) {
    return;
  }

  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? 'Sending...' : defaultSubmitLabel();
  if (isSubmitting) {
    setStatus('Sending request...');
  }
}

function attachValidationListeners(formElement) {
  const fields = ['routeName', 'state', 'replyEmail']
    .map((name) => formElement.elements.namedItem(name))
    .filter((field) => field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement);

  for (const field of fields) {
    field.addEventListener('input', () => {
      clearFieldError(field);
    });
    field.addEventListener('blur', () => {
      validateSingleField(field);
    });
  }
}

function validateForm({ routeName, state, replyEmail }) {
  let firstInvalidField = null;

  const setFirstInvalid = (field) => {
    if (!firstInvalidField) {
      firstInvalidField = field;
    }
  };

  const routeField = getField('routeName');
  const stateField = getField('state');
  const emailField = getField('replyEmail');

  if (routeField) {
    const message = routeName.length >= 3 ? '' : 'Add a route or river name.';
    setFieldError(routeField, message);
    if (message) setFirstInvalid(routeField);
  }

  if (stateField) {
    const message = state ? '' : 'Add a state.';
    setFieldError(stateField, message);
    if (message) setFirstInvalid(stateField);
  }

  if (emailField) {
    emailField.setCustomValidity('');
    const message =
      !replyEmail || emailField.validity.valid ? '' : 'Enter a valid email address or leave it blank.';
    setFieldError(emailField, message);
    if (message) setFirstInvalid(emailField);
  }

  if (firstInvalidField) {
    firstInvalidField.focus();
    return 'Please check the highlighted fields.';
  }

  return '';
}

function validateSingleField(field) {
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
    return true;
  }

  const value = field.value.trim();
  field.setCustomValidity('');
  let message = '';

  if (field.name === 'routeName') {
    message = value.length >= 3 ? '' : 'Add a route or river name.';
  } else if (field.name === 'state') {
    message = value ? '' : 'Add a state.';
  } else if (field.name === 'replyEmail') {
    message = !value || field.validity.valid ? '' : 'Enter a valid email address or leave it blank.';
  }

  setFieldError(field, message);
  return !message;
}

function getField(name) {
  if (!(form instanceof HTMLFormElement)) {
    return null;
  }

  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field : null;
}

function setFieldError(field, message) {
  field.setCustomValidity(message);
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  const error = document.getElementById(`request-${field.name}-error`);
  if (error) {
    error.textContent = message;
    error.hidden = !message;
  }
}

function clearFieldError(field) {
  setFieldError(field, '');
}

function defaultSubmitLabel() {
  return requestModeLabel() === 'update' ? 'Send update' : 'Send request';
}

function requestModeLabel() {
  const params = new URLSearchParams(window.location.search);
  return String(params.get('mode') || '').trim().toLowerCase() === 'update' ? 'update' : 'request';
}

function setText(element, value) {
  if (element instanceof HTMLElement) {
    element.textContent = value;
  }
}

function prefillField(formElement, name, value) {
  if (!value) {
    return;
  }

  const field = formElement.elements.namedItem(name);
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    if (!field.value.trim()) {
      field.value = value;
    }
  }
}

function fallbackToEmail(payload) {
  const isUpdate = String(new URLSearchParams(window.location.search).get('mode') || '').trim().toLowerCase() === 'update';
  const subject = isUpdate
    ? `Route update: ${payload.routeName} (${payload.state})`
    : `Route request: ${payload.routeName} (${payload.state})`;
  const body = [
    isUpdate ? 'Paddle Today route update' : 'Paddle Today route request',
    '',
    `Route/river: ${payload.routeName}`,
    `State: ${payload.state}`,
    `Put-in: ${payload.putIn || 'N/A'}`,
    `Take-out: ${payload.takeOut || 'N/A'}`,
    `Reply email: ${payload.replyEmail || 'N/A'}`,
    '',
    'Known links:',
    payload.sources || 'N/A',
    '',
    'Notes:',
    payload.notes,
  ].join('\n');

  const href = `mailto:${encodeURIComponent(REQUEST_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (emailLink instanceof HTMLAnchorElement) {
    emailLink.href = href;
  }
  setStatus(`Could not send your request. Your entries are still here. Try again or use “Email instead” to send them to ${REQUEST_EMAIL}.`);
}
