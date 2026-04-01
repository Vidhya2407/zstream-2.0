import type { HeroItem } from '../../components/home/HeroCarousel';
import type { ContentItem } from '../../components/home/ContentRow';
import { contentImages } from '../images/unsplash';

export const heroItems: Record<'en' | 'de', HeroItem[]> = {
  en: [
    { id: 1, title: 'Planet: A New Hope', description: "A groundbreaking documentary series exploring humanity's relationship with the natural world and the innovations powering our path to a sustainable future.", genre: 'Documentary', year: 2024, duration: '6 episodes', rating: 'PG', carbonScore: 0.07, type: 'video', href: '/watch/1', imageUrl: contentImages.hero[0].url, tags: ['#Documentary', '#Climate', '#Hope'] },
    { id: 2, title: 'Eco Championship Live', description: "The world's first carbon-neutral esports tournament, streaming live with real-time environmental impact tracking displayed for every viewer.", genre: 'Gaming', year: 2024, duration: 'Live Now', rating: 'E', carbonScore: 0.05, type: 'live', href: '/watch/2', imageUrl: contentImages.gaming[0].url, tags: ['#eSports', '#Live', '#GreenGaming'] },
    { id: 3, title: 'Green Beats: Season 3', description: "The world's most popular eco-conscious music festival, streamed in carbon-neutral 4K. 200+ artists, zero emissions, infinite energy.", genre: 'Music', year: 2024, duration: '8 hours', rating: 'E', carbonScore: 0.06, type: 'music', href: '/watch/3', imageUrl: contentImages.music[0].url, tags: ['#Music', '#Festival', '#ZeroEmissions'] },
  ],
  de: [
    { id: 1, title: 'Planet: Eine neue Hoffnung', description: 'Eine bahnbrechende Dokumentarserie uber das Verhaltnis der Menschheit zur Natur und die Innovationen auf dem Weg in eine nachhaltige Zukunft.', genre: 'Dokumentation', year: 2024, duration: '6 Folgen', rating: 'PG', carbonScore: 0.07, type: 'video', href: '/watch/1', imageUrl: contentImages.hero[0].url, tags: ['#Dokumentation', '#Klima', '#Hoffnung'] },
    { id: 2, title: 'Oeko-Meisterschaft live', description: 'Das weltweit erste klimaneutrale Esport-Turnier mit Live-Streaming und Umweltwirkungs-Tracking in Echtzeit fur alle Zuschauer.', genre: 'Gaming', year: 2024, duration: 'Jetzt live', rating: 'E', carbonScore: 0.05, type: 'live', href: '/watch/2', imageUrl: contentImages.gaming[0].url, tags: ['#ESport', '#Live', '#GreenGaming'] },
    { id: 3, title: 'Green Beats: Staffel 3', description: 'Das beliebteste umweltbewusste Musikfestival der Welt, klimaneutral in 4K gestreamt. Mehr als 200 Artists, null Emissionen, unendliche Energie.', genre: 'Musik', year: 2024, duration: '8 Stunden', rating: 'E', carbonScore: 0.06, type: 'music', href: '/watch/3', imageUrl: contentImages.music[0].url, tags: ['#Musik', '#Festival', '#ZeroEmissions'] },
  ],
};

