import type { ActiveClassItem, ClassRecord, UserProfile, ViewerMode } from '../../types';
import { StudentResponseCard } from './StudentResponseCard';

interface BellRingerResponseCardProps {
  prompt: string;
  activeItem: ActiveClassItem;
  classRecord: ClassRecord;
  userProfile: UserProfile;
  viewerMode?: ViewerMode;
  locked?: boolean;
  lockedMessage?: string;
  submitMode?: 'active-item' | 'scheduled-lesson';
}

export function BellRingerResponseCard({
  prompt,
  activeItem,
  classRecord,
  userProfile,
  viewerMode = 'student',
  locked = false,
  lockedMessage,
  submitMode = 'active-item',
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
      locked={locked}
      lockedMessage={lockedMessage}
      submitMode={submitMode}
    />
  );
}
