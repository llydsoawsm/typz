// Auto-generated starter templates for Typz project generator

export const landingTemplate = "export function renderLandingPage(): string {\n  return `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>typz · TypeScript Backend Framework</title>\n  <meta name=\"description\" content=\"A minimalist, lightweight, and type-safe backend framework for TypeScript, inspired by Laravel's DX and powered by Hono and Drizzle ORM.\">\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap\" rel=\"stylesheet\">\n  <style>\n    :root {\n      --bg: #09090b;\n      --bg-card: #121215;\n      --bg-card-hover: #18181b;\n      --border: #27272a;\n      --border-light: #3f3f46;\n      --text: #fafafa;\n      --text-muted: #a1a1aa;\n      --text-dim: #71717a;\n      --accent: #ffffff;\n      --code-bg: #030304;\n    }\n\n    html {\n      scroll-behavior: smooth;\n      scroll-padding-top: 88px;\n    }\n\n    * {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n\n    body {\n      background-color: var(--bg);\n      color: var(--text);\n      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;\n      line-height: 1.6;\n      overflow-x: hidden;\n      background-image: \n        radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),\n        radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255, 255, 255, 0.06), transparent 100%);\n      background-size: 32px 32px, 100% 100%;\n      background-position: 0 0, center top;\n      background-repeat: repeat, no-repeat;\n      min-height: 100vh;\n    }\n\n    /* Container */\n    .container {\n      max-width: 1140px;\n      margin: 0 auto;\n      padding: 0 24px;\n    }\n\n    /* Header */\n    header {\n      border-bottom: 1px solid var(--border);\n      position: sticky;\n      top: 0;\n      background: rgba(9, 9, 11, 0.85);\n      backdrop-filter: blur(16px);\n      z-index: 50;\n    }\n\n    .nav {\n      height: 72px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n    }\n\n    .brand {\n      display: inline-flex;\n      align-items: center;\n      text-decoration: none;\n      color: #ffffff;\n      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;\n      font-weight: 700;\n      font-size: 1.6rem;\n      letter-spacing: -0.05em;\n      line-height: 1;\n      transition: opacity 0.15s ease;\n    }\n\n    .brand:hover {\n      opacity: 0.85;\n    }\n\n    .nav-links {\n      display: flex;\n      align-items: center;\n      gap: 28px;\n    }\n\n    .nav-link {\n      color: var(--text-muted);\n      text-decoration: none;\n      font-size: 0.9rem;\n      font-weight: 500;\n      position: relative;\n      padding: 4px 0;\n      transition: color 0.2s ease;\n    }\n\n    .nav-link::after {\n      content: '';\n      position: absolute;\n      bottom: -2px;\n      left: 0;\n      width: 0;\n      height: 2px;\n      background: #ffffff;\n      border-radius: 2px;\n      transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .nav-link:hover {\n      color: var(--text);\n    }\n\n    .nav-link:hover::after,\n    .nav-link.active::after {\n      width: 100%;\n    }\n\n    /* Hero */\n    .hero {\n      padding: 96px 0 64px;\n      text-align: center;\n    }\n\n    .hero-tag {\n      display: inline-flex;\n      align-items: center;\n      gap: 10px;\n      padding: 6px 18px;\n      border-radius: 9999px;\n      background: rgba(255, 255, 255, 0.035);\n      backdrop-filter: blur(16px);\n      -webkit-backdrop-filter: blur(16px);\n      border: 1px solid rgba(255, 255, 255, 0.12);\n      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);\n      color: var(--text-muted);\n      font-family: 'Geist Mono', monospace;\n      font-size: 0.82rem;\n      letter-spacing: -0.01em;\n      margin-bottom: 24px;\n      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n      cursor: default;\n    }\n\n    .hero-tag:hover {\n      background: rgba(255, 255, 255, 0.06);\n      border-color: rgba(255, 255, 255, 0.22);\n      box-shadow: 0 6px 28px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15);\n      transform: translateY(-1px);\n    }\n\n    .hero-tag-icon {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      color: #fafafa;\n    }\n\n    .hero-tag strong {\n      color: #ffffff;\n      font-weight: 600;\n    }\n\n    .hero-title {\n      font-size: clamp(2.5rem, 6vw, 4.25rem);\n      font-weight: 800;\n      line-height: 1.1;\n      letter-spacing: -0.04em;\n      margin-bottom: 24px;\n      max-width: 900px;\n      margin-left: auto;\n      margin-right: auto;\n      color: #ffffff;\n    }\n\n    .hero-desc {\n      font-size: clamp(1.05rem, 2vw, 1.25rem);\n      color: var(--text-muted);\n      max-width: 680px;\n      margin: 0 auto 40px;\n      line-height: 1.6;\n      font-weight: 400;\n    }\n\n    .hero-cta {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 16px;\n      flex-wrap: wrap;\n      margin-bottom: 32px;\n    }\n\n    .btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 8px;\n      padding: 12px 24px;\n      border-radius: 8px;\n      font-size: 0.95rem;\n      font-weight: 600;\n      text-decoration: none;\n      transition: all 0.2s ease;\n      cursor: pointer;\n    }\n\n    .btn-primary {\n      background: #ffffff;\n      color: #000000;\n      border: 1px solid #ffffff;\n    }\n\n    .btn-primary:hover {\n      background: #e4e4e7;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);\n    }\n\n    .btn-secondary {\n      background: #18181b;\n      color: #fafafa;\n      border: 1px solid var(--border);\n    }\n\n    .btn-secondary:hover {\n      background: #27272a;\n      border-color: var(--border-light);\n    }\n\n    /* Terminal Quick Command */\n    .terminal-box {\n      display: inline-flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 16px;\n      background: #09090b;\n      border: 1px solid var(--border);\n      border-radius: 8px;\n      padding: 8px 16px;\n      font-family: 'Geist Mono', monospace;\n      font-size: 0.85rem;\n      color: var(--text-muted);\n      max-width: 440px;\n      margin: 0 auto;\n      cursor: pointer;\n      transition: border-color 0.2s ease;\n    }\n\n    .terminal-box:hover {\n      border-color: var(--border-light);\n    }\n\n    .terminal-box code {\n      color: #fafafa;\n    }\n\n    .copy-btn {\n      background: transparent;\n      border: none;\n      color: var(--text-dim);\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n    }\n\n    .copy-btn:hover {\n      color: var(--text);\n    }\n\n    /* Code Window */\n    .showcase {\n      margin: 48px 0 80px;\n    }\n\n    .window {\n      background: var(--code-bg);\n      border: 1px solid var(--border);\n      border-radius: 12px;\n      overflow: hidden;\n      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);\n    }\n\n    .window-header {\n      background: #0d0d10;\n      border-bottom: 1px solid var(--border);\n      padding: 12px 16px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      flex-wrap: wrap;\n      gap: 12px;\n    }\n\n    .window-dots {\n      display: flex;\n      gap: 6px;\n    }\n\n    .window-dot {\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: #27272a;\n    }\n\n    .window-tabs {\n      display: flex;\n      gap: 6px;\n    }\n\n    .tab-btn {\n      background: transparent;\n      border: 1px solid transparent;\n      color: var(--text-muted);\n      padding: 6px 14px;\n      border-radius: 6px;\n      font-size: 0.85rem;\n      font-family: 'Geist Mono', monospace;\n      cursor: pointer;\n      transition: all 0.15s ease;\n    }\n\n    .tab-btn.active {\n      background: #18181b;\n      border-color: var(--border);\n      color: #ffffff;\n      font-weight: 500;\n    }\n\n    .window-body {\n      padding: 24px;\n      font-family: 'Geist Mono', monospace;\n      font-size: 0.9rem;\n      line-height: 1.6;\n      color: #e4e4e7;\n      overflow-x: auto;\n    }\n\n    .code-content {\n      display: none;\n    }\n\n    .code-content.active {\n      display: block;\n    }\n\n    .code-comment { color: #71717a; }\n    .code-keyword { color: #ffffff; font-weight: 600; }\n    .code-string { color: #a1a1aa; }\n    .code-function { color: #e4e4e7; font-weight: 500; }\n    .code-type { color: #d4d4d8; }\n\n    /* Features Grid */\n    .features {\n      padding: 64px 0 96px;\n    }\n\n    .section-header {\n      text-align: center;\n      margin-bottom: 56px;\n    }\n\n    .section-title {\n      font-size: 2rem;\n      font-weight: 700;\n      letter-spacing: -0.03em;\n      margin-bottom: 12px;\n    }\n\n    .section-desc {\n      color: var(--text-muted);\n      font-size: 1.05rem;\n      max-width: 580px;\n      margin: 0 auto;\n    }\n\n    .grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n      gap: 24px;\n    }\n\n    .card {\n      background: var(--bg-card);\n      border: 1px solid var(--border);\n      border-radius: 12px;\n      padding: 32px 24px;\n      transition: all 0.2s ease;\n    }\n\n    .card:hover {\n      background: var(--bg-card-hover);\n      border-color: var(--border-light);\n      transform: translateY(-2px);\n    }\n\n    .card-icon {\n      width: 40px;\n      height: 40px;\n      border-radius: 8px;\n      background: rgba(255, 255, 255, 0.03);\n      border: 1px solid var(--border);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 20px;\n      color: #fafafa;\n      transition: all 0.2s ease;\n    }\n\n    .card:hover .card-icon {\n      background: #18181b;\n      border-color: var(--border-light);\n      color: #ffffff;\n    }\n\n    .card-title {\n      font-size: 1.15rem;\n      font-weight: 600;\n      margin-bottom: 8px;\n      color: #fafafa;\n      letter-spacing: -0.02em;\n    }\n\n    .card-desc {\n      color: var(--text-muted);\n      font-size: 0.92rem;\n      line-height: 1.6;\n    }\n\n    /* Live Endpoint Tester */\n    .tester {\n      background: var(--bg-card);\n      border: 1px solid var(--border);\n      border-radius: 12px;\n      padding: 32px;\n      margin-bottom: 96px;\n    }\n\n    .tester-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      margin-bottom: 24px;\n      flex-wrap: wrap;\n      gap: 16px;\n    }\n\n    .tester-title {\n      font-size: 1.25rem;\n      font-weight: 700;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n    }\n\n    .tester-inputs {\n      display: flex;\n      gap: 12px;\n      margin-bottom: 20px;\n      flex-wrap: wrap;\n    }\n\n    .method-tag {\n      padding: 10px 14px;\n      background: #18181b;\n      border: 1px solid var(--border);\n      border-radius: 6px;\n      font-family: 'Geist Mono', monospace;\n      font-weight: 600;\n      font-size: 0.85rem;\n      color: #ffffff;\n    }\n\n    .endpoint-input {\n      flex: 1;\n      min-width: 200px;\n      background: #09090b;\n      border: 1px solid var(--border);\n      border-radius: 6px;\n      padding: 10px 14px;\n      color: #fafafa;\n      font-family: 'Geist Mono', monospace;\n      font-size: 0.9rem;\n    }\n\n    .send-btn {\n      background: #ffffff;\n      color: #000000;\n      border: none;\n      border-radius: 6px;\n      padding: 10px 20px;\n      font-weight: 600;\n      cursor: pointer;\n      transition: background 0.15s ease;\n    }\n\n    .send-btn:hover {\n      background: #e4e4e7;\n    }\n\n    .response-box {\n      background: #030304;\n      border: 1px solid var(--border);\n      border-radius: 6px;\n      padding: 16px;\n      font-family: 'Geist Mono', monospace;\n      font-size: 0.85rem;\n      color: #a1a1aa;\n      min-height: 80px;\n      max-height: 240px;\n      overflow-y: auto;\n      white-space: pre-wrap;\n    }\n\n    /* Comparison Table */\n    .comparison {\n      margin-bottom: 96px;\n    }\n\n    .table-wrap {\n      overflow-x: auto;\n      border: 1px solid var(--border);\n      border-radius: 12px;\n    }\n\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      text-align: left;\n      font-size: 0.9rem;\n    }\n\n    th, td {\n      padding: 16px 20px;\n      border-bottom: 1px solid var(--border);\n    }\n\n    th {\n      background: #121215;\n      color: var(--text-muted);\n      font-weight: 600;\n      font-size: 0.85rem;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    tr:last-child td {\n      border-bottom: none;\n    }\n\n    td {\n      background: var(--bg);\n      color: var(--text-muted);\n    }\n\n    td.highlight {\n      color: #ffffff;\n      font-weight: 600;\n      background: rgba(255, 255, 255, 0.03);\n    }\n\n    /* Footer */\n    footer {\n      border-top: 1px solid var(--border);\n      padding: 48px 0;\n      text-align: center;\n      color: var(--text-dim);\n      font-size: 0.9rem;\n    }\n\n    .footer-links {\n      display: flex;\n      justify-content: center;\n      gap: 24px;\n      margin-bottom: 16px;\n    }\n\n    .footer-link {\n      color: var(--text-muted);\n      text-decoration: none;\n      transition: color 0.15s ease;\n    }\n\n    .footer-link:hover {\n      color: #ffffff;\n    }\n  </style>\n</head>\n<body>\n\n  <!-- Header -->\n  <header>\n    <div class=\"container nav\">\n      <a href=\"/\" class=\"brand\" id=\"brand-logo\">typz</a>\n      <div class=\"nav-links\">\n        <a href=\"#features\" class=\"nav-link\">Features</a>\n        <a href=\"#code\" class=\"nav-link\">Code</a>\n        <a href=\"#tester\" class=\"nav-link\">API Tester</a>\n      </div>\n    </div>\n  </header>\n\n  <main class=\"container\">\n    <!-- Hero -->\n    <section class=\"hero\">\n      <div class=\"hero-tag\">\n        <span class=\"hero-tag-icon\">\n          <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon>\n          </svg>\n        </span>\n        <span><strong>Laravel DX</strong> meets <strong>TypeScript</strong> speed</span>\n      </div>\n      <h1 class=\"hero-title\">\n        The minimalist backend framework<br>for TypeScript\n      </h1>\n      <p class=\"hero-desc\">\n        Designed for speed, clean architecture, and type safety. Fluent routing, OOP controllers, automatic 422 validation, and an Artisan-inspired CLI running on Hono and Drizzle.\n      </p>\n\n      <div class=\"hero-cta\">\n        <a href=\"#code\" class=\"btn btn-primary\" id=\"btn-explore\">Explore Framework</a>\n        <a href=\"#tester\" class=\"btn btn-secondary\" id=\"btn-test-api\">Test Live API</a>\n      </div>\n\n      <div class=\"terminal-box\" id=\"copy-box\" onclick=\"copyInstallCommand()\">\n        <span>$ <code id=\"cmd-text\">typz make:controller TaskController --resource</code></span>\n        <button class=\"copy-btn\" id=\"copy-btn\" aria-label=\"Copy Command\">\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n        </button>\n      </div>\n    </section>\n\n    <!-- Code Window Showcase -->\n    <section class=\"showcase\" id=\"code\">\n      <div class=\"window\">\n        <div class=\"window-header\">\n          <div class=\"window-dots\">\n            <div class=\"window-dot\"></div>\n            <div class=\"window-dot\"></div>\n            <div class=\"window-dot\"></div>\n          </div>\n          <div class=\"window-tabs\">\n            <button class=\"tab-btn active\" onclick=\"switchTab('routes')\">routes/api.ts</button>\n            <button class=\"tab-btn\" onclick=\"switchTab('controller')\">TaskController.ts</button>\n            <button class=\"tab-btn\" onclick=\"switchTab('request')\">StoreTaskRequest.ts</button>\n            <button class=\"tab-btn\" onclick=\"switchTab('server')\">src/server.ts</button>\n          </div>\n        </div>\n\n        <div class=\"window-body\">\n          <!-- Routes Tab -->\n          <pre class=\"code-content active\" id=\"tab-routes\"><code><span class=\"code-keyword\">import</span> { Route, jwtAuth } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'@typz/core'</span>;\n<span class=\"code-keyword\">import</span> { TaskController } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'../app/Http/Controllers/TaskController.js'</span>;\n\n<span class=\"code-comment\">// 1. Direct fluent routes</span>\nRoute.<span class=\"code-function\">get</span>(<span class=\"code-string\">'/health'</span>, (req) =&gt; ({ status: <span class=\"code-string\">'healthy'</span> }));\n\n<span class=\"code-comment\">// 2. Route Groups with prefix and middleware chaining</span>\nRoute.<span class=\"code-function\">group</span>({ prefix: <span class=\"code-string\">'/api/v1'</span>, middleware: [jwtAuth({ secret: <span class=\"code-string\">'secret'</span> })] }, () =&gt; {\n  <span class=\"code-comment\">// Full RESTful Resource: index, store, show, update, destroy</span>\n  Route.<span class=\"code-function\">resource</span>(<span class=\"code-string\">'/tasks'</span>, TaskController);\n});</code></pre>\n\n          <!-- Controller Tab -->\n          <pre class=\"code-content\" id=\"tab-controller\"><code><span class=\"code-keyword\">import</span> { Controller, TypzRequest, NotFoundException } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'@typz/core'</span>;\n<span class=\"code-keyword\">import</span> { StoreTaskRequest } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'../Requests/StoreTaskRequest.js'</span>;\n<span class=\"code-keyword\">import</span> { db } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'../../../database/db.js'</span>;\n<span class=\"code-keyword\">import</span> { tasks } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'../../../database/schema.js'</span>;\n\n<span class=\"code-keyword\">export class</span> <span class=\"code-type\">TaskController</span> <span class=\"code-keyword\">extends</span> <span class=\"code-type\">Controller</span> {\n  <span class=\"code-keyword\">async</span> <span class=\"code-function\">index</span>(req: TypzRequest) {\n    <span class=\"code-keyword\">const</span> list = <span class=\"code-keyword\">await</span> db.<span class=\"code-function\">select</span>().<span class=\"code-function\">from</span>(tasks);\n    <span class=\"code-keyword\">return this</span>.<span class=\"code-function\">success</span>(list, <span class=\"code-string\">'Tasks fetched'</span>);\n  }\n\n  <span class=\"code-keyword\">async</span> <span class=\"code-function\">store</span>(req: TypzRequest) {\n    <span class=\"code-comment\">// FormRequest validation runs automatically (throws 422 on error)</span>\n    <span class=\"code-keyword\">const</span> form = <span class=\"code-keyword\">await this</span>.<span class=\"code-function\">formRequest</span>(req, StoreTaskRequest);\n    <span class=\"code-keyword\">const</span> [task] = <span class=\"code-keyword\">await</span> db.<span class=\"code-function\">insert</span>(tasks).<span class=\"code-function\">values</span>(form.<span class=\"code-function\">validated</span>()).<span class=\"code-function\">returning</span>();\n    <span class=\"code-keyword\">return this</span>.<span class=\"code-function\">created</span>(task);\n  }\n}</code></pre>\n\n          <!-- FormRequest Tab -->\n          <pre class=\"code-content\" id=\"tab-request\"><code><span class=\"code-keyword\">import</span> { FormRequest, z } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'@typz/core'</span>;\n\n<span class=\"code-keyword\">export class</span> <span class=\"code-type\">StoreTaskRequest</span> <span class=\"code-keyword\">extends</span> <span class=\"code-type\">FormRequest</span>&lt;{ title: string }&gt; {\n  <span class=\"code-comment\">// Authorization gate hook</span>\n  <span class=\"code-function\">authorize</span>(): boolean {\n    <span class=\"code-keyword\">return this</span>.<span class=\"code-function\">user</span>() !== <span class=\"code-keyword\">null</span>;\n  }\n\n  <span class=\"code-comment\">// Zod schema validation rules (auto-formatted as 422 JSON errors)</span>\n  <span class=\"code-function\">rules</span>(): z.ZodTypeAny {\n    <span class=\"code-keyword\">return</span> z.<span class=\"code-function\">object</span>({\n      title: z.<span class=\"code-function\">string</span>().<span class=\"code-function\">min</span>(1, <span class=\"code-string\">'Title is required'</span>).<span class=\"code-function\">max</span>(200),\n    });\n  }\n}</code></pre>\n\n          <!-- Server Tab -->\n          <pre class=\"code-content\" id=\"tab-server\"><code><span class=\"code-keyword\">import</span> { TypzApp, cors, logger } <span class=\"code-keyword\">from</span> <span class=\"code-string\">'@typz/core'</span>;\n<span class=\"code-keyword\">import</span> <span class=\"code-string\">'../routes/api.js'</span>;\n\n<span class=\"code-keyword\">export const</span> app = <span class=\"code-keyword\">new</span> <span class=\"code-type\">TypzApp</span>({ port: 3000, debug: true });\n\napp.<span class=\"code-function\">use</span>(cors());\napp.<span class=\"code-function\">use</span>(logger());\n\napp.<span class=\"code-function\">listen</span>(3000, ({ port, host }) =&gt; {\n  console.log(<span class=\"code-string\">\\`🚀 Server running at http://\\${host}:\\${port}\\`</span>);\n});</code></pre>\n        </div>\n      </div>\n    </section>\n\n    <!-- Features Grid -->\n    <section class=\"features\" id=\"features\">\n      <div class=\"section-header\">\n        <h2 class=\"section-title\">Built for Speed and Simplicity</h2>\n        <p class=\"section-desc\">Everything you need for backend microservices and APIs without enterprise bloat or configuration fatigue.</p>\n      </div>\n\n      <div class=\"grid\">\n        <div class=\"card\">\n          <div class=\"card-icon\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon>\n            </svg>\n          </div>\n          <h3 class=\"card-title\">Hono Engine</h3>\n          <p class=\"card-desc\">Powered by Hono under the hood. Standard Web Request/Response APIs with microsecond latency on Bun, Node.js, and Edge runtimes.</p>\n        </div>\n\n        <div class=\"card\">\n          <div class=\"card-icon\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <circle cx=\"6\" cy=\"19\" r=\"3\"></circle>\n              <path d=\"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15\"></path>\n              <circle cx=\"18\" cy=\"5\" r=\"3\"></circle>\n            </svg>\n          </div>\n          <h3 class=\"card-title\">Laravel Route DX</h3>\n          <p class=\"card-desc\">Fluent explicit routing with route groups, URL prefixes, middleware chaining, and automated RESTful resource controllers.</p>\n        </div>\n\n        <div class=\"card\">\n          <div class=\"card-icon\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path>\n              <path d=\"m9 12 2 2 4-4\"></path>\n            </svg>\n          </div>\n          <h3 class=\"card-title\">422 Form Requests</h3>\n          <p class=\"card-desc\">Dedicated validation classes backed by Zod. When invalid, automatically formats 422 Unprocessable Entity error payloads.</p>\n        </div>\n\n        <div class=\"card\">\n          <div class=\"card-icon\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <polyline points=\"4 17 10 11 4 5\"></polyline>\n              <line x1=\"12\" y1=\"19\" x2=\"20\" y2=\"19\"></line>\n            </svg>\n          </div>\n          <h3 class=\"card-title\">Artisan-Style CLI</h3>\n          <p class=\"card-desc\">Scaffold controllers, requests, models, and inspect registered routes with <code>typz make:*</code> and <code>typz routes:list</code>.</p>\n        </div>\n\n        <div class=\"card\">\n          <div class=\"card-icon\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"></ellipse>\n              <path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\"></path>\n              <path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"></path>\n            </svg>\n          </div>\n          <h3 class=\"card-title\">Drizzle ORM</h3>\n          <p class=\"card-desc\">Zero C++ compilation hassle. Native LibSQL / SQLite client running locally or globally distributed with Turso.</p>\n        </div>\n\n        <div class=\"card\">\n          <div class=\"card-icon\">\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n              <rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect>\n              <path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>\n            </svg>\n          </div>\n          <h3 class=\"card-title\">Native Middleware</h3>\n          <p class=\"card-desc\">WebCrypto HMAC-SHA256 JWT auth, API key guards, CORS headers, and in-memory sliding-window rate limiters out of the box.</p>\n        </div>\n      </div>\n    </section>\n\n    <!-- Live API Tester -->\n    <section class=\"tester\" id=\"tester\">\n      <div class=\"tester-header\">\n        <div class=\"tester-title\">\n          <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color: var(--text-muted)\">\n            <polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"></polyline>\n          </svg>\n          <span>Live Endpoint Tester</span>\n        </div>\n        <span style=\"font-size: 0.85rem; color: var(--text-dim); font-family: 'Geist Mono', monospace;\">Connected to http://localhost:3000</span>\n      </div>\n\n      <div class=\"tester-inputs\">\n        <div class=\"method-tag\" id=\"tester-method\">GET</div>\n        <input type=\"text\" class=\"endpoint-input\" id=\"tester-path\" value=\"/health\" placeholder=\"/health or /echo\">\n        <button class=\"send-btn\" id=\"tester-btn\" onclick=\"sendTestRequest()\">Send Request</button>\n      </div>\n\n      <div class=\"response-box\" id=\"tester-output\">// Response will display here...</div>\n    </section>\n\n    <!-- Architectural Comparison -->\n    <section class=\"comparison\">\n      <div class=\"section-header\">\n        <h2 class=\"section-title\">How typz Compares</h2>\n        <p class=\"section-desc\">The best ergonomics of Laravel without the bloat of NestJS or the total lack of structure in raw micro-frameworks.</p>\n      </div>\n\n      <div class=\"table-wrap\">\n        <table>\n          <thead>\n            <tr>\n              <th>Feature</th>\n              <th>Laravel (PHP)</th>\n              <th>NestJS (TS)</th>\n              <th>Express / Raw Hono</th>\n              <th>typz (TS)</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Routing</td>\n              <td>Fluent (Route::get)</td>\n              <td>@Get() Decorators</td>\n              <td>Handler chains</td>\n              <td class=\"highlight\">Fluent (Route.get)</td>\n            </tr>\n            <tr>\n              <td>Controllers</td>\n              <td>Class-based</td>\n              <td>Heavy DI Decorators</td>\n              <td>Manual functions</td>\n              <td class=\"highlight\">extends Controller</td>\n            </tr>\n            <tr>\n              <td>Validation</td>\n              <td>FormRequest (422)</td>\n              <td>class-validator</td>\n              <td>Manual schema parse</td>\n              <td class=\"highlight\">FormRequest + Zod (422)</td>\n            </tr>\n            <tr>\n              <td>Latency</td>\n              <td>Moderate (PHP FPM)</td>\n              <td>Moderate</td>\n              <td>Ultra-fast</td>\n              <td class=\"highlight\">Ultra-fast (Hono)</td>\n            </tr>\n            <tr>\n              <td>CLI Tooling</td>\n              <td>php artisan</td>\n              <td>nest generate</td>\n              <td>None</td>\n              <td class=\"highlight\">typz make:*</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </section>\n  </main>\n\n  <!-- Footer -->\n  <footer>\n    <div class=\"container\">\n      <div class=\"footer-links\">\n        <a href=\"#code\" class=\"footer-link\">Documentation</a>\n        <a href=\"#features\" class=\"footer-link\">Features</a>\n        <a href=\"https://github.com\" class=\"footer-link\" target=\"_blank\">GitHub</a>\n      </div>\n      <p>typz framework • Minimalist, type-safe backend framework inspired by Laravel.</p>\n    </div>\n  </footer>\n\n  <script>\n    function switchTab(tabName) {\n      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));\n      document.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));\n\n      event.target.classList.add('active');\n      const target = document.getElementById('tab-' + tabName);\n      if (target) target.classList.add('active');\n    }\n\n    function copyInstallCommand() {\n      const text = document.getElementById('cmd-text').innerText;\n      navigator.clipboard.writeText(text).then(() => {\n        const btn = document.getElementById('copy-btn');\n        btn.innerHTML = '<span style=\"color:#ffffff;font-size:0.75rem;font-weight:600;\">COPIED!</span>';\n        setTimeout(() => {\n          btn.innerHTML = '<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg>';\n        }, 1500);\n      });\n    }\n\n    async function sendTestRequest() {\n      const path = document.getElementById('tester-path').value.trim();\n      const output = document.getElementById('tester-output');\n      const btn = document.getElementById('tester-btn');\n\n      btn.innerText = 'Sending...';\n      output.innerText = 'Requesting ' + path + '...';\n\n      try {\n        const res = await fetch(path, {\n          headers: { 'Accept': 'application/json' }\n        });\n        const status = res.status;\n        const data = await res.json();\n        output.innerText = '// HTTP ' + status + '\\\\n' + JSON.stringify(data, null, 2);\n      } catch (err) {\n        output.innerText = '// Error: ' + err.message;\n      } finally {\n        btn.innerText = 'Send Request';\n      }\n    }\n\n    // Smooth scroll animation for navbar links and buttons\n    document.querySelectorAll('a[href^=\"#\"]').forEach(link => {\n      link.addEventListener('click', function(e) {\n        const targetId = this.getAttribute('href');\n        if (targetId && targetId !== '#') {\n          const targetElement = document.querySelector(targetId);\n          if (targetElement) {\n            e.preventDefault();\n            const headerHeight = document.querySelector('header')?.offsetHeight || 72;\n            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 24);\n            \n            window.scrollTo({\n              top: Math.max(0, targetPosition),\n              behavior: 'smooth'\n            });\n\n            if (history.pushState) {\n              history.pushState(null, '', targetId);\n            }\n          }\n        }\n      });\n    });\n\n    // Active link highlighting on scroll\n    const sections = document.querySelectorAll('section[id]');\n    const navLinks = document.querySelectorAll('.nav-link');\n    window.addEventListener('scroll', () => {\n      const scrollY = window.pageYOffset;\n      const headerHeight = document.querySelector('header')?.offsetHeight || 72;\n      sections.forEach(section => {\n        const sectionTop = section.offsetTop - headerHeight - 60;\n        const sectionHeight = section.offsetHeight;\n        const sectionId = section.getAttribute('id');\n        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {\n          navLinks.forEach(link => {\n            link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);\n          });\n        }\n      });\n    });\n  </script>\n</body>\n</html>`;\n}\n";

