import type { LocalizedText, SupportedLanguage } from '../types/content';

export type Language = SupportedLanguage;

export interface Movie {
  id: string;
  title: LocalizedText;
  genre: string;
  rating: string;
  userRating: number;
  imageIdx: number;
  duration: string;
  year: number;
  director: string;
  language: string;
  carbonScore: number;
  description: LocalizedText;
  isPremium: boolean;
  isOriginal: boolean;
  tags: string[];
}

export const MOVIES: Movie[] = [
  { id: 'm1', title: { en: 'Climate Action Documentary', de: 'Klimaaktions-Dokumentation' }, genre: 'Documentary', rating: '9.2', userRating: 0, imageIdx: 0, duration: '1h 48m', year: 2024, director: 'David Attenborough Jr.', language: 'EN', carbonScore: 0.04, description: { en: 'A sweeping examination of global climate efforts, told through the lives of scientists, activists, and communities on the front lines of change.', de: 'Eine umfassende Betrachtung weltweiter Klimainitiativen, erzaehlt durch das Leben von Wissenschaftlern, Aktivisten und Gemeinden an vorderster Front des Wandels.' }, isPremium: false, isOriginal: true, tags: ['Environment', 'Science', 'Education'] },
  { id: 'm2', title: { en: 'Green Tech Future', de: 'Gruene Tech-Zukunft' }, genre: 'Sci-Fi', rating: '8.7', userRating: 0, imageIdx: 1, duration: '2h 05m', year: 2024, director: 'Maya Chen', language: 'EN', carbonScore: 0.06, description: { en: 'A breathtaking vision of a world powered entirely by renewable energy, where cities float on solar grids and oceans breathe again.', de: 'Eine atemberaubende Vision einer Welt, die vollstaendig mit erneuerbarer Energie betrieben wird, in der Staedte auf Solarnetzen schweben und die Ozeane wieder aufatmen.' }, isPremium: true, isOriginal: true, tags: ['Technology', 'Future', 'Innovation'] },
  { id: 'm3', title: { en: 'Ocean Guardians', de: 'Ozeanwaechter' }, genre: 'Nature', rating: '9.5', userRating: 0, imageIdx: 0, duration: '1h 32m', year: 2025, director: 'James Reef', language: 'EN/DE', carbonScore: 0.03, description: { en: 'Following a team of marine biologists as they race to protect the last pristine reef systems from climate change and human activity.', de: 'Ein Team von Meeresbiologen kaempft darum, die letzten unberuehrten Riffsysteme vor Klimawandel und menschlichen Eingriffen zu schuetzen.' }, isPremium: false, isOriginal: false, tags: ['Nature', 'Ocean', 'Wildlife'] },
  { id: 'm4', title: { en: 'Sustainable Cities', de: 'Nachhaltige Staedte' }, genre: 'Documentary', rating: '8.4', userRating: 0, imageIdx: 1, duration: '1h 55m', year: 2024, director: 'Urban Lens Studio', language: 'DE/EN', carbonScore: 0.05, description: { en: 'Six cities, six visions for a zero-carbon future. From Copenhagen\'s cycling utopia to Tokyo\'s vertical forests, this film redefines urban living.', de: 'Sechs Staedte, sechs Visionen fuer eine CO2-freie Zukunft. Von Kopenhagens Fahrrad-Utopie bis zu Tokios vertikalen Waeldern definiert dieser Film urbanes Leben neu.' }, isPremium: false, isOriginal: true, tags: ['Urban', 'Architecture', 'Planning'] },
  { id: 'm5', title: { en: 'Renewable Energy Revolution', de: 'Revolution der erneuerbaren Energien' }, genre: 'Educational', rating: '8.9', userRating: 0, imageIdx: 0, duration: '1h 20m', year: 2025, director: 'Science First Productions', language: 'EN', carbonScore: 0.02, description: { en: 'From solar panels to fusion reactors - an accessible, awe-inspiring guide to every clean energy technology reshaping our world.', de: 'Von Solarpanels bis zu Fusionsreaktoren: ein zugaenglicher und beeindruckender Guide zu jeder sauberen Energietechnologie, die unsere Welt veraendert.' }, isPremium: false, isOriginal: false, tags: ['Energy', 'Science', 'Education'] },
  { id: 'm6', title: { en: 'Zero Waste Journey', de: 'Zero-Waste-Reise' }, genre: 'Lifestyle', rating: '8.1', userRating: 0, imageIdx: 1, duration: '1h 15m', year: 2024, director: 'Eco Lens Films', language: 'EN', carbonScore: 0.03, description: { en: 'One family\'s year-long experiment living with absolutely no landfill waste - and the surprising lessons they learnt along the way.', de: 'Das einjaehrige Experiment einer Familie ganz ohne Deponieabfall und die ueberraschenden Lektionen, die sie dabei gelernt hat.' }, isPremium: false, isOriginal: false, tags: ['Lifestyle', 'Sustainability', 'Family'] },
  { id: 'm7', title: { en: 'The Last Forest', de: 'Der letzte Wald' }, genre: 'Nature', rating: '9.6', userRating: 0, imageIdx: 0, duration: '2h 12m', year: 2025, director: 'Amazonia Productions', language: 'PT/EN', carbonScore: 0.04, description: { en: 'An urgent, visually stunning portrait of the Amazon rainforest and the indigenous guardians fighting to preserve it against all odds.', de: 'Ein dringliches, visuell eindrucksvolles Portraet des Amazonas-Regenwalds und der indigenen Beschuetzer, die ihn gegen alle Widerstaende bewahren.' }, isPremium: true, isOriginal: true, tags: ['Nature', 'Biodiversity', 'Indigenous'] },
  { id: 'm8', title: { en: 'Carbon Zero: The Race', de: 'Carbon Zero: Das Rennen' }, genre: 'Documentary', rating: '8.8', userRating: 0, imageIdx: 1, duration: '1h 38m', year: 2024, director: 'Climate Film Collective', language: 'EN', carbonScore: 0.04, description: { en: 'Governments, corporations, and individuals competing in the most important race in human history - to reach carbon neutrality before 2035.', de: 'Regierungen, Unternehmen und Einzelpersonen konkurrieren im wichtigsten Rennen der Menschheitsgeschichte: Klimaneutralitaet vor 2035 zu erreichen.' }, isPremium: true, isOriginal: true, tags: ['Politics', 'Economics', 'Climate'] },
  { id: 'm9', title: { en: 'Solar Wind', de: 'Solarwind' }, genre: 'Drama', rating: '8.3', userRating: 0, imageIdx: 0, duration: '1h 52m', year: 2024, director: 'Lena Wirth', language: 'DE/EN', carbonScore: 0.05, description: { en: 'A gripping drama following the engineers and visionaries behind Germany\'s Energiewende - the world\'s most ambitious clean energy transition.', de: 'Ein packendes Drama ueber Ingenieure und Visionaere hinter Deutschlands Energiewende, dem wohl ambitioniertesten Uebergang zu sauberer Energie der Welt.' }, isPremium: false, isOriginal: true, tags: ['Drama', 'Germany', 'Energy'] },
];

