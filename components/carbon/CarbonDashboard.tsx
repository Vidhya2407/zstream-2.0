'use client';
import React from 'react';
import { useCarbonStore } from '../../lib/stores/carbonStore';
export default function CarbonDashboard() {
const { totalSaved, streamingTime } = useCarbonStore();
return React.createElement('div', { className: 'bg-green-900 p-6 rounded-lg' }, React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Carbon Impact Dashboard'), React.createElement('div', { className: 'grid grid-cols-2 gap-4' }, React.createElement('div', { className: 'bg-green-800 p-4 rounded' }, React.createElement('p', { className: 'text-sm text-gray-300' }, 'CO2 Saved'), React.createElement('p', { className: 'text-3xl font-bold' }, totalSaved.toFixed(2), ' kg')), React.createElement('div', { className: 'bg-green-800 p-4 rounded' }, React.createElement('p', { className: 'text-sm text-gray-300' }, 'Streaming Time'), React.createElement('p', { className: 'text-3xl font-bold' }, streamingTime, ' min'))));
}