export const serverTemplate = `import { TypzApp, cors, logger } from '@llydsoawsm/core';
import '../routes/api.js';
import { seedDatabase } from '../database/seed.js';

// Auto-seed initial SQLite database table and data on startup
await seedDatabase().catch((err) => {
  console.warn('[typz] Database init warning:', err?.message || err);
});

export const app = new TypzApp({
  port: 3000,
  debug: true,
});

app.use(cors());
app.use(logger({ format: 'dev' }));

app.listen(3000, ({ port, host }) => {
  const displayHost = (!host || host === '::' || host === '0.0.0.0') ? 'localhost' : host;
  console.log(\`\\n🚀 [typz] Server running at http://\${displayHost}:\${port}\`);
  console.log(\`👉 Visit:   http://localhost:\${port}/\`);
  console.log(\`👉 Health:  http://localhost:\${port}/health\`);
  console.log(\`👉 Users:   http://localhost:\${port}/api/users\\n\`);
});
`;

export const routesTemplate = `import { Route, response } from '@llydsoawsm/core';
import { renderLandingPage } from '../src/views/landing.js';
import { UserController } from '../app/Http/Controllers/UserController.js';

// 1. Root Welcome Page (serves HTML for browser visits, JSON for API clients)
Route.get('/', (req) => {
  const acceptsHtml = req.header('accept')?.includes('text/html');
  const format = req.query('format');

  if (acceptsHtml && format !== 'json') {
    return response.html(renderLandingPage());
  }

  return {
    framework: 'typz',
    version: '0.1.0',
    message: 'Welcome to your Typz backend! 🚀',
    status: 'online',
    endpoints: {
      welcome: 'GET /',
      health: 'GET /health',
      users: 'GET /api/users',
      echo: 'POST /echo',
    },
  };
}).name('root');

// 2. Health check endpoint
Route.get('/health', () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
  };
}).name('health');

// 3. Sample POST endpoint for interactive playground
Route.post('/echo', async (req) => {
  const data = await req.all();
  return {
    message: 'Echo response from Typz!',
    received: data,
  };
}).name('echo');

// 4. User resource CRUD routes (SQLite + Drizzle ORM + Controller)
Route.resource('/api/users', UserController);
`;

