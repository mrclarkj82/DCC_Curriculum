import { PageContainer } from '../components/PageContainer';
import { ProgramAreaCard } from '../components/ProgramAreaCard';
import { programAreas } from '../data/seedData';

export function AreasPage() {
  return (
    <PageContainer
      eyebrow="Program Areas"
      title="Program Selector"
      description="Choose the creative studio space for today's Digital Content Creators work."
      className="studio-selector"
    >
      <div className="card-grid two">
        {programAreas.map((area) => (
          <ProgramAreaCard key={area.id} area={area} />
        ))}
      </div>
    </PageContainer>
  );
}
