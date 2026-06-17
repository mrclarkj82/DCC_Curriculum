import { AssignmentCard } from '../components/AssignmentCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LessonCard } from '../components/LessonCard';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { useAsyncData } from '../hooks/useAsyncData';
import { getAssignments } from '../services/assignmentService';
import { getLessonsByProgramArea } from '../services/lessonService';
import { getProgramAreaById } from '../services/programAreaService';
import { getQuizzes } from '../services/quizService';

export function UnrealAreaPage() {
  const { data, isLoading, error } = useAsyncData(
    async () => {
      const [area, lessons, assignments, quizzes] = await Promise.all([
        getProgramAreaById('unreal-engine'),
        getLessonsByProgramArea('unreal-engine'),
        getAssignments(),
        getQuizzes(),
      ]);

      return { area, lessons, assignments, quizzes };
    },
    [],
    'Unable to load Unreal Engine Studio content from Firestore.',
  );
  const pilotLessons = data?.lessons.filter((lesson) => lesson.quarter === 'Q1') ?? [];
  const pilotAssignments =
    data?.assignments.filter((assignment) =>
      pilotLessons.some((lesson) => lesson.id === assignment.lessonId),
    ) ?? [];
  const unrealQuizCount =
    data?.quizzes.filter((quiz) => quiz.programAreaId === 'unreal-engine').length ?? 0;

  return (
    <PageContainer
      eyebrow="Unreal Engine Studio"
      title={data?.area?.title ?? 'Unreal Engine Studio'}
      description={data?.area?.description}
      className="studio-cyan"
    >
      {isLoading && <LoadingState label="Loading Unreal content from Firestore..." />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && !pilotLessons.length && (
        <EmptyState
          title="Unreal lessons are not seeded yet"
          message="Firestore does not have Unreal lesson records yet. Run the curriculum seed importer to publish the pilot content."
        />
      )}
      <div className="section-stack">
        <section className="content-section neon-section">
          <p className="retro-label">Pilot Lessons</p>
          <h2>Q1 Unreal Foundations</h2>
          <p className="muted">Firestore-backed Unreal Q1 pilot lessons load here after seeding.</p>
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
            Firestore quiz record count: {unrealQuizCount}. Portfolio workflows arrive in a later
            phase.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
