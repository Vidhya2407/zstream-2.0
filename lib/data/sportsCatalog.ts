import { contentImages } from '../images/unsplash';

export type SportTab = 'scores' | 'fixtures' | 'highlights' | 'broadcasts';

export interface LiveMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  sport: string;
  minute: number;
  status: 'LIVE' | 'Soon' | 'FT';
  viewers: string;
  imageIdx: number;
  league?: string;
}

export interface Fixture {
  id: number;
  homeTeam: string;
  awayTeam: string;
  sport: string;
  date: string;
  time: string;
  stadium: string;
  carbonNeutral: boolean;
}

export interface HighlightCard {
  id: string;
  title: string;
  match: string;
  duration: string;
  views: string;
  imageIdx: number;
  daysAgo: number;
  sport: string;
  carbonScore: number;
  rating: number;
}

export const LIVE_MATCHES: LiveMatch[] = [
  // Football
  { id: 1, homeTeam: 'FC EcoCity', awayTeam: 'Green United', homeScore: 2, awayScore: 1, sport: 'Football', league: 'Eco Premier League', minute: 67, status: 'LIVE', viewers: '421K', imageIdx: 0 },
  { id: 5, homeTeam: 'Planet FC', awayTeam: 'Zero Net', homeScore: 0, awayScore: 3, sport: 'Football', league: 'Champions Green', minute: 12, status: 'LIVE', viewers: '156K', imageIdx: 1 },
  { id: 6, homeTeam: 'Solar Arena', awayTeam: 'Wind Park', homeScore: 1, awayScore: 1, sport: 'Football', league: 'National Cup', minute: 45, status: 'FT', viewers: '82K', imageIdx: 0 },
  { id: 10, homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', homeScore: 3, awayScore: 2, sport: 'Football', league: 'Bundesliga', minute: 88, status: 'LIVE', viewers: '1.2M', imageIdx: 0 },
  { id: 11, homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 1, awayScore: 0, sport: 'Football', league: 'La Liga', minute: 23, status: 'LIVE', viewers: '2.5M', imageIdx: 1 },
  
  // Basketball
  { id: 2, homeTeam: 'Solar Hawks', awayTeam: 'Climate Bulls', homeScore: 88, awayScore: 92, sport: 'Basketball', league: 'Sustainable League', minute: 34, status: 'LIVE', viewers: '94K', imageIdx: 1 },
  { id: 7, homeTeam: 'Net Zero Knicks', awayTeam: 'Bio Blazers', homeScore: 102, awayScore: 98, sport: 'Basketball', league: 'Sustainable League', minute: 48, status: 'FT', viewers: '112K', imageIdx: 0 },
  { id: 12, homeTeam: 'LA Lakers', awayTeam: 'GS Warriors', homeScore: 112, awayScore: 108, sport: 'Basketball', league: 'NBA', minute: 42, status: 'LIVE', viewers: '1.8M', imageIdx: 1 },
  
  // Tennis
  { id: 8, homeTeam: 'Nadal. E', awayTeam: 'Alcaraz. C', homeScore: 2, awayScore: 1, sport: 'Tennis', league: 'Eco Tour Finals', minute: 120, status: 'LIVE', viewers: '340K', imageIdx: 1 },
  { id: 13, homeTeam: 'Djokovic. N', awayTeam: 'Sinner. J', homeScore: 1, awayScore: 1, sport: 'Tennis', league: 'Australian Open', minute: 180, status: 'LIVE', viewers: '890K', imageIdx: 0 },
  
  // Cricket
  { id: 14, homeTeam: 'India', awayTeam: 'Australia', homeScore: 284, awayScore: 142, sport: 'Cricket', league: 'World Test Championship', minute: 450, status: 'LIVE', viewers: '15M', imageIdx: 0 },
  { id: 15, homeTeam: 'England', awayTeam: 'South Africa', homeScore: 182, awayScore: 185, sport: 'Cricket', league: 'ODI Series', minute: 300, status: 'FT', viewers: '2.1M', imageIdx: 1 },
  
  // Golf
  { id: 16, homeTeam: 'Woods. T', awayTeam: 'Scheffler. S', homeScore: -4, awayScore: -6, sport: 'Golf', league: 'The Masters', minute: 240, status: 'LIVE', viewers: '1.4M', imageIdx: 1 },
  
  // Ice Hockey
  { id: 17, homeTeam: 'NY Rangers', awayTeam: 'Boston Bruins', homeScore: 3, awayScore: 4, sport: 'Ice Hockey', league: 'NHL', minute: 55, status: 'LIVE', viewers: '640K', imageIdx: 0 },
  
  // F1
  { id: 18, homeTeam: 'Verstappen. M', awayTeam: 'Hamilton. L', homeScore: 1, awayScore: 2, sport: 'Racing', league: 'Monaco Grand Prix', minute: 62, status: 'LIVE', viewers: '5.2M', imageIdx: 1 },
  
  // Others
  { id: 3, homeTeam: 'Zero Nine', awayTeam: 'Planet Force', homeScore: 1, awayScore: 1, sport: 'Athletics', league: 'World Championships', minute: 82, status: 'LIVE', viewers: '189K', imageIdx: 0 },
  { id: 4, homeTeam: 'Rewild RC', awayTeam: 'Carbon GP', homeScore: 0, awayScore: 0, sport: 'Racing', league: 'Formula Zero', minute: 0, status: 'Soon', viewers: '56K', imageIdx: 1 },
];

export const FIXTURES: Fixture[] = [
  { id: 1, homeTeam: 'FC EcoCity', awayTeam: 'Planet FC', sport: 'Football', date: 'Today', time: '20:00', stadium: 'Solar Arena', carbonNeutral: true },
  { id: 2, homeTeam: 'Green Blades', awayTeam: 'Zero Net FC', sport: 'Football', date: 'Tomorrow', time: '15:30', stadium: 'Wind Park', carbonNeutral: true },
  { id: 3, homeTeam: 'Eco Sprinters', awayTeam: 'Climate Runners', sport: 'Athletics', date: 'Jan 22', time: '11:00', stadium: 'Nature Track', carbonNeutral: true },
  { id: 4, homeTeam: 'Solar Spikers', awayTeam: 'Ocean Servers', sport: 'Volleyball', date: 'Jan 23', time: '18:00', stadium: 'Beach Arena', carbonNeutral: false },
  { id: 5, homeTeam: 'Rewild Rapids', awayTeam: 'Forest Flow', sport: 'Swimming', date: 'Jan 25', time: '09:00', stadium: 'Aqua Center', carbonNeutral: true },
  { id: 6, homeTeam: 'Green Grid', awayTeam: 'Wind Riders', sport: 'Cycling', date: 'Jan 28', time: '10:30', stadium: 'Mountain Route', carbonNeutral: true },
];

export const HIGHLIGHTS: HighlightCard[] = [
  { id: 'h1', title: 'FC EcoCity — Stunning Free Kick', match: 'EcoCity vs Green United', duration: '0:48', views: '2.1M', imageIdx: 0, daysAgo: 0, sport: 'Football', carbonScore: 0.02, rating: 9.1 },
  { id: 'h2', title: 'Basketball Game Winner at Buzzer', match: 'Solar Hawks vs Climate Bulls', duration: '1:12', views: '890K', imageIdx: 1, daysAgo: 1, sport: 'Basketball', carbonScore: 0.02, rating: 8.8 },
  { id: 'h3', title: 'World Record 100m Sprint', match: 'Eco Sprinters Championships', duration: '2:05', views: '4.8M', imageIdx: 0, daysAgo: 2, sport: 'Athletics', carbonScore: 0.01, rating: 9.7 },
  { id: 'h4', title: 'Cycling Tour Stage 12 Final Sprint', match: 'Wind Riders Grand Tour', duration: '3:30', views: '1.4M', imageIdx: 1, daysAgo: 3, sport: 'Cycling', carbonScore: 0.02, rating: 8.4 },
  { id: 'h5', title: 'Penalty Shootout — All 5 Scored', match: 'Green United Cup Final', duration: '4:15', views: '6.2M', imageIdx: 0, daysAgo: 5, sport: 'Football', carbonScore: 0.02, rating: 9.5 },
  { id: 'h6', title: 'Swimming World Championship Recap', match: 'Aqua Center Open', duration: '5:00', views: '730K', imageIdx: 1, daysAgo: 7, sport: 'Swimming', carbonScore: 0.01, rating: 8.2 },
];

export const BROADCASTS: HighlightCard[] = [
  { id: 'b1', title: 'Green United Cup Final — Full Match', match: 'FC EcoCity vs Green United', duration: '1h 47m', views: '1.8M', imageIdx: 1, daysAgo: 3, sport: 'Football', carbonScore: 0.06, rating: 9.4 },
  { id: 'b2', title: 'Solar Energy Athletics Championship', match: 'Nature Track Open', duration: '2h 30m', views: '560K', imageIdx: 0, daysAgo: 7, sport: 'Athletics', carbonScore: 0.05, rating: 8.6 },
  { id: 'b3', title: 'Climate Basketball League Finals', match: 'Solar Hawks vs Climate Bulls', duration: '2h 15m', views: '820K', imageIdx: 1, daysAgo: 10, sport: 'Basketball', carbonScore: 0.06, rating: 9.0 },
  { id: 'b4', title: 'Wind Riders Grand Tour Stage 15', match: 'Mountain Route Challenge', duration: '3h 50m', views: '430K', imageIdx: 0, daysAgo: 14, sport: 'Cycling', carbonScore: 0.07, rating: 8.3 },
];

export const SPORT_FILTERS = ['All', 'Football', 'Basketball', 'Tennis', 'Cricket', 'Golf', 'Ice Hockey', 'Racing', 'Athletics', 'Cycling', 'Swimming', 'Volleyball'];
