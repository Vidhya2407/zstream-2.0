'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { contentImages } from '../../../../lib/images/unsplash';

interface ZComment {
  id: number;
  author: string;
  avatarIdx: number;
  text: string;
  likes: number;
  time: string;
  replies?: ZComment[];
  liked?: boolean;
}

interface ZVideo {
  id: number;
  title: string;
  channel: string;
  description: string;
  views: string;
  likes: string;
  duration: string;
  daysAgo: number;
  imageIdx: number;
  verified: boolean;
  subscribers: string;
  carbonScore: number;
  type: 'video' | 'music' | 'podcast';
  tags: string[];
  uploadDate: string;
}

const VIDEOS: ZVideo[] = [
  { id: 1, title: 'How Solar Panels Actually Work', channel: 'TechGreen Labs', description: 'In this deep-dive, we explore the science behind photovoltaic cells, the manufacturing process, and how modern solar installations are transforming energy grids worldwide. From monocrystalline to thin-film technology, we cover every aspect of solar power generation and its role in the renewable energy revolution.', views: '4.2M', likes: '142K', duration: '12:34', daysAgo: 2, imageIdx: 0, verified: true, subscribers: '1.8M', carbonScore: 0.05, type: 'video', tags: ['solar', 'renewable', 'energy', 'technology'], uploadDate: 'Mar 16, 2026' },
  { id: 2, title: 'Ocean Cleanup Project — Full Documentary', channel: 'EcoWorld', description: 'Follow the Ocean Cleanup Foundation as they deploy their revolutionary System 003 across the Great Pacific Garbage Patch. This full-length documentary captures the engineering challenges, environmental breakthroughs, and the human stories behind the world\'s largest ocean cleanup operation.', views: '8.7M', likes: '318K', duration: '48:12', daysAgo: 5, imageIdx: 1, verified: true, subscribers: '3.2M', carbonScore: 0.04, type: 'video', tags: ['ocean', 'cleanup', 'documentary', 'environment'], uploadDate: 'Mar 13, 2026' },
  { id: 3, title: 'Zero Waste Kitchen in 30 Days', channel: 'GreenLife DIY', description: 'Join me on a 30-day challenge to transform a regular kitchen into a completely zero-waste space. From composting systems to package-free shopping strategies, this video documents every step, mistake, and victory in achieving a sustainable home cooking environment.', views: '2.1M', likes: '87K', duration: '22:08', daysAgo: 1, imageIdx: 0, verified: false, subscribers: '540K', carbonScore: 0.06, type: 'video', tags: ['zero-waste', 'kitchen', 'sustainability', 'DIY'], uploadDate: 'Mar 17, 2026' },
  { id: 4, title: 'Climate Science Explained Simply', channel: 'EcoEducate', description: 'Climate change can seem overwhelming — but it doesn\'t have to be. This video breaks down the core science in plain language, explaining greenhouse gases, feedback loops, tipping points, and what the data actually tells us about our planet\'s future.', views: '5.6M', likes: '201K', duration: '18:45', daysAgo: 7, imageIdx: 1, verified: true, subscribers: '2.4M', carbonScore: 0.04, type: 'video', tags: ['climate', 'science', 'education', 'explainer'], uploadDate: 'Mar 11, 2026' },
  { id: 5, title: 'Wind Turbine Farm — Inside Look', channel: 'RenewableTech', description: 'An exclusive inside look at how a 500MW offshore wind farm is built, maintained, and operated. We go inside the nacelles, speak with engineers, and explore the grid integration challenges that make large-scale wind energy viable.', views: '1.3M', likes: '54K', duration: '9:52', daysAgo: 3, imageIdx: 0, verified: true, subscribers: '890K', carbonScore: 0.05, type: 'video', tags: ['wind', 'renewable', 'engineering', 'offshore'], uploadDate: 'Mar 15, 2026' },
  { id: 6, title: 'Carbon Capture Technology 2026', channel: 'FuturePlanet', description: 'Carbon capture and storage is now commercially viable at scale. This video reviews the latest DAC (Direct Air Capture) installations, compares costs per tonne across different technologies, and evaluates the role of CCS in the net-zero pathway.', views: '3.8M', likes: '130K', duration: '31:20', daysAgo: 10, imageIdx: 1, verified: true, subscribers: '1.1M', carbonScore: 0.06, type: 'video', tags: ['carbon-capture', 'CCS', 'climate-tech', 'net-zero'], uploadDate: 'Mar 8, 2026' },
];

