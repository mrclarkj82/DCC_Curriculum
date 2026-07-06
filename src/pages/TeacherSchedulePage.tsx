import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { StatusBadge } from '../components/StatusBadge';
import blockLessonCalendarsSeed from '../data/seed/blockLessonCalendars.seed.json';
import type { BlockCalendarDay, BlockLessonCalendarPayload } from '../types';

const blockCalendars = blockLessonCalendarsSeed as BlockLessonCalendarPayload[];

const programAreaLabels: Record<string, string> = {
  'unreal-engine': 'Unreal Engine',
  'video-production': 'Video Production',
};

const scheduleTitles: Record<string, string> = {
  'Q1:unreal-engine': 'Q1 Unreal Engine',
  'Q2:video-production': 'Q2 DaVinci Resolve',
};

function scheduleKey(calendar: BlockLessonCalendarPayload): string {
  return `${calendar.quarter}:${calendar.programAreaId}`;
}

function scheduleTitle(calendar: BlockLessonCalendarPayload): string {
  return (
    scheduleTitles[scheduleKey(calendar)] ??
    `${calendar.quarter} ${programAreaLabels[calendar.programAreaId] ?? calendar.programAreaId}`
  );
}

const defaultCalendar =
  blockCalendars.find(
    (calendar) => calendar.quarter === 'Q2' && calendar.programAreaId === 'video-production',
  ) ?? blockCalendars[0];

const defaultScheduleKey = defaultCalendar ? scheduleKey(defaultCalendar) : '';

function formatShortDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function dayStatusLabel(day: BlockCalendarDay): string {
  if (day.status === 'instructional') {
    return `${day.cycleDay} Day`;
  }

  if (day.status === 'no-school') {
    return 'No School';
  }

  if (day.status === 'outside-month') {
    return 'Outside Month';
  }

  return 'Open';
}

function ScheduleDayCell({ day, quarter }: { day: BlockCalendarDay; quarter: string }) {
  const note = day.calendarNote || day.sourceNote;

  return (
    <article className={`schedule-day-card schedule-day-card--${day.status}`}>
      <div className="schedule-date-row">
        <span>{formatShortDate(day.date)}</span>
        <span>{day.dayOfWeek.slice(0, 3)}</span>
      </div>

      {day.status === 'instructional' && (
        <>
          <h3>{day.lessonLabel}</h3>
          <div className="tag-row">
            <StatusBadge status={dayStatusLabel(day)} />
            <StatusBadge status={day.programAreaId} />
          </div>
          <p className="schedule-lesson-title">{day.lessonTitle}</p>
          <p className="meta-line">{day.lessonId}</p>
          {note && <p className="schedule-note">{note}</p>}
          <Link className="outline-button schedule-cell-link" to={`/lessons/${day.lessonId}`}>
            Open Lesson
          </Link>
        </>
      )}

      {day.status === 'no-school' && (
        <>
          <h3>No School</h3>
          <StatusBadge status="no school" />
          <p className="schedule-lesson-title">{day.reason}</p>
          {note && <p className="schedule-note">{note}</p>}
        </>
      )}

      {(day.status === 'empty' || day.status === 'outside-month') && (
        <>
          <h3>{day.status === 'outside-month' ? 'Outside Month' : `No ${quarter} Lesson`}</h3>
          <StatusBadge status={dayStatusLabel(day)} />
          <p className="schedule-note">{day.reason}</p>
        </>
      )}
    </article>
  );
}

