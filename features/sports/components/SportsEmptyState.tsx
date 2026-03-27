interface SportsEmptyStateProps {
  icon: string;
  message: string;
}

export default function SportsEmptyState({ icon, message }: SportsEmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <span className="mb-4 block text-4xl">{icon}</span>
      <p className="font-medium text-gray-500">{message}</p>
    </div>
  );
}
