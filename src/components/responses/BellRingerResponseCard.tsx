import type { ActiveClassItem, ClassRecord, UserProfile } from '../../types';
import { StudentResponseCard } from './StudentResponseCard';

interface BellRingerResponseCardProps {
  prompt: string;
  activeItem: ActiveClassItem;
  classRecord: ClassRecord;
  userProfile: UserProfile;
}

export function BellRingerResponseCard({
  prompt,
  activeItem,
  classRecord,
  userProfile,
}: BellRingerResponseCardProps) {
  return (
    <StudentResponseCard
      kind="bellRinger"
      title="Bell Ringer"
      eyebrow="Start Of Class"
      prompt={prompt}
      emptyMessage="No bell ringer prompt is attached to this active item yet."
      activeItem={activeItem}
      classRecord={classRecord}
      userProfile={userProfile}
    />
  );
}
