import { PageContainer } from '../components/PageContainer';

const teacherCards = [
  'Today active item',
  'Bell ringer completion',
  'Assignment submissions',
  'Media submissions',
  'Quiz results',
  'Needs review',
  'Program area filter',
];

export function TeacherPage() {
  return (
    <PageContainer
      eyebrow="Teacher Placeholder"
      title="Teacher Dashboard"
      description="Phase 3 only provides dashboard placeholders. Real teacher data, grading, and review workflows arrive later."
    >
      <div className="card-grid three">
        {teacherCards.map((card) => (
          <article className="card metric-card" key={card}>
            <h2>{card}</h2>
            <p className="muted">Placeholder</p>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}

