import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { PageContainer } from '../components/PageContainer';
import { ProgramAreaCard } from '../components/ProgramAreaCard';
import { useAsyncData } from '../hooks/useAsyncData';
import { getProgramAreas } from '../services/programAreaService';

export function AreasPage() {
  const {
    data: programAreas,
    isLoading,
    error,
  } = useAsyncData(
    getProgramAreas,
    [],
    'Unable to load program areas from Firestore.',
  );

  return (
    <PageContainer
      eyebrow="Program Areas"
      title="Program Selector"
      description="Choose the creative studio space for today's Digital Content Creators work."
      className="studio-selector"
    >
      {isLoading && <LoadingState label="Loading Firestore program areas..." />}
      {error && <ErrorState message={error} />}
      {!isLoading && !error && !programAreas?.length && (
        <EmptyState
          title="Program areas are not seeded yet"
          message="Firestore does not have program area records yet. Run the curriculum seed importer, then refresh this page."
        />
      )}
      <div className="card-grid two">
        {programAreas?.map((area) => (
          <ProgramAreaCard key={area.id} area={area} />
        ))}
      </div>
    </PageContainer>
  );
}
