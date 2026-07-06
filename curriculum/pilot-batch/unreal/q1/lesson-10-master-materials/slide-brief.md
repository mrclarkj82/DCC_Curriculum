# Slide Brief: Master Materials

This is not the final PowerPoint. Use this as the slide-generation brief for ChatGPT Pro.

## Slide 1: Title + learning target

- Concise bullet content: Lesson 10: Master Materials; Learning target: I can describe why master materials help organize reusable material workflows.
- Suggested screenshot/visual: Diagram showing one master material branching into several material instances for different surfaces.
- Speaker notes: Start with the target and the single product students need to create or improve today.
- Student question/callout: What should your evidence prove by the end of class?
- Accessibility alt text: Title and learning target slide for Master Materials.

## Slide 2: Why this matters for digital content creators

- Concise bullet content: Master materials help studios keep a consistent visual system while still allowing many surface variations.
- Suggested screenshot/visual: Diagram showing one master material branching into several material instances for different surfaces.
- Speaker notes: Connect the skill to game, film, visualization, or portfolio work so students understand why the workflow matters.
- Student question/callout: Where could this skill appear in a real digital scene?
- Accessibility alt text: Visual explaining why Master Materials matters for digital content creators.

## Slide 3: What students will do today

- Concise bullet content: Open or create the starter master material.; Check that default values are neutral and predictable.; Expose texture inputs for Base Color, Roughness, and Normal where appropriate.; Add or inspect a Metallic texture option.; Use or identify a Static Switch Parameter for optional metallic behavior.
- Suggested screenshot/visual: Simple workflow timeline for the 90-minute class block.
- Speaker notes: Preview the lesson flow before opening Unreal so students know what to listen for in the demo.
- Student question/callout: Which step do you need to be ready to do on your own?
- Accessibility alt text: Workflow slide listing what students will do during Master Materials.

## Slide 4: Key vocabulary

- Concise bullet content: Master material: A reusable parent material designed to drive many material instances.; Material instance: A child material variation that uses exposed parameters from a parent or master material.; Default value: The value a parameter uses before an instance overrides it.; Texture parameter: A texture input exposed so instances can swap maps without editing the parent graph.; Static switch parameter: A parameter that turns a material branch on or off, such as using a metallic map only when needed.; Metallic map: A grayscale or mask texture that controls which parts of a material behave like metal.
- Suggested screenshot/visual: Vocabulary callouts over a related Unreal screenshot.
- Speaker notes: Keep definitions short and point out which terms should appear in student reflections or exit tickets.
- Student question/callout: Which vocabulary word will you probably use in your reflection?
- Accessibility alt text: Key vocabulary for Master Materials.

## Slide 5: Main tool or interface overview

- Concise bullet content: A master material acts as the reusable parent.; Texture parameters let instances swap maps.; Neutral defaults prevent surprise changes.; Static switches turn optional features on or off.; Clear names keep the material library manageable.
- Suggested screenshot/visual: Master Materials interface screenshot with 4-5 labeled areas.
- Speaker notes: Use a screenshot with labels. Keep attention on the few interface areas students need today.
- Student question/callout: Which tool, panel, or setting is most important for this task?
- Accessibility alt text: Main tool or interface overview for Master Materials.

## Slide 6: Teacher demo steps

- Concise bullet content: Explain the difference between a regular parent material and a planned master material.; Rename or identify the master material using an M_ naming convention.; Reset tint, size, roughness, and normal controls to useful default values.; Convert texture samples into texture parameters.; Expose Base Color, Roughness, and Normal texture slots.; Add or inspect a Metallic map option.; Use a Static Switch Parameter to enable metallic behavior only when needed.; Press Apply and Save.; Create material instances from the master material.; Swap values or textures in the instances and apply them to scene objects.
- Suggested screenshot/visual: Diagram showing one master material branching into several material instances for different surfaces.
- Speaker notes: Demonstrate slowly enough that students can see each required action. Pause after the highest-risk step and ask for a quick check.
- Student question/callout: Which demo step is easiest to miss?
- Accessibility alt text: Teacher demo steps for Master Materials.

## Slide 7: Common mistakes

- Concise bullet content: Making the master material too specific to one surface.; Leaving non-neutral default values that make every instance start with the wrong look.; Forgetting to expose a texture as a parameter before trying to swap it in an instance.; Using a metallic map on non-metal materials without a switch or default off state.; Using inconsistent names that make parent materials and instances hard to identify.
- Suggested screenshot/visual: Common mistake examples with a small fix label beside each one.
- Speaker notes: Normalize troubleshooting. Students should name the exact problem before asking for help.
- Student question/callout: Which mistake would make your evidence hard to grade?
- Accessibility alt text: Common mistakes for Master Materials.

## Slide 8: Assignment checklist

- Concise bullet content: Screenshot of the master material or teacher-provided master material parameters.; Screenshot of a material instance with texture or value parameters enabled.; Screenshot of at least two applied material variations in the level.; Short reflection explaining one benefit of a master material.
- Suggested screenshot/visual: Submission checklist with screenshot thumbnail placeholders.
- Speaker notes: Use this as the final work-time checkpoint. Students should compare their files directly to the checklist.
- Student question/callout: Could someone grade your work from your screenshots and reflection?
- Accessibility alt text: Assignment checklist for Master Materials.

## Slide 9: Exit ticket and save/submit reminder

- Concise bullet content: What is one benefit of using a master material?; Save files using the naming convention.; Submit: Screenshot of the master material or teacher-provided master material parameters.; Screenshot of a material instance with texture or value parameters enabled.; Screenshot of at least two applied material variations in the level.; Short reflection explaining one benefit of a master material.
- Suggested screenshot/visual: Exit ticket slide with a clean Unreal screenshot background.
- Speaker notes: End with saving, submitting, and one short written answer that reveals whether the learning target landed.
- Student question/callout: What should you double-check before leaving?
- Accessibility alt text: Exit ticket and save or submit reminder for Master Materials.

## ChatGPT Pro PowerPoint Prompt

```text
Create a downloadable .pptx PowerPoint deck for a high school Digital Content Creators class.

Program Area ID: unreal-engine
Program Area: Unreal Engine Studio
Quarter: Q1
Lesson ID: ue-q1-l10
Lesson Title: Master Materials
Class Length: 90 minutes
Video Segment: 01:09:01-01:14:43
Learning Target: I can describe why master materials help organize reusable material workflows.
Bell Ringer: What kinds of settings would be useful to reuse across many objects?
Assignment: Starter Master Material Variations
Submission Evidence: Screenshot of the master material or teacher-provided master material parameters.; Screenshot of a material instance with texture or value parameters enabled.; Screenshot of at least two applied material variations in the level.; Short reflection explaining one benefit of a master material.

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

For each slide include concise slide text, teacher speaker notes, suggested visuals/screenshots, one student callout question, and accessibility alt text. Keep student-facing language clear, practical, and high-school appropriate. Use the transcript-aligned details from the brief. Output a downloadable .pptx file. Keep the deck focused on beginner-friendly master material organization. Do not go deep into advanced shader math or performance optimization.
```