const COMMENTS: ZComment[] = [
  { id: 1, author: 'GreenEngineer42', avatarIdx: 0, text: 'This is the most comprehensive explanation of solar panel technology I\'ve seen. The efficiency comparison chart at 8:42 was particularly insightful.', likes: 1240, time: '2 days ago', liked: false, replies: [
    { id: 11, author: 'TechGreen Labs', avatarIdx: 2, text: 'Thank you! We spent a lot of time getting those efficiency numbers right. The monocrystalline vs. perovskite comparison surprised even us.', likes: 387, time: '2 days ago', liked: false },
    { id: 12, author: 'SolarFarmer_DE', avatarIdx: 1, text: 'Same! I installed 24 panels last summer and this video would have saved me weeks of research beforehand.', likes: 92, time: '1 day ago', liked: false },
  ]},
  { id: 2, author: 'EcoMaria', avatarIdx: 3, text: 'The carbon savings counter on ZStream makes me actually feel good about watching this. 0.05g CO₂/hr saved is small but it adds up at scale!', likes: 874, time: '1 day ago', liked: false },
  { id: 3, author: 'SkepticalViewer', avatarIdx: 1, text: 'Good video overall but you glossed over the manufacturing carbon cost of panels. That payback period needs to be addressed more honestly.', likes: 451, time: '18 hours ago', liked: false, replies: [
    { id: 31, author: 'TechGreen Labs', avatarIdx: 2, text: 'Fair point! We actually have a full video on manufacturing LCA (Life Cycle Assessment) coming next week that addresses exactly this.', likes: 288, time: '17 hours ago', liked: false },
  ]},
  { id: 4, author: 'ClimateActionNow', avatarIdx: 0, text: 'Shared this with my entire family. Finally a video that explains solar without trying to sell me something. Subscribing!', likes: 632, time: '14 hours ago', liked: false },
];

function fmtAge(d: number) {
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 30) return `${d} days ago`;
  return `${Math.floor(d / 30)} month${Math.floor(d / 30) > 1 ? 's' : ''} ago`;
}

function CarbonSavings({ carbonScore }: { carbonScore: number }) {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const savedGrams = ((seconds / 3600) * carbonScore).toFixed(4);

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold"
      style={{ background: 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.25)', color: 'rgb(0,229,186)' }}
      aria-live="polite"
    >
      <span>🌿</span>
      <span>You&apos;ve saved <strong>{savedGrams}g</strong> CO₂</span>
    </div>
  );
}

