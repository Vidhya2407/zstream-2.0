'use client';

interface ZtubeEmptyStateProps {
  message: string;
}

export default function ZtubeEmptyState({ message }: ZtubeEmptyStateProps) {
  return (
    <div className="text-center py-20 text-gray-500">
      <p className="text-4xl mb-3">No results</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}



