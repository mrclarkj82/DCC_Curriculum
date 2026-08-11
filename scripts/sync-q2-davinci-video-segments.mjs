import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const lessonRoot = join(
  root,
  'curriculum',
  'pilot-batch',
  'video-production',
  'q2',
  'davinci-resolve',
);
const videoId = 'MCDVcQIA3UM';
const shareToken = 'WY3OFMRiphvjjsGw';

const segments = [
  {
    id: 'vp-q2-l01',
    folder: 'lesson-01-resolve-setup-and-project-manager',
    start: '00:00:00',
    end: '00:13:16',
  },
  {
    id: 'vp-q2-l02',
    folder: 'lesson-02-media-page-imports-and-bins',
    start: '00:13:16',
    end: '00:25:47',
  },
  {
    id: 'vp-q2-l03',
    folder: 'lesson-03-syncing-audio-and-timeline-basics',
    start: '00:25:47',
    end: '00:35:30',
  },
  {
    id: 'vp-q2-l04',
    folder: 'lesson-04-trimming-clips-and-rough-cut',
    start: '00:35:30',
    end: '01:07:04',
  },
  {
    id: 'vp-q2-l05',
    folder: 'lesson-05-quiz-1-and-rough-cut-cleanup',
    start: '01:07:04',
    end: '01:20:08',
  },
  {
    id: 'vp-q2-l06',
    folder: 'lesson-06-titles-transitions-and-simple-motion',
    start: '01:20:08',
    end: '01:30:41',
  },
  {
    id: 'vp-q2-l07',
    folder: 'lesson-07-quiz-2-and-final-export',
    start: '04:53:29',
    end: '05:06:57',
  },
];

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const timecodeToSeconds = (timecode) => {
  const parts = timecode.split(':').map(Number);

  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part) || part < 0)) {
    throw new Error(`Invalid timecode ${timecode}`);
  }

  const [hours, minutes, seconds] = parts;

  if (minutes > 59 || seconds > 59) {
    throw new Error(`Invalid timecode ${timecode}`);
  }

  return hours * 3600 + minutes * 60 + seconds;
};

const watchUrlFor = (start) =>
  `https://youtu.be/${videoId}?si=${shareToken}&t=${timecodeToSeconds(start)}s`;
const embedUrlFor = (start, end) =>
  `https://www.youtube.com/embed/${videoId}?start=${timecodeToSeconds(start)}&end=${timecodeToSeconds(end)}&autoplay=1`;

for (const segment of segments) {
  const lessonDirectory = join(lessonRoot, segment.folder);
  const lessonDataPath = join(lessonDirectory, 'lesson-data.json');
  const lessonData = readJson(lessonDataPath);

  if (lessonData.id !== segment.id) {
    throw new Error(`${segment.folder} contains unexpected lesson ${lessonData.id}`);
  }

  if (lessonData.video.start !== segment.start || lessonData.video.end !== segment.end) {
    throw new Error(`${segment.id} transcript range does not match the approved segment map`);
  }

  const watchUrl = watchUrlFor(segment.start);
  lessonData.video.url = watchUrl;
  writeJson(lessonDataPath, lessonData);

  const lessonPagePath = join(lessonDirectory, 'lesson-page.md');
  const lessonPage = readFileSync(lessonPagePath, 'utf8');
  const timestampPattern = new RegExp(
    `- Timestamp range: ${segment.start}-${segment.end}\\r?\\n` +
      '(?:- Assigned segment:.*\\r?\\n- YouTube page:.*\\r?\\n)?',
  );

  if (!timestampPattern.test(lessonPage)) {
    throw new Error(`${segment.id} lesson page is missing its approved timestamp range`);
  }

  const videoLinks = [
    `- Timestamp range: ${segment.start}-${segment.end}`,
    `- Assigned segment: [Play ${segment.start}-${segment.end} only](${embedUrlFor(segment.start, segment.end)})`,
    `- YouTube page: [Open at ${segment.start}](${watchUrl}); stop at ${segment.end}.`,
    '',
  ].join('\n');

  writeFileSync(lessonPagePath, lessonPage.replace(timestampPattern, videoLinks));
}

for (const seedPath of [
  join(root, 'curriculum', 'website-data', 'lessons.seed.json'),
  join(root, 'src', 'data', 'seed', 'lessons.seed.json'),
]) {
  const seedLessons = readJson(seedPath);

  for (const segment of segments) {
    const lesson = seedLessons.find((record) => record.id === segment.id);

    if (!lesson) {
      throw new Error(`${seedPath} is missing ${segment.id}`);
    }

    if (lesson.video.start !== segment.start || lesson.video.end !== segment.end) {
      throw new Error(`${seedPath} has an unexpected range for ${segment.id}`);
    }

    lesson.video.url = watchUrlFor(segment.start);
  }

  writeJson(seedPath, seedLessons);
}

console.log('Synchronized seven Q2 DaVinci Resolve video segments and lesson-page links.');
