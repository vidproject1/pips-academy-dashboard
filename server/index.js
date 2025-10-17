import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure directories
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, '..', 'uploads');
const uploadsVideosDir = path.join(uploadsDir, 'videos');
const uploadsCheatsDir = path.join(uploadsDir, 'cheatsheets');
for (const dir of [dataDir, uploadsDir, uploadsVideosDir, uploadsCheatsDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Static serving for uploads
app.use('/uploads', express.static(uploadsDir));

// Data file paths
const videosFile = path.join(dataDir, 'videos.json');
const strategiesFile = path.join(dataDir, 'strategies.json');
const cheatsFile = path.join(dataDir, 'cheatsheets.json');

// Initialize files if missing
for (const f of [videosFile, strategiesFile, cheatsFile]) {
  if (!fs.existsSync(f)) fs.writeFileSync(f, '[]', 'utf-8');
}

// Helpers
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf-8'));
const writeJson = (p, data) => fs.writeFileSync(p, JSON.stringify(data, null, 2));
const newId = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Multer storage
const videoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsVideosDir),
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, safeName);
  },
});
const cheatStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsCheatsDir),
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, safeName);
  },
});

const uploadVideo = multer({ storage: videoStorage, limits: { fileSize: 200 * 1024 * 1024 } });
const uploadCheat = multer({ storage: cheatStorage, limits: { fileSize: 50 * 1024 * 1024 } });

// Routes
app.get('/api/videos', (_req, res) => {
  res.json(readJson(videosFile));
});

app.post('/api/videos/link', (req, res) => {
  const { title, url, category } = req.body || {};
  if (!title || !url) return res.status(400).json({ error: 'title and url are required' });
  const list = readJson(videosFile);
  const item = { id: newId(), title, url, category: category || 'General', createdAt: new Date().toISOString() };
  list.unshift(item);
  writeJson(videosFile, list);
  res.json(item);
});

app.post('/api/videos/upload', uploadVideo.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'video file is required' });
  const { title, category } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  const relPath = `/uploads/videos/${req.file.filename}`;
  const list = readJson(videosFile);
  const item = { id: newId(), title, path: relPath, category: category || 'General', createdAt: new Date().toISOString() };
  list.unshift(item);
  writeJson(videosFile, list);
  res.json(item);
});

app.get('/api/strategies', (_req, res) => {
  res.json(readJson(strategiesFile));
});

app.post('/api/strategies', (req, res) => {
  const { title, content } = req.body || {};
  if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
  const list = readJson(strategiesFile);
  const item = { id: newId(), title, content, createdAt: new Date().toISOString() };
  list.unshift(item);
  writeJson(strategiesFile, list);
  res.json(item);
});

app.get('/api/cheatsheets', (_req, res) => {
  res.json(readJson(cheatsFile));
});

app.post('/api/cheatsheets/upload', uploadCheat.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'file is required' });
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  const relPath = `/uploads/cheatsheets/${req.file.filename}`;
  const list = readJson(cheatsFile);
  const item = { id: newId(), title, path: relPath, createdAt: new Date().toISOString() };
  list.unshift(item);
  writeJson(cheatsFile, list);
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});