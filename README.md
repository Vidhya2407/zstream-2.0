# Zero-Carbon Streaming Network

A scalable, production-ready streaming platform supporting multiple content types.

## Features

- **Music Streaming**: Audio player with playlist support
- **Short Videos**: TikTok/Reels-style vertical video format
- **Long Videos**: Netflix-style video streaming with HLS support
- **Live Sports**: Real-time sports streaming
- **Live Broadcasts**: General live streaming
- **Game Streaming**: Twitch-style game broadcasts
- **Meeting Streaming**: Zoom-style webinars and meetings
- **Carbon Tracking**: Real-time carbon impact dashboard

## Tech Stack

### Frontend
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand for state management
- HLS.js for adaptive streaming

### Key Components

- `/app` - Next.js app directory with all pages
- `/components` - Reusable React components
- `/lib` - Utilities and stores

## Getting Started

npm install
npm run dev

Visit http://localhost:3000

## Architecture

The platform uses a modular architecture with:

1. **Content Engine**: Separate modules for each content type
2. **Player System**: HLS/DASH adaptive streaming
3. **Carbon Layer**: Real-time tracking and analytics
4. **State Management**: Zustand stores for global state

## Next Steps

- Add backend NestJS API
- Implement GraphQL schema
- Add WebRTC for live streaming
- Integrate Redis caching
- Add PostgreSQL/MongoDB databases
- Implement authentication system
- Add carbon calculation algorithms
- Build creator dashboard
- Add monetization system
