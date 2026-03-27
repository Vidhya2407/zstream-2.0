export type HomeFeatureIconKey = 'leaf' | 'spark' | 'globe';

export interface HomeFeatureDisplay {
  iconKey: HomeFeatureIconKey;
  hoverGradient: string;
  iconBackground: string;
  iconColor: string;
}

export const HOME_FEATURE_DISPLAY: HomeFeatureDisplay[] = [
  {
    iconKey: 'leaf',
    hoverGradient: 'linear-gradient(135deg, rgba(0, 229, 186, 0.4), transparent 70%)',
    iconBackground: 'rgba(0, 229, 186, 0.1)',
    iconColor: 'rgb(0, 229, 186)',
  },
  {
    iconKey: 'spark',
    hoverGradient: 'linear-gradient(135deg, rgba(0, 128, 255, 0.4), transparent 70%)',
    iconBackground: 'rgba(0, 128, 255, 0.1)',
    iconColor: 'rgb(96, 165, 250)',
  },
  {
    iconKey: 'globe',
    hoverGradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.4), transparent 70%)',
    iconBackground: 'rgba(147, 51, 234, 0.1)',
    iconColor: 'rgb(196, 132, 252)',
  },
];
