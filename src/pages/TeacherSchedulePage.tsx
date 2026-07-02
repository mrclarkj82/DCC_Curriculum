import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import q1UnrealScheduleSeed from '../data/seed/q1-unreal-lesson-schedule.json';
import type { LessonSchedulePayload } from '../types';

const q1UnrealSchedule = q1UnrealScheduleSeed as LessonSchedulePayload;

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function TeacherSchedulePage() {
  const { metadata, lessons, skippedDatesDuringSchedule } = q1UnrealSchedule;
  const firstLesson = lessons[0];
  const lastLesson = lessons[lessons.length - 1];

  return (
    <PageContainer
      eyebrow="Teacher Schedule Preview"
      title="Q1 Unreal A/B Lesson Schedule"
      description="Read-only schedule data generated from the 2026-2027 Doral calendar. This preview does not replace the current Today active item controls."
      actions={
        <Link className="outline-button" to="/teacher">
          Back To Teacher
        </Link>
      }
      className="studio-cyan"
    >
      <div className="section-stack">
        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">Schedule Source</p>
              <h2>Calendar-Based A/B Map</h2>
            </div>
            <StatusBadge status="read only" />
          </div>
          <div className="metric-grid">
            <article className="card neon-card metric-card">
              <p className="retro-label">Start Date</p>
              <h3>{metadata.startDate}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Lessons</p>
              <h3>{metadata.lessonCount}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Class Dates</p>
              <h3>{metadata.scheduledDateCount}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Window</p>
              <h3>
                {firstLesson?.aDayDate} - {lastLesson?.bDayDate}
              </h3>
            </article>
          </div>
          <p className="muted">{metadata.cycleInference}</p>
        </section>

        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">Q1 Unreal</p>
              <h2>Lesson Pairing</h2>
            </div>
            <StatusBadge status="A/B pairs" />
          </div>
          <div className="table-scroll">
            <table className="management-table schedule-table">
              <thead>
                <tr>
                  <th scope="col">Lesson</th>
                  <th scope="col">Title</th>
                  <th scope="col">A Day</th>
                  <th scope="col">B Day</th>
                  <th scope="col">Current Workflow</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.scheduleId}>
                    <td>
                      <strong>L{lesson.lessonNumber}</strong>
                      <p className="meta-line">{lesson.lessonId}</p>
                    </td>
                    <td>{lesson.lessonTitle}</td>
                    <td>
                      <StatusBadge status={lesson.aDayCycle} />
                      <p>{formatDate(lesson.aDayDate)}</p>
                      {lesson.aDayCalendarNote && (
                        <p className="meta-line">{lesson.aDayCalendarNote}</p>
                      )}
                    </td>
                    <td>
                      <StatusBadge status={lesson.bDayCycle} />
                      <p>{formatDate(lesson.bDayDate)}</p>
                      {lesson.bDayCalendarNote && (
                        <p className="meta-line">{lesson.bDayCalendarNote}</p>
                      )}
                    </td>
                    <td>
                      <Link className="outline-button" to={`/lessons/${lesson.lessonId}`}>
                        Open Lesson
                      </Link>
                    </td>
                    <td>{lesson.notes || 'Ready'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">Skipped Dates</p>
              <h2>Weekends And No-School Days</h2>
            </div>
            <StatusBadge status={`${skippedDatesDuringSchedule.length} skipped`} />
          </div>
          <div className="table-scroll">
            <table className="management-table schedule-table compact">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Day</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Source Note</th>
                </tr>
              </thead>
              <tbody>
                {skippedDatesDuringSchedule.map((day) => (
                  <tr key={day.date}>
                    <td>{day.date}</td>
                    <td>{day.dayOfWeek}</td>
                    <td>{day.excludedReason}</td>
                    <td>{day.sourceNote || day.calendarNote || 'Weekend'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section neon-section">
          <p className="retro-label">Calendar Notes</p>
          <h2>Important Interpretation Rules</h2>
          <ul className="ordered-list">
            {metadata.calendarAnomalies.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="muted">
            This schedule can later drive or suggest class active items by date and cycle day. For
            now, teachers still control what students see from the existing Teacher page active item
            controls.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
