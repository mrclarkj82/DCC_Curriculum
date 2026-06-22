import type { ActiveClassItem, ClassRecord, UserProfile, ViewerMode } from '../../types';
import { StudentResponseCard } from './StudentResponseCard';

interface BellRingerResponseCardProps {
  prompt: string;
  activeItem: ActiveClassItem;
  classRecord: ClassRecord;
  userProfile: UserProfile;
  viewerMode?: ViewerMode;
}

export function BellRingerResponseCard({
  prompt,
  activeItem,
  classRecord,
  userProfile,
  viewerMode = 'student',
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
      viewerMode={viewerMode}
    />
  );
}
