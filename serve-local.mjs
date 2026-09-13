import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.pdf': 'application/pdf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));

createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const redirect = config.redirects.find(rule => rule.source === pathname);
    if (redirect) {
      res.writeHead(redirect.permanent ? 308 : 307, { Location: redirect.destination + url.search }).end();
      return;
    }
    let file = resolve(root, '.' + pathname);
    const rel = relative(root, file);
    if (rel.startsWith('..') || isAbsolute(rel) || rel.split(/[\\/]/).some(part => part.startsWith('.'))) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) {
      if (!pathname.endsWith('/')) {
        res.writeHead(308, { Location: pathname + '/' + url.search }).end();
        return;
      }
      file = resolve(file, 'index.html');
    } else if (!info && config.cleanUrls && !extname(file)) {
      file += '.html';
    }
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': body.length });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch (error) {
    res.writeHead(error instanceof URIError ? 400 : 404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Portfolio : http://127.0.0.1:${port} — dossier ${root}`);
}).on('error', error => { console.error(error.message); process.exitCode = 1; });
