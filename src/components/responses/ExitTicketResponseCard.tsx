import type { ActiveClassItem, ClassRecord, UserProfile } from '../../types';
import { StudentResponseCard } from './StudentResponseCard';

interface ExitTicketResponseCardProps {
  prompt: string;
  activeItem: ActiveClassItem;
  classRecord: ClassRecord;
  userProfile: UserProfile;
}

export function ExitTicketResponseCard({
  prompt,
  activeItem,
  classRecord,
  userProfile,
}: ExitTicketResponseCardProps) {
  return (
    <StudentResponseCard
      kind="exitTicket"
      title="Exit Ticket"
      eyebrow="End Of Class"
      prompt={prompt}
      emptyMessage="No exit ticket prompt is attached to this active item yet."
      activeItem={activeItem}
      classRecord={classRecord}
      userProfile={userProfile}
    />
  );
}
