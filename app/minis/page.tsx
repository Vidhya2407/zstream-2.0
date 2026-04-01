import type { Metadata } from 'next';
import MinisScreen from '../../features/minis/screen';

export const metadata: Metadata = {
  title: 'Minis',
};

export default function MinisPage() {
  return <MinisScreen />;
}



