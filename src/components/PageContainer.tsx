import type { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function PageContainer({
  title,
  eyebrow,
  description,
  actions,
  className,
  children,
}: PageContainerProps) {
  return (
    <section className={`page-container ${className ?? ''}`.trim()}>
      <div className="page-heading">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {description && <p className="page-description">{description}</p>}
        </div>
        {actions && <div className="page-actions">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
