'use client';
import React from 'react';
export default function AudioPlayer({ src }: { src: string }) {
const ref = React.useRef<HTMLAudioElement>(null);
return React.createElement('div', { className: 'p-4 bg-gray-800 rounded' }, React.createElement('audio', { ref, controls: true, className: 'w-full' }, React.createElement('source', { src, type: 'audio/mpeg' })));
}


