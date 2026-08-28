import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const appUrl = process.env.PSITS_TEST_URL ?? 'http://127.0.0.1:5173/';
const chromePath = process.env.CHROME_PATH
  ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const debuggingPort = 9227;
const profileDirectory = await mkdtemp(join(tmpdir(), 'psits-scroll-check-'));
const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${debuggingPort}`,
  `--user-data-dir=${profileDirectory}`,
  '--disable-gpu',
  '--disable-crash-reporter',
  '--no-first-run',
  '--no-default-browser-check',
  appUrl,
], { stdio: 'ignore' });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function waitFor(getValue, timeout = 8000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeout) {
    const value = await getValue();
    if (value) return value;
    await delay(50);
  }
  throw new Error('Timed out waiting for the browser');
}

class CdpClient {
  constructor(webSocket) {
    this.webSocket = webSocket;
    this.nextId = 1;
    this.pending = new Map();
    webSocket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (!message.id || !this.pending.has(message.id)) return;
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    });
  }

  call(method, params = {}) {
    const id = this.nextId;
    this.nextId += 1;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.webSocket.send(JSON.stringify({ id, method, params }));
    });
  }
}

let socket;

try {
  const page = await waitFor(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:${debuggingPort}/json/list`);
      const pages = await response.json();
      return pages.find((candidate) => candidate.type === 'page');
    } catch {
      return null;
    }
  });

  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  const cdp = new CdpClient(socket);
  await cdp.call('Runtime.enable');
  await cdp.call('Page.enable');

  const evaluate = async (expression) => {
    const result = await cdp.call('Runtime.evaluate', { expression, returnByValue: true });
    return result.result.value;
  };

  const waitForPath = (path) => waitFor(async () => (
    await evaluate(`window.location.pathname === ${JSON.stringify(path)}`)
  ));

  const navigate = async (path) => {
    await cdp.call('Page.navigate', { url: new URL(path, appUrl).href });
    await waitForPath(path);
    await waitFor(async () => evaluate('document.readyState === "complete"'));
    await delay(250);
  };

  const routes = ['/about', '/events', '/announcements', '/resources', '/contact'];
  const failures = [];

  for (const route of routes) {
    await navigate('/');
    await evaluate('window.scrollTo({ top: Math.min(1800, document.documentElement.scrollHeight - innerHeight), behavior: "instant" })');
    const before = await evaluate('window.scrollY');
    await evaluate(`document.querySelector('a[href="${route}"]').click()`);
    await waitForPath(route);
    await delay(120);
    const after = await evaluate('window.scrollY');
    if (before < 100 || after > 1) failures.push({ scenario: `navigate to ${route}`, before, after });
  }

  await navigate('/events');
  await evaluate('window.scrollTo({ top: Math.min(600, document.documentElement.scrollHeight - innerHeight), behavior: "instant" })');
  const beforeRefresh = await evaluate('window.scrollY');
  await cdp.call('Page.reload', { ignoreCache: true });
  await waitForPath('/events');
  await delay(500);
  const afterRefresh = await evaluate('window.scrollY');
  if (beforeRefresh < 100 || afterRefresh > 1) {
    failures.push({ scenario: 'refresh /events', before: beforeRefresh, after: afterRefresh });
  }

  console.table(failures.length ? failures : [{ scenario: 'all route and refresh checks', before: 'scrolled', after: 0 }]);
  if (failures.length) process.exitCode = 1;
} finally {
  socket?.close();
  chrome.kill();
  await Promise.race([once(chrome, 'exit'), delay(1500)]);
  if (profileDirectory.startsWith(tmpdir())) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        await rm(profileDirectory, { recursive: true, force: true });
        break;
      } catch (error) {
        if (attempt === 2) throw error;
        await delay(250);
      }
    }
  }
}
