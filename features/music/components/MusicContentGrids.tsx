import { motion } from 'framer-motion';
import Image from 'next/image';
import { musicText } from '../../../lib/data/musicCatalog';
import type { SupportedLanguage } from '../../../lib/types/content';
import type { MusicAlbumView, MusicArtistView, MusicPlaylistView } from '../../../lib/services/catalogService';
import type { Track } from '../../../types/media';

interface MusicArtistsGridProps {
  artists: MusicArtistView[];
  handlePlay: (track: Track) => void;
  labels: { followers?: string; playAll?: string; tracks?: string } | undefined;
  language: SupportedLanguage;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  tracks: Track[];
}

export function MusicArtistsGrid({ artists, handlePlay, labels, language, pageTextMuted, pageTextPrimary, pageTextSecondary, tracks }: MusicArtistsGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {artists.map((artist, index) => (
        <motion.div key={artist.id} animate={{ opacity: 1, scale: 1 }} className="relative rounded-2xl overflow-hidden cursor-pointer group" initial={{ opacity: 0, scale: 0.95 }} style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(15,23,42,0.08)' }} transition={{ delay: index * 0.07 }} whileHover={{ y: -4, scale: 1.01 }}>
          <div className="relative h-36">
            <Image alt={musicText(artist.name, language)} className="object-cover opacity-70 group-hover:opacity-90 transition-opacity" fill sizes="300px" src={artist.imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            {artist.verified && <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,229,186,0.9)' }}><svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-sm mb-0.5" style={{ color: pageTextPrimary }}>{musicText(artist.name, language)}</h3>
            <p className="text-[11px] mb-3" style={{ color: pageTextMuted }}>{musicText(artist.genre, language)}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px]" style={{ color: pageTextSecondary }}>{artist.followers} {labels?.followers ?? 'followers'}</span>
              <span className="text-[10px]" style={{ color: pageTextSecondary }}>{artist.tracks} {labels?.tracks ?? 'tracks'}</span>
            </div>
            <motion.button className="mt-3 w-full py-1.5 rounded-full text-xs font-semibold" onClick={() => { const artistTracks = tracks.filter((track) => track.artist === artist.name); if (artistTracks.length > 0) handlePlay(artistTracks[0]); }} style={{ background: 'rgba(147,51,234,0.12)', border: '1px solid rgba(147,51,234,0.25)', color: 'rgb(196,132,252)' }} whileHover={{ scale: 1.02, background: 'rgba(147,51,234,0.2)' }}>{labels?.playAll ?? 'Play All'}</motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface MusicAlbumsGridProps {
  albums: MusicAlbumView[];
  handlePlay: (track: Track) => void;
  labels: { tracks?: string } | undefined;
  language: SupportedLanguage;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  tracks: Track[];
}

export function MusicAlbumsGrid({ albums, handlePlay, labels, language, pageTextMuted, pageTextPrimary, pageTextSecondary, tracks }: MusicAlbumsGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {albums.map((album, index) => (
        <motion.div key={album.id} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl overflow-hidden cursor-pointer group" initial={{ opacity: 0, scale: 0.95 }} onClick={() => { const albumTracks = tracks.filter((track) => track.album === album.title); if (albumTracks.length > 0) handlePlay(albumTracks[0]); }} style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(15,23,42,0.08)' }} transition={{ delay: index * 0.07 }} whileHover={{ y: -4 }}>
          <div className="relative h-44">
            <Image alt={musicText(album.title, language)} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="280px" src={album.imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(147,51,234,0.85)' }}><svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div></div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-sm mb-0.5 truncate" style={{ color: pageTextPrimary }}>{musicText(album.title, language)}</h3>
            <p className="text-xs" style={{ color: pageTextSecondary }}>{musicText(album.artist, language)}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px]" style={{ color: pageTextMuted }}>{album.year}</span>
              <span className="text-[10px]" style={{ color: pageTextMuted }}>{album.tracks} {labels?.tracks ?? 'tracks'}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(147,51,234,0.1)', color: 'rgb(196,132,252)' }}>{album.genre}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface MusicPlaylistsGridProps {
  handlePlay: (track: Track) => void;
  labels: { by?: string; tracks?: string } | undefined;
  language: SupportedLanguage;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  playlists: MusicPlaylistView[];
  tracks: Track[];
}

export function MusicPlaylistsGrid({ handlePlay, labels, language, pageTextMuted, pageTextPrimary, pageTextSecondary, playlists, tracks }: MusicPlaylistsGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {playlists.map((playlist, index) => (
        <motion.div key={playlist.id} animate={{ opacity: 1, x: 0 }} className="flex gap-4 rounded-2xl overflow-hidden cursor-pointer group p-4" initial={{ opacity: 0, x: -12 }} onClick={() => tracks[0] && handlePlay(tracks[0])} style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(15,23,42,0.08)' }} transition={{ delay: index * 0.07 }} whileHover={{ scale: 1.01, borderColor: 'rgba(147,51,234,0.25)' }}>
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image alt={musicText(playlist.title, language)} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="80px" src={playlist.imageUrl} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.4)' }}><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-0.5 truncate" style={{ color: pageTextPrimary }}>{musicText(playlist.title, language)}</h3>
            <p className="text-xs leading-relaxed mb-2 line-clamp-2" style={{ color: pageTextSecondary }}>{musicText(playlist.description, language)}</p>
            <div className="flex items-center gap-3"><span className="text-[10px]" style={{ color: pageTextMuted }}>{playlist.tracks} {labels?.tracks ?? 'tracks'} | {playlist.duration}</span></div>
            <p className="text-[10px] mt-1" style={{ color: pageTextMuted }}>{labels?.by ?? 'by'} {musicText(playlist.curator, language)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}



