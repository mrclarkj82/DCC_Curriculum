import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));
const writeJson = (path, value) =>
  writeFileSync(join(root, path), `${JSON.stringify(value, null, 2)}\n`);
const plan = readJson('curriculum/source/davinci-resolve-foundations-plan.json');
const lessons = readJson('curriculum/website-data/lessons.seed.json');
const assignments = readJson('curriculum/website-data/assignments.seed.json');
const lessonRoot = 'curriculum/pilot-batch/video-production/q2/davinci-resolve';
const bullets = (items) => items.map((item) => `- ${item}`).join('\n');
const numbered = (items) => items.map((item, index) => `${index + 1}. ${item}`).join('\n');
const seconds = (time) => time.split(':').reduce((total, value) => total * 60 + Number(value), 0);
const routine = `${plan.studentRoutine} ${plan.submissionRoutine}`;

for (const item of plan.lessons) {
  const lesson = lessons.find((record) => record.id === item.id);
  const assignment = assignments.find((record) => record.id === item.assignmentId);
  if (!lesson || !assignment || lesson.assignment.id !== assignment.id) {
    throw new Error(`Missing or mismatched foundations records for ${item.id}`);
  }
  if (lesson.video.start !== item.start || lesson.video.end !== item.end) {
    throw new Error(`Refusing to change the approved segment range for ${item.id}`);
  }
  if (
    seconds(item.start) < seconds(plan.fairlightRange.end) &&
    seconds(item.end) > seconds(plan.fairlightRange.start)
  ) {
    throw new Error(`${item.id} overlaps the excluded Fairlight chapter`);
  }

  lesson.video.source = 'Casey Faris / Ground Control: Introduction to DaVinci Resolve';
  lesson.video.url = `https://youtu.be/${plan.videoId}?t=${seconds(item.start)}s`;
  lesson.assignment.evidenceRequired = item.evidenceRequired;
  lesson.assignment.reflectionPrompt = item.reflectionPrompt;
  assignment.instructions = `${plan.studentRoutine} For this lesson, watch ${item.start}-${item.end}. ${plan.submissionRoutine}`;
  assignment.requiredSteps = item.requiredSteps;
  assignment.evidenceRequired = item.evidenceRequired;
  assignment.reflectionPrompt = item.reflectionPrompt;
  assignment.extensionChallenge = item.extension;
  assignment.resources = [
    ...(assignment.resources ?? []).filter(
      (resource) => resource.url !== plan.practiceMedia.creatorUrl,
    ),
    {
      label: "Creator's tutorial practice-media information",
      url: plan.practiceMedia.creatorUrl,
      description:
        "Use the approved local media folder your teacher supplies. This is the creator's community information page, not a direct ZIP download; students do not need to create another account.",
    },
  ];
  assignment.submissionType =
    item.id === 'vp-q2-l07'
      ? 'google-drive-or-youtube-link-and-reflection'
      : 'google-drive-link-and-reflection';
  lesson.assignment.submissionType = assignment.submissionType;
  assignment.rubric = [
    {
      score: 4,
      description: `All required Resolve actions and evidence are complete, and the reflection explains a thoughtful improvement. ${item.rubricFocus}`,
    },
    {
      score: 3,
      description:
        'Required Resolve actions, evidence, and reflection are complete and meet the stated lesson checklist.',
    },
    {
      score: 2,
      description:
        'Work is partly complete, or a required screenshot, note, playback check, or reflection is missing or unclear.',
    },
    {
      score: 1,
      description:
        'Some work was attempted, but the evidence does not yet demonstrate the required Resolve workflow.',
    },
    { score: 0, description: 'No assessable evidence submitted.' },
  ];

  const dir = `${lessonRoot}/${item.folder}`;
  const writeMarkdown = (file, text) => writeFileSync(join(root, dir, file), `${text.trim()}\n`);
  const videoMinutes = Math.ceil((seconds(item.end) - seconds(item.start)) / 60);
  const naming = `LastName_FirstName_${item.assignmentId.toUpperCase()}_Description`;
  const watchUrl = lesson.video.url;
  const exactUrl = `https://www.youtube.com/embed/${plan.videoId}?start=${seconds(item.start)}&end=${seconds(item.end)}&autoplay=1`;

  writeJson(`${dir}/lesson-data.json`, lesson);
  writeMarkdown(
    'lesson-page.md',
    `# ${lesson.title}

- Program area: Video Production Studio
- Quarter: ${lesson.quarter}
- Unit: ${lesson.unit}
- Lesson number: ${lesson.lessonNumber}
- Lesson ID: ${lesson.id}
- Status: ${lesson.status}

## Today's Goal

${lesson.learningTarget}

## Bell Ringer

${lesson.bellRinger.prompt}

## Video Segment

- Source: ${lesson.video.source}
- Timestamp range: ${item.start}-${item.end}
- Assigned segment: [Play ${item.start}-${item.end} only](${exactUrl})
- YouTube page: [Open at ${item.start}](${watchUrl}); stop at ${item.end}.
- Note: ${lesson.video.note}
- Use only the assigned segment. The longer Cut, Fusion, Color, and Fairlight chapters are outside this foundations unit.

## Follow Along in Resolve

${plan.studentRoutine}

${bullets(item.pauseChecks)}

## Assignment Directions

${numbered(item.requiredSteps)}

## Vocabulary

${bullets(lesson.vocabulary.map((term) => `${term.term}: ${term.definition}`))}

## Teacher Slides

- Slide deck title: ${lesson.slides.title}
- Slide status: ${lesson.slides.status}
- Slide URL: ${lesson.slides.url || 'Not supplied'}

## Submission Checklist

${plan.submissionRoutine}

${bullets(item.evidenceRequired)}

## Reflection

${item.reflectionPrompt}

## Practice Media

Use the approved local tutorial-media folder your teacher supplies. The [creator's media information page](${plan.practiceMedia.creatorUrl}) requires community access and is not a direct public ZIP download. Ask your teacher if the practice files are missing.

## Extension Challenge

${item.extension}

## Exit Ticket

${lesson.exitTicket}

## What To Do If Stuck

${item.intervention}

## Source Alignment Note

Aligned to the teacher-selected video ${plan.videoId}, assigned range ${item.start}-${item.end}, and the local transcript. Use the lesson's bounded video link; the standard YouTube page may keep playing beyond the assigned end.
`,
  );

  writeMarkdown(
    'assignment-sheet.md',
    `# ${assignment.title} Assignment Sheet

## Objective

${lesson.learningTarget}

## Watch, Pause, Practice

${plan.studentRoutine} Assigned segment: ${item.start}-${item.end}.

${bullets(item.pauseChecks)}

## Required Steps

${numbered(item.requiredSteps)}

## Naming Convention

Project: LastName_FirstName_ResolveFoundations. Timeline: Foundations_MiniEdit. Evidence files: ${naming}. Keep original source media in the approved folder. Save the project at every checkpoint.

## Evidence and Submission

${plan.submissionRoutine}

${bullets(item.evidenceRequired)}

## Reflection Prompt

${item.reflectionPrompt}

## What To Do If Stuck

${item.intervention}

## 4-Point Rubric

${bullets(assignment.rubric.map((row) => `${row.score}: ${row.description}`))}

## Extension Challenge

${item.extension}
`,
  );

  writeMarkdown(
    'teacher-notes.md',
    `# Teacher Notes: ${lesson.title}

## Lesson Snapshot

- Lesson ID: ${lesson.id}
- Quarter: Q2
- Unit: DaVinci Resolve Foundations
- Assigned video: ${item.start}-${item.end} (about ${videoMinutes} minutes)
- Class length: 90-minute A/B block
- Existing scheduled dates are unchanged.

## Before Class

${plan.practiceMedia.teacherAction}

- Confirm Resolve opens, the previous project/media path remains available, and students can access DCC and approved evidence links.
- Preview only the assigned segment. Adapt instructions to the installed version; no Studio-only feature is required.
- Explain that students build and document their own work rather than submitting the instructor's screen.
${item.id === 'vp-q2-l07' ? "- The instructor discusses QuickTime and several codecs. MP4/H.264 is the classroom review-copy requirement; tell students explicitly to make this adaptation rather than copying the instructor's format blindly.\n" : ''}

## 90-Minute Block

- 0-5: brief bell ringer and readiness check.
- 5-10: show the target, minimum deliverable, and evidence example.
- 10-65: alternate short tutorial demonstrations with pause-and-repeat practice in each student's project. This includes the ${videoMinutes}-minute video, not an additional ${videoMinutes}-minute lecture.
- 65-75: finish the core workflow, play/check the result, and give targeted intervention.
- 75-85: save, capture the required evidence, submit links, and write the reflection.
- 85-90: exit ticket and reopen/save-location check.

If setup or a pause takes longer, reduce the extension and nonessential demonstrations before evidence capture. Use the November 3-6 support blocks for unfinished exports or troubleshooting; do not move later project deadlines.

## Pause-and-Check Prompts

${bullets(item.pauseChecks)}

## Required Workflow

${numbered(item.requiredSteps)}

## Evidence Review

${bullets(item.evidenceRequired)}

${item.teacherCheck}

## Intervention

${item.intervention}

## Extension

${item.extension}

## Assessment and Boundaries

- The DCC Quiz 1 and Quiz 2 records remain unpublished drafts. When a checkpoint is required, assign an in-class/paper assessment or use the named teacher checkoff; do not tell students an unavailable online quiz is required.
- Basic audio levels and fades in the Edit page are included. Fairlight chapter work is excluded. Cut/Fusion/Color chapters remain outside the teacher-confirmed shorter foundations scope.
- Evidence uses existing Google Docs/Drive/approved YouTube links and the DCC submission workflow. Do not require raw website uploads or community accounts.
- Existing slide links and actual slide status are preserved. Review decks against the clarified checklist; no new deck was created.
`,
  );

  writeMarkdown(
    'bell-ringer-and-exit-ticket.md',
    `# ${lesson.title}: Bell Ringer and Exit Ticket

## Bell Ringer

${lesson.bellRinger.prompt}

Give students 3-5 minutes for a brief response. Use answers to identify one misconception before opening Resolve.

## Exit Ticket

${lesson.exitTicket}

## Teacher Look-Fors

- Connect the response to the lesson target and a specific action the student performed.
- Ask students to point to their saved project or evidence if the answer is vague.
- Complete: correct action plus an explanation. Developing: action named with weak explanation. Needs follow-up: missing response or a misconception that needs reteaching.

## Evidence Reflection

${item.reflectionPrompt}

The reflection belongs in the evidence submission. The exit ticket checks the lesson target separately.
`,
  );

  const revision = `## Follow-Along and Evidence Revision (October 6, 2026)

Use ${item.start}-${item.end} from the approved video. ${routine}

### Pause-and-Practice Prompts

${bullets(item.pauseChecks)}

### Current Required Student Workflow

${numbered(item.requiredSteps)}

### Current Evidence Checklist

${bullets(item.evidenceRequired)}

### Reflection and Differentiation

Reflection: ${item.reflectionPrompt}

Intervention: ${item.intervention}

Extension: ${item.extension}

Teacher check: ${item.teacherCheck}

Use the existing 90-minute block. Cut, Fusion, Color, and Fairlight chapters are not assigned. Do not require a Studio-only tool, a new community account, or a video export before Lesson 7. No deck is created by this brief revision.
`;
  for (const file of ['slide-brief.md', 'presentation-brief.md']) {
    let brief = readFileSync(join(root, dir, file), 'utf8');
    brief = brief.replace(
      /\n## Follow-Along and Evidence Revision \(October 6, 2026\)[\s\S]*$/,
      '',
    );
    brief = brief.replace(/Lessons 06-08/g, 'titles, transitions, and final export readiness');
    brief = brief.replace(/VP-Q2-A09/g, 'VP-Q2-A07');
    brief = brief.replace(/if teacher requests export/g, 'not required before Lesson 7');
    writeMarkdown(file, `${brief.trim()}\n\n${revision}`);
  }
}

for (const base of ['curriculum/website-data', 'src/data/seed']) {
  writeJson(`${base}/lessons.seed.json`, lessons);
  writeJson(`${base}/assignments.seed.json`, assignments);
}
console.log(
  'Synchronized seven DaVinci follow-along lessons, assignments, artifacts, and seed mirrors.',
);