export const baseControllerTemplate = `import { Controller as BaseController } from '@llydsoawsm/core';

/**
 * Base Controller
 * All application controllers extend this class.
 */
export abstract class Controller extends BaseController {}
`;

export const userControllerTemplate = `import { TypzRequest } from '@llydsoawsm/core';
import { Controller } from './Controller.js';
import { db } from '../../../database/index.js';
import { users } from '../../../database/models/User.js';
import { eq } from 'drizzle-orm';
import { CreateUserRequest } from '../Requests/CreateUserRequest.js';

export class UserController extends Controller {
  /**
   * Display a listing of users.
   * GET /api/users
   */
  async index(req: TypzRequest) {
    const allUsers = await db.select().from(users);
    return this.success(allUsers, 'Users retrieved successfully');
  }

  /**
   * Store a newly created user in storage.
   * POST /api/users
   */
  async store(req: TypzRequest) {
    const form = await this.formRequest(req, CreateUserRequest);
    const data = form.validated();

    const [newUser] = await db.insert(users).values(data).returning();
    return this.created(newUser, 'User created successfully');
  }

  /**
   * Display the specified user.
   * GET /api/users/:id
   */
  async show(req: TypzRequest) {
    const id = Number(req.param('id'));
    const rows = await db.select().from(users).where(eq(users.id, id));
    const user = rows[0];

    if (!user) {
      return this.error('User not found', 404);
    }

    return this.success(user, 'User retrieved successfully');
  }

  /**
   * Update the specified user in storage.
   * PUT /api/users/:id
   */
  async update(req: TypzRequest) {
    const id = Number(req.param('id'));
    const body = await req.all();

    const [updatedUser] = await db
      .update(users)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!updatedUser) {
      return this.error('User not found', 404);
    }

    return this.success(updatedUser, 'User updated successfully');
  }

  /**
   * Remove the specified user from storage.
   * DELETE /api/users/:id
   */
  async destroy(req: TypzRequest) {
    const id = Number(req.param('id'));
    const deleted = await db.delete(users).where(eq(users.id, id)).returning();

    if (!deleted || deleted.length === 0) {
      return this.error('User not found', 404);
    }

    return this.success({ id }, 'User deleted successfully');
  }
}
`;

