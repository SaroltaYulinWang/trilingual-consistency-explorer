import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const args = process.argv.slice(2);
const value = (name, fallback) => args.includes(name) ? args[args.indexOf(name)+1] : fallback;
const root = path.resolve(value('--dir', 'dist'));
const port = Number(value('--port', '4173'));
const base = value('--base', '/').replace(/\/?$/, '/');
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.csv':'text/csv; charset=utf-8', '.svg':'image/svg+xml', '.md':'text/plain; charset=utf-8' };
const server = http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith(base)) { res.writeHead(302,{Location:base});res.end();return; }
    const relative = decodeURIComponent(url.pathname.slice(base.length)) || 'index.html';
    const filename = path.resolve(root, relative);
    if (!filename.startsWith(root + path.sep)) { res.writeHead(403);res.end('Forbidden');return; }
    const bytes = await fs.readFile(filename);
    res.writeHead(200, {'Content-Type':mime[path.extname(filename)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(bytes);
  } catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});res.end('File not found. Build the site first or run the dev server.'); }
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}${base}`));
