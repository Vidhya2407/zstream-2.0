'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLanguageStore } from '../../lib/stores/languageStore';

type Language = 'en' | 'de';

const EXACT_TRANSLATIONS: Record<string, string> = {
  'Music Library': 'Musikbibliothek',
  'Carbon-free streaming · GEMA licensed': 'Kohlenstofffreies Streaming · GEMA-lizenziert',
  'Featured Station': 'Empfohlener Sender',
  'Listen Now': 'Jetzt hoeren',
  'Library': 'Bibliothek',
  'Artists': 'Kuenstler',
  'Albums': 'Alben',
  'Playlists': 'Playlists',
  'Play All': 'Alle abspielen',
  'Carbon-Free Audio Streaming': 'Kohlenstofffreies Audio-Streaming',
  'Audio uses 94% less energy than video. Every minute saves 0.002g CO2.': 'Audio verbraucht 94 % weniger Energie als Video. Jede Minute spart 0.002 g CO2.',
  'CO2/min saved': 'CO2/Min eingespart',
  'GEMA Licensing Notice': 'Hinweis zur GEMA-Lizenzierung',
  'Understood': 'Verstanden',

  'Eco Beats Radio': 'Eco Beats Radio',
  '24/7 Carbon-Free Music': '24/7 kohlenstofffreie Musik',
  'Carbon Neutral Vibes': 'Kohlenstofffreie Vibes',
  'Sustainable Rhythms': 'Nachhaltige Rhythmen',
  'Planet Harmony': 'Planetare Harmonie',
  'Solar Wind': 'Sonnenwind',
  'Ocean Waves Digital': 'Digitale Ozeanwellen',
  'Forest Morning': 'Waldmorgen',
  'Rewild Anthem': 'Rewild-Hymne',
  'Zero Emission Groove': 'Null-Emissions-Groove',
  'Electric Earth': 'Elektrische Erde',
  'Nature Calls': 'Die Natur ruft',
  'Deep Blue': 'Tiefblau',
  'Focus & Flow': 'Fokus & Flow',
  'Eco Morning': 'Eco-Morgen',
  'Night Forest': 'Nachtwald',
  'Start your day with earth-inspired sounds': 'Beginne deinen Tag mit erdinspirierten Klaengen',
  'Ambient soundscapes for peaceful evenings': 'Atmosphaerische Klangwelten fuer friedliche Abende',
  'Electronic dance for the sustainable generation': 'Elektronischer Dance fuer die nachhaltige Generation',
  'Movies': 'Filme',
  'Curated & licensed · Carbon-neutral delivery': 'Kuratiert und lizenziert · Klimaneutrale Auslieferung',
  'Featured': 'Empfohlen',
  'Carbon Neutral': 'Klimaneutral',
  'Watch Now': 'Jetzt ansehen',
  '+ Watchlist': '+ Merkliste',
  'In Watchlist': 'In Merkliste',
  'Your rating:': 'Deine Bewertung:',
  'Carbon per watch': 'CO2 pro Wiedergabe',
  'Search movies...': 'Filme suchen...',
  'Most Popular': 'Am beliebtesten',
  'Top Rated': 'Bestbewertet',
  'Newest': 'Neueste',
  'Carbon Score': 'CO2-Wert',
  'Watchlist': 'Merkliste',
  'No movies found': 'Keine Filme gefunden',
  'Rate this movie': 'Diesen Film bewerten',
  'Remove from watchlist': 'Aus der Merkliste entfernen',
  'Add to watchlist': 'Zur Merkliste hinzufuegen',
  'Grid view': 'Rasteransicht',
  'List view': 'Listenansicht',
  'Toggle watchlist': 'Merkliste umschalten',

  'Live Sports': 'Live-Sport',
  'Scores · Fixtures · Highlights · Broadcasts · Zero emissions': 'Ergebnisse · Spielplaene · Highlights · Uebertragungen · Null Emissionen',
  '100% Carbon-Neutral Streaming': '100 % klimaneutrales Streaming',
  'Live Scores': 'Live-Ergebnisse',
  'Fixtures': 'Spielplaene',
  'Highlights': 'Highlights',
  'Broadcasts': 'Uebertragungen',
  'Search...': 'Suchen...',
  'Live Match Scores': 'Live-Spielstaende',
  'Live Updates': 'Live-Updates',
  'Upcoming Fixtures': 'Kommende Spielplaene',
  'Set Reminder': 'Erinnerung setzen',
  'Highlights Reels': 'Highlight-Clips',
  'Full Broadcasts': 'Komplette Uebertragungen',
  'No highlights match your filters.': 'Keine Highlights passen zu deinen Filtern.',
  'No broadcasts match your filters.': 'Keine Uebertragungen passen zu deinen Filtern.',
  'Widevine DRM': 'Widevine DRM',
  'Soon': 'Bald',
  'Today': 'Heute',
  'Tomorrow': 'Morgen',
  'Yesterday': 'Gestern',

  'Live Streams': 'Live-Streams',
  'Real-time streaming · Carbon-offset per minute': 'Echtzeit-Streaming · CO2-Ausgleich pro Minute',
  'CO2 offset': 'CO2-Ausgleich',
  'min live': 'Min live',
  'Health': 'Status',
  'Stream Health': 'Stream-Status',
  'Bitrate': 'Bitrate',
  'Latency': 'Latenz',
  'Quality': 'Qualitaet',
  'Watch Live': 'Live ansehen',
  'All Live Channels': 'Alle Live-Kanaele',
  'Live Chat': 'Live-Chat',
  'Say something...': 'Schreib etwas...',
  'Send': 'Senden',
  'WebSocket · End-to-end encrypted': 'WebSocket · Ende-zu-Ende verschluesselt',

  'Game Streaming': 'Game-Streaming',
  'Cloud gaming · Tournaments · Leaderboards · Zero carbon': 'Cloud-Gaming · Turniere · Ranglisten · Null Emissionen',
  'Game Library': 'Spielebibliothek',
  'Tournaments': 'Turniere',
  'Leaderboard': 'Rangliste',
  'Cloud Gaming': 'Cloud-Gaming',
  'Tournament Bracket - Solar Clash World Cup': 'Turnierbaum - Solar Clash World Cup',
  'Grand Final Prize': 'Preis des Grand Finales',
  'Winner donates 10% to verified reforestation projects': 'Der Gewinner spendet 10 % an verifizierte Wiederaufforstungsprojekte.',
  'Global Leaderboard - Solar Clash': 'Globale Rangliste - Solar Clash',
  'Player': 'Spieler',
  'Score': 'Punktzahl',
  'Wins': 'Siege',
  'Flag': 'Flagge',

  'Green Meetings': 'Gruene Meetings',
  'WebRTC video rooms · Carbon savings vs in-person · Zero emissions': 'WebRTC-Videoraeume · CO2-Einsparungen gegenueber Praesenztreffen · Null Emissionen',
  'Join with Code': 'Mit Code beitreten',
  'Join a Room': 'Einem Raum beitreten',
  'Enter an ECO room code to join a video call': 'Gib einen ECO-Raumcode ein, um einem Videoanruf beizutreten.',
  'Join Now ->': 'Jetzt beitreten ->',
  'Cancel': 'Abbrechen',
  'Create Room': 'Raum erstellen',
  'Schedule': 'Planen',
  'Participants': 'Teilnehmer',
  'Room Setup': 'Raumkonfiguration',
  'Room Name': 'Raumname',
  'Room Code': 'Raumcode',
  'Share this code with participants to join your room': 'Teile diesen Code mit Teilnehmern, damit sie deinem Raum beitreten koennen.',
  'Regenerate': 'Neu generieren',
  'Carbon Savings vs In-Person': 'CO2-Einsparung gegenueber Praesenz',
  'Virtual meeting': 'Virtuelles Meeting',
  'In-person equivalent': 'Praesenz-Equivalent',
  'You save': 'Du sparst',
  'Start Meeting Now': 'Meeting jetzt starten',
  'Schedule a Meeting': 'Ein Meeting planen',
  'Meeting Title': 'Meeting-Titel',
  'Date': 'Datum',
  'Time': 'Uhrzeit',
  'Schedule Meeting': 'Meeting planen',
  'Upcoming Meetings': 'Kommende Meetings',
  'Starting Soon': 'Beginnt gleich',
  'Scheduled': 'Geplant',
  'Live Session - Climate Policy Q&A': 'Live-Sitzung - Klima-Politik Q&A',
  'Recording': 'Aufnahme',
  'Session Carbon Impact': 'CO2-Wirkung der Sitzung',
  'CO2 saved this session': 'CO2 in dieser Sitzung eingespart',
  'Participants connected': 'Teilnehmer verbunden',
  'Session duration': 'Sitzungsdauer',

  'Green Marketplace': 'Gruener Marktplatz',
  'Carbon credits, eco merch, and sustainable digital goods': 'CO2-Zertifikate, umweltfreundlicher Merch und nachhaltige digitale Gueter',
  'Featured Drop': 'Empfohlener Drop',
  'Annual Carbon Offset Bundle': 'Jahrespaket fuer CO2-Ausgleich',
  'Offset 10 tonnes of CO2 - enough for one average household': 'Gleiche 10 Tonnen CO2 aus - genug fuer einen durchschnittlichen Haushalt',
  'All Items': 'Alle Artikel',
  'Buy': 'Kaufen',
  'Popular': 'Beliebt',
  'New': 'Neu',
  'Best Value': 'Bestes Angebot',
  'Bundle': 'Bundle',
  'Credits': 'Zertifikate',
  'Plan': 'Tarif',

  'Media Series': 'Serien',
  'Episodic content · ZSTREAM Originals · Licensed broadcasts': 'Episodische Inhalte · ZSTREAM Originals · Lizenzierte Ausstrahlungen',
  'Continue Watching': 'Weiter ansehen',
  'By Genre': 'Nach Genre',
  'Search series...': 'Serien suchen...',
  'ZSTREAM Originals': 'ZSTREAM Originals',
  'Continue S2 E3': 'Weiter mit S2 E3',
  'No series in progress': 'Keine Serie in Bearbeitung',
  'No series found': 'Keine Serie gefunden',
  'Ongoing': 'Laufend',
  'Complete': 'Abgeschlossen',
  'Rate ->': 'Bewerten ->',
  'Watched all episodes': 'Alle Folgen angesehen',

  'Creator videos · Music · Podcasts · Zero-carbon streaming': 'Creator-Videos · Musik · Podcasts · Kohlenstofffreies Streaming',
  'Search ZTube...': 'ZTube durchsuchen...',
  'Search ZTube': 'ZTube durchsuchen',
  'Clear search': 'Suche leeren',
  'Creator Studio': 'Creator Studio',
  'For You': 'Fuer dich',
  'Trending': 'Im Trend',
  'Subscriptions': 'Abos',
  'Creators': 'Creator',
  'Videos': 'Videos',
  'Music': 'Musik',
  'Podcasts': 'Podcasts',
  'Top Eco Creators': 'Top Eco Creator',
  'Subscribers': 'Abonnenten',
  'Subscribe': 'Abonnieren',
  'Trending Now': 'Jetzt im Trend',
  'New Uploads': 'Neue Uploads',
  'Music & Audio': 'Musik und Audio',
  'Search': 'Suche',
  'Search content': 'Inhalte suchen',
  'Trending searches': 'Trend-Suchen',
  'Filters': 'Filter',
  'Type': 'Typ',
  'Language': 'Sprache',
  'Min Carbon Score': 'Min. CO2-Score',
  'Minimum carbon score filter': 'Filter fuer minimalen CO2-Score',
  'Reset filters': 'Filter zuruecksetzen',
  'No results found': 'Keine Ergebnisse gefunden',
  'Try adjusting filters or search terms': 'Passe Filter oder Suchbegriffe an',
  'Download for Offline': 'Fuer Offline ansehen herunterladen',
  'Downloads are encrypted with Widevine L1 DRM.': 'Downloads sind mit Widevine L1 DRM verschluesselt.',
  'Premium Required': 'Premium erforderlich',
  'Upgrade to Premium': 'Auf Premium upgraden',
  'Download': 'Herunterladen',
  'Downloading': 'Wird heruntergeladen',
  'Saved': 'Gespeichert',
  'Upgrade': 'Upgrade',
  'Watchlisted': 'Auf der Merkliste',
  'Add to List': 'Zur Liste hinzufuegen',
  'Carbon Impact Dashboard': 'CO2-Impact-Dashboard',
  'Streaming Time': 'Streaming-Zeit',
  'Water Saved': 'Wasser gespart',
  'Energy Saved': 'Energie gespart',
  'Trees Saved': 'Baeume gerettet',
  'Total saved': 'Insgesamt gespart',
  'Total CO2 Saved': 'Gesamtes eingespartes CO2',
  'E-Waste Avoided': 'E-Schrott vermieden',
  'vs industry avg': 'gegenueber Branchenschnitt',
  'data center cooling': 'Rechenzentrumskuehlung',
  'hardware lifecycle': 'Hardware-Lebenszyklus',
  'Views': 'Aufrufe',
  'Your rating saved': 'Deine Bewertung wurde gespeichert',
  'Rate this film': 'Diesen Film bewerten',
  'Premium': 'Premium',
  'Free stream': 'Kostenloser Stream',
  'Search movies, series, music, creators...': 'Filme, Serien, Musik und Creator suchen...',
  'Content Not Found': 'Inhalt nicht gefunden',
  'This content may have been removed or is unavailable.': 'Dieser Inhalt wurde moeglicherweise entfernt oder ist nicht verfuegbar.',
  'Back to Home': 'Zur Startseite',
  'Overview': 'Ueberblick',
  'Cast & Crew': 'Besetzung & Team',
  'Community': 'Community',
  'Downloads': 'Downloads',
  'Home': 'Startseite',
  'Live Now': 'Jetzt live',
  'Share': 'Teilen',
  'About': 'Info',
  'Director / Creator': 'Regie / Creator',
  'Year': 'Jahr',
  'Runtime': 'Laufzeit',
  'Age Rating': 'Altersfreigabe',
  'Production': 'Produktion',
  'Director / Executive Producer': 'Regie / Executive Producer',
  'Quick Info': 'Kurzinfo',
  'Max Quality': 'Max. Qualitaet',
  'Available': 'Verfuegbar',
  'Energy Source': 'Energiequelle',
  '100% Renewable': '100 % erneuerbar',
  'Live Carbon Impact': 'Live-CO2-Impact',
  'CO2 saved watching this': 'CO2 beim Ansehen gespart',
  'vs Industry': 'vs. Branche',
  'Streaming efficiency': 'Streaming-Effizienz',
  'ZSTREAM vs Industry': 'ZSTREAM vs. Branche',
  'Favourite': 'Favorit',
  'Report Content (NetzDG / DSA)': 'Inhalt melden (NetzDG / DSA)',
  'Report content (NetzDG/DSA)': 'Inhalt melden (NetzDG/DSA)',
  'Report content (NetzDG / DSA)': 'Inhalt melden (NetzDG / DSA)',
  'Report (NetzDG / DSA)': 'Melden (NetzDG / DSA)',
  'Carbon Impact Report': 'CO2-Impact-Bericht',
  'Leave a Review': 'Bewertung schreiben',
  'Submit Review': 'Bewertung absenden',
  'Review submitted': 'Bewertung gesendet',
  'Related Movies': 'Aehnliche Filme',
  'Related Content': 'Aehnliche Inhalte',
  'Sport': 'Sport',
  'Duration': 'Dauer',
  'Venue': 'Austragungsort',
  'Carbon': 'CO2',
  'Per stream session': 'Pro Stream-Sitzung',
  'CO2 per stream': 'CO2 pro Stream',
  'Below avg broadcast': 'Unter Durchschnitts-Broadcast',
  'Offset by ZStream': 'Durch ZStream kompensiert',
  'Rated': 'Bewertet',
  'Rate': 'Bewerten',
  "You've saved": 'Du hast gespart',
  'Playing in Shaka Player': 'Wiedergabe im Shaka Player',
  'Climate Creator': 'Klima-Creator',
  'Join Climate Circle': 'Klima-Kreis beitreten',
  'Creator Impact': 'Creator-Impact',
  'Total Community Contribution': 'Gesamter Community-Beitrag',
  'Appreciations': 'Wertschaetzungen',
  'subscribers': 'Abonnenten',
  'Dislike': 'Nicht gefallen',
  'Save': 'Speichern',
  'Security': 'Sicherheit',
  'Manage two-factor authentication and account security.': 'Verwalte Zwei-Faktor-Authentifizierung und Kontosicherheit.',
  'Authenticator App (TOTP)': 'Authenticator-App (TOTP)',
  'Set up authenticator app': 'Authenticator-App einrichten',
  'Verify': 'Pruefen',
  'Authenticator app enabled': 'Authenticator-App aktiviert',
  'Disable TOTP 2FA': 'TOTP-2FA deaktivieren',
  'SMS Fallback': 'SMS-Fallback',
  'Send code': 'Code senden',
  'Resend code': 'Code erneut senden',
  'SMS 2FA enabled': 'SMS-2FA aktiviert',
  'Remove phone number': 'Telefonnummer entfernen',
  'Backup Codes': 'Backup-Codes',
  'Generate backup codes': 'Backup-Codes generieren',
  'Your backup codes': 'Deine Backup-Codes',
  'Download .txt': '.txt herunterladen',
  'Copy all': 'Alles kopieren',
  'Change Password': 'Passwort aendern',
  'Password updated successfully': 'Passwort erfolgreich aktualisiert',
  'Current password': 'Aktuelles Passwort',
  'New password': 'Neues Passwort',
  'Confirm new password': 'Neues Passwort bestaetigen',
  'Update password': 'Passwort aktualisieren',
  'Your Planet Impact': 'Dein Impact fuer den Planeten',
  'Every stream makes a difference': 'Jeder Stream macht einen Unterschied',
  'Impact Breakdown': 'Impact-Aufschluesselung',
  'Energy Efficiency': 'Energieeffizienz',
  'Lower energy consumption vs traditional streaming': 'Weniger Energieverbrauch als traditionelles Streaming',
  'Data reduction through intelligent compression': 'Datenreduktion durch intelligente Kompression',
  'Renewable energy powered edge nodes': 'Edge-Nodes mit erneuerbarer Energie',
  'Methodology Transparency': 'Methodik-Transparenz',
  'View Full Methodology ->': 'Vollstaendige Methodik ansehen ->',
  'Global Impact Leaderboard': 'Globales Impact-Ranking',
  'Leaderboard coming soon...': 'Ranking folgt bald...',
};

