import type { IncomingMessage, ServerResponse } from 'http';
import { processContactSubmission } from '../src/server/contactHandler';

export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        res.status(400).json({ success: false, error: 'Invalid JSON payload.' });
        return;
      }
    }

    if (!body || typeof body !== 'object') {
      res.status(400).json({ success: false, error: 'Empty or invalid request body.' });
      return;
    }

    const clientIp = 
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
      req.socket?.remoteAddress || 
      'unknown';

    const result = await processContactSubmission(body, clientIp);

    res.status(result.statusCode || (result.success ? 200 : 400)).json(result);
  } catch (err: any) {
    console.error('API Contact Error:', err);
    res.status(500).json({ success: false, error: err?.message || 'Internal server error.' });
  }
}

