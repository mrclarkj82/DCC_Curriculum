import { ClassJoinForm } from '../components/classes/ClassJoinForm';
import { PageContainer } from '../components/PageContainer';

export function JoinClassPage() {
  return (
    <PageContainer
      eyebrow="Student Enrollment"
      title="Join Your Class"
      description="Use the class code your teacher gave you to connect your account to the correct DCC Creative Studio class."
      className="mission-board"
    >
      <ClassJoinForm />
    </PageContainer>
  );
}
