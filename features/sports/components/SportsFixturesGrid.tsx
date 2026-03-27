import { motion } from 'framer-motion';
import type { Fixture } from '../../../lib/data/sportsCatalog';

interface SportsFixturesGridProps {
  fixtures: Fixture[];
  isGerman: boolean;
  isLight: boolean;
}

export default function SportsFixturesGrid({ fixtures, isGerman, isLight }: SportsFixturesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {fixtures.map((fixture, index) => (
        <motion.div key={fixture.id} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-5" initial={{ opacity: 0, scale: 0.96 }} style={{ background: isLight ? 'rgba(255,255,255,0.72)' : 'rgba(15,25,35,0.8)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)' }} transition={{ delay: index * 0.05 }}>
          <div className="mb-4 flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest text-eco-green">{fixture.sport}</span><span className="text-[10px] font-bold text-gray-500">{fixture.date} · {fixture.time}</span></div>
          <div className="mb-4 text-center"><p className="mb-1 text-sm font-black text-white">{fixture.homeTeam} <span className="px-2 text-gray-600">VS</span> {fixture.awayTeam}</p><p className="text-[10px] text-gray-500">{fixture.stadium}</p></div>
          <div className="flex justify-center">{fixture.carbonNeutral && <span className="rounded-full bg-eco-green/10 px-2.5 py-1 text-[9px] font-black text-eco-green" style={{ border: '1px solid rgba(0,229,186,0.2)' }}>{isGerman ? 'CO2-Neutrales Event' : 'Carbon Neutral Event'}</span>}</div>
        </motion.div>
      ))}
    </div>
  );
}
