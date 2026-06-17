# Exposure and Post-Process Teacher Notes

## Purpose of the Lesson

Students learn that Unreal scenes are affected by camera-style rendering choices. The goal is to understand exposure and one simple visual effect, not to master every post-process option.

## Suggested 90-Minute Block Schedule

- 0-7 minutes: Login, project setup, and bell ringer.
- 7-17 minutes: Teacher slides and success criteria.
- 17-35 minutes: Video/demo segment.
- 35-75 minutes: Unreal build task with teacher check-ins.
- 75-85 minutes: Submission evidence and file naming.
- 85-90 minutes: Exit ticket, save, and cleanup.

## Teacher Mini-Lesson Talking Points

- Use the bright-to-dark example to explain auto exposure in concrete terms.
- Distinguish viewport exposure preview controls from a Post Process Volume used in the scene.
- Model enabling the checkbox beside a property before changing its value.
- Keep the effects simple: exposure first, then one effect such as Bloom, Vignette, or Saturation.

## Likely Student Issues

- Changing viewport exposure preview settings and expecting the game result to change.
- Forgetting to enable the checkbox beside a post-process property.
- Leaving the camera outside a bounded Post Process Volume.
- Using too many effects at once so the evidence is hard to read.

## Intervention Ideas

- Ask students to point to the exact setting, node, object, or screenshot that proves the skill.
- Pair students for a 2-minute evidence check before submission.
- For students who finish early, move them into the extension challenge rather than adding unrelated features.

## Extension Ideas

Create two mood versions of the same view, such as neutral exposure and dramatic high-contrast exposure, and label the setting that changed.

## Vocabulary Emphasis

- Exposure: How bright or dark the rendered scene appears to the camera.
- Auto exposure: A camera behavior that automatically adjusts brightness, similar to eyes adapting between dark and bright areas.
- Post-process volume: An Unreal volume that applies camera and image effects after the scene is rendered.
- Bloom: A glow effect around bright areas of the image.
- Vignette: A darkening or shading effect around the edges of the image.
- Saturation: The strength or intensity of colors in the image.
- Infinite extent unbound: A Post Process Volume setting that makes the effect apply to the entire level instead of only inside the volume.
- Metering mode: The exposure measurement mode used to decide how scene brightness should be handled.

## What Evidence To Check Before Students Leave

- Screenshot showing auto exposure/problem situation.
- Screenshot showing manual exposure/post-process result.
- Short reflection explaining what changed.