const REGEX_TRANSLATIONS: Array<[RegExp, (...args: string[]) => string]> = [
  [/^(\d+(?:\.\d+)?)K listening$/i, (v) => `${v} Tsd. hoeren zu`],
  [/^(\d+(?:\.\d+)?)M listening$/i, (v) => `${v} Mio. hoeren zu`],
  [/^(\d+(?:\.\d+)?)K followers$/i, (v) => `${v} Tsd. Follower`],
  [/^(\d+(?:\.\d+)?)M followers$/i, (v) => `${v} Mio. Follower`],
  [/^(\d+) tracks$/i, (v) => `${v} Tracks`],
  [/^by (.+)$/i, (v) => `von ${v}`],
  [/^24\/7 Carbon-Free Music ? (\d+(?:\.\d+)?)K listening$/i, (v) => `24/7 kohlenstofffreie Musik ? ${v} Tsd. hoeren zu`],
  [/^(\d+(?:\.\d+)?)K watching$/i, (v) => `${v} Tsd. sehen zu`],
  [/^(\d+(?:\.\d+)?)M views$/i, (v) => `${v} Mio. Aufrufe`],
  [/^(\d+(?:\.\d+)?)K views$/i, (v) => `${v} Tsd. Aufrufe`],
  [/^(\d+(?:\.\d+)?)K followers$/i, (v) => `${v} Tsd. Follower`],
  [/^(\d+(?:\.\d+)?)M followers$/i, (v) => `${v} Mio. Follower`],
  [/^(\d+) tracks$/i, (v) => `${v} Tracks`],
  [/^(\d+(?:\.\d+)?)K playing$/i, (v) => `${v} Tsd. spielen`],
  [/^(\d+(?:\.\d+)?)K watching$/i, (v) => `${v} Tsd. sehen zu`],
  [/^(\d+) clips$/i, (v) => `${v} Clips`],
  [/^(\d+(?:\.\d+)?)g CO2 offset$/i, (v) => `${v} g CO2 ausgeglichen`],
  [/^(\d+) min left$/i, (v) => `${v} Min verbleibend`],
  [/^(\d+)h (\d+)m left$/i, (h, m) => `${h} Std ${m} Min verbleibend`],
  [/^(\d+) episodes$/i, (v) => `${v} Folgen`],
  [/^(\d+)d ago$/i, (v) => `vor ${v} T`],
  [/^(\d+(?:\.\d+)?)K viewers$/i, (v) => `${v} Tsd. Zuschauer`],
  [/^(\d+(?:\.\d+)?)M viewers$/i, (v) => `${v} Mio. Zuschauer`],
  [/^No results for "(.+)"$/i, (q) => `Keine Ergebnisse fuer "${q}"`],
  [/^No results$/i, () => 'Keine Ergebnisse'],
  [/^(\d+)% complete$/i, (v) => `${v}% abgeschlossen`],
  [/^Season (\d+) - New$/i, (v) => `Staffel ${v} - Neu`],
  [/^(\d+) seasons · (\d+) episodes · (.+)$/i, (s, e, r) => `${s} Staffeln · ${e} Folgen · ${r}`],
  [/^(.+) views - Today$/i, (v) => `${v} Aufrufe - Heute`],
  [/^(.+) views - Yesterday$/i, (v) => `${v} Aufrufe - Gestern`],
  [/^(.+) views - (\d+) days ago$/i, (v, d) => `${v} Aufrufe - vor ${d} Tagen`],
  [/^(.+) days ago$/i, (d) => `vor ${d} Tagen`],
  [/^(\d+) month(s)? ago$/i, (m) => `vor ${m} Monat${m === '1' ? '' : 'en'}`],
  [/^(.+)g CO2\/hr saved$/i, (v) => `${v} g CO2/Std eingespart`],
  [/^(.+) offset$/i, (v) => `${v} kompensiert`],
  [/^(\d+) connected$/i, (v) => `${v} verbunden`],
  [/^CO2 - (\d+)% reduction$/i, (v) => `CO2 - ${v}% Reduktion`],
  [/^Saves approx\. (.+) CO2$/i, (v) => `Spart ca. ${v} CO2`],
  [/^(\d+(?:\.\d+)?) participants$/i, (v) => `${v} Teilnehmer`],
];