function CommentItem({ comment, depth = 0 }: { comment: ZComment; depth?: number }) {
  const [liked, setLiked] = React.useState(comment.liked ?? false);
  const [showReplies, setShowReplies] = React.useState(false);

  return (
    <div className={depth > 0 ? 'ml-10 mt-3' : 'mt-4'}>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden" style={{ border: '1px solid rgba(0,229,186,0.2)' }}>
          <Image src={contentImages.creators[comment.avatarIdx % contentImages.creators.length].url} alt={comment.author} width={32} height={32} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-xs font-semibold">{comment.author}</span>
            <span className="text-gray-600 text-[10px]">{comment.time}</span>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">{comment.text}</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => setLiked(l => !l)}
              className="flex items-center gap-1 text-[10px] transition-colors"
              style={{ color: liked ? 'rgb(239,68,68)' : 'rgb(107,114,128)' }}
              aria-label={liked ? 'Unlike' : 'Like'}
            >
              <svg className="w-3.5 h-3.5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.25M9 10.5H4.875a1.875 1.875 0 000 3.75H9" />
              </svg>
              {(comment.likes + (liked ? 1 : 0)).toLocaleString()}
            </button>
            {comment.replies && comment.replies.length > 0 && depth === 0 && (
              <button onClick={() => setShowReplies(r => !r)} className="text-[10px] font-semibold transition-colors hover:text-white" style={{ color: 'rgb(0,229,186)' }}>
                {showReplies ? 'Hide' : `${comment.replies.length} repl${comment.replies.length > 1 ? 'ies' : 'y'}`}
              </button>
            )}
            <button className="text-gray-600 hover:text-gray-400 text-[10px] transition-colors">Reply</button>
          </div>
          {showReplies && comment.replies && (
            <div>{comment.replies.map(r => <CommentItem key={r.id} comment={r} depth={depth + 1} />)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ZTubeWatchPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : (params.id ?? '1');
  const id = parseInt(rawId, 10);

  const video = VIDEOS.find(v => v.id === id) ?? VIDEOS[0];
  const related = VIDEOS.filter(v => v.id !== video.id).slice(0, 5);

  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'comments' | 'community'>('comments');
  const [commentText, setCommentText] = React.useState('');
  const [showDescription, setShowDescription] = React.useState(false);
  const [comments, setComments] = React.useState<ZComment[]>(COMMENTS);
  const [shareToast, setShareToast] = React.useState(false);

  const handleLike = () => { setLiked(l => !l); if (disliked) setDisliked(false); };
  const handleDislike = () => { setDisliked(d => !d); if (liked) setLiked(false); };
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments(prev => [{
      id: Date.now(),
      author: 'You',
      avatarIdx: 3,
      text: commentText.trim(),
      likes: 0,
      time: 'Just now',
      liked: false,
    }, ...prev]);
    setCommentText('');
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: '#0A0F18' }}>
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col xl:flex-row gap-6">

          {/* Left: Video + Info */}
          <div className="flex-1 min-w-0">

            {/* Player */}
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', background: 'rgba(0,0,0,0.9)' }}>
              <Image
                src={contentImages.abstract[video.imageIdx % contentImages.abstract.length].url}
                alt={video.title}
                fill
                sizes="(max-width: 1280px) 100vw, 900px"
                className="object-cover opacity-70"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.9)', boxShadow: '0 0 40px rgba(239,68,68,0.4)' }}
                  aria-label="Play video"
                >
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </motion.button>
              </div>
              <div className="absolute bottom-3 left-3">
                <CarbonSavings carbonScore={video.carbonScore} />
              </div>
              <div className="absolute bottom-3 right-3 text-xs font-bold text-white px-2 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.8)' }}>
                {video.duration}
              </div>
            </div>

            {/* Title + Actions */}
            <div className="mt-4">
              <h1 className="text-white font-black text-xl leading-snug mb-3">{video.title}</h1>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <span>{video.views} views</span>
                  <span>·</span>
                  <span>{fmtAge(video.daysAgo)}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(239,68,68,0.12)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.25)' }}>
                    {video.type === 'video' ? '🎬 Video' : video.type === 'music' ? '🎵 Music' : '🎙️ Podcast'}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { label: liked ? 'Liked' : video.likes, icon: <svg className="w-3.5 h-3.5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.25M9 10.5H4.875a1.875 1.875 0 000 3.75H9" /></svg>, onClick: handleLike, active: liked, activeStyle: { background: 'rgba(239,68,68,0.2)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.4)' } },
                    { label: 'Dislike', icon: <svg className="w-3.5 h-3.5" fill={disliked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.999 15 19.313 15h-1.394c-.757 0-1.317-.678-1.19-1.422 .313-1.774-.105-3.854-1.153-5.028a3.28 3.28 0 01-.78-1.3M9 10.5H4.875a1.875 1.875 0 000 3.75H9" /></svg>, onClick: handleDislike, active: disliked, activeStyle: { background: 'rgba(107,114,128,0.3)', color: 'rgb(209,213,219)', border: '1px solid rgba(107,114,128,0.5)' } },
                    { label: 'Share', icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>, onClick: handleShare, active: false, activeStyle: {} },
                    { label: saved ? 'Saved' : 'Save', icon: <svg className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>, onClick: () => setSaved(s => !s), active: saved, activeStyle: { background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' } },
                  ].map(btn => (
                    <button
                      key={btn.label}
                      onClick={btn.onClick}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={btn.active ? btn.activeStyle : { background: 'rgba(255,255,255,0.06)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {btn.icon}
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Channel Card */}
            <div className="mt-4 p-4 rounded-2xl flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid rgba(239,68,68,0.4)' }}>
                <Image src={contentImages.creators[video.id % contentImages.creators.length].url} alt={video.channel} width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-sm">{video.channel}</span>
                  {video.verified && (
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="rgb(0,229,186)">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                </div>
                <p className="text-gray-500 text-xs">{video.subscribers} subscribers</p>
              </div>
              <motion.button
                onClick={() => setSubscribed(s => !s)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-all"
                style={subscribed
                  ? { background: 'rgba(255,255,255,0.08)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.15)' }
                  : { background: 'rgba(239,68,68,0.85)', color: 'white' }
                }
                aria-pressed={subscribed}
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </motion.button>
            </div>

            {/* Description + Tags */}
            <div
              className="mt-3 p-4 rounded-2xl cursor-pointer select-none"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              onClick={() => setShowDescription(d => !d)}
              role="button"
              aria-expanded={showDescription}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {video.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(239,68,68,0.1)', color: 'rgb(252,165,165)' }}>#{tag}</span>
                    ))}
                  </div>
                  <p className={`text-gray-300 text-xs leading-relaxed ${showDescription ? '' : 'line-clamp-2'}`}>{video.description}</p>
                </div>
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5 transition-transform" style={{ transform: showDescription ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-gray-600 text-[10px] mt-2">{video.views} views · {video.uploadDate}</p>
            </div>

            {/* Comments / Community Tabs */}
            <div className="mt-5">
              <div className="flex gap-1 mb-4" role="tablist">
                {(['comments', 'community'] as const).map(tab => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 py-2 rounded-full text-xs font-bold capitalize transition-all"
                    style={activeTab === tab
                      ? { background: 'rgba(239,68,68,0.15)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.3)' }
                      : { background: 'transparent', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    {tab === 'comments' ? `💬 Comments (${comments.length})` : '🌿 Community'}
                  </button>
                ))}
              </div>

              {activeTab === 'comments' && (
                <div>
                  <form onSubmit={handlePostComment} className="flex gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
                      <Image src={contentImages.creators[3].url} alt="You" width={32} height={32} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-transparent border-b text-white text-xs placeholder-gray-600 outline-none pb-1.5 transition-colors"
                        style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                        aria-label="Comment text"
                      />
                      {commentText.trim() && (
                        <button type="submit" className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>Post</button>
                      )}
                    </div>
                  </form>
                  <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {comments.map(c => <CommentItem key={c.id} comment={c} />)}
                  </div>
                </div>
              )}

              {activeTab === 'community' && (
                <div className="space-y-3">
                  {[
                    { text: 'New video dropping this Friday — carbon capture in Antarctica! 🧊', likes: 2840, time: '1 day ago' },
                    { text: 'We hit 2 MILLION subscribers! Thank you all for being part of this green journey. 🌿', likes: 12400, time: '1 week ago' },
                  ].map((post, i) => (
                    <div key={i} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
                          <Image src={contentImages.creators[video.id % contentImages.creators.length].url} alt={video.channel} width={32} height={32} className="object-cover" />
                        </div>
                        <div>
                          <p className="text-white text-xs font-bold">{video.channel}</p>
                          <p className="text-gray-600 text-[10px]">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-200 text-xs leading-relaxed">{post.text}</p>
                      <p className="mt-2 text-gray-500 text-[10px]">❤️ {post.likes.toLocaleString()} likes</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Related Sidebar */}
          <div className="xl:w-80 flex-shrink-0">
            <h3 className="text-white font-bold text-sm mb-4">Up Next</h3>
            <div className="space-y-3">
              {related.map((v, i) => (
                <Link key={v.id} href={`/ztube/watch/${v.id}`}>
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ x: 3 }}
                    className="flex gap-3 group cursor-pointer"
                  >
                    <div className="relative w-32 flex-shrink-0 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <Image src={contentImages.abstract[v.imageIdx % contentImages.abstract.length].url} alt={v.title} fill sizes="128px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute bottom-1 right-1 text-[9px] font-bold text-white px-1 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.8)' }}>{v.duration}</div>
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <h4 className="text-white text-xs font-semibold line-clamp-2 leading-snug mb-1">{v.title}</h4>
                      <p className="text-gray-500 text-[10px] truncate">{v.channel}</p>
                      <p className="text-gray-600 text-[10px] mt-0.5">{v.views} views</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full mt-1 inline-block font-bold" style={{ background: 'rgba(0,229,186,0.08)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.15)' }}>
                        🌿 {v.carbonScore}g CO₂/hr
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* NetzDG Report */}
            <button
              className="w-full mt-6 flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgb(107,114,128)' }}
              aria-label="Report content (NetzDG/DSA)"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
              </svg>
              Report content (NetzDG / DSA)
            </button>

            {/* Carbon Info */}
            <div className="mt-4 p-4 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🌍</span>
                <span className="text-xs font-bold" style={{ color: 'rgb(0,229,186)' }}>Carbon Impact</span>
              </div>
              <p className="text-gray-300 text-[10px] leading-relaxed">
                This video runs on <strong>100% renewable energy</strong>. Viewing via ZStream saves{' '}
                <strong style={{ color: 'rgb(0,229,186)' }}>{video.carbonScore}g CO₂/hr</strong> vs. conventional CDN.
              </p>
              <p className="text-gray-600 text-[10px] mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                Verified by TÜV SÜD · Bureau Veritas
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-2xl text-xs font-bold z-50"
            style={{ background: 'rgba(10,18,30,0.95)', border: '1px solid rgba(0,229,186,0.3)', backdropFilter: 'blur(20px)', color: 'rgb(0,229,186)' }}
            role="alert"
          >
            ✓ Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