export const createUserRequestTemplate = `import { FormRequest, z } from '@llydsoawsm/core';

export class CreateUserRequest extends FormRequest<{
  name: string;
  email: string;
  role?: string;
}> {
  authorize(): boolean {
    return true;
  }

  rules() {
    return z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Please enter a valid email address'),
      role: z.enum(['admin', 'developer', 'designer', 'user']).optional().default('user'),
    });
  }
}
`;

export const exampleMiddlewareTemplate = `import type { TypzMiddleware, TypzRequest } from '@llydsoawsm/core';

/**
 * Example middleware that logs request execution time.
 */
export function ExampleMiddleware(): TypzMiddleware {
  return async (req: TypzRequest, next: () => Promise<void>) => {
    const start = Date.now();
    await next();
    const duration = Date.now() - start;
    console.log(\`⚡ [\${req.method}] \${req.url} handled in \${duration}ms\`);
  };
}
`;

export const databaseIndexTemplate = `import { createSqliteDb } from '@llydsoawsm/core';
import * as userSchema from './models/User.js';

export const { db, client } = createSqliteDb({
  url: process.env.DATABASE_URL || 'file:database/database.sqlite',
  schema: { ...userSchema },
});
`;

export const userModelTemplate = `import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').default('user').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).\$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).\$defaultFn(() => new Date()),
});

export type User = typeof users.\$inferSelect;
export type NewUser = typeof users.\$inferInsert;
`;

