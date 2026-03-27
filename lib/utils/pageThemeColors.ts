/**
 * Theme-aware color utilities for pages
 * Centralized colors for light/dark theme that can be used across pages
 */

export const pageThemeColors = (isLight: boolean) => ({
  // Text colors
  heading: isLight ? '#1d1d1f' : 'white',
  subheading: isLight ? '#666666' : 'rgb(156,163,175)',
  muted: isLight ? '#888888' : 'rgb(107,114,128)',
  
  // Card/Container backgrounds
  cardBg: isLight ? 'rgba(255,255,255,0.4)' : 'rgba(15,25,35,0.85)',
  cardBorder: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.07)',
  cardHover: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.03)',
  
  // Overlay backgrounds
  overlay: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(10,18,30,0.98)',
  overlayBorder: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
  
  // UI Elements
  buttonBg: isLight ? 'rgba(0,234,175,0.1)' : 'rgba(255,255,255,0.04)',
  buttonHover: isLight ? 'rgba(0,234,175,0.15)' : 'rgba(255,255,255,0.06)',
  buttonActive: isLight ? 'rgba(0,234,175,0.2)' : 'rgba(0,234,175,0.2)',
  
  // Status colors
  liveBg: 'rgba(239,68,68,0.85)', // Always red
  liveBorder: 'rgba(239,68,68,0.25)',
  soonBg: isLight ? 'rgba(251,191,36,0.15)' : 'rgba(251,191,36,0.15)',
  soonText: 'rgb(251,191,36)',
  
  // Accent backgrounds
  accentBg: isLight ? 'rgba(0,234,175,0.08)' : 'rgba(0,229,186,0.08)',
  accentBorder: isLight ? 'rgba(0,234,175,0.15)' : 'rgba(0,229,186,0.2)',
  
  // Badge/Pill backgrounds
  pillBg: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.03)',
  pillBorder: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)',
  
  // Input/Search backgrounds
  inputBg: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.03)',
  inputBorder: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)',
  inputText: isLight ? '#1d1d1f' : 'white',
  
  // Tab/Filter backgrounds
  tabBg: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
  tabBorder: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)',
  
  // Gradient overlays
  gradientOverlay: isLight
    ? 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(240,244,247,0.95), rgba(255,255,255,1))'
    : 'linear-gradient(to bottom, rgba(18,18,18,0.8), rgba(18,18,18,0.88), rgba(18,18,18,1))',
});

export type PageThemeColors = ReturnType<typeof pageThemeColors>;
