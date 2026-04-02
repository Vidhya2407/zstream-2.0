'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ZstreamShieldPanel from '../../../../components/shield/ZstreamShieldPanel';

type ContentType = 'video' | 'music' | 'podcast' | 'mini';
type Visibility = 'public' | 'unlisted' | 'private' | 'scheduled';
type UploadStep = 1 | 2 | 3 | 4;

interface Chapter {
  id: number;
  time: string;
  title: string;
}

const CATEGORIES = [
  'Science & Technology', 'Environment & Sustainability', 'Education', 'Documentary',
  'Lifestyle', 'Travel & Nature', 'Music', 'Podcast', 'News & Politics', 'Entertainment',
];

const CONTENT_TYPES: { id: ContentType; label: string; icon: string; desc: string }[] = [
  { id: 'video', label: 'Video', icon: '🎬', desc: 'Upload a video file (MP4, MOV, MKV, WebM)' },
  { id: 'music', label: 'Music', icon: '🎵', desc: 'Upload audio (MP3, FLAC, WAV, AAC)' },
  { id: 'podcast', label: 'Podcast', icon: '🎙', desc: 'Upload podcast episode (MP3, MP4 audio)' },
  { id: 'mini', label: 'Mini', icon: '📱', desc: 'Short vertical video  9:16  Max 60 seconds' },
];

const VISIBILITY_OPTIONS: { id: Visibility; label: string; icon: string; desc: string }[] = [
  { id: 'public', label: 'Public', icon: '🌍', desc: 'Anyone can watch' },
  { id: 'unlisted', label: 'Unlisted', icon: 'Link', desc: 'Only people with the link' },
  { id: 'private', label: 'Private', icon: '🔒', desc: 'Only you can watch' },
  { id: 'scheduled', label: 'Scheduled', icon: '📅', desc: 'Publish at a set time' },
];

const STEP_LABELS = ['File & Type', 'Details', 'Settings', 'Publish'];

