'use client';
import React from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hlsRef = React.useRef<Hls | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setError(null);

    const cleanup = () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) setError('Stream unavailable. Please try again later.');
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      setError('Your browser does not support HLS video playback.');
    }

    return cleanup;
  }, [src]);

  if (error) {
    return (
      <div className="w-full rounded bg-gray-900 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
        <p className="text-red-400 text-sm px-4 text-center">{error}</p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      controls
      className="w-full rounded"
      style={{ aspectRatio: '16/9' }}
      playsInline
    />
  );
}


