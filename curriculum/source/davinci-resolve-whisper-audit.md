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

## Current Foundations Segments

The teacher's later October 6 direction includes Cut and Fusion and authorizes extending the calendar. The eleven-lesson sequence is now:

| Sequence | Stable ID | Assigned range |
| --- | --- | --- |
| 1 | vp-q2-l01 | 00:00:00-00:13:16 |
| 2 | vp-q2-l02 | 00:13:16-00:25:47 |
| 3 | vp-q2-l03 | 00:25:47-00:35:30 |
| 4 | vp-q2-l04 | 00:35:30-01:07:04 |
| 5 | vp-q2-l05 | 01:07:04-01:20:08 |
| 6 | vp-q2-l06 | 01:20:08-01:30:41 |
| 7 | vp-q2-l08 | 01:30:41-01:43:14 |
| 8 | vp-q2-l09 | 01:43:14-02:02:05 |
| 9 | vp-q2-l10 | 02:02:05-02:27:02 |
| 10 | vp-q2-l11 | 02:27:02-02:50:28 |
| 11 | vp-q2-l07 | 04:53:29-05:06:57 |

Total assigned playback is 3:03:56 across eleven 90-minute blocks. Pause-and-repeat practice, evidence capture, and reflection occupy the remaining time.

## Source Boundaries

Fresh Whisper segments and the supplied transcript confirm the Cut transition at 01:30:41, the Fusion workflow introduction at 01:43:14, the shift to atmosphere at 02:02:05, and the two-plate composite at 02:27:02. The Fusion outro finishes at 02:50:28 before the actual Color setup, slightly after the nominal published Color marker of 02:50:20.

Skip 02:50:28-04:53:29, covering Color-page and Fairlight work. The published Fairlight chapter starts at 04:16:55 and its closing explanation continues briefly beyond the nominal Deliver marker of 04:53:00. Final export starts at 04:53:29 after that explanation. Basic Edit-page audio and Fusion image/color tools remain included.

## Classroom Adaptations

- The instructor demonstrates customized Q/W/S shortcuts. Grade the editing action, not an identical shortcut mapping; students may use the classroom/default mapping or menu command.
- The instructor changes to prepared example timelines. Students continue their own saved mini-edit rather than submitting the instructor's project or screen.
- The export discussion includes QuickTime and several codecs. The classroom deliverable selects MP4/H.264 for a broadly playable review copy; this is an explicit classroom format choice, not a claim that the instructor requires MP4.
- Fusion node flows, masks, merges, compositing, and basic animation are core work. The Studio-only Magic Mask demonstration is viewing-only; students may use manual keyframes instead of tracking. Speed Editor hardware is not required.
- Sequences 1-10 use screenshot/note evidence and a reflection. The final export lesson (sequence 11, stable ID vp-q2-l07) requires the playable movie and settings evidence.

## Practice-Media Handoff

**Status: needs-teacher-review.** The current video description directs viewers to the [creator's free community](https://www.skool.com/groundcontrol/about) for downloadable media. The public page confirms downloadable course media, but access requires joining the community; no direct public ZIP URL was verified.

Teacher action: supply the approved local tutorial-media folder before Lesson 1 and confirm paths persist between classes. Include Fusion wide/house/alien/ship plates and a moving shot, or approved substitutes. Confirm source-specific color-management settings. Students are not required to create another account. If separate sync media is unavailable, Lesson 3 documents that limitation and uses existing clip audio.

## Publication Boundaries

The original seven lesson and assignment IDs and existing slide links/status are retained. Four new pairs are added, and the final export retains its stable ID at sequence 11. The teacher approved moving dates: projects extend through January 14 and the following Unreal sequence moves through March 4 to avoid overlap. Existing school-day cycle labels remain unchanged. The two quizzes remain unpublished with teacher-assessment/checkoff alternatives. No student work, security rule, or game route is changed.
