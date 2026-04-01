'use client';

import HeroCarousel from '../../components/home/HeroCarousel';
import ContentRow from '../../components/home/ContentRow';
import GenreFilterBar from '../../components/home/GenreFilterBar';
import { contentImages } from '../../lib/images/unsplash';
import { useAppTranslations } from '../../lib/utils/translations';
import { HOME_FEATURE_DISPLAY } from './config';
import { HomeCommitmentBanner, HomeCtaSection, HomeCuratedSection, HomeFeatureSection, HomeStatsStrip } from './components';
import { useHomeScreen } from './hooks/useHomeScreen';

export default function HomeScreen() {
  const { t } = useAppTranslations();
  const { content, isLight, isLoading, selectedGenre, setSelectedGenre } = useHomeScreen();
  const copy = content.sectionCopy;

  return (
    <main className="min-h-screen overflow-hidden" style={{ background: 'var(--app-bg)' }}>
      <HeroCarousel items={content.heroItems} />
      <HomeStatsStrip stats={copy.stats} />

      <div className="app-stack pb-10 md:pb-14">
        <div className="py-4 md:py-6">
          <div className="app-container">
            <GenreFilterBar selected={selectedGenre} onChange={setSelectedGenre} />
          </div>
        </div>

        {isLoading && (
        <div className="app-container pb-2 text-xs" style={{ color: 'var(--app-muted-color)' }}>
          {t('common.loading')}
        </div>
      )}

      <div className="space-y-12 md:space-y-14">
        <ContentRow badge={t('home.hot')} items={content.trendingItems} selectedGenre={selectedGenre} title={t('home.trending')} />
        <ContentRow badge={t('home.resume')} items={content.continueWatchingItems} selectedGenre={selectedGenre} subtitle={t('home.pickUpWhereYouLeftOff')} title={t('home.continueWatching')} />
        <ContentRow badge={t('home.new')} items={content.newReleaseItems} selectedGenre={selectedGenre} subtitle={t('home.freshContent')} title={t('home.newReleases')} />
        <ContentRow badge={t('home.aiPick')} items={content.watchHistoryItems} selectedGenre={selectedGenre} subtitle={t('home.curatedByAI')} title={t('home.basedOnHistory')} />
      </div>

      <HomeFeatureSection badge={t('home.why')} description={t('home.featureText')} display={HOME_FEATURE_DISPLAY} features={content.features} highlight={t('home.future')} title={t('home.builtFor')} />
      <HomeCuratedSection badge={t('home.curated')} highlight={t('home.forYou')} items={content.featuredGridItems} title={t('home.topPicks')} viewAllLabel={t('home.viewAll')} />
      <HomeCommitmentBanner body={t('home.commitmentText')} buttonLabel={t('home.learnMore')} highlight={t('home.carbonNeutral')} imageUrl={contentImages.climate[1].url} isLight={isLight} label={t('home.commitment')} titlePrefix={t('home.everyStream')} />
      <HomeCtaSection badge={t('home.getStarted')} body={t('home.movement')} highlight={t('home.emitNothing')} primaryLabel={t('home.startFree')} secondaryLabel={t('home.pricing')} titlePrefix={t('home.streamEverything')} />
      </div>
    </main>
  );
}