export const trendingItems: Record<'en' | 'de', ContentItem[]> = {
  en: [
    { id: 1, title: 'Eco Beats Radio', subtitle: '24/7 Carbon-Free Music', href: '/music', type: 'music', genre: 'Music', carbonScore: 0.06, imageUrl: contentImages.music[0].url, duration: 'Live' },
    { id: 2, title: 'Climate Action Documentary', subtitle: 'Featured Series', href: '/movies', type: 'video', genre: 'Documentary', carbonScore: 0.08, imageUrl: contentImages.hero[0].url, duration: '52 min' },
    { id: 3, title: 'Green Tips Daily', subtitle: '2.5M views', href: '/minis', type: 'minis', genre: 'Minis', carbonScore: 0.04, imageUrl: contentImages.minis[0].url, duration: '60 sec' },
    { id: 4, title: 'Live Sports: Eco Championship', subtitle: '125K watching', href: '/sports', type: 'live', genre: 'Sports', carbonScore: 0.09, imageUrl: contentImages.sports[0].url, duration: 'Live' },
  ],
  de: [
    { id: 1, title: 'Eco Beats Radio', subtitle: '24/7 kohlenstofffreie Musik', href: '/music', type: 'music', genre: 'Music', carbonScore: 0.06, imageUrl: contentImages.music[0].url, duration: 'Live' },
    { id: 2, title: 'Klimawandel-Dokumentation', subtitle: 'Empfohlene Serie', href: '/movies', type: 'video', genre: 'Documentary', carbonScore: 0.08, imageUrl: contentImages.hero[0].url, duration: '52 Min' },
    { id: 3, title: 'Grune Tipps taglich', subtitle: '2,5 Mio. Aufrufe', href: '/minis', type: 'minis', genre: 'Minis', carbonScore: 0.04, imageUrl: contentImages.minis[0].url, duration: '60 Sek' },
    { id: 4, title: 'Live-Sport: Oeko-Meisterschaft', subtitle: '125 Tsd. sehen zu', href: '/sports', type: 'live', genre: 'Sports', carbonScore: 0.09, imageUrl: contentImages.sports[0].url, duration: 'Live' },
  ],
};

export const continueWatchingItems: Record<'en' | 'de', ContentItem[]> = {
  en: [
    { id: 201, title: 'Planet: A New Hope', subtitle: 'Ep 3 of 6', href: '/watch/1', type: 'video', genre: 'Documentary', carbonScore: 0.07, imageUrl: contentImages.hero[0].url, progress: 62, duration: '28 min left' },
    { id: 202, title: 'Green Beats: Season 3', subtitle: 'Festival Set 2', href: '/watch/3', type: 'music', genre: 'Music', carbonScore: 0.06, imageUrl: contentImages.music[0].url, progress: 35, duration: '1h 12m left' },
    { id: 203, title: 'Quantum Forest', subtitle: 'Sci-Fi Series | Ep 5', href: '/watch/5', type: 'video', genre: 'Sci-Fi', carbonScore: 0.07, imageUrl: contentImages.abstract[1].url, progress: 20, duration: '42 min left' },
  ],
  de: [
    { id: 201, title: 'Planet: Eine neue Hoffnung', subtitle: 'Folge 3 von 6', href: '/watch/1', type: 'video', genre: 'Documentary', carbonScore: 0.07, imageUrl: contentImages.hero[0].url, progress: 62, duration: '28 Min verbleibend' },
    { id: 202, title: 'Green Beats: Staffel 3', subtitle: 'Festival-Set 2', href: '/watch/3', type: 'music', genre: 'Music', carbonScore: 0.06, imageUrl: contentImages.music[0].url, progress: 35, duration: '1 Std 12 Min verbleibend' },
    { id: 203, title: 'Quantum Forest', subtitle: 'Sci-Fi-Serie | Folge 5', href: '/watch/5', type: 'video', genre: 'Sci-Fi', carbonScore: 0.07, imageUrl: contentImages.abstract[1].url, progress: 20, duration: '42 Min verbleibend' },
  ],
};

export const newReleaseItems: Record<'en' | 'de', ContentItem[]> = {
  en: [
    { id: 101, title: 'The Green Grid', subtitle: 'New | Documentary', href: '/movies', type: 'video', genre: 'Documentary', carbonScore: 0.07, imageUrl: contentImages.climate[1].url, year: 2024, duration: '1h 38m' },
    { id: 102, title: 'Midnight Forest', subtitle: 'New | Nature', href: '/movies', type: 'video', genre: 'Nature', carbonScore: 0.08, imageUrl: contentImages.hero[2].url, year: 2024, duration: '58 min' },
    { id: 103, title: 'Pixel & Planet', subtitle: 'New | Gaming', href: '/gaming', type: 'gaming', genre: 'Gaming', carbonScore: 0.05, imageUrl: contentImages.gaming[1].url, year: 2024, duration: '2h 10m' },
  ],
  de: [
    { id: 101, title: 'Das grune Netz', subtitle: 'Neu | Dokumentation', href: '/movies', type: 'video', genre: 'Documentary', carbonScore: 0.07, imageUrl: contentImages.climate[1].url, year: 2024, duration: '1 Std 38 Min' },
    { id: 102, title: 'Mitternachtswald', subtitle: 'Neu | Natur', href: '/movies', type: 'video', genre: 'Nature', carbonScore: 0.08, imageUrl: contentImages.hero[2].url, year: 2024, duration: '58 Min' },
    { id: 103, title: 'Pixel und Planet', subtitle: 'Neu | Gaming', href: '/gaming', type: 'gaming', genre: 'Gaming', carbonScore: 0.05, imageUrl: contentImages.gaming[1].url, year: 2024, duration: '2 Std 10 Min' },
  ],
};

