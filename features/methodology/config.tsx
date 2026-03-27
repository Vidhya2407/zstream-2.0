export const methodologySectionStyles = [
  {
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12c0-2 2-4 5-4s5 2 7 2 3-1 5-1" />
        <path d="M12 3c2 0 4 2 4 5s-2 5-2 7-1 3-1 5" />
      </svg>
    ),
    color: 'rgba(0,229,186,0.12)',
    border: 'rgba(0,229,186,0.22)',
    iconBg: 'rgba(0,229,186,0.2)',
    textColor: 'text-eco-green',
    titleKey: 'methodology.sections.emissionsTitle',
    fallbackTitle: 'CO2 Emissions',
    contentKey: 'methodology.sections.emissionsContent',
  },
  {
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'rgba(0,128,255,0.1)',
    border: 'rgba(0,128,255,0.2)',
    iconBg: 'rgba(0,128,255,0.18)',
    textColor: 'text-blue-400',
    titleKey: 'methodology.sections.waterTitle',
    fallbackTitle: 'Water Usage',
    contentKey: 'methodology.sections.waterContent',
  },
  {
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M7 6l-3 3m0 0l3 3M4 9h6m10 6l3-3m0 0l-3-3m3 3h-6M9 4l3 3m0 0l3-3m-3 3v6m0 8l-3-3m0 0l-3 3m3-3v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'rgba(147,51,234,0.1)',
    border: 'rgba(147,51,234,0.2)',
    iconBg: 'rgba(147,51,234,0.18)',
    textColor: 'text-purple-400',
    titleKey: 'methodology.sections.ewasteTitle',
    fallbackTitle: 'E-Waste Reduction',
    contentKey: 'methodology.sections.ewasteContent',
  },
  {
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M5 21c0-8 4-12 8-12s8 4 8 12M12 9c-3-6-6-6-8-4M12 9c3-6 6-6 8-4M12 9v12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'rgba(0,229,186,0.08)',
    border: 'rgba(0,229,186,0.18)',
    iconBg: 'rgba(0,229,186,0.15)',
    textColor: 'text-eco-green',
    titleKey: 'methodology.sections.ecoModeTitle',
    fallbackTitle: 'Eco Mode',
    contentKey: 'methodology.sections.ecoModeContent',
  },
] as const;

export const methodologySourceKeys = [
  'methodology.sources.iea',
  'methodology.sources.carbonTrust',
  'methodology.sources.ieee',
  'methodology.sources.erl',
] as const;
