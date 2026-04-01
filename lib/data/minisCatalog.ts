import type { LocalizedStringArray, LocalizedText } from '../types/content';

export interface MiniCatalogItem {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
  creator: string;
  verified: boolean;
  views: string;
  appreciations: number;
  shares: number;
  recycles: number;
  co2SavedTotal: number;
  waterSavedTotal: number;
  energySavedTotal: number;
  hashtags: LocalizedStringArray;
  music: LocalizedText;
}

export const minis: readonly MiniCatalogItem[] = [
  {
    id: 1,
    title: { en: '60 Second Climate Hack', de: '60-Sekunden-Klima-Hack' },
    description: {
      en: 'Transform your daily routine with this simple eco trick that can reduce your carbon footprint by 40%. Join millions making a difference!',
      de: 'Verwandle deinen Alltag mit diesem einfachen Eco-Trick, der deinen CO2-Fussabdruck um 40% senken kann. Mach mit und bewirke etwas!'
    },
    creator: 'EcoTips',
    verified: true,
    views: '2.4M',
    appreciations: 125000,
    shares: 45000,
    recycles: 8200,
    co2SavedTotal: 82.4,
    waterSavedTotal: 214,
    energySavedTotal: 12.6,
    hashtags: {
      en: ['#ClimateAction', '#EcoHacks', '#Sustainability'],
      de: ['#KlimaAktion', '#EcoHacks', '#Nachhaltigkeit']
    },
    music: { en: 'Green Energy Vibes - Eco Beats', de: 'Gruene Energie Vibes - Eco Beats' }
  },
  {
    id: 2,
    title: { en: 'Zero Waste Challenge', de: 'Zero-Waste-Challenge' },
    description: {
      en: 'Join the movement and reduce waste to zero with these 5 simple steps',
      de: 'Mach bei der Bewegung mit und reduziere Abfall mit diesen 5 einfachen Schritten auf null'
    },
    creator: 'GreenLife',
    verified: true,
    views: '1.8M',
    appreciations: 89000,
    shares: 32000,
    recycles: 5400,
    co2SavedTotal: 61.2,
    waterSavedTotal: 156,
    energySavedTotal: 9.1,
    hashtags: {
      en: ['#ZeroWaste', '#GreenLiving', '#EcoWarrior'],
      de: ['#ZeroWaste', '#GruenesLeben', '#EcoWarrior']
    },
    music: { en: 'Sustainable Rhythms - Clean Orchestra', de: 'Nachhaltige Rhythmen - Clean Orchestra' }
  },
  {
    id: 3,
    title: { en: 'Solar Power DIY', de: 'Solarstrom zum Selbermachen' },
    description: {
      en: 'Build your own solar panel in 5 minutes - no technical skills required!',
      de: 'Baue dein eigenes Solarpanel in 5 Minuten - ganz ohne technisches Vorwissen!'
    },
    creator: 'TechGreen',
    verified: true,
    views: '3.2M',
    appreciations: 156000,
    shares: 78000,
    recycles: 12500,
    co2SavedTotal: 124.8,
    waterSavedTotal: 342,
    energySavedTotal: 18.4,
    hashtags: {
      en: ['#Solar', '#DIY', '#RenewableEnergy'],
      de: ['#Solar', '#DIY', '#ErneuerbareEnergie']
    },
    music: { en: 'Planet Harmony - Earth Guardians', de: 'Planetare Harmonie - Earth Guardians' }
  }
] as const;


