import { BroadcastUpdateCard } from '../components/BroadcastUpdateCard';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LessonCard } from '../components/LessonCard';
import { LoadingState } from '../components/LoadingState';
import { MediaProjectCard } from '../components/MediaProjectCard';
import { PageContainer } from '../components/PageContainer';
import { videoProductionOpeningLessonIds } from '../data/videoProductionLessons';
import { useAsyncData } from '../hooks/useAsyncData';
import { getBroadcastUpdatesByProgramArea } from '../services/broadcastUpdateService';
import { getLessonById } from '../services/lessonService';
import { getMediaProjectsByProgramArea } from '../services/mediaProjectService';
import { getProgramAreaById } from '../services/programAreaService';

export function VideoProductionAreaPage() {
  const { data, isLoading, error } = useAsyncData(
    async () => {
      const [area, projects, updates, openingLessons] = await Promise.all([
        getProgramAreaById('video-production'),
        getMediaProjectsByProgramArea('video-production'),
        getBroadcastUpdatesByProgramArea('video-production'),
        Promise.all(videoProductionOpeningLessonIds.map(getLessonById)),
      ]);

      return { area, projects, updates, openingLessons };
    },
    [],
    'Unable to load Video Production Studio content from Firestore.',
  );
  const projects = data?.projects ?? [];
  const updates = data?.updates ?? [];
  const openingLessons = data?.openingLessons.filter((lesson) => lesson !== null) ?? [];

  return (
    <PageContainer
      eyebrow="Video Production Studio"
      title={data?.area?.title ?? 'Video Production Studio'}
      description={data?.area?.description}
      className="studio-pink"
    >
      {isLoading && <LoadingState label="Loading Video Production content from Firestore..." />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && !openingLessons.length && !projects.length && !updates.length && (
        <EmptyState
          title="Video Production content is not seeded yet"
          message="Firestore does not have Video Production project or Broadcast Desk Update records yet. Run the curriculum seed importer to publish this content."
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
          <p className="retro-label">Production Updates</p>
          <h2>Broadcast Desk Updates</h2>
          <div className="card-grid two">
            {updates.map((update) => (
              <BroadcastUpdateCard key={update.id} update={update} />
            ))}
          </div>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Build / Produce</p>
          <h2>Video Production Projects</h2>
          <div className="card-grid two">
            {projects.map((project) => (
              <MediaProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Media Submissions</p>
          <h2>Student Media Submissions</h2>
          <p className="muted">
            Uploads, hosted media, review states, and teacher feedback are placeholders for future
            phases. This site will not edit video in-browser.
          </p>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Production Resources / Showcase</p>
          <h2>Portfolio and Showcase</h2>
          <p className="muted">Portfolio selection and showcase approval will be built later.</p>
        </section>
      </div>
    </PageContainer>
  );
}
