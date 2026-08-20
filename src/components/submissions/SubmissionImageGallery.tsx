import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import type { StudentSubmission, SubmissionDriveLink, UserProfile } from '../../types';

interface SubmissionImageGalleryProps {
  requirements: string[];
  students: UserProfile[];
  submissions: StudentSubmission[];
  totalStudentCount: number;
}

interface SubmissionImageSlide {
  id: string;
  imageUrl: string | null;
  link: SubmissionDriveLink | null;
  submission: StudentSubmission;
}

interface SubmissionRosterEntry {
  uid: string;
  studentName: string;
  submission: StudentSubmission | null;
}

function googleDriveFileId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const filePathMatch = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/i);

    if (filePathMatch?.[1]) {
      return filePathMatch[1];
    }

    const queryId = parsedUrl.searchParams.get('id');
    return queryId?.trim() || null;
  } catch {
    return null;
  }
}

function imagePreviewUrl(link: SubmissionDriveLink): string | null {
  const driveFileId = googleDriveFileId(link.url);

  if (driveFileId) {
    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveFileId)}&sz=w1600`;
  }

  try {
    const parsedUrl = new URL(link.url);

    if (/\.(avif|gif|jpe?g|png|webp)$/i.test(parsedUrl.pathname)) {
      return link.url;
    }
  } catch {
    return null;
  }

  return null;
}

function slidesFromSubmissions(submissions: StudentSubmission[]): SubmissionImageSlide[] {
  return [...submissions]
    .sort((first, second) =>
      (first.studentName || first.studentEmail || first.uid).localeCompare(
        second.studentName || second.studentEmail || second.uid,
      ),
    )
    .flatMap((submission) => {
      const links = [...submission.driveLinks, ...submission.otherLinks];
      const imageLinks = links
        .map((link) => ({ imageUrl: imagePreviewUrl(link), link }))
        .filter((entry) => entry.imageUrl !== null);
      const displayedLinks = imageLinks.length
        ? imageLinks
        : [{ imageUrl: null, link: links[0] ?? null }];

      return displayedLinks.map((entry, linkIndex) => ({
        id: `${submission.id}-${linkIndex}`,
        imageUrl: entry.imageUrl,
        link: entry.link,
        submission,
      }));
    });
}

function rosterFromStudents(
  students: UserProfile[],
  submissions: StudentSubmission[],
): SubmissionRosterEntry[] {
  const submissionsByUid = new Map(submissions.map((submission) => [submission.uid, submission]));
  const rosterUids = new Set(students.map((student) => student.uid));
  const rosterEntries = students.map((student) => ({
    uid: student.uid,
    studentName: student.displayName || student.email || student.uid,
    submission: submissionsByUid.get(student.uid) ?? null,
  }));

  submissions.forEach((submission) => {
    if (!rosterUids.has(submission.uid)) {
      rosterEntries.push({
        uid: submission.uid,
        studentName: submission.studentName || submission.studentEmail || submission.uid,
        submission,
      });
    }
  });

  return rosterEntries.sort((first, second) => first.studentName.localeCompare(second.studentName));
}

export function SubmissionImageGallery({
  requirements,
  students,
  submissions,
  totalStudentCount,
}: SubmissionImageGalleryProps) {
  const slides = useMemo(() => slidesFromSubmissions(submissions), [submissions]);
  const roster = useMemo(() => rosterFromStudents(students, submissions), [students, submissions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const currentSlide = slides[currentIndex] ?? null;

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  useEffect(() => {
    setImageFailed(false);
  }, [currentSlide?.id]);

  const move = (direction: -1 | 1) => {
    if (slides.length < 2) {
      return;
    }

    setCurrentIndex((index) => (index + direction + slides.length) % slides.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  };

  const submittedStudentCount = new Set(submissions.map((submission) => submission.uid)).size;
  const studentName = currentSlide
    ? currentSlide.submission.studentName ||
      currentSlide.submission.studentEmail ||
      currentSlide.submission.uid
    : '';
  const canShowImage = Boolean(currentSlide?.imageUrl) && !imageFailed;

  return (
    <section
      className="submission-image-gallery"
      aria-label="Student submission image gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <section className="submission-gallery-roster" aria-label="Class submission roster">
        <header className="submission-gallery-roster-heading">
          <div>
            <p className="retro-label">Quick Student View</p>
            <h3>Everyone In This Class</h3>
          </div>
          <strong>
            {submittedStudentCount}/{totalStudentCount} submitted
          </strong>
        </header>

        <div className="submission-gallery-roster-grid">
          {roster.map((entry) => {
            const firstSlideIndex = slides.findIndex((slide) => slide.submission.uid === entry.uid);
            const isSelected = currentSlide?.submission.uid === entry.uid;

            return (
              <button
                className={`submission-gallery-student-button${
                  entry.submission
                    ? ' submission-gallery-student-button--submitted'
                    : ' submission-gallery-student-button--missing'
                }${isSelected ? ' submission-gallery-student-button--selected' : ''}`}
                type="button"
                key={entry.uid}
                disabled={!entry.submission || firstSlideIndex < 0}
                aria-pressed={isSelected}
                onClick={() => setCurrentIndex(firstSlideIndex)}
              >
                <span>{entry.studentName}</span>
                <small>
                  {entry.submission ? entry.submission.status.replace('_', ' ') : 'No submission'}
                </small>
              </button>
            );
          })}
        </div>
      </section>

      {!currentSlide ? (
        <p className="submission-gallery-empty muted">
          No student evidence has been submitted for this lesson yet.
        </p>
      ) : (
        <>
          <header className="submission-gallery-toolbar">
            <button
              className="outline-button submission-gallery-nav-button"
              type="button"
              disabled={slides.length < 2}
              onClick={() => move(-1)}
            >
              &larr; Previous
            </button>
            <div className="submission-gallery-student">
              <p className="retro-label">Student Submission</p>
              <h3>{studentName}</h3>
              <p className="muted">
                {currentIndex + 1} of {slides.length}
              </p>
            </div>
            <button
              className="outline-button submission-gallery-nav-button"
              type="button"
              disabled={slides.length < 2}
              onClick={() => move(1)}
            >
              Next &rarr;
            </button>
          </header>

          <div className="submission-gallery-layout">
            <figure className="submission-gallery-image-frame">
              {canShowImage ? (
                <img
                  className="submission-gallery-image"
                  src={currentSlide.imageUrl ?? undefined}
                  alt={`${studentName}'s submitted work`}
                  loading="eager"
                  decoding="async"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="submission-gallery-image-fallback">
                  <p>Image preview unavailable.</p>
                  {currentSlide.link && (
                    <a
                      className="secondary-button"
                      href={currentSlide.link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Submitted Evidence
                    </a>
                  )}
                </div>
              )}
            </figure>

            <aside className="submission-gallery-requirements" aria-label="Image requirements">
              <p className="retro-label">Requirements</p>
              {requirements.length ? (
                <ul>
                  {requirements.map((requirement) => (
                    <li key={requirement}>{requirement}</li>
                  ))}
                </ul>
              ) : (
                <p className="muted">No image requirements are attached.</p>
              )}
            </aside>
          </div>
        </>
      )}
    </section>
  );
}
