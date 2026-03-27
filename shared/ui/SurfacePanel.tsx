import type { ReactNode } from 'react';

interface SurfacePanelProps {
  children: ReactNode;
  background: string;
  border?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SurfacePanel({ children, background, border, className = '', style }: SurfacePanelProps) {
  return (
    <div
      className={className}
      style={{
        background,
        border,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
