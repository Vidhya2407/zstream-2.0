'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../lib/images/unsplash';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import { initialComments, type WatchComment } from './config';

function CommentCard({ comment, isReply = false, isLight, isGerman }: { comment: WatchComment; isReply?: boolean; isLight: boolean; isGerman: boolean }) {
  const [liked, setLiked] = React.useState(false);
  const [showReply, setShowReply] = React.useState(false);
  const title = isLight ? '#0f172a' : '#ffffff';
  const body = isLight ? '#334155' : '#d1d5db';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';

  return (
    <div className={isReply ? 'ml-10 mt-3' : ''}>
      <div className="flex gap-3">
        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full"><Image alt={comment.author} className="object-cover" fill src={comment.avatarUrl} /></div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2"><span className="text-xs font-semibold" style={{ color: title }}>{comment.author}</span>{comment.badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: `${comment.badge.color}15`, color: comment.badge.color, border: `1px solid ${comment.badge.color}30` }}>{comment.badge.label}</span>}<span className="ml-auto text-[10px]" style={{ color: faint }}>{comment.time}</span></div>
          <p className="mb-2 text-xs leading-relaxed" style={{ color: body }}>{comment.text}</p>
          <div className="flex items-center gap-4">
            <motion.button className="flex items-center gap-1.5 text-[11px] font-medium transition-colors" onClick={() => setLiked((value) => !value)} style={{ color: liked ? 'rgb(0,229,186)' : muted }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.92 }}><svg className="h-3.5 w-3.5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" strokeLinecap="round" strokeLinejoin="round" /></svg>{comment.likes + (liked ? 1 : 0)}</motion.button>
            {!isReply && <button className="text-[11px] font-medium transition-colors" style={{ color: muted }} onClick={() => setShowReply((value) => !value)}>{comment.replies?.length ? `${comment.replies.length} ${isGerman ? (comment.replies.length === 1 ? 'Antwort' : 'Antworten') : (comment.replies.length === 1 ? 'reply' : 'replies')}` : (isGerman ? 'Antworten' : 'Reply')}</button>}
          </div>
        </div>
      </div>
      <AnimatePresence>{showReply && comment.replies && <motion.div animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden" exit={{ height: 0, opacity: 0 }} initial={{ height: 0, opacity: 0 }}>{comment.replies.map((reply) => <CommentCard comment={reply} isReply isLight={isLight} isGerman={isGerman} key={reply.id} />)}</motion.div>}</AnimatePresence>
    </div>
  );
}

export default function CommentsTab() {
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';
  const [comments, setComments] = React.useState<WatchComment[]>(initialComments);
  const [newComment, setNewComment] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'top' | 'new'>('top');
  const [isPosting, setIsPosting] = React.useState(false);

  const sorted = [...comments].sort((a, b) => (sortBy === 'top' ? b.likes - a.likes : 0));
  const title = isLight ? '#0f172a' : '#ffffff';
  const body = isLight ? '#334155' : '#d1d5db';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';
  const panelBg = isLight ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.02)';
  const panelBorder = isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.06)';

  const handlePost = async () => {
    if (!newComment.trim()) return;
    setIsPosting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const next: WatchComment = { id: Date.now(), author: isGerman ? 'Du' : 'You', avatarUrl: contentImages.creators[0].url, text: newComment.trim(), time: isGerman ? 'Gerade eben' : 'Just now', likes: 0, badge: { label: isGerman ? 'Neues Mitglied' : 'New Member', color: 'rgb(0,229,186)' } };
    setComments((prev) => [next, ...prev]);
    setNewComment('');
    setIsPosting(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between"><div className="flex items-center gap-2"><h3 className="text-base font-bold" style={{ color: title }}>{comments.length} {isGerman ? 'Kommentare' : 'Comments'}</h3><span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: 'rgba(0,229,186,0.1)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.2)' }}>Community</span></div><div className="flex items-center gap-1 rounded-full p-0.5" style={{ background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.04)', border: panelBorder }}>{(['top', 'new'] as const).map((option) => <button className="rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-all" key={option} onClick={() => setSortBy(option)} style={{ background: sortBy === option ? 'rgba(0,229,186,0.15)' : 'transparent', color: sortBy === option ? 'rgb(0,229,186)' : muted }}>{option === 'top' ? 'Top' : (isGerman ? 'Neueste' : 'Newest')}</button>)}</div></div>
      <div className="mb-6 flex gap-3 rounded-xl p-4" style={{ background: panelBg, border: panelBorder }}><div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full"><Image alt={isGerman ? 'Du' : 'You'} className="object-cover" fill src={contentImages.creators[0].url} /></div><div className="flex-1"><textarea className="w-full resize-none bg-transparent text-xs leading-relaxed outline-none" style={{ color: title }} onChange={(event) => setNewComment(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) handlePost(); }} placeholder={isGerman ? 'Teile deine Gedanken zu diesem Inhalt...' : 'Share your thoughts on this content...'} rows={2} value={newComment} /><div className="mt-2 flex items-center justify-between"><span className="text-[10px]" style={{ color: faint }}>{isGerman ? 'Ctrl/Cmd + Enter zum Posten' : 'Ctrl/Cmd + Enter to post'}</span><motion.button className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold transition-all" disabled={!newComment.trim() || isPosting} onClick={handlePost} style={{ background: newComment.trim() ? 'rgba(0,229,186,0.9)' : (isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)'), color: newComment.trim() ? '#0A0F18' : muted }} whileHover={newComment.trim() ? { scale: 1.04 } : {}} whileTap={newComment.trim() ? { scale: 0.96 } : {}}>{isPosting ? <motion.div animate={{ rotate: 360 }} className="h-3 w-3 rounded-full border border-current border-t-transparent" transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} /> : <><svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{isGerman ? 'Posten' : 'Post'}</>}</motion.button></div></div></div>
      <div className="space-y-5">{sorted.map((comment, index) => <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} key={comment.id} transition={{ delay: index * 0.04 }}><CommentCard comment={comment} isLight={isLight} isGerman={isGerman} />{index < sorted.length - 1 && <div className="mt-5 border-t" style={{ borderColor: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.04)' }} />}</motion.div>)}</div>
      <motion.button className="mt-6 w-full rounded-xl py-3 text-xs font-semibold transition-all" style={{ border: panelBorder, color: muted, background: panelBg }} whileHover={{ backgroundColor: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.03)' }}>{isGerman ? 'Mehr Kommentare laden' : 'Load more comments'}</motion.button>
    </div>
  );
}

