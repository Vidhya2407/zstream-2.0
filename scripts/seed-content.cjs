const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { hash } = require('argon2');

function readEnvFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/).reduce((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return acc;
    const separator = trimmed.indexOf('=');
    if (separator === -1) return acc;
    acc[trimmed.slice(0, separator).trim()] = trimmed.slice(separator + 1).trim();
    return acc;
  }, {});
}

const env = { ...readEnvFile('.env.local'), ...process.env };
const MONGODB_URI = env.MONGODB_URI || 'mongodb://localhost:27017/zstream';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  role: { type: String, default: 'admin' },
  carbonPoints: { type: Number, default: 0 },
  carbonSaved: { type: Number, default: 0 },
}, { timestamps: true });

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String,
  audioUrl: String,
  creator: mongoose.Schema.Types.ObjectId,
  contentType: String,
  source: String,
  locale: String,
  externalKey: String,
  status: String,
  views: Number,
  likes: Number,
  category: String,
  duration: String,
  carbonFootprint: Number,
  tags: [String],
  metadata: mongoose.Schema.Types.Mixed,
  publishedAt: Date,
}, { timestamps: true });

const User = mongoose.models.SeedUser || mongoose.model('SeedUser', userSchema, 'users');
const Video = mongoose.models.SeedVideo || mongoose.model('SeedVideo', videoSchema, 'videos');

const seedContent = [
  {
    locale: 'en',
    contentType: 'video',
    externalKey: 'home-planet-new-hope-en',
    title: 'Planet: A New Hope',
    description: 'Documentary content seeded for the home page.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
    category: 'Documentary',
    duration: '6 episodes',
    carbonFootprint: 0.07,
    views: 124000,
  },
  {
    locale: 'de',
    contentType: 'video',
    externalKey: 'home-planet-new-hope-de',
    title: 'Planet: Eine neue Hoffnung',
    description: 'Dokumentationsinhalt fuer die Startseite.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
    category: 'Dokumentation',
    duration: '6 Folgen',
    carbonFootprint: 0.07,
    views: 84000,
  },
  {
    locale: 'en',
    contentType: 'live',
    externalKey: 'live-climate-summit-en',
    title: 'Climate Summit 2026',
    description: 'Primary live content seeded for live page migration.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    category: 'Events',
    duration: 'Live',
    carbonFootprint: 0.05,
    views: 125840,
    metadata: { bitrate: 6.2, fps: 60, latency: 14, quality: '1080p', carbonOffset: 0, imageIdx: 0 },
  },
  {
    locale: 'de',
    contentType: 'live',
    externalKey: 'live-climate-summit-de',
    title: 'Klimagipfel 2026',
    description: 'Primaerer Live-Inhalt fuer die Migration der Live-Seite.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    category: 'Veranstaltungen',
    duration: 'Live',
    carbonFootprint: 0.05,
    views: 95840,
    metadata: { bitrate: 6.2, fps: 60, latency: 14, quality: '1080p', carbonOffset: 0, imageIdx: 0 },
  },
  {
    locale: 'en',
    contentType: 'music',
    externalKey: 'music-carbon-neutral-vibes-en',
    title: 'Carbon Neutral Vibes',
    description: 'Seeded music track for DB-backed music library.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    category: 'Ambient',
    duration: '3:45',
    carbonFootprint: 0.002,
    views: 22000,
    metadata: { artist: 'Eco Beats Collective', album: 'Green Sessions', durationSeconds: 225, carbonPerMin: 0.002 },
  },
  {
    locale: 'de',
    contentType: 'music',
    externalKey: 'music-carbon-neutral-vibes-de',
    title: 'Kohlenstofffreie Vibes',
    description: 'Seeded music track for DB-backed music library.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    category: 'Ambient',
    duration: '3:45',
    carbonFootprint: 0.002,
    views: 18000,
    metadata: { artist: 'Eco Beats Collective', album: 'Green Sessions', durationSeconds: 225, carbonPerMin: 0.002 },
  },
  {
    locale: 'en',
    contentType: 'minis',
    externalKey: 'minis-climate-hack-en',
    title: '60 Second Climate Hack',
    description: 'Seeded mini content for DB-backed minis feed.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
    videoUrl: 'https://example.com/minis/climate-hack-en.mp4',
    category: 'Minis',
    duration: '0:60',
    carbonFootprint: 0.01,
    views: 64000,
    likes: 125000,
    metadata: { creatorDisplay: 'EcoTips', shares: 45000, recycles: 8200, co2SavedTotal: 82.4, waterSavedTotal: 214, energySavedTotal: 12.6, music: 'Green Energy Vibes - Eco Beats' },
  },
  {
    locale: 'de',
    contentType: 'minis',
    externalKey: 'minis-climate-hack-de',
    title: '60-Sekunden-Klima-Hack',
    description: 'Seeded mini content for DB-backed minis feed.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
    videoUrl: 'https://example.com/minis/climate-hack-de.mp4',
    category: 'Minis',
    duration: '0:60',
    carbonFootprint: 0.01,
    views: 52000,
    likes: 98000,
    metadata: { creatorDisplay: 'EcoTips', shares: 32000, recycles: 5400, co2SavedTotal: 61.2, waterSavedTotal: 156, energySavedTotal: 9.1, music: 'Gruene Energie Vibes - Eco Beats' },
  },];

async function run() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000, connectTimeoutMS: 5000 });

  const adminEmail = 'seed-admin@zstream.local';
  const password = await hash('ChangeMe123');
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({ name: 'Seed Admin', email: adminEmail, password, role: 'admin', carbonPoints: 0, carbonSaved: 0 });
  }

  for (const item of seedContent) {
    await Video.updateOne(
      { externalKey: item.externalKey, locale: item.locale },
      {
        $set: {
          ...item,
          creator: admin._id,
          source: 'seed',
          status: 'published',
          likes: 0,
          tags: [item.contentType, item.category],
          publishedAt: new Date(),
        },
      },
      { upsert: true },
    );
  }

  console.log(`Seeded ${seedContent.length} content documents and ensured seed admin exists.`);
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});

