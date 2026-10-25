export function renderLandingPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>typz · TypeScript Backend Framework</title>
  <meta name="description" content="A minimalist, lightweight, and type-safe backend framework for TypeScript, inspired by Laravel's DX and powered by Hono and Drizzle ORM.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #09090b;
      --bg-card: #121215;
      --bg-card-hover: #18181b;
      --border: #27272a;
      --border-light: #3f3f46;
      --text: #fafafa;
      --text-muted: #a1a1aa;
      --text-dim: #71717a;
      --accent: #ffffff;
      --code-bg: #030304;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      overflow-x: hidden;
      background-image: 
        radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255, 255, 255, 0.06), transparent 100%);
      background-size: 32px 32px, 100% 100%;
      background-position: 0 0, center top;
      background-repeat: repeat, no-repeat;
      min-height: 100vh;
    }

    /* Container */
    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Header */
    header {
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      background: rgba(9, 9, 11, 0.85);
      backdrop-filter: blur(16px);
      z-index: 50;
    }

    .nav {
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: #ffffff;
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
      font-weight: 700;
      font-size: 1.6rem;
      letter-spacing: -0.05em;
      line-height: 1;
      transition: opacity 0.15s ease;
    }

    .brand:hover {
      opacity: 0.85;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.15s ease;
    }

    .nav-link:hover {
      color: var(--text);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-family: 'Geist Mono', monospace;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      color: var(--text-muted);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 8px #ffffff;
    }

    /* Hero */
    .hero {
      padding: 96px 0 64px;
      text-align: center;
    }

    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: #18181b;
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 24px;
    }

    .hero-tag strong {
      color: #ffffff;
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.25rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.04em;
      margin-bottom: 24px;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
      color: #ffffff;
    }

    .hero-desc {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto 40px;
      line-height: 1.6;
      font-weight: 400;
    }

    .hero-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .btn-primary {
      background: #ffffff;
      color: #000000;
      border: 1px solid #ffffff;
    }

    .btn-primary:hover {
      background: #e4e4e7;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
    }

    .btn-secondary {
      background: #18181b;
      color: #fafafa;
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: #27272a;
      border-color: var(--border-light);
    }

    /* Terminal Quick Command */
    .terminal-box {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      background: #09090b;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 16px;
      font-family: 'Geist Mono', monospace;
      font-size: 0.85rem;
      color: var(--text-muted);
      max-width: 440px;
      margin: 0 auto;
      cursor: pointer;
      transition: border-color 0.2s ease;
    }

    .terminal-box:hover {
      border-color: var(--border-light);
    }

    .terminal-box code {
      color: #fafafa;
    }

    .copy-btn {
      background: transparent;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .copy-btn:hover {
      color: var(--text);
    }

    /* Code Window */
    .showcase {
      margin: 48px 0 80px;
    }

    .window {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }

    .window-header {
      background: #0d0d10;
      border-bottom: 1px solid var(--border);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }

    .window-dots {
      display: flex;
      gap: 6px;
    }

    .window-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #27272a;
    }

    .window-tabs {
      display: flex;
      gap: 6px;
    }

    .tab-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-family: 'Geist Mono', monospace;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .tab-btn.active {
      background: #18181b;
      border-color: var(--border);
      color: #ffffff;
      font-weight: 500;
    }

    .window-body {
      padding: 24px;
      font-family: 'Geist Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #e4e4e7;
      overflow-x: auto;
    }

    .code-content {
      display: none;
    }

    .code-content.active {
      display: block;
    }

    .code-comment { color: #71717a; }
    .code-keyword { color: #ffffff; font-weight: 600; }
    .code-string { color: #a1a1aa; }
    .code-function { color: #e4e4e7; font-weight: 500; }
    .code-type { color: #d4d4d8; }

    /* Features Grid */
    .features {
      padding: 64px 0 96px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 56px;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }

    .section-desc {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 580px;
      margin: 0 auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 32px 24px;
      transition: all 0.2s ease;
    }

    .card:hover {
      background: var(--bg-card-hover);
      border-color: var(--border-light);
      transform: translateY(-2px);
    }

    .card-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      color: #fafafa;
      transition: all 0.2s ease;
    }

    .card:hover .card-icon {
      background: #18181b;
      border-color: var(--border-light);
      color: #ffffff;
    }

    .card-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #fafafa;
      letter-spacing: -0.02em;
    }

    .card-desc {
      color: var(--text-muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }

    /* Live Endpoint Tester */
    .tester {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 96px;
    }

    .tester-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .tester-title {
      font-size: 1.25rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .tester-inputs {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .method-tag {
      padding: 10px 14px;
      background: #18181b;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-family: 'Geist Mono', monospace;
      font-weight: 600;
      font-size: 0.85rem;
      color: #ffffff;
    }

    .endpoint-input {
      flex: 1;
      min-width: 200px;
      background: #09090b;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 10px 14px;
      color: #fafafa;
      font-family: 'Geist Mono', monospace;
      font-size: 0.9rem;
    }

    .send-btn {
      background: #ffffff;
      color: #000000;
      border: none;
      border-radius: 6px;
      padding: 10px 20px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .send-btn:hover {
      background: #e4e4e7;
    }

    .response-box {
      background: #030304;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 16px;
      font-family: 'Geist Mono', monospace;
      font-size: 0.85rem;
      color: #a1a1aa;
      min-height: 80px;
      max-height: 240px;
      overflow-y: auto;
      white-space: pre-wrap;
    }

    /* Comparison Table */
    .comparison {
      margin-bottom: 96px;
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: 12px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.9rem;
    }

    th, td {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }

    th {
      background: #121215;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    tr:last-child td {
      border-bottom: none;
    }

    td {
      background: var(--bg);
      color: var(--text-muted);
    }

    td.highlight {
      color: #ffffff;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.03);
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 48px 0;
      text-align: center;
      color: var(--text-dim);
      font-size: 0.9rem;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-bottom: 16px;
    }

    .footer-link {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .footer-link:hover {
      color: #ffffff;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header>
    <div class="container nav">
      <a href="/" class="brand" id="brand-logo">typz</a>
      <div class="nav-links">
        <a href="#features" class="nav-link">Features</a>
        <a href="#code" class="nav-link">Code</a>
        <a href="#tester" class="nav-link">API Tester</a>
        <div class="status-badge">
          <div class="status-dot"></div>
          <span>v0.1.0 • Stable</span>
        </div>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span><strong>Laravel DX</strong> meets <strong>TypeScript</strong> speed</span>
      </div>
      <h1 class="hero-title">
        The minimalist backend framework<br>for TypeScript
      </h1>
      <p class="hero-desc">
        Designed for speed, clean architecture, and type safety. Fluent routing, OOP controllers, automatic 422 validation, and an Artisan-inspired CLI running on Hono and Drizzle.
      </p>

      <div class="hero-cta">
        <a href="#code" class="btn btn-primary" id="btn-explore">Explore Framework</a>
        <a href="#tester" class="btn btn-secondary" id="btn-test-api">Test Live API</a>
      </div>

      <div class="terminal-box" id="copy-box" onclick="copyInstallCommand()">
        <span>$ <code id="cmd-text">typz make:controller TaskController --resource</code></span>
        <button class="copy-btn" id="copy-btn" aria-label="Copy Command">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- Code Window Showcase -->
    <section class="showcase" id="code">
      <div class="window">
        <div class="window-header">
          <div class="window-dots">
            <div class="window-dot"></div>
            <div class="window-dot"></div>
            <div class="window-dot"></div>
          </div>
          <div class="window-tabs">
            <button class="tab-btn active" onclick="switchTab('routes')">routes/api.ts</button>
            <button class="tab-btn" onclick="switchTab('controller')">TaskController.ts</button>
            <button class="tab-btn" onclick="switchTab('request')">StoreTaskRequest.ts</button>
            <button class="tab-btn" onclick="switchTab('server')">src/server.ts</button>
          </div>
        </div>

        <div class="window-body">
          <!-- Routes Tab -->
          <pre class="code-content active" id="tab-routes"><code><span class="code-keyword">import</span> { Route, jwtAuth } <span class="code-keyword">from</span> <span class="code-string">'@typz/core'</span>;
<span class="code-keyword">import</span> { TaskController } <span class="code-keyword">from</span> <span class="code-string">'../app/Http/Controllers/TaskController.js'</span>;

<span class="code-comment">// 1. Direct fluent routes</span>
Route.<span class="code-function">get</span>(<span class="code-string">'/health'</span>, (req) =&gt; ({ status: <span class="code-string">'healthy'</span> }));

<span class="code-comment">// 2. Route Groups with prefix and middleware chaining</span>
Route.<span class="code-function">group</span>({ prefix: <span class="code-string">'/api/v1'</span>, middleware: [jwtAuth({ secret: <span class="code-string">'secret'</span> })] }, () =&gt; {
  <span class="code-comment">// Full RESTful Resource: index, store, show, update, destroy</span>
  Route.<span class="code-function">resource</span>(<span class="code-string">'/tasks'</span>, TaskController);
});</code></pre>

          <!-- Controller Tab -->
          <pre class="code-content" id="tab-controller"><code><span class="code-keyword">import</span> { Controller, TypzRequest, NotFoundException } <span class="code-keyword">from</span> <span class="code-string">'@typz/core'</span>;
<span class="code-keyword">import</span> { StoreTaskRequest } <span class="code-keyword">from</span> <span class="code-string">'../Requests/StoreTaskRequest.js'</span>;
<span class="code-keyword">import</span> { db } <span class="code-keyword">from</span> <span class="code-string">'../../../database/db.js'</span>;
<span class="code-keyword">import</span> { tasks } <span class="code-keyword">from</span> <span class="code-string">'../../../database/schema.js'</span>;

<span class="code-keyword">export class</span> <span class="code-type">TaskController</span> <span class="code-keyword">extends</span> <span class="code-type">Controller</span> {
  <span class="code-keyword">async</span> <span class="code-function">index</span>(req: TypzRequest) {
    <span class="code-keyword">const</span> list = <span class="code-keyword">await</span> db.<span class="code-function">select</span>().<span class="code-function">from</span>(tasks);
    <span class="code-keyword">return this</span>.<span class="code-function">success</span>(list, <span class="code-string">'Tasks fetched'</span>);
  }

  <span class="code-keyword">async</span> <span class="code-function">store</span>(req: TypzRequest) {
    <span class="code-comment">// FormRequest validation runs automatically (throws 422 on error)</span>
    <span class="code-keyword">const</span> form = <span class="code-keyword">await this</span>.<span class="code-function">formRequest</span>(req, StoreTaskRequest);
    <span class="code-keyword">const</span> [task] = <span class="code-keyword">await</span> db.<span class="code-function">insert</span>(tasks).<span class="code-function">values</span>(form.<span class="code-function">validated</span>()).<span class="code-function">returning</span>();
    <span class="code-keyword">return this</span>.<span class="code-function">created</span>(task);
  }
}</code></pre>

          <!-- FormRequest Tab -->
          <pre class="code-content" id="tab-request"><code><span class="code-keyword">import</span> { FormRequest, z } <span class="code-keyword">from</span> <span class="code-string">'@typz/core'</span>;

<span class="code-keyword">export class</span> <span class="code-type">StoreTaskRequest</span> <span class="code-keyword">extends</span> <span class="code-type">FormRequest</span>&lt;{ title: string }&gt; {
  <span class="code-comment">// Authorization gate hook</span>
  <span class="code-function">authorize</span>(): boolean {
    <span class="code-keyword">return this</span>.<span class="code-function">user</span>() !== <span class="code-keyword">null</span>;
  }

  <span class="code-comment">// Zod schema validation rules (auto-formatted as 422 JSON errors)</span>
  <span class="code-function">rules</span>(): z.ZodTypeAny {
    <span class="code-keyword">return</span> z.<span class="code-function">object</span>({
      title: z.<span class="code-function">string</span>().<span class="code-function">min</span>(1, <span class="code-string">'Title is required'</span>).<span class="code-function">max</span>(200),
    });
  }
}</code></pre>

          <!-- Server Tab -->
          <pre class="code-content" id="tab-server"><code><span class="code-keyword">import</span> { TypzApp, cors, logger } <span class="code-keyword">from</span> <span class="code-string">'@typz/core'</span>;
<span class="code-keyword">import</span> <span class="code-string">'../routes/api.js'</span>;

<span class="code-keyword">export const</span> app = <span class="code-keyword">new</span> <span class="code-type">TypzApp</span>({ port: 3000, debug: true });

app.<span class="code-function">use</span>(cors());
app.<span class="code-function">use</span>(logger());

app.<span class="code-function">listen</span>(3000, ({ port, host }) =&gt; {
  console.log(<span class="code-string">\`🚀 Server running at http://\${host}:\${port}\`</span>);
});</code></pre>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features" id="features">
      <div class="section-header">
        <h2 class="section-title">Built for Speed and Simplicity</h2>
        <p class="section-desc">Everything you need for backend microservices and APIs without enterprise bloat or configuration fatigue.</p>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <h3 class="card-title">Hono Engine</h3>
          <p class="card-desc">Powered by Hono under the hood. Standard Web Request/Response APIs with microsecond latency on Bun, Node.js, and Edge runtimes.</p>
        </div>

        <div class="card">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="19" r="3"></circle>
              <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
              <circle cx="18" cy="5" r="3"></circle>
            </svg>
          </div>
          <h3 class="card-title">Laravel Route DX</h3>
          <p class="card-desc">Fluent explicit routing with route groups, URL prefixes, middleware chaining, and automated RESTful resource controllers.</p>
        </div>

        <div class="card">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h3 class="card-title">422 Form Requests</h3>
          <p class="card-desc">Dedicated validation classes backed by Zod. When invalid, automatically formats 422 Unprocessable Entity error payloads.</p>
        </div>

        <div class="card">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </div>
          <h3 class="card-title">Artisan-Style CLI</h3>
          <p class="card-desc">Scaffold controllers, requests, models, and inspect registered routes with <code>typz make:*</code> and <code>typz routes:list</code>.</p>
        </div>

        <div class="card">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <h3 class="card-title">Drizzle ORM</h3>
          <p class="card-desc">Zero C++ compilation hassle. Native LibSQL / SQLite client running locally or globally distributed with Turso.</p>
        </div>

        <div class="card">
          <div class="card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 class="card-title">Native Middleware</h3>
          <p class="card-desc">WebCrypto HMAC-SHA256 JWT auth, API key guards, CORS headers, and in-memory sliding-window rate limiters out of the box.</p>
        </div>
      </div>
    </section>

    <!-- Live API Tester -->
    <section class="tester" id="tester">
      <div class="tester-header">
        <div class="tester-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted)">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>Live Endpoint Tester</span>
        </div>
        <span style="font-size: 0.85rem; color: var(--text-dim); font-family: 'Geist Mono', monospace;">Connected to http://localhost:3000</span>
      </div>

      <div class="tester-inputs">
        <div class="method-tag" id="tester-method">GET</div>
        <input type="text" class="endpoint-input" id="tester-path" value="/health" placeholder="/health or /echo">
        <button class="send-btn" id="tester-btn" onclick="sendTestRequest()">Send Request</button>
      </div>

      <div class="response-box" id="tester-output">// Response will display here...</div>
    </section>

    <!-- Architectural Comparison -->
    <section class="comparison">
      <div class="section-header">
        <h2 class="section-title">How typz Compares</h2>
        <p class="section-desc">The best ergonomics of Laravel without the bloat of NestJS or the total lack of structure in raw micro-frameworks.</p>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel (PHP)</th>
              <th>NestJS (TS)</th>
              <th>Express / Raw Hono</th>
              <th>typz (TS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Routing</td>
              <td>Fluent (Route::get)</td>
              <td>@Get() Decorators</td>
              <td>Handler chains</td>
              <td class="highlight">Fluent (Route.get)</td>
            </tr>
            <tr>
              <td>Controllers</td>
              <td>Class-based</td>
              <td>Heavy DI Decorators</td>
              <td>Manual functions</td>
              <td class="highlight">extends Controller</td>
            </tr>
            <tr>
              <td>Validation</td>
              <td>FormRequest (422)</td>
              <td>class-validator</td>
              <td>Manual schema parse</td>
              <td class="highlight">FormRequest + Zod (422)</td>
            </tr>
            <tr>
              <td>Latency</td>
              <td>Moderate (PHP FPM)</td>
              <td>Moderate</td>
              <td>Ultra-fast</td>
              <td class="highlight">Ultra-fast (Hono)</td>
            </tr>
            <tr>
              <td>CLI Tooling</td>
              <td>php artisan</td>
              <td>nest generate</td>
              <td>None</td>
              <td class="highlight">typz make:*</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="#code" class="footer-link">Documentation</a>
        <a href="#features" class="footer-link">Features</a>
        <a href="https://github.com" class="footer-link" target="_blank">GitHub</a>
      </div>
      <p>typz framework • Minimalist, type-safe backend framework inspired by Laravel.</p>
    </div>
  </footer>

  <script>
    function switchTab(tabName) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));

      event.target.classList.add('active');
      const target = document.getElementById('tab-' + tabName);
      if (target) target.classList.add('active');
    }

    function copyInstallCommand() {
      const text = document.getElementById('cmd-text').innerText;
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copy-btn');
        btn.innerHTML = '<span style="color:#ffffff;font-size:0.75rem;font-weight:600;">COPIED!</span>';
        setTimeout(() => {
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 1500);
      });
    }

    async function sendTestRequest() {
      const path = document.getElementById('tester-path').value.trim();
      const output = document.getElementById('tester-output');
      const btn = document.getElementById('tester-btn');

      btn.innerText = 'Sending...';
      output.innerText = 'Requesting ' + path + '...';

      try {
        const res = await fetch(path, {
          headers: { 'Accept': 'application/json' }
        });
        const status = res.status;
        const data = await res.json();
        output.innerText = '// HTTP ' + status + '\\n' + JSON.stringify(data, null, 2);
      } catch (err) {
        output.innerText = '// Error: ' + err.message;
      } finally {
        btn.innerText = 'Send Request';
      }
    }
  </script>
</body>
</html>`;
}
