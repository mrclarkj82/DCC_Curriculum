import type { HiddenFrameAchievement } from '../data/hiddenFrameAchievements';

interface AchievementBadgeProps {
  achievement: HiddenFrameAchievement;
  isEarned: boolean;
}

export function AchievementBadge({ achievement, isEarned }: AchievementBadgeProps) {
  return (
    <article
      className={[
        'hidden-frame-achievement-badge',
        isEarned
          ? 'hidden-frame-achievement-badge--earned'
          : 'hidden-frame-achievement-badge--locked',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${achievement.title}: ${isEarned ? 'signal recovered' : 'signal waiting'}`}
    >
      <p className="hidden-frame-kicker">{achievement.signalLabel}</p>
      <h2>{achievement.title}</h2>
      <p>{isEarned ? achievement.description : 'Signal waiting in the local archive.'}</p>
    </article>
  );
}
