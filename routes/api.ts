import { Route, response } from '@typz/core';
import { renderLandingPage } from '../src/views/landing.js';

// Root landing page / greeting endpoint
Route.get('/', (req) => {
  const acceptsHtml = req.header('accept')?.includes('text/html');
  const format = req.query('format');

  // Serve the minimalist black & white landing page for browser visits
  if (acceptsHtml && format !== 'json') {
    return response.html(renderLandingPage());
  }

  // Default JSON metadata for API clients
  return {
    framework: 'typz',
    version: '0.1.0',
    message: 'Welcome to your typz backend! 🚀',
    status: 'online',
  };
}).name('root');

// Health check endpoint
Route.get('/health', () => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
  };
}).name('health');

// Sample POST endpoint
Route.post('/echo', async (req) => {
  const data = await req.all();
  return {
    message: 'Echo response from typz!',
    received: data,
  };
}).name('echo');