export const watchHistoryItems: Record<'en' | 'de', ContentItem[]> = {
  en: [
    { id: 301, title: 'ReWild Remix EP', subtitle: 'Because you listened to Eco Beats', href: '/music', type: 'music', genre: 'Music', carbonScore: 0.05, imageUrl: contentImages.music[1].url, duration: '42 min' },
    { id: 302, title: 'Ocean Warriors', subtitle: 'Because you watched Planet', href: '/watch/4', type: 'video', genre: 'Nature', carbonScore: 0.08, imageUrl: contentImages.climate[0].url, duration: '44 min' },
    { id: 303, title: 'Climate Innovators', subtitle: 'Because you watched Tech Talk', href: '/live', type: 'live', genre: 'Tech', carbonScore: 0.07, imageUrl: contentImages.live[0].url, duration: 'Live' },
  ],
  de: [
    { id: 301, title: 'ReWild Remix EP', subtitle: 'Weil du Eco Beats gehort hast', href: '/music', type: 'music', genre: 'Music', carbonScore: 0.05, imageUrl: contentImages.music[1].url, duration: '42 Min' },
    { id: 302, title: 'Ocean Warriors', subtitle: 'Weil du Planet gesehen hast', href: '/watch/4', type: 'video', genre: 'Nature', carbonScore: 0.08, imageUrl: contentImages.climate[0].url, duration: '44 Min' },
    { id: 303, title: 'Klima-Innovatoren', subtitle: 'Weil du Tech Talk gesehen hast', href: '/live', type: 'live', genre: 'Tech', carbonScore: 0.07, imageUrl: contentImages.live[0].url, duration: 'Live' },
  ],
};

export const featuredGridItems = {
  en: [
    { title: 'Eco Beats Radio', subtitle: '24/7 Carbon-Free Music', href: '/music', type: 'music' as const, carbonScore: 0.06, genre: 'Music' },
    { title: 'Climate Action Documentary', subtitle: 'Featured Series', href: '/movies', type: 'video' as const, carbonScore: 0.08, genre: 'Documentary' },
    { title: 'Live Sports: Eco Championship', subtitle: '125K watching', href: '/sports', type: 'live' as const, carbonScore: 0.09, genre: 'Sports' },
  ],
  de: [
    { title: 'Eco Beats Radio', subtitle: '24/7 kohlenstofffreie Musik', href: '/music', type: 'music' as const, carbonScore: 0.06, genre: 'Musik' },
    { title: 'Klimawandel-Dokumentation', subtitle: 'Empfohlene Serie', href: '/movies', type: 'video' as const, carbonScore: 0.08, genre: 'Dokumentation' },
    { title: 'Live-Sport: Oeko-Meisterschaft', subtitle: '125 Tsd. sehen zu', href: '/sports', type: 'live' as const, carbonScore: 0.09, genre: 'Sport' },
  ],
};

