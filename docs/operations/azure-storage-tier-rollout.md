# Azure Blob tier rollout

The repository now includes a guarded, Entra-authenticated helper for the active Blob tier change:

```powershell
npm run azure:storage:tier
```

The default mode is read-only inventory. It writes a manifest to `.local/azure-storage-tier-manifest.json` and reports the observed tier, size, and modification time for `river-snapshots` and `river-history`. The command uses the signed-in Azure CLI identity (`--auth-mode login`); it does not print or require an account key.

Review the manifest and remove any object that should remain Cool. Apply only the reviewed entries:

```powershell
npm run azure:storage:tier -- --apply --confirm-hot-tier
```

Verify the same manifest after the change:

```powershell
npm run azure:storage:tier -- --verify
```

The helper preserves RA-GRS and object contents. It does not change the account default tier, delete data, or alter lifecycle policy. A data-plane `Storage Blob Data Reader` role is required for inventory/verification and `Storage Blob Data Contributor` is required for the guarded apply. If listing is denied, stop and obtain those narrow roles through the platform owner rather than substituting credentials.
