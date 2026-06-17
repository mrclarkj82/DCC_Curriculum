import { AssignmentCard } from '../components/AssignmentCard';
import { LessonCard } from '../components/LessonCard';
import { PageContainer } from '../components/PageContainer';
import { getProgramArea, lessons, assignments, quizzes } from '../data/seedData';

export function UnrealAreaPage() {
  const area = getProgramArea('unreal-engine');
  const pilotLessons = lessons
    .filter((lesson) => lesson.programAreaId === 'unreal-engine' && lesson.quarter === 'Q1')
    .slice(0, 4);
  const pilotAssignments = assignments.filter((assignment) =>
    pilotLessons.some((lesson) => lesson.id === assignment.lessonId),
  );

  return (
    <PageContainer
      eyebrow="Unreal Engine Studio"
      title={area?.title ?? 'Unreal Engine Studio'}
      description={area?.description}
      className="studio-cyan"
    >
      <div className="section-stack">
        <section className="content-section neon-section">
          <p className="retro-label">Pilot Lessons</p>
          <h2>Q1 Unreal Foundations</h2>
          <p className="muted">Pilot-ready Lessons 01-04 are available for scaffold preview.</p>
          <div className="card-grid two">
            {pilotLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Build / Produce</p>
          <h2>Q1 Unreal Assignments</h2>
          <div className="card-grid two">
            {pilotAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Future Unit</p>
          <h2>Q3 Castle Environment</h2>
          <p className="muted">
            Q3 lesson records are present as placeholders for future transcript-aligned expansion.
          </p>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Quizzes / Portfolio</p>
          <h2>Assessment and Showcase</h2>
          <p className="muted">
            Quiz placeholder count: {quizzes.filter((quiz) => quiz.programAreaId === 'unreal-engine').length}.
            Portfolio workflows arrive in a later phase.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
