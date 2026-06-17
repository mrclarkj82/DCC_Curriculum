import { BroadcastUpdateCard } from '../components/BroadcastUpdateCard';
import { MediaProjectCard } from '../components/MediaProjectCard';
import { PageContainer } from '../components/PageContainer';
import { broadcastUpdates, getProgramArea, mediaProjects } from '../data/seedData';

export function VideoProductionAreaPage() {
  const area = getProgramArea('video-production');
  const projects = mediaProjects.filter((project) => project.programAreaId === 'video-production');
  const updates = broadcastUpdates.filter((update) => update.programAreaId === 'video-production');

  return (
    <PageContainer
      eyebrow="Video Production Studio"
      title={area?.title ?? 'Video Production Studio'}
      description={area?.description}
      className="studio-pink"
    >
      <div className="section-stack">
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
