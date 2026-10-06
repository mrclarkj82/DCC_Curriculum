# DaVinci Resolve Source and Whisper Audit — October 6, 2026

## Source

- Teacher-selected video: [Introduction to DaVinci Resolve — Full Course for Beginners](https://www.youtube.com/watch?v=MCDVcQIA3UM).
- Creator: Casey Faris / Ground Control.
- Video ID: `MCDVcQIA3UM`. The teacher's new share link and the repository's previous link resolve to the same video.
- Public video duration: 18,655 seconds (5:10:55).
- The existing teacher-supplied transcript remains at `curriculum/source/davinci-resolve-q2-tutorial-transcript.md`.

## Fresh Audio Analysis

Installed `openai-whisper` 20250625 with FFmpeg support and a CUDA-enabled PyTorch environment. The installed tool environment and cached model are stored outside the repository in the local DCC tools directory; application dependencies did not change.

Processed the full downloaded audio locally with OpenAI Whisper `turbo`, English transcription, FP16 CUDA inference, and greedy decoding in resumable 20-minute chunks. Processing completed with 5,930 timestamped speech segments in 793 seconds. Reviewed the assigned-segment transitions, the custom shortcut explanation, the Edit-page audio/Inspector work, and the export discussion against the existing source transcript.

Audio SHA-256 for reproducibility: `741ac0de3e03dc9c2bc6c654c8f9e06a81878bef9295570484355c84c8e0c191`.

The local audio and machine output are working analysis files and are not published with the curriculum. This audit and the revised lesson guides contain original instructional writing; no new complete verbatim transcript or downloaded media is committed.

## Retained Foundations Segments

The teacher confirmed the shorter foundations scope. The existing seven segments remain appropriate and are retained:

| Lesson | Assigned range | Practical outcome |
| --- | --- | --- |
| 1 | 00:00:00-00:13:16 | Named, saved project and page-purpose notes |
| 2 | 00:13:16-00:25:47 | Organized bins and useful clip metadata |
| 3 | 00:25:47-00:35:30 | Audio-sync awareness and four-clip timeline |
| 4 | 00:35:30-01:07:04 | In/out selections, trimming, and 30-60 second rough cut |
| 5 | 01:07:04-01:20:08 | Cleanup, basic Edit-page audio, and Inspector checks |
| 6 | 01:20:08-01:30:41 | Readable title, restrained transition choice, optional simple motion |
| 7 | 04:53:29-05:06:57 | Render settings, queue, and verified final export |

Total assigned playback is 1:44:09. Pause-and-repeat practice, evidence capture, and student reflection occupy the remaining block time.

## Fairlight and Scope Boundaries

The creator's published chapter markers place Fairlight at 04:16:55-04:53:00. These markers include transitions; the closing Fairlight explanation continues briefly beyond the nominal Deliver marker. The retained Lesson 7 start at **04:53:29** begins the actual Deliver workflow after that explanation.

The longer middle span, 01:30:41-04:53:29, stays unassigned under the teacher-confirmed shorter scope. It includes the longer Cut, Fusion, Color, and Fairlight chapters. Basic audio levels/fades taught in the Edit page are retained; students are not assigned the Fairlight chapter.

## Classroom Adaptations

- The instructor demonstrates customized Q/W/S shortcuts. Grade the editing action, not an identical shortcut mapping; students may use the classroom/default mapping or menu command.
- The instructor changes to prepared example timelines. Students continue their own saved mini-edit rather than submitting the instructor's project or screen.
- The export discussion includes QuickTime and several codecs. The classroom deliverable selects MP4/H.264 for a broadly playable review copy; this is an explicit classroom format choice, not a claim that the instructor requires MP4.
- Paid effects, separate Fusion compositions, and optional position animation are not core requirements.
- Lessons 1-6 use screenshot/note evidence and a reflection. Lesson 7 requires the playable exported movie and settings evidence.

## Practice-Media Handoff

**Status: needs-teacher-review.** The current video description directs viewers to the [creator's free community](https://www.skool.com/groundcontrol/about) for downloadable media. The public page confirms downloadable course media, but access requires joining the community; no direct public ZIP URL was verified.

Teacher action: supply the approved local tutorial-media folder before Lesson 1 and confirm the source paths persist between classes. Students are not required to create another account. If separate sync media is unavailable, Lesson 3 documents that limitation and uses existing clip audio.

## Publication Boundaries

The original seven lesson IDs, assignment IDs, dates, slide links, and actual slide status remain intact. The two website quiz records remain unpublished drafts; the lesson instructions give a teacher-assigned assessment or named teacher checkoff alternative. No quiz score is invented, no student work is modified, and no security rules or routes are changed.
