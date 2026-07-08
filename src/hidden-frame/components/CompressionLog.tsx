import type { ReactNode } from 'react';

interface CompressionLogProps {
  title?: string;
  children: ReactNode;
  tone?: 'neutral' | 'signal' | 'warning';
}

export function CompressionLog({ title = 'System message', children, tone = 'neutral' }: CompressionLogProps) {
  return (
    <aside className={`compression-log compression-log--${tone}`} aria-label={title}>
      <p className="compression-log__title">{title}</p>
      <div className="compression-log__body">{children}</div>
    </aside>
  );
}
