import { Navigate, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { useAsyncData } from '../hooks/useAsyncData';
import { getAssignmentById } from '../services/assignmentService';

export function AssignmentDetailPage() {
  const { assignmentId } = useParams();
  const { data: assignment, isLoading, error } = useAsyncData(
    () => (assignmentId ? getAssignmentById(assignmentId) : Promise.resolve(null)),
    [assignmentId],
    'Unable to find the lesson connected to this assignment.',
  );

  if (isLoading) {
    return <LoadingState label="Opening the complete lesson..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!assignment?.lessonId) {
    return (
      <EmptyState
        title="Connected lesson not found"
        message="This former assignment link is not connected to a lesson record yet."
      />
    );
  }

  return <Navigate replace to={`/lessons/${assignment.lessonId}`} />;
}