export const databaseSeedTemplate = `import { client, db } from './index.js';
import { users } from './models/User.js';

export async function seedDatabase() {
  // Ensure the users table exists
  await client.execute(\`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT 'user',
      created_at INTEGER,
      updated_at INTEGER
    );
  \`);

  // Check if records already exist
  const existing = await client.execute('SELECT COUNT(*) as count FROM users;');
  const count = Number(existing.rows[0]?.count ?? 0);

  if (count === 0) {
    console.log('🌱 Seeding initial database records...');
    await db.insert(users).values([
      {
        name: 'Alex Johnson',
        email: 'alex@typz.dev',
        role: 'admin',
      },
      {
        name: 'Sarah Connor',
        email: 'sarah@typz.dev',
        role: 'developer',
      },
      {
        name: 'Taylor Otwell',
        email: 'taylor@typz.dev',
        role: 'designer',
      },
    ]);
    console.log('✅ Inserted initial users into SQLite database!');
  }
}

// Allow direct execution: npx tsx database/seed.ts
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('database/seed.ts')) {
  seedDatabase()
    .then(() => console.log('✨ Database seeding complete.'))
    .catch((err) => {
      console.error('❌ Database seeding failed:', err);
      process.exit(1);
    });
}
`;

export const gitignoreTemplate = `node_modules
dist
.env
*.log
.DS_Store
database/*.sqlite
database/*.sqlite-journal
`;

