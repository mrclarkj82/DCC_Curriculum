import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LessonCard } from '../components/LessonCard';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import {
  videoProductionFoundationsLessons,
  videoProductionOpeningLessonIds,
} from '../data/videoProductionLessons';
import { useAsyncData } from '../hooks/useAsyncData';
import { getLessonById, getLessonsByProgramArea } from '../services/lessonService';
import { getProgramAreaById } from '../services/programAreaService';

export function VideoProductionAreaPage() {
  const { data, isLoading, error } = useAsyncData(
    async () => {
      const [area, lessons, openingLessons] = await Promise.all([
        getProgramAreaById('video-production'),
        getLessonsByProgramArea('video-production'),
        Promise.all(videoProductionOpeningLessonIds.map(getLessonById)),
      ]);

      return { area, lessons, openingLessons };
    },
    [],
    'Unable to load Video Production Studio content from Firestore.',
  );
  const foundationsLessons = videoProductionFoundationsLessons(data?.lessons ?? []);
  const openingLessons = data?.openingLessons.filter((lesson) => lesson !== null) ?? [];

  return (
    <PageContainer
      eyebrow="Video Production Studio"
      title={data?.area?.title ?? 'Video Production Studio'}
      description="Quarter 2: organize your project files, follow the DaVinci Resolve tutorial, and submit evidence of your own editing work."
      className="studio-pink"
    >
      {isLoading && <LoadingState label="Loading Video Production content from Firestore..." />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && !openingLessons.length && !foundationsLessons.length && (
        <EmptyState
          title="Quarter 2 lessons are unavailable"
          message="Ask your teacher to check the Video Production lesson list."
        />
      )}
      <div className="section-stack">
        <section className="content-section neon-section">
          <p className="retro-label">Start Here</p>
          <h2>First Two Assignments</h2>
          <p className="muted">
            Complete File 1: Video Production File Organization, then File 2: Video Game Development
            File Organization. Open each lesson for the ZIP download, written instructions, and
            evidence submission.
          </p>
          <div className="card-grid two">
            {openingLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
          {!isLoading &&
            !error &&
            openingLessons.length < videoProductionOpeningLessonIds.length && (
              <EmptyState
                title="A file organization assignment is unavailable"
                message="Ask your teacher to check the file organization lesson records."
              />
            )}
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Quarter 2 / Follow Along</p>
          <h2>Q2 DaVinci Resolve Lessons</h2>
          <p className="muted">
            Work through these lessons in order: setup, media organization, editing, Cut, Fusion,
            and final export. Watch each assigned segment, pause to practice in your own project,
            then submit the required evidence and reflection. Color and Fairlight are skipped.
          </p>
          <div className="card-grid two">
            {foundationsLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
          {!isLoading && !error && !foundationsLessons.length && (
            <EmptyState
              title="DaVinci Resolve lessons are unavailable"
              message="Ask your teacher to check the Quarter 2 DaVinci lesson records."
            />
          )}
        </section>
      </div>
    </PageContainer>
  );
}
