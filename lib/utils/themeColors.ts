/**
 * Theme-aware color utilities for light/dark mode
 * Use these for consistent color application across pages
 */

export const themeColors = {
  // Primary text
  heading: (isLight: boolean) => isLight ? '#000000' : '#ffffff',
  subheading: (isLight: boolean) => isLight ? '#374151' : '#d1d5db',
  
  // Secondary text
  bodyText: (isLight: boolean) => isLight ? '#1f2937' : '#e5e7eb',
  mutedText: (isLight: boolean) => isLight ? '#6b7280' : '#9ca3af',
  lightText: (isLight: boolean) => isLight ? '#9ca3af' : '#6b7280',
  
  // Backgrounds
  cardBg: (isLight: boolean) => isLight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.03)',
  dividerBg: (isLight: boolean) => isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
  
  // Gradients for overlays
  overlayGradient: (isLight: boolean) => isLight
    ? 'linear-gradient(to bottom, rgba(240,244,247,0.9), rgba(238,241,245,0.92), rgba(240,244,247,1))'
    : 'linear-gradient(to bottom, rgba(18,18,18,0.8), rgba(18,18,18,0.88), rgba(18,18,18,1))',
};

/**
 * Get text color class name for Tailwind
 */
export const getTextColor = (isLight: boolean, colorType: 'heading' | 'body' | 'muted' | 'light' = 'body'): string => {
  if (isLight) {
    switch (colorType) {
      case 'heading': return 'text-black';
      case 'body': return 'text-gray-900';
      case 'muted': return 'text-gray-600';
      case 'light': return 'text-gray-500';
      default: return 'text-gray-900';
    }
  } else {
    switch (colorType) {
      case 'heading': return 'text-white';
      case 'body': return 'text-gray-100';
      case 'muted': return 'text-gray-400';
      case 'light': return 'text-gray-500';
      default: return 'text-gray-100';
    }
  }
};