export const envExampleTemplate = `PORT=3000
NODE_ENV=development
DATABASE_URL=file:database/database.sqlite
`;

export function readmeTemplate(projectName: string): string {
  return `# ${projectName}

A modern, type-safe TypeScript backend built with [Typz](https://github.com/your-username/typz), inspired by Laravel's developer experience.

## Quick Start

\`\`\`bash
# Start development server with live reload
npm run dev

# Inspect registered routes
npm run routes

# Seed initial SQLite data
npm run db:seed
\`\`\`

## Starter Features Out of the Box

- ⚡ **Welcome Landing Page**: Visit \`http://localhost:3000/\` to explore the interactive API documentation and tester.
- 🗄️ **Database & Models**: Preconfigured SQLite with Drizzle ORM in \`database/\` and \`database/models/User.ts\`.
- 🌱 **Initial Data Seeder**: Test users are seeded automatically into SQLite on startup and via \`npm run db:seed\`.
- 🎮 **RESTful Resource Controller**: Complete CRUD operations in \`app/Http/Controllers/UserController.ts\`.
- 🛡️ **Form Request Validation**: Type-safe validation using Zod in \`app/Http/Requests/CreateUserRequest.ts\`.
- 🔌 **Middleware**: Timing middleware in \`app/Http/Middleware/ExampleMiddleware.ts\`.

## Artisan-style CLI Commands

\`\`\`bash
# Create a new controller
npx typz make:controller PostController --resource

# Create a new form request
npx typz make:request StorePostRequest

# Create a new model
npx typz make:model Post

# Create a new middleware
npx typz make:middleware AuthMiddleware
\`\`\`
`;
}
