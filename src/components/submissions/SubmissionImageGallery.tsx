import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { setSubmissionGraded } from '../../services/submissionService';
import type { StudentSubmission, SubmissionDriveLink, UserProfile } from '../../types';

interface SubmissionImageGalleryProps {
  requirements: string[];
  students: UserProfile[];
  submissions: StudentSubmission[];
  totalStudentCount: number;
  teacherUid: string;
}

interface SubmissionImageSlide {
  id: string;
  imageUrl: string | null;
  drivePreviewUrl: string | null;
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

    if (parsedUrl.hostname !== 'drive.google.com') {
      return null;
    }

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

function drivePreviewUrl(link: SubmissionDriveLink): string | null {
  const fileId = googleDriveFileId(link.url);
  return fileId ? `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview` : null;
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
      const displayedLinks = links.length ? links : [null];

      return displayedLinks.map((link, linkIndex) => ({
        id: `${submission.id}-${linkIndex}`,
        imageUrl: link ? imagePreviewUrl(link) : null,
        drivePreviewUrl: link ? drivePreviewUrl(link) : null,
        link,
        submission,
      }));
    });
}

interface EvidenceThumbnailProps {
  slide: SubmissionImageSlide;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

function EvidenceThumbnail({ slide, index, selected, onSelect }: EvidenceThumbnailProps) {
  const [previewFailed, setPreviewFailed] = useState(false);

  return (
    <button
      className={`submission-gallery-evidence-button${selected ? ' submission-gallery-evidence-button--selected' : ''}`}
      type="button"
      aria-pressed={selected}
      aria-label={`View evidence ${index + 1}: ${slide.link?.label || 'submitted link'}`}
      onClick={onSelect}
    >
      {slide.imageUrl && !previewFailed ? (
        <img src={slide.imageUrl} alt="" loading="lazy" onError={() => setPreviewFailed(true)} />
      ) : (
        <span className="submission-gallery-evidence-placeholder" aria-hidden="true">
          {index + 1}
        </span>
      )}
      <span className="submission-gallery-evidence-caption">
        <strong>Evidence {index + 1}</strong>
        <small>{slide.link?.label || 'Submitted evidence'}</small>
      </span>
    </button>
  );
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
  teacherUid,
}: SubmissionImageGalleryProps) {
  const slides = useMemo(() => slidesFromSubmissions(submissions), [submissions]);
  const roster = useMemo(() => rosterFromStudents(students, submissions), [students, submissions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [gradingSubmissionId, setGradingSubmissionId] = useState<string | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const currentSlide = slides[currentIndex] ?? null;
  const currentStudentSlideIndices = currentSlide
    ? slides.flatMap((slide, index) =>
        slide.submission.uid === currentSlide.submission.uid ? [index] : [],
      )
    : [];
  const currentStudentImageNumber = currentStudentSlideIndices.indexOf(currentIndex) + 1;

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  useEffect(() => {
    setImageFailed(false);
  }, [currentSlide?.id]);

  const move = (direction: -1 | 1) => {
    if (currentStudentSlideIndices.length < 2) {
      return;
    }

    const nextPosition =
      (currentStudentImageNumber - 1 + direction + currentStudentSlideIndices.length) %
      currentStudentSlideIndices.length;
    setCurrentIndex(currentStudentSlideIndices[nextPosition]);
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
  const needsGrading = roster.filter((entry) => entry.submission && !entry.submission.gradedAt);
  const graded = roster.filter((entry) => entry.submission?.gradedAt);
  const missing = roster.filter((entry) => !entry.submission);
  const studentName = currentSlide
    ? currentSlide.submission.studentName ||
      currentSlide.submission.studentEmail ||
      currentSlide.submission.uid
    : '';
  const canShowImage = Boolean(currentSlide?.imageUrl) && !imageFailed;

  const markGraded = async (submission: StudentSubmission, isGraded: boolean) => {
    setGradingError(null);
    setGradingSubmissionId(submission.id);

    try {
      await setSubmissionGraded(submission.id, teacherUid, isGraded);
    } catch (error) {
      setGradingError(
        error instanceof Error ? error.message : 'Could not update the grading check.',
      );
    } finally {
      setGradingSubmissionId(null);
    }
  };

  const rosterGroup = (label: string, entries: SubmissionRosterEntry[]) =>
    entries.length ? (
      <div className="submission-gallery-roster-group" key={label}>
        <h4>
          {label} <span>({entries.length})</span>
        </h4>
        <div className="submission-gallery-roster-grid">
          {entries.map((entry) => {
            const firstSlideIndex = slides.findIndex((slide) => slide.submission.uid === entry.uid);
            const isSelected = currentSlide?.submission.uid === entry.uid;

            return (
              <button
                className={`submission-gallery-student-button${
                  !entry.submission
                    ? ' submission-gallery-student-button--missing'
                    : entry.submission.gradedAt
                      ? ' submission-gallery-student-button--graded'
                      : ' submission-gallery-student-button--submitted'
                }${isSelected ? ' submission-gallery-student-button--selected' : ''}`}
                type="button"
                key={entry.uid}
                disabled={!entry.submission || firstSlideIndex < 0}
                aria-pressed={isSelected}
                onClick={() => setCurrentIndex(firstSlideIndex)}
              >
                <span>{entry.studentName}</span>
                <small>
                  {entry.submission
                    ? entry.submission.gradedAt
                      ? 'Graded'
                      : entry.submission.status.replace('_', ' ')
                    : 'No submission'}
                </small>
              </button>
            );
          })}
        </div>
      </div>
    ) : null;

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
            {submittedStudentCount}/{totalStudentCount} submitted · {needsGrading.length} to grade
          </strong>
        </header>
        <p className="muted submission-gallery-roster-note">
          Check a student as graded after reviewing their evidence. Updated submissions return to
          “Needs grading.”
        </p>
        {rosterGroup('Needs grading', needsGrading)}
        {rosterGroup('Graded', graded)}
        {rosterGroup('No submission', missing)}
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
              disabled={currentStudentSlideIndices.length < 2}
              onClick={() => move(-1)}
            >
              &larr; Previous
            </button>
            <div className="submission-gallery-student">
              <p className="retro-label">Student Submission</p>
              <h3>{studentName}</h3>
              <p className="muted">
                Evidence {currentStudentImageNumber} of {currentStudentSlideIndices.length}
              </p>
              <label className="submission-gallery-graded-toggle">
                <input
                  type="checkbox"
                  checked={Boolean(currentSlide.submission.gradedAt)}
                  disabled={!teacherUid || gradingSubmissionId !== null}
                  onChange={(event) =>
                    void markGraded(currentSlide.submission, event.currentTarget.checked)
                  }
                />
                <span>
                  {gradingSubmissionId === currentSlide.submission.id
                    ? 'Saving…'
                    : currentSlide.submission.gradedAt
                      ? 'Graded'
                      : 'Mark as graded'}
                </span>
              </label>
            </div>
            <button
              className="outline-button submission-gallery-nav-button"
              type="button"
              disabled={currentStudentSlideIndices.length < 2}
              onClick={() => move(1)}
            >
              Next &rarr;
            </button>
          </header>
          {gradingError && (
            <p className="submission-gallery-grading-error" role="alert">
              {gradingError}
            </p>
          )}

          <div
            className="submission-gallery-evidence-strip"
            role="group"
            aria-label={`${studentName}'s evidence links`}
          >
            {currentStudentSlideIndices.map((slideIndex, index) => (
              <EvidenceThumbnail
                key={slides[slideIndex].id}
                slide={slides[slideIndex]}
                index={index}
                selected={slideIndex === currentIndex}
                onSelect={() => setCurrentIndex(slideIndex)}
              />
            ))}
          </div>

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
              ) : currentSlide.drivePreviewUrl ? (
                <div className="submission-gallery-drive-preview">
                  <iframe
                    src={currentSlide.drivePreviewUrl}
                    title={`${studentName}'s submitted image ${currentStudentImageNumber}`}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <p className="muted">
                    If Drive cannot display this preview, open the original link below while signed
                    in to the account with access.
                  </p>
                </div>
              ) : (
                <div className="submission-gallery-image-fallback">
                  <p>Image preview unavailable.</p>
                </div>
              )}
              {currentSlide.link && (
                <figcaption className="submission-gallery-open-original">
                  <a
                    className="secondary-button"
                    href={currentSlide.link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Original Evidence {currentStudentImageNumber}
                  </a>
                </figcaption>
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
