# Slide Brief: Fusion 2: Merges, Masks, and Atmosphere

Create a concise 9-slide classroom deck for a 90-minute high school block. This teacher-facing brief is ready for ChatGPT; no deck exists yet.

## Slide Sequence

1. Target and evidence goal.
2. Bell ringer: How could you add fog to one part of an image while keeping the rest clear?
3. Why this workflow helps a video production team.
4. Vocabulary: Merge, Foreground/background, Mask, Polygon, Fast Noise, Soft edge.
5. Annotated Resolve interface and a simple before/after.
6. Short teacher demonstration with pause checks.
7. One common error and a concrete repair.
8. Independent practice and evidence checklist.
9. Reflection and exit ticket: What job does your mask limit, and what would change if you swapped your Merge inputs?

## Visual and Speaker-Note Guidance

Use the DCC synthwave palette, large readable interface callouts, and an original flow diagram. Keep paragraphs off slides. Include teacher demo notes and the selected tutorial link as the source. Use screenshots/placeholders without student data.

## Follow-Along and Evidence Revision (October 6, 2026)

Use 02:02:05-02:27:02 from the approved video. Open the assigned tutorial segment and your own DaVinci Resolve project together. Watch a short demonstration, pause, repeat the action, and check the result before continuing. Keep the same saved project through all eleven lessons and use separate Cut/Fusion practice timelines where directed. Watching alone does not complete the assignment. For Lessons 1-10, collect the required screenshots and short notes in one Google Doc or approved Drive folder, submit its share link in DCC, complete the evidence checklist, and type the reflection. No exported movie is required for these checkpoints. The final export lesson (sequence 11; stable ID vp-q2-l07) requires a playable video link and export-settings evidence. Save project work locally; DCC collects evidence links, not raw uploads.

### Pause-and-Practice Prompts

- After Merge wiring: identify the background, foreground, and final output; inspect each in a viewer.
- After connecting the mask: show which area is affected and which area stays clear.
- After keyframes: scrub two different frames and verify that a small change actually occurs.

### Current Required Student Workflow

1. Open Foundations_FusionPractice and select a wide or house shot. Before copying tutorial color-management settings, confirm the teacher-provided settings match your footage; do not guess a camera input profile.
2. Watch 02:02:05-02:27:02. Pause after the Fast Noise, Merge, mask, and fog-animation demonstrations. Watch the day-to-night example to understand branching; recreating every branch is an extension.
3. Generate a subtle smoke or fog layer with Fast Noise. Use a Merge to combine your footage as background with the atmosphere as foreground, then connect the Merge output to MediaOut.
4. Draw and connect a polygon or ellipse mask to limit the atmosphere to a purposeful area. Soften its edge and adjust opacity/detail so important action remains visible.
5. Animate one atmosphere or mask position using at least two keyframes. Scrub and play the beginning, middle, and end, then return to Edit to verify the effect in the timeline.
6. Save. Submit the labeled node flow and composite screenshot, two frame captures showing the animated change, and a note explaining the mask and Merge inputs. Submit the evidence link and DCC reflection; no export is required.

### Current Evidence Checklist

- A Google Docs or Drive link with a screenshot of the working MediaIn/Fast Noise/Merge/mask flow and output.
- In the same document, two frame captures of the animated change and labels identifying foreground, background, and the mask job.
- A 2-3 sentence DCC reflection explaining why the masked atmosphere supports the shot and how you checked its motion.

### Reflection and Differentiation

Reflection: In 2-3 sentences, explain what your mask limits, why the atmosphere belongs in the shot, and how you verified the animated change.

Intervention: Use one short static shot, one Fast Noise layer, one Merge, and one ellipse mask. Make a small two-keyframe move; skip the advanced day-to-night branches.

Extension: Recreate a restrained day-to-night treatment using separate sky/ground branches and explain how changing the mask or node order changes the composite.

Teacher check: Check real foreground/background wiring, the mask connection, and two distinct keyframe values. Match source color settings to the supplied media instead of applying the instructor's camera profile to every clip.

Use the existing 90-minute block. Cut and Fusion are assigned; Color-page and Fairlight chapters are excluded. Do not require Studio-only tools, Speed Editor hardware, a new community account, or a video export before the final export lesson (sequence 11, stable ID vp-q2-l07). No deck is created by this brief revision.
