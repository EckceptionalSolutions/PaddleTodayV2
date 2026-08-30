import { useAzureMonitor } from '@azure/monitor-opentelemetry';

const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING?.trim();

if (connectionString) {
  try {
    useAzureMonitor();
    console.log('[telemetry] Azure Monitor OpenTelemetry enabled');
  } catch (error) {
    console.error('[telemetry] Azure Monitor OpenTelemetry initialization failed', {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
