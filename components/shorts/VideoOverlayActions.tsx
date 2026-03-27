'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface VideoOverlayActionsProps {
  appreciations: number;
  shares: number;
  recycles: number;
  comments?: number;
  interactions: {
    appreciated: boolean;
    saved: boolean;
    shared: boolean;
    recycled: boolean;
  };
  onInteraction: (type: 'appreciated' | 'saved' | 'shared' | 'recycled') => void;
}

export default function VideoOverlayActions({
  appreciations,
  shares,
  recycles,
  comments = 124,
  interactions,
  onInteraction
}: VideoOverlayActionsProps) {
  
  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const actions = [
    {
      id: 'appreciated',
      icon: LeafIcon,
      count: formatCount(appreciations + (interactions.appreciated ? 1 : 0)),
      active: interactions.appreciated,
      label: 'Appreciate'
    },
    {
      id: 'saved',
      icon: PlanetIcon,
      count: 'Save',
      active: interactions.saved,
      label: 'Save'
    },
    {
      id: 'shared',
      icon: SproutIcon,
      count: formatCount(shares + (interactions.shared ? 1 : 0)),
      active: interactions.shared,
      label: 'Share'
    },
    {
      id: 'recycled',
      icon: RecycleIcon,
      count: formatCount(recycles + (interactions.recycled ? 1 : 0)),
      active: interactions.recycled,
      label: 'Recycle'
    },
    {
      id: 'comment',
      icon: CommentIcon,
      count: formatCount(comments),
      active: false,
      label: 'Comment'
    }
  ];

  return (
    <motion.div
      className="flex flex-col"
      style={{ gap: '22px' }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {actions.map((action, index) => (
        <motion.div
          key={action.id}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.08 }}
        >
          <motion.button
            className="relative"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: action.active 
                ? 'rgba(0, 229, 186, 0.18)' 
                : 'rgba(10, 25, 35, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: action.active
                ? '1px solid rgba(0, 229, 186, 0.4)'
                : '1px solid rgba(0, 229, 186, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease'
            }}
            onClick={() => action.id !== 'comment' && onInteraction(action.id as any)}
            whileHover={{ 
              scale: 1.08,
              boxShadow: action.active 
                ? '0 0 20px rgba(0, 229, 186, 0.25), inset 0 0 12px rgba(0, 229, 186, 0.15)'
                : '0 0 16px rgba(0, 229, 186, 0.2), inset 0 0 8px rgba(0, 229, 186, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <action.icon active={action.active} />
          </motion.button>
          
          <span 
            className="text-[11px] font-medium mt-1.5 text-center"
            style={{
              color: action.active ? 'rgb(0, 229, 186)' : 'rgba(255, 255, 255, 0.7)',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
              transition: 'color 0.25s ease'
            }}
          >
            {action.count}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Minimalist Climate-Native Icons (22px, single color)

function LeafIcon({ active }: { active: boolean }) {
  return (
    <svg 
      width="22" 
      height="22" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={active ? 'rgb(0, 229, 186)' : 'rgb(0, 229, 186)'}
      strokeWidth={2}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M5 21c0-8 4-12 8-12s8 4 8 12M12 9c-3-6-6-6-8-4M12 9c3-6 6-6 8-4M12 9v12"
      />
    </svg>
  );
}

function PlanetIcon({ active }: { active: boolean }) {
  return (
    <svg 
      width="22" 
      height="22" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={active ? 'rgb(0, 229, 186)' : 'rgb(0, 229, 186)'}
      strokeWidth={2}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12c0-2 2-4 5-4s5 2 7 2 3-1 5-1" />
      <path d="M12 3c2 0 4 2 4 5s-2 5-2 7-1 3-1 5" />
    </svg>
  );
}

function SproutIcon({ active }: { active: boolean }) {
  return (
    <svg 
      width="22" 
      height="22" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={active ? 'rgb(0, 229, 186)' : 'rgb(0, 229, 186)'}
      strokeWidth={2}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z"
      />
      <path d="M12 12c2-2 4-4 6-4a3 3 0 010 6c-2 0-4-1-6-2z" />
      <circle cx="12" cy="20" r="1.5" />
    </svg>
  );
}

function RecycleIcon({ active }: { active: boolean }) {
  return (
    <svg 
      width="22" 
      height="22" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={active ? 'rgb(0, 229, 186)' : 'rgb(0, 229, 186)'}
      strokeWidth={2}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M7 6l-3 3m0 0l3 3M4 9h6m10 6l3-3m0 0l-3-3m3 3h-6M9 4l3 3m0 0l3-3m-3 3v6m0 8l-3-3m0 0l-3 3m3-3v-6"
      />
    </svg>
  );
}

function CommentIcon({ active }: { active: boolean }) {
  return (
    <svg 
      width="22" 
      height="22" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={active ? 'rgb(0, 229, 186)' : 'rgb(0, 229, 186)'}
      strokeWidth={2}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}