function StepIndicator({ current }: { current: UploadStep }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEP_LABELS.map((label, i) => {
        const step = (i + 1) as UploadStep;
        const done = current > step;
        const active = current === step;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all"
                style={done ? { background: 'rgba(0,229,186,0.2)', color: 'rgb(0,229,186)', border: '2px solid rgba(0,229,186,0.5)' }
                  : active ? { background: 'rgba(239,68,68,0.85)', color: 'white', border: '2px solid rgba(239,68,68,0.5)' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgb(107,114,128)', border: '2px solid rgba(255,255,255,0.1)' }
                }
              >
                {done ? 'Done' : step}
              </div>
              <span className="text-[9px] mt-1 font-semibold" style={{ color: active ? 'rgb(252,165,165)' : done ? 'rgb(0,229,186)' : 'rgb(107,114,128)' }}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 mb-4 transition-all" style={{ background: done ? 'rgba(0,229,186,0.4)' : 'rgba(255,255,255,0.08)' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function DropZone({ contentType, onFileSelect }: { contentType: ContentType; onFileSelect: (name: string) => void }) {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const accept = contentType === 'mini' ? '.mp4,.mov' : contentType === 'video' ? '.mp4,.mov,.mkv,.webm' : '.mp3,.flac,.wav,.aac,.mp4';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file.name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file.name);
  };

  return (
    <div
      className="relative rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all"
      style={{
        border: `2px dashed ${dragging ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.12)'}`,
        background: dragging ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.02)',
        padding: '48px 24px',
      }}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      aria-label="Upload file"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} multiple={false} />
      <motion.div animate={dragging ? { scale: 1.15 } : { scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <svg className="w-8 h-8" fill="none" stroke="rgb(252,165,165)" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        <p className="text-white font-bold text-base mb-1">Drop your file here</p>
        <p className="text-gray-500 text-xs">or <span style={{ color: 'rgb(252,165,165)' }}>click to browse</span></p>
        <p className="text-gray-600 text-[10px] mt-2">
          {contentType === 'mini' ? 'MP4, MOV  9:16 vertical  Max 60s  Max 500 MB'
            : contentType === 'video' ? 'MP4, MOV, MKV, WebM  Max 20 GB'
              : 'MP3, FLAC, WAV, AAC  Max 500 MB'}
        </p>
      </motion.div>
    </div>
  );
}

function ZTubeUploadInner() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as ContentType) || 'video';
  const validTypes: ContentType[] = ['video', 'music', 'podcast', 'mini'];

  const [step, setStep] = React.useState<UploadStep>(1);
  const [contentType, setContentType] = React.useState<ContentType>(
    validTypes.includes(initialType) ? initialType : 'video'
  );
  const [fileName, setFileName] = React.useState('');
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [thumbnailName, setThumbnailName] = React.useState('');
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [subtitleName, setSubtitleName] = React.useState('');

  const [visibility, setVisibility] = React.useState<Visibility>('public');
  const [scheduledDate, setScheduledDate] = React.useState('');
  const [monetization, setMonetization] = React.useState(false);
  const [tipJar, setTipJar] = React.useState(false);
  const [carbonOffset, setCarbonOffset] = React.useState(true);

  const [published, setPublished] = React.useState(false);

  const thumbnailRef = React.useRef<HTMLInputElement>(null);
  const subtitleRef = React.useRef<HTMLInputElement>(null);

  const simulateUpload = (name: string) => {
    setFileName(name);
    setUploading(true);
    setUploadProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setUploading(false);
      }
      setUploadProgress(Math.min(p, 100));
    }, 180);
  };

  const addChapter = () => {
    setChapters(prev => [...prev, { id: Date.now(), time: '0:00', title: '' }]);
  };
  const updateChapter = (id: number, field: keyof Chapter, value: string) => {
    setChapters(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  const removeChapter = (id: number) => {
    setChapters(prev => prev.filter(c => c.id !== id));
  };

  const handlePublish = () => {
    setPublished(true);
  };

  if (published) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0A0F18' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(0,229,186,0.15)', border: '2px solid rgba(0,229,186,0.4)' }}
          >
            <svg className="w-10 h-10" fill="none" stroke="rgb(0,229,186)" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h1 className="text-white font-black text-2xl mb-2">Upload Complete!</h1>
          <p className="text-gray-400 text-sm mb-2">&ldquo;{title || fileName}&rdquo; is now {visibility === 'scheduled' ? 'scheduled' : 'live on ZTube'}.</p>
          {carbonOffset && (
            <p className="text-xs font-bold mb-6" style={{ color: 'rgb(0,229,186)' }}>
              🌿 Carbon offset automatically applied to this upload.
            </p>
          )}
          <div className="mb-6 text-left">
            <ZstreamShieldPanel
              mode="creator"
              compact
              title="ZSTREAM Shield prepared this upload"
              subtitle="Fingerprinting, watermarking, proof-ready registration, and review monitoring are now attached as a creator-facing protection layer."
              metrics={[
                { label: 'Fingerprint', value: 'Queued' },
                { label: 'Proof record', value: 'Ready' },
              ]}
            />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/ztube/studio">
              <button className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>
                Go to Studio
              </button>
            </Link>
            <Link href="/ztube">
              <button className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}>
                View on ZTube
              </button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: '#0A0F18' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '-15%', right: '-8%', background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity }} />
        <motion.div className="absolute rounded-full" style={{ width: '350px', height: '350px', bottom: '-8%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 3 }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8">

        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-8" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/ztube/studio">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} aria-label="Back to Studio">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </Link>
          <div>
            <h1 className="text-white font-black text-2xl">Upload Content</h1>
            <p className="text-gray-500 text-xs">ZTube Studio  Creator Tools</p>
          </div>
        </motion.div>

        <StepIndicator current={step} />

        <AnimatePresence mode="wait">

          {/* STEP 1: File & Type */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              {contentType === 'mini' && (
                <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: 'rgba(0,229,186,0.06)', border: '1px solid rgba(0,229,186,0.2)' }}>
                  <span className="text-xl flex-shrink-0">📱</span>
                  <div>
                    <p className="text-white text-xs font-bold">Minis Format Requirements</p>
                    <p className="text-gray-400 text-[10px] mt-0.5 leading-relaxed">Vertical 9:16 aspect ratio  Max 60 seconds  MP4 or MOV  Shown in the Minis feed on ZStream. Short, punchy eco content performs best.</p>
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-white font-bold text-base mb-3">Content Type</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CONTENT_TYPES.map(ct => (
                    <button
                      key={ct.id}
                      onClick={() => setContentType(ct.id)}
                      className="p-4 rounded-2xl text-left transition-all"
                      style={contentType === ct.id ? { background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.4)' }
                        : { background: 'rgba(255,255,255,0.03)', border: '2px solid rgba(255,255,255,0.07)' }
                      }
                      aria-pressed={contentType === ct.id}
                    >
                      <div className="text-2xl mb-2">{ct.icon}</div>
                      <div className="text-white text-xs font-bold">{ct.label}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5 leading-snug">{ct.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-white font-bold text-base mb-3">Upload File</h2>
                {!fileName ? (
                  <DropZone contentType={contentType} onFileSelect={simulateUpload} />
                ) : (
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <svg className="w-5 h-5" fill="none" stroke="rgb(252,165,165)" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">{fileName}</p>
                        <p className="text-gray-500 text-[10px]">{uploading ? 'Uploading...' : 'Upload complete'}</p>
                      </div>
                      {!uploading && (
                        <button onClick={() => { setFileName(''); setUploadProgress(0); }} className="text-gray-500 hover:text-red-400 transition-colors" aria-label="Remove file">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: uploadProgress >= 100 ? 'rgb(0,229,186)' : 'rgb(239,68,68)' }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <p className="text-gray-600 text-[10px] mt-1">{Math.round(uploadProgress)}%{uploadProgress >= 100 ? '  Ready' : ''}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(2)}
                  disabled={!fileName || uploading}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div>
                <label className="text-gray-400 text-xs block mb-1.5">Title <span className="text-red-400">*</span></label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder={contentType === 'video' ? 'Give your video a title...' : contentType === 'music' ? 'Track or album name...' : 'Episode title...'} className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-sm outline-none transition-colors" style={{ borderColor: title ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.12)' }} maxLength={100} />
                <p className="text-gray-600 text-[10px] mt-1 text-right">{title.length}/100</p>
              </div>

              <div>
                <label className="text-gray-400 text-xs block mb-1.5">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell viewers about your content..." rows={4} className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-xs outline-none resize-none transition-colors" style={{ borderColor: 'rgba(255,255,255,0.12)' }} maxLength={5000} />
                <p className="text-gray-600 text-[10px] mt-1 text-right">{description.length}/5000</p>
              </div>

              <div>
                <label className="text-gray-400 text-xs block mb-1.5">Tags</label>
                <input value={tags} onChange={e => setTags(e.target.value)} placeholder="solar, renewable, climate (comma-separated)" className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-xs outline-none transition-colors" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
              </div>

              <div>
                <label className="text-gray-400 text-xs block mb-1.5">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-xs outline-none transition-colors appearance-none" style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(10,15,24,0.95)' }}>
                  <option value="">Select a category...</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="text-gray-400 text-xs block mb-1.5">Thumbnail</label>
                <input ref={thumbnailRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={e => setThumbnailName(e.target.files?.[0]?.name || '')} />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => thumbnailRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                    Upload Thumbnail
                  </button>
                  {thumbnailName && <span className="text-gray-400 text-xs truncate max-w-[160px]">{thumbnailName}</span>}
                  {!thumbnailName && <span className="text-gray-600 text-xs">or auto-generate from frame</span>}
                </div>
              </div>

              {/* Subtitle/Caption Upload */}
              <div>
                <label className="text-gray-400 text-xs block mb-1.5">Subtitles / Captions</label>
                <input ref={subtitleRef} type="file" accept=".vtt,.srt" className="hidden" onChange={e => setSubtitleName(e.target.files?.[0]?.name || '')} />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => subtitleRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                    Upload .vtt / .srt
                  </button>
                  {subtitleName && <span className="text-gray-400 text-xs truncate">{subtitleName}</span>}
                </div>
              </div>

              {/* Mini-specific: hashtags + duration warning */}
              {contentType === 'mini' && (
                <div className="p-4 rounded-2xl space-y-3" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1.5">Hashtags <span className="text-gray-600">(for Minis feed discovery)</span></label>
                    <input value={tags} onChange={e => setTags(e.target.value)} placeholder="#ClimateAction #EcoLife #ZeroWaste" className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-xs outline-none transition-colors" style={{ borderColor: 'rgba(0,229,186,0.25)' }} />
                  </div>
                  <div className="flex items-center gap-2 text-[10px]" style={{ color: 'rgb(0,229,186)' }}>
                    <span></span>
                    <span className="font-bold">Max duration: 60 seconds.</span>
                    <span className="text-gray-500">Longer clips will be trimmed to 60s automatically.</span>
                  </div>
                </div>
              )}

              {/* Chapter Markers - hidden for minis */}
              {contentType !== 'music' && contentType !== 'mini' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-400 text-xs">Chapter Markers</label>
                    <button type="button" onClick={addChapter} className="text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all" style={{ background: 'rgba(239,68,68,0.1)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.2)' }}>+ Add Chapter</button>
                  </div>
                  {chapters.length === 0 && <p className="text-gray-600 text-[10px]">No chapters added. Chapters help viewers navigate long content.</p>}
                  <div className="space-y-2">
                    {chapters.map(c => (
                      <div key={c.id} className="flex items-center gap-2">
                        <input value={c.time} onChange={e => updateChapter(c.id, 'time', e.target.value)} placeholder="0:00" className="w-16 bg-transparent border rounded-lg px-2 py-1.5 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                        <input value={c.title} onChange={e => updateChapter(c.id, 'title', e.target.value)} placeholder="Chapter title" className="flex-1 bg-transparent border rounded-lg px-2 py-1.5 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                        <button type="button" onClick={() => removeChapter(c.id)} className="text-gray-500 hover:text-red-400 transition-colors" aria-label="Remove chapter">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)} disabled={!title.trim()} className="px-6 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-40" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>Continue</motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Settings */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">

              {/* Visibility */}
              <div>
                <h2 className="text-white font-bold text-base mb-3">Visibility</h2>
                <div className="grid grid-cols-2 gap-3">
                  {VISIBILITY_OPTIONS.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVisibility(v.id)}
                      className="p-4 rounded-2xl text-left transition-all"
                      style={visibility === v.id ? { background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.4)' }
                        : { background: 'rgba(255,255,255,0.03)', border: '2px solid rgba(255,255,255,0.07)' }
                      }
                    >
                      <div className="text-xl mb-1.5">{v.icon}</div>
                      <div className="text-white text-xs font-bold">{v.label}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">{v.desc}</div>
                    </button>
                  ))}
                </div>
                {visibility === 'scheduled' && (
                  <div className="mt-3">
                    <label className="text-gray-400 text-xs block mb-1.5">Scheduled Date & Time</label>
                    <input type="datetime-local" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="bg-transparent border rounded-xl px-3 py-2.5 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)', colorScheme: 'dark' }} />
                  </div>
                )}
              </div>

              {/* Monetization */}
              <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h2 className="text-white font-bold text-base">Monetization</h2>
                {[
                  { label: 'Enable Ad Revenue', desc: 'Earn from ZStream ads shown before and during your content', value: monetization, set: setMonetization },
                  { label: 'Enable Tip Jar (Super Thanks)', desc: 'Allow viewers to send tips while watching', value: tipJar, set: setTipJar },
                ].map(m => (
                  <div key={m.label} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white text-xs font-semibold">{m.label}</p>
                      <p className="text-gray-500 text-[10px] mt-0.5">{m.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => m.set(v => !v)}
                      className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0 mt-0.5"
                      style={{ background: m.value ? 'rgba(239,68,68,0.8)' : 'rgba(255,255,255,0.1)' }}
                      role="switch"
                      aria-checked={m.value}
                    >
                      <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ transform: m.value ? 'translateX(22px)' : 'translateX(2px)' }} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Carbon Offset */}
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">🌿</span>
                      <p className="text-white text-xs font-bold">Auto Carbon Offset</p>
                    </div>
                    <p className="text-gray-400 text-[10px] leading-relaxed">
                      ZStream will automatically offset the carbon emissions from hosting and streaming this content via our partner Ecologi. Offset cost is deducted from revenue.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCarbonOffset(v => !v)}
                    className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0 mt-0.5"
                    style={{ background: carbonOffset ? 'rgba(0,229,186,0.8)' : 'rgba(255,255,255,0.1)' }}
                    role="switch"
                    aria-checked={carbonOffset}
                  >
                    <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ transform: carbonOffset ? 'translateX(22px)' : 'translateX(2px)' }} />
                  </button>
                </div>
              </div>

              <ZstreamShieldPanel
                mode="creator"
                compact
                title="ZSTREAM Shield settings"
                subtitle="These protection steps can be prepared automatically for viewer trust and creator protection after publish."
                metrics={[
                  { label: 'Fingerprinting', value: 'Prepared' },
                  { label: 'Watermark', value: 'Enabled' },
                  { label: 'Proof record', value: 'Queued' },
                  { label: 'AI screening', value: 'Monitored' },
                ]}
              />

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Back</button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(4)} className="px-6 py-2.5 rounded-xl text-xs font-bold" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>Review</motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Publish */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h2 className="text-white font-bold text-base mb-1">Review & Publish</h2>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div><p className="text-gray-500 mb-0.5">File</p><p className="text-white font-medium truncate">{fileName}</p></div>
                  <div><p className="text-gray-500 mb-0.5">Type</p><p className="text-white font-medium capitalize">{contentType}</p></div>
                  <div className="col-span-2"><p className="text-gray-500 mb-0.5">Title</p><p className="text-white font-medium">{title || <span className="text-red-400">Not set</span>}</p></div>
                  <div><p className="text-gray-500 mb-0.5">Category</p><p className="text-white font-medium">{category || '-'}</p></div>
                  <div><p className="text-gray-500 mb-0.5">Visibility</p><p className="text-white font-medium capitalize">{visibility}</p></div>
                  <div><p className="text-gray-500 mb-0.5">Ad Revenue</p><p className="font-medium" style={{ color: monetization ? 'rgb(0,229,186)' : 'rgb(107,114,128)' }}>{monetization ? 'Enabled' : 'Disabled'}</p></div>
                  <div><p className="text-gray-500 mb-0.5">Tip Jar</p><p className="font-medium" style={{ color: tipJar ? 'rgb(0,229,186)' : 'rgb(107,114,128)' }}>{tipJar ? 'Enabled' : 'Disabled'}</p></div>
                  <div><p className="text-gray-500 mb-0.5">Carbon Offset</p><p className="font-medium" style={{ color: carbonOffset ? 'rgb(0,229,186)' : 'rgb(107,114,128)' }}>{carbonOffset ? '🌿 Auto-applied' : 'Not applied'}</p></div>
                  <div><p className="text-gray-500 mb-0.5">Chapters</p><p className="text-white font-medium">{chapters.length} markers</p></div>
                  <div><p className="text-gray-500 mb-0.5">Subtitles</p><p className="text-white font-medium">{subtitleName || 'None'}</p></div>
                </div>
              </div>

              <ZstreamShieldPanel
                mode="summary"
                compact
                title="Protection summary"
                subtitle="User-facing trust signals that can be attached when this upload goes live."
                metrics={[
                  { label: 'Shield status', value: 'Ready on publish' },
                  { label: 'Viewer report path', value: 'Enabled' },
                ]}
              />

              {/* GEMA Notice for Music */}
              {contentType === 'music' && (
                <div className="p-4 rounded-2xl" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">Note</span>
                    <p className="text-white text-xs font-bold">GEMA Licensing Notice</p>
                  </div>
                  <p className="text-gray-400 text-[10px] leading-relaxed">
                    ZStream has a license agreement with GEMA. By uploading music, you confirm you hold the necessary rights or that the track is covered by ZStream&apos;s GEMA blanket license. Royalties are distributed automatically via our Stripe Connect integration.
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Back</button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handlePublish}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold"
                  style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  {visibility === 'scheduled' ? 'Schedule' : 'Publish Now'}
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}

export default function ZTubeUploadPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(239,68,68,0.3)', borderTopColor: 'rgb(239,68,68)' }} /></div>}>
      <ZTubeUploadInner />
    </React.Suspense>
  );
}
