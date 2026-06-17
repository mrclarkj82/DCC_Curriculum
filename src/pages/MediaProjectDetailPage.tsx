import { useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { EvidenceChecklist } from '../components/EvidenceChecklist';
import { PageContainer } from '../components/PageContainer';
import { RubricTable } from '../components/RubricTable';
import { StatusBadge } from '../components/StatusBadge';
import { getMediaProject, getProgramArea } from '../data/seedData';

export function MediaProjectDetailPage() {
  const { projectId } = useParams();
  const project = projectId ? getMediaProject(projectId) : undefined;

  if (!project) {
    return (
      <EmptyState
        title="Media project not found"
        message="This scaffold could not find a media project record for the requested ID."
      />
    );
  }

  const area = getProgramArea(project.programAreaId);

  return (
    <PageContainer
      eyebrow={area?.title ?? project.programAreaId}
      title={project.title}
      description={project.description}
      actions={<StatusBadge status={project.status} />}
      className="studio-pink"
    >
      <div className="detail-grid">
        <section className="card mission-panel">
          <h2>Project Type</h2>
          <p>{project.projectType}</p>
        </section>

        <section className="card mission-panel">
          <h2>Build / Produce</h2>
          <p>{project.studentTask}</p>
        </section>

        <section className="card mission-panel">
          <h2>Skill Focus</h2>
          <EvidenceChecklist items={project.skillFocus} />
        </section>

        <section className="card mission-panel">
          <h2>Media Submissions</h2>
          <EvidenceChecklist items={project.submissionTypes} />
        </section>

        <section className="card mission-panel">
          <h2>Submit Evidence</h2>
          <EvidenceChecklist items={project.evidenceRequired} />
        </section>

        <section className="card mission-panel">
          <h2>Reflection Prompt</h2>
          <p>{project.reflectionPrompt}</p>
        </section>

        <section className="card span-two mission-panel">
          <h2>Rubric</h2>
          <RubricTable rubric={project.rubric} />
        </section>

        <section className="card span-two mission-panel">
          <h2>Tags</h2>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