export const GENRES = ['All', 'Documentary', 'Sci-Fi', 'Nature', 'Educational', 'Lifestyle', 'Drama'] as const;
export const SORT_OPTIONS = ['Most Popular', 'Top Rated', 'Newest', 'Carbon Score'] as const;

export const GENRE_LABELS: Record<(typeof GENRES)[number], { en: string; de: string }> = {
  All: { en: 'All', de: 'Alle' },
  Documentary: { en: 'Documentary', de: 'Dokumentation' },
  'Sci-Fi': { en: 'Sci-Fi', de: 'Sci-Fi' },
  Nature: { en: 'Nature', de: 'Natur' },
  Educational: { en: 'Educational', de: 'Bildung' },
  Lifestyle: { en: 'Lifestyle', de: 'Lifestyle' },
  Drama: { en: 'Drama', de: 'Drama' },
};

export const SORT_LABELS: Record<(typeof SORT_OPTIONS)[number], { en: string; de: string }> = {
  'Most Popular': { en: 'Most Popular', de: 'Am beliebtesten' },
  'Top Rated': { en: 'Top Rated', de: 'Top bewertet' },
  Newest: { en: 'Newest', de: 'Neu hinzugefuegt' },
  'Carbon Score': { en: 'Carbon Score', de: 'CO2-Score' },
};

export function trGenre(genre: string, language: Language) {
  const entry = GENRE_LABELS[genre as keyof typeof GENRE_LABELS];
  return language === 'de' ? entry?.de ?? genre : entry?.en ?? genre;
}

export function trSort(option: string, language: Language) {
  const entry = SORT_LABELS[option as keyof typeof SORT_LABELS];
  return language === 'de' ? entry?.de ?? option : entry?.en ?? option;
}

export function trMovieTitle(movie: Movie, language: Language) {
  return movie.title[language] ?? movie.title.en;
}

export function trMovieDescription(movie: Movie, language: Language) {
  return movie.description[language] ?? movie.description.en;
}

export function trDuration(duration: string, language: Language) {
  return language === 'de' ? duration.replace('h', ' Std').replace('m', ' Min') : duration;
}


