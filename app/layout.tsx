import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import DualLayerHeader from '../components/navigation/DualLayerHeader';
import PageWrapper from '../components/layout/PageWrapper';
import FloatingCarbonIndicator from '../components/carbon/FloatingCarbonIndicator';
import Footer from '../components/layout/Footer';
import MiniPlayer from '../components/music/MiniPlayer';
import NotificationCenter from '../components/notifications/NotificationCenter';
import BottomNav from '../components/navigation/BottomNav';
import ClientInit from '../components/layout/ClientInit';
import GlobalPageTranslator from '../components/layout/GlobalPageTranslator';
import { Toaster } from 'sonner';
import AuthProvider from '../components/layout/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const initDocumentStateScript = `(function(){try{var raw=window.localStorage.getItem('language-store');var lang='en';if(raw){var parsed=JSON.parse(raw);if(parsed&&parsed.state&&parsed.state.language==='de'){lang='de';}}document.documentElement.lang=lang;}catch(e){}})();`;

export const metadata: Metadata = {
  title: 'ZSTREAM ??? Zero Carbon Streaming Platform',
  description: 'AI-powered carbon-neutral streaming platform. Watch unlimited music, videos, shorts, sports and gaming while saving the planet.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'ZSTREAM',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#00E5BA',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initDocumentStateScript }} />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} bg-dark-base antialiased`}>
        <AuthProvider>
          <Toaster position="top-right" richColors closeButton />
          <ClientInit />
          <GlobalPageTranslator />
          <DualLayerHeader />
          <main id="main-content">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <Footer />
          <FloatingCarbonIndicator />
          <MiniPlayer />
          <NotificationCenter />
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
