import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 5000);
const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'sunny-kumar-portfolio-api' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  const values = [name, email, subject, message];
  if (values.some((value) => typeof value !== 'string')) {
    return res.status(400).json({ message: 'Please complete every field.' });
  }

  const clean = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim()
  };

  if (clean.name.length < 2 || clean.name.length > 80) {
    return res.status(400).json({ message: 'Name must be between 2 and 80 characters.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || clean.email.length > 160) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  if (clean.subject.length < 2 || clean.subject.length > 120) {
    return res.status(400).json({ message: 'Subject must be between 2 and 120 characters.' });
  }
  if (clean.message.length < 10 || clean.message.length > 3000) {
    return res.status(400).json({ message: 'Message must be between 10 and 3000 characters.' });
  }

  try {
    await mkdir(dataDir, { recursive: true });
    const entry = { ...clean, receivedAt: new Date().toISOString() };
    await appendFile(messagesFile, `${JSON.stringify(entry)}\n`, 'utf8');
    return res.status(201).json({ message: 'Thanks — your message has been saved.' });
  } catch (error) {
    console.error('Could not save contact message:', error);
    return res.status(500).json({ message: 'The message could not be saved. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio API listening on http://localhost:${PORT}`);
});