const textOriginals = new WeakMap<Text, string>();
const attributeOriginals = new WeakMap<Element, Record<string, string>>();

const TRANSLATOR_SKIP_EXACT_ROUTES = new Set(['/']);
const TRANSLATOR_SKIP_PREFIXES = ['/dashboard', '/search', '/music', '/live', '/gaming', '/minis', '/watch', '/marketplace', '/meetings', '/ztube', '/movies', '/sports', '/settings', '/methodology', '/login', '/register', '/forgot-password', '/reset-password', '/sustainability', '/api'];

function shouldEnableLegacyTranslator(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  if (TRANSLATOR_SKIP_EXACT_ROUTES.has(pathname)) {
    return false;
  }

  return !TRANSLATOR_SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function translateExact(text: string): string {
  const leading = text.match(/^\s*/)?.[0] ?? '';
  const trailing = text.match(/\s*$/)?.[0] ?? '';
  const core = text.trim();
  const translated = EXACT_TRANSLATIONS[core];

  if (!translated) {
    return text;
  }

  return `${leading}${translated}${trailing}`;
}

function translatePatterns(text: string): string {
  const leading = text.match(/^\s*/)?.[0] ?? '';
  const trailing = text.match(/\s*$/)?.[0] ?? '';
  let core = text.trim();

  for (const [pattern, replacement] of REGEX_TRANSLATIONS) {
    core = core.replace(pattern, (...args) => replacement(...(args.slice(1, -2) as string[])));
  }

  return `${leading}${core}${trailing}`;
}

function translateText(text: string, language: Language): string {
  if (language === 'en') {
    return text;
  }

  const exact = translateExact(text);
  if (exact !== text) {
    return exact;
  }

  return translatePatterns(text);
}

function shouldSkipElement(element: Element | null): boolean {
  if (!element) {
    return true;
  }

  if (element.closest('[data-no-translate="true"]')) {
    return true;
  }

  const tagName = element.tagName;
  return ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG'].includes(tagName);
}

function translateRoot(root: HTMLElement, language: Language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!(node instanceof Text)) {
        return NodeFilter.FILTER_REJECT;
      }

      if (!node.textContent?.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      if (shouldSkipElement(node.parentElement)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let current: Node | null = walker.nextNode();

  while (current) {
    const textNode = current as Text;
    const original = textOriginals.get(textNode) ?? textNode.textContent ?? '';

    if (!textOriginals.has(textNode)) {
      textOriginals.set(textNode, original);
    }

    const translated = translateText(original, language);
    if (textNode.textContent !== translated) {
      textNode.textContent = translated;
    }

    current = walker.nextNode();
  }

  const elements = root.querySelectorAll<HTMLElement>('[placeholder], [title], [aria-label]');
  elements.forEach((element) => {
    if (shouldSkipElement(element)) {
      return;
    }

    const stored = attributeOriginals.get(element) ?? {};

    (['placeholder', 'title', 'aria-label'] as const).forEach((attr) => {
      const currentValue = element.getAttribute(attr);
      if (!currentValue) {
        return;
      }

      if (!(attr in stored)) {
        stored[attr] = currentValue;
      }

      const translated = translateText(stored[attr], language);
      if (currentValue !== translated) {
        element.setAttribute(attr, translated);
      }
    });

    attributeOriginals.set(element, stored);
  });
}

export default function GlobalPageTranslator() {
  const pathname = usePathname();
  const { language } = useLanguageStore();

  React.useEffect(() => {
    if (!shouldEnableLegacyTranslator(pathname) || language === 'en') {
      return;
    }

    const root = document.getElementById('main-content');
    if (!root) {
      return;
    }

    let timeoutId: any;
    const run = () => {
      translateRoot(root, language);
    };

    run();

    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(run, 100);
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [language, pathname]);

  return null;
}









