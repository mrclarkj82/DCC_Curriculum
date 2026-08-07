import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import type { StudentSubmission, SubmissionDriveLink } from '../../types';

interface SubmissionImageGalleryProps {
  requirements: string[];
  submissions: StudentSubmission[];
}

interface SubmissionImageSlide {
  id: string;
  imageUrl: string | null;
  link: SubmissionDriveLink | null;
  submission: StudentSubmission;
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

export function SubmissionImageGallery({
  requirements,
  submissions,
}: SubmissionImageGalleryProps) {
  const slides = useMemo(() => slidesFromSubmissions(submissions), [submissions]);
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

  if (!currentSlide) {
    return <p className="muted">No submitted images are available yet.</p>;
  }

  const studentName =
    currentSlide.submission.studentName ||
    currentSlide.submission.studentEmail ||
    currentSlide.submission.uid;
  const canShowImage = Boolean(currentSlide.imageUrl) && !imageFailed;

  return (
    <section
      className="submission-image-gallery"
      aria-label="Student submission image gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
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
          <p className="retro-label">Student Image</p>
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
                  Open Submitted Image
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
    </section>
  );
}
