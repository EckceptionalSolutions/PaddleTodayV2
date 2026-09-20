import http from 'node:http';
import https from 'node:https';

// Node's fetch transport closes connections after HEAD requests. Thousands of
// asset probes can exhaust runner/NAT connection capacity even at low concurrency.
export function createAssetHttpClient(connections = 12) {
  const options = { keepAlive: true, maxSockets: connections, maxFreeSockets: connections };
  const agents = { 'http:': new http.Agent(options), 'https:': new https.Agent(options) };
  return {
    async fetch(url, { method = 'GET', headers, signal } = {}) {
      const target = new URL(url);
      const transport = target.protocol === 'https:' ? https : http;
      if (!agents[target.protocol]) throw new Error(`Unsupported asset protocol: ${target.protocol}`);
      return new Promise((resolve, reject) => {
        const request = transport.request(target, { method, headers, signal, agent: agents[target.protocol] }, async (response) => {
          try {
            const chunks = [];
            for await (const chunk of response) chunks.push(chunk);
            const responseHeaders = new Headers();
            for (let index = 0; index < response.rawHeaders.length; index += 2) {
              responseHeaders.append(response.rawHeaders[index], response.rawHeaders[index + 1]);
            }
            const empty = method === 'HEAD' || [204, 205, 304].includes(response.statusCode);
            resolve(new Response(empty ? null : Buffer.concat(chunks), {
              status: response.statusCode, headers: responseHeaders,
            }));
          } catch (error) { reject(error); }
        });
        request.on('error', reject);
        request.end();
      });
    },
    close() { for (const agent of Object.values(agents)) agent.destroy(); },
  };
}
