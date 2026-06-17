import { PageContainer } from '../components/PageContainer';
import { ProgramAreaCard } from '../components/ProgramAreaCard';
import { programAreas } from '../data/seedData';

export function AreasPage() {
  return (
    <PageContainer
      eyebrow="Program Areas"
      title="Choose a Studio"
      description="Program area cards are loaded from the scaffold seed copy of curriculum/website-data/programAreas.seed.json."
    >
      <div className="card-grid two">
        {programAreas.map((area) => (
          <ProgramAreaCard key={area.id} area={area} />
        ))}
      </div>
    </PageContainer>
  );
}