export const sectionCopy = {
  en: {
    why: 'Why ZSTREAM',
    builtFor: 'Built for the',
    future: "Planet's Future",
    featureText: 'Every design decision, every infrastructure choice - made with climate impact at the center.',
    impact: 'Live Platform Impact',
    savedToday: 'saved today',
    streamersLine: 'by 2.4M streamers choosing green entertainment',
    liveTracking: 'Live tracking active',
    curated: 'AI Curated',
    topPicks: 'Top Picks',
    forYou: 'For You',
    viewAll: 'View all',
    commitment: 'Our Commitment',
    everyStream: 'Every Stream,',
    carbonNeutral: 'Carbon Neutral.',
    commitmentText: 'Our infrastructure runs on 100% renewable energy. We offset every byte streamed with verified carbon credits.',
    learnMore: 'Learn More',
    getStarted: 'Get Started Free',
    streamEverything: 'Stream everything.',
    emitNothing: 'Emit nothing.',
    movement: "Join the movement. Your entertainment shapes the planet's future.",
    startFree: "Get Started - It's Free",
    pricing: 'View Pricing',
    stats: [
      { value: '2.4M', label: 'Active Streamers', color: 'rgb(0, 229, 186)' },
      { value: '1,284 kg', label: 'CO2 Saved Today', color: 'rgb(0, 217, 255)' },
      { value: '98%', label: 'Renewable Energy', color: 'rgb(96, 165, 250)' },
      { value: '156', label: 'Trees Saved', color: 'rgb(196, 132, 252)' },
    ],
  },
  de: {
    why: 'Warum ZSTREAM',
    builtFor: 'Gebaut fur die',
    future: 'Zukunft des Planeten',
    featureText: 'Jede Designentscheidung, jede Infrastrukturwahl - mit Klimaauswirkungen im Mittelpunkt.',
    impact: 'Live-Plattformwirkung',
    savedToday: 'heute eingespart',
    streamersLine: 'von 2,4 Mio. Streamern, die grune Unterhaltung wahlen',
    liveTracking: 'Live-Tracking aktiv',
    curated: 'KI-kuratiert',
    topPicks: 'Top-Auswahl',
    forYou: 'fur dich',
    viewAll: 'Alle ansehen',
    commitment: 'Unser Versprechen',
    everyStream: 'Jeder Stream,',
    carbonNeutral: 'klimaneutral.',
    commitmentText: 'Unsere Infrastruktur lauft mit 100 % erneuerbarer Energie. Wir gleichen jedes gestreamte Byte mit verifizierten CO2-Zertifikaten aus.',
    learnMore: 'Mehr erfahren',
    getStarted: 'Kostenlos starten',
    streamEverything: 'Alles streamen.',
    emitNothing: 'Nichts ausstoßen.',
    movement: 'Werde Teil der Bewegung. Deine Unterhaltung gestaltet die Zukunft des Planeten.',
    startFree: 'Loslegen - kostenlos',
    pricing: 'Preise ansehen',
    stats: [
      { value: '2.4M', label: 'Aktive Streamer', color: 'rgb(0, 229, 186)' },
      { value: '1,284 kg', label: 'Heute eingespartes CO2', color: 'rgb(0, 217, 255)' },
      { value: '98%', label: 'Erneuerbare Energie', color: 'rgb(96, 165, 250)' },
      { value: '156', label: 'Gerettete Baume', color: 'rgb(196, 132, 252)' },
    ],
  },
} as const;

export const features = {
  en: [
    { title: 'Zero Carbon Streaming', description: 'Every stream is powered by 100% renewable energy with real-time CO2 tracking per viewer.' },
    { title: 'AI-Powered Curation', description: 'Machine learning selects the most energy-efficient stream route for every viewer globally.' },
    { title: 'Global Impact Network', description: 'Join 2.4M streamers collectively saving 1,200 tonnes of CO2 every single month.' },
  ],
  de: [
    { title: 'Kohlenstofffreies Streaming', description: 'Jeder Stream wird mit 100 % erneuerbarer Energie betrieben und bietet CO2-Tracking in Echtzeit pro Zuschauer.' },
    { title: 'KI-gestutzte Kuratierung', description: 'Maschinelles Lernen wahlt weltweit fur jeden Zuschauer die energieeffizienteste Stream-Route aus.' },
    { title: 'Globales Impact-Netzwerk', description: 'Schliesse dich 2,4 Mio. Streamern an, die gemeinsam jeden Monat 1.200 Tonnen CO2 einsparen.' },
  ],
} as const;


