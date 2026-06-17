import { Link } from 'react-router-dom';
import type { Lesson } from '../types';
import { StatusBadge } from './StatusBadge';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="card neon-card neon-card--cyan compact-card">
      <div className="card-header">
        <h3>{lesson.title}</h3>
        <StatusBadge status={lesson.status} />
      </div>
      <p>{lesson.learningTarget}</p>
      <p className="meta-line">
        {lesson.quarter} / Lesson {lesson.lessonNumber} / {lesson.video.start}-{lesson.video.end}
      </p>
      <Link className="outline-button" to={`/lessons/${lesson.id}`}>
        Open Lesson
      </Link>
    </article>
  );
}
