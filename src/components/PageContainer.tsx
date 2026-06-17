import type { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageContainer({ title, eyebrow, description, actions, children }: PageContainerProps) {
  return (
    <section className="page-container">
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