export function TeacherSchedulePage() {
  const [selectedScheduleKey, setSelectedScheduleKey] = useState(defaultScheduleKey);
  const blockCalendar = useMemo(
    () =>
      blockCalendars.find((calendar) => scheduleKey(calendar) === selectedScheduleKey) ??
      blockCalendars[0],
    [selectedScheduleKey],
  );

  if (!blockCalendar) {
    return (
      <PageContainer
        eyebrow="Teacher Schedule Preview"
        title="Curriculum Block Calendars"
        description="No schedule preview data is bundled with this build yet."
        actions={
          <Link className="outline-button" to="/teacher">
            Back To Teacher
          </Link>
        }
        className="studio-cyan"
      >
        <section className="content-section neon-section">
          <p className="muted">Add a block calendar seed to show the macro schedule here.</p>
        </section>
      </PageContainer>
    );
  }

  const { months, noSchoolDates, summary } = blockCalendar;
  const selectedScheduleTitle = scheduleTitle(blockCalendar);

  return (
    <PageContainer
      eyebrow="Teacher Schedule Preview"
      title="Curriculum Block Calendars"
      description="Read-only Monday-Friday macro views generated from the 2026-2027 Doral calendar. These visual schedules do not replace the current Today active item controls."
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
              <h2>{selectedScheduleTitle} Block View</h2>
            </div>
            <StatusBadge status="read only" />
          </div>
          <nav className="teacher-tab-list" aria-label="Curriculum schedule views">
            {blockCalendars.map((calendar) => {
              const key = scheduleKey(calendar);

              return (
                <button
                  className={selectedScheduleKey === key ? 'teacher-tab active' : 'teacher-tab'}
                  type="button"
                  aria-pressed={selectedScheduleKey === key}
                  key={key}
                  onClick={() => setSelectedScheduleKey(key)}
                >
                  {scheduleTitle(calendar)}
                </button>
              );
            })}
          </nav>
          <div className="metric-grid">
            <article className="card neon-card metric-card">
              <p className="retro-label">School Year</p>
              <h3>{blockCalendar.schoolYear}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Window</p>
              <h3>
                {blockCalendar.startDate} - {blockCalendar.endDate}
              </h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Lessons</p>
              <h3>{summary.lessonCount}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Class Days</p>
              <h3>{summary.instructionalDateCount}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">No-School Days</p>
              <h3>{summary.noSchoolDateCount}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Program</p>
              <h3>{programAreaLabels[blockCalendar.programAreaId] ?? blockCalendar.programAreaId}</h3>
            </article>
            <article className="card neon-card metric-card">
              <p className="retro-label">Calendar Style</p>
              <h3>Mon-Fri</h3>
            </article>
          </div>
          <p className="muted">
            Instructional cells use short labels like {blockCalendar.quarter} L1 as the main
            heading. Lesson titles, lesson IDs, program area, A/B day, and calendar notes appear
            inside the block.
          </p>
        </section>

        {months.map((month) => (
          <section className="content-section neon-section schedule-month-section" key={`${month.month}-${month.year}`}>
            <div className="section-heading-row">
              <div>
                <p className="retro-label">{selectedScheduleTitle}</p>
                <h2>
                  {month.month} {month.year}
                </h2>
              </div>
              <StatusBadge status="Monday-Friday" />
            </div>

            <div className="schedule-weekday-row" aria-hidden="true">
              {blockCalendar.weekdays.map((weekday) => (
                <span key={weekday}>{weekday}</span>
              ))}
            </div>

            <div className="schedule-month-grid" aria-label={`${month.month} ${month.year} schedule`}>
              {month.weeks.map((week) => (
                <div className="schedule-week-row" key={`${month.month}-${week.weekStart}`}>
                  {week.days.map((day) => (
                    <ScheduleDayCell
                      key={`${month.month}-${day.date}`}
                      day={day}
                      quarter={blockCalendar.quarter}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="content-section neon-section">
          <div className="section-heading-row">
            <div>
              <p className="retro-label">No-School Weekdays</p>
              <h2>Actual Weekday Calendar Exceptions</h2>
            </div>
            <StatusBadge status={`${noSchoolDates.length} dates`} />
          </div>
          <p className="muted">
            Saturdays and Sundays are excluded from scheduling, but they are not listed here.
          </p>
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
                {noSchoolDates.map((day) => (
                  <tr key={day.date}>
                    <td>{day.date}</td>
                    <td>{day.dayOfWeek}</td>
                    <td>{day.reason}</td>
                    <td>{day.sourceNote || day.calendarNote || 'No extra note'}</td>
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
            {blockCalendar.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="muted">
            Teachers still control what students see from the existing Teacher page active item
            controls. This page is a visual planning view, not a schedule editor.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
