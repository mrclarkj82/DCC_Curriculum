# Slide Brief: Texture Maps and Normal Maps

This is not the final PowerPoint. Use this as the slide-generation brief for ChatGPT Pro.

## Slide 1: Title + learning target

- Concise bullet content: Lesson 08: Texture Maps and Normal Maps; Learning target: I can import texture maps and connect base color, roughness, and normal maps correctly to build a more believable material.
- Suggested screenshot/visual: Texture set showing Base Color, Roughness, and Normal files side by side.
- Speaker notes: Start with the target and the single product students need to create or improve today.
- Student question/callout: What should your evidence prove by the end of class?
- Accessibility alt text: Title and learning target slide for Texture Maps and Normal Maps.

## Slide 2: Why this matters for digital content creators

- Concise bullet content: Texture maps add detail without modeling every bump or color variation by hand. They help a simple object read as stone, pavement, wood, fabric, or another believable surface.
- Suggested screenshot/visual: Texture set showing Base Color, Roughness, and Normal files side by side.
- Speaker notes: Connect the skill to game, film, visualization, or portfolio work so students understand why the workflow matters.
- Student question/callout: Where could this skill appear in a real digital scene?
- Accessibility alt text: Visual explaining why Texture Maps and Normal Maps matters for digital content creators.

## Slide 3: What students will do today

- Concise bullet content: Import or locate Base Color, Roughness, and Normal textures.; Check sRGB and compression settings.; Connect the maps to the correct material inputs.; Adjust tiling or scale and capture evidence.
- Suggested screenshot/visual: Simple workflow timeline for the 90-minute class block.
- Speaker notes: Preview the lesson flow before opening Unreal so students know what to listen for in the demo.
- Student question/callout: Which step do you need to be ready to do on your own?
- Accessibility alt text: Workflow slide listing what students will do during Texture Maps and Normal Maps.

## Slide 4: Key vocabulary

- Concise bullet content: Texture map: An image file used by a material to control part of the surface appearance.; Base color map: A color texture that provides the main visible color detail of a material.; Roughness map: A grayscale texture that controls which parts of a surface look shiny or rough.; Normal map: A texture that fakes small bumps and surface direction changes so lighting reacts with more detail.; sRGB: A color interpretation setting that should be on for color textures and off for non-color data maps.; Mask: A non-color texture that stores control information, often in black, white, or grayscale values.
- Suggested screenshot/visual: Vocabulary callouts over a related Unreal screenshot.
- Speaker notes: Keep definitions short and point out which terms should appear in student reflections or exit tickets.
- Student question/callout: Which vocabulary word will you probably use in your reflection?
- Accessibility alt text: Key vocabulary for Texture Maps and Normal Maps.

## Slide 5: Main tool or interface overview

- Concise bullet content: Texture assets appear in the Content Drawer.; Texture samples feed image data into the material graph.; Base Color maps carry color information.; Roughness and Normal maps carry non-color data.; Texture Coordinate and Multiply nodes can adjust tiling or scale.
- Suggested screenshot/visual: Material graph with three texture samples connected to the correct inputs.
- Speaker notes: Use a screenshot with labels. Keep attention on the few interface areas students need today.
- Student question/callout: Which tool, panel, or setting is most important for this task?
- Accessibility alt text: Main tool or interface overview for Texture Maps and Normal Maps.

## Slide 6: Teacher demo steps

- Concise bullet content: Import or locate a base color texture.; Import or locate a roughness texture.; Import or locate a normal map.; Confirm sRGB is on for color textures and off for roughness/masks and normal maps.; Confirm normal map compression/settings if applicable.; Create a material using the M_ naming convention.; Connect Base Color, Roughness, and Normal maps to the correct inputs.; Use Texture Coordinate/Multiply or equivalent to adjust tiling or scale.; Apply, save, and place the material on a floor or object.
- Suggested screenshot/visual: Surface comparison with and without a normal map, plus a tiling comparison.
- Speaker notes: Demonstrate slowly enough that students can see each required action. Pause after the highest-risk step and ask for a quick check.
- Student question/callout: Which demo step is easiest to miss?
- Accessibility alt text: Teacher demo steps for Texture Maps and Normal Maps.

## Slide 7: Common mistakes

- Concise bullet content: Leaving sRGB on for a roughness map.; Using the normal map as a color texture instead of connecting it to Normal.; Forgetting to Apply and Save after wiring the graph.; Making the texture repeat too often because tiling/scale was not adjusted.; Jumping ahead to material instances before the base material is understood.
- Suggested screenshot/visual: Common mistake examples with a small fix label beside each one.
- Speaker notes: Normalize troubleshooting. Students should name the exact problem before asking for help.
- Student question/callout: Which mistake would make your evidence hard to grade?
- Accessibility alt text: Common mistakes for Texture Maps and Normal Maps.

## Slide 8: Assignment checklist

- Concise bullet content: Screenshot of imported texture assets.; Screenshot of material graph connections.; Screenshot of material applied in the level.; Short reflection explaining what the normal map adds.
- Suggested screenshot/visual: Submission checklist with screenshot thumbnail placeholders.
- Speaker notes: Use this as the final work-time checkpoint. Students should compare their files directly to the checklist.
- Student question/callout: Could someone grade your work from your screenshots and reflection?
- Accessibility alt text: Assignment checklist for Texture Maps and Normal Maps.

## Slide 9: Exit ticket and save/submit reminder

- Concise bullet content: Why should sRGB usually be turned off for roughness maps and normal maps?; Save files using the naming convention.; Submit: Screenshot of imported texture assets.; Screenshot of material graph connections.; Screenshot of material applied in the level.; Short reflection explaining what the normal map adds.
- Suggested screenshot/visual: Exit ticket slide with a clean Unreal screenshot background.
- Speaker notes: End with saving, submitting, and one short written answer that reveals whether the learning target landed.
- Student question/callout: What should you double-check before leaving?
- Accessibility alt text: Exit ticket and save or submit reminder for Texture Maps and Normal Maps.

## ChatGPT Pro PowerPoint Prompt

```text
Create a downloadable .pptx PowerPoint deck for a high school Digital Content Creators class.

Program Area ID: unreal-engine
Program Area: Unreal Engine Studio
Quarter: Q1
Lesson ID: ue-q1-l08
Lesson Title: Texture Maps and Normal Maps
Class Length: 90 minutes
Video Segment: 00:54:38-01:03:02
Learning Target: I can import texture maps and connect base color, roughness, and normal maps correctly to build a more believable material.
Bell Ringer: What is the difference between color detail and surface depth detail?
Assignment: Texture Map Material Build
Submission Evidence: Screenshot of imported texture assets.; Screenshot of material graph connections.; Screenshot of material applied in the level.; Short reflection explaining what the normal map adds.

Create a 9-slide deck using this exact structure:
1. Title + learning target
2. Why this matters for digital content creators
3. What students will do today
4. Key vocabulary
5. Main tool or interface overview
6. Teacher demo steps
7. Common mistakes
8. Assignment checklist
9. Exit ticket and save/submit reminder

For each slide include concise slide text, teacher speaker notes, suggested visuals/screenshots, one student callout question, and accessibility alt text. Keep student-facing language clear, practical, and high-school appropriate. Use the transcript-aligned details from the brief. Output a downloadable .pptx file. Do not teach material instances, parameters, or advanced shader workflows in this deck; save material instances for Lesson 09.
```
