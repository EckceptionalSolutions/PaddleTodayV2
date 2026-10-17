type BackupError = Error & {
  status?: unknown;
  code?: unknown;
  requestId?: unknown;
  accountBackupStage?: unknown;
};

export function accountBackupFailureMessage(error: unknown) {
  const value = error && typeof error === 'object' ? error as BackupError : null;
  const status = typeof value?.status === 'number' && Number.isInteger(value.status) ? value.status : null;
  const code = typeof value?.code === 'string' && /^[a-z0-9_-]{1,80}$/i.test(value.code)
    ? value.code : null;
  const requestId = typeof value?.requestId === 'string' && /^[a-z0-9-]{1,100}$/i.test(value.requestId)
    ? value.requestId : null;
  const stage = typeof value?.accountBackupStage === 'string' && /^[a-z_]{1,60}$/i.test(value.accountBackupStage)
    ? value.accountBackupStage : null;

  // Keep account diagnostics useful without logging tokens, emails, or saved data.
  console.warn('[PaddleToday] Account backup failed', {
    errorName: value?.name ?? 'unknown', status, code, requestId, stage,
  });

  if (status === 401 || code === 'authentication_required') {
    return 'The backup service could not verify your sign-in. Your copies on this device were kept; try signing in again.';
  }
  if (status === 503 || code === 'account_service_unavailable' || code === 'account_operation_failed') {
    return 'The backup service is temporarily unavailable. Your copies on this device were kept; try again shortly.';
  }
  if (status === 0 || code === 'request_timeout') {
    return 'The backup request timed out. Your copies on this device were kept; check your connection and try again.';
  }
  if (stage === 'prepare_local_state' || stage === 'read_trip_plans') {
    return 'PaddleToday could not prepare the saved data on this device for backup. Your copies on this device were kept.';
  }
  if (stage === 'read_cloud_snapshot') {
    return 'PaddleToday could not read your account backup. Your copies on this device were kept; try again shortly.';
  }
  return 'Backup could not finish. Your copies on this device were kept.';
}
