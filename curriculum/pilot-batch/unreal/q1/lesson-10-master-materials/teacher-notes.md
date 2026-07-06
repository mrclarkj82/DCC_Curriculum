# Master Materials Teacher Notes

## Purpose of the Lesson

Students move from single-instance edits into reusable material planning. The lesson emphasizes organization, neutral defaults, and controlled variation instead of one-off graph edits.

## Suggested 90-Minute Block Schedule

- 0-7 minutes: Login, project setup, and bell ringer.
- 7-17 minutes: Teacher slides and success criteria.
- 17-35 minutes: Video/demo segment.
- 35-75 minutes: Unreal build task with teacher check-ins.
- 75-85 minutes: Submission evidence and file naming.
- 85-90 minutes: Exit ticket, save, and cleanup.

## Teacher Mini-Lesson Talking Points

- Explain the difference between a regular parent material and a planned master material.
- Rename or identify the master material using an M_ naming convention.
- Reset tint, size, roughness, and normal controls to useful default values.
- Convert texture samples into texture parameters.
- Expose Base Color, Roughness, and Normal texture slots.
- Add or inspect a Metallic map option.
- Use a Static Switch Parameter to enable metallic behavior only when needed.
- Press Apply and Save.
- Create material instances from the master material.
- Swap values or textures in the instances and apply them to scene objects.

## Likely Student Issues

- Making the master material too specific to one surface.
- Leaving non-neutral default values that make every instance start with the wrong look.
- Forgetting to expose a texture as a parameter before trying to swap it in an instance.
- Using a metallic map on non-metal materials without a switch or default off state.
- Using inconsistent names that make parent materials and instances hard to identify.

## Intervention Ideas

- Ask students to point to the exact setting, node, object, or screenshot that proves the skill.
- Pair students for a 2-minute evidence check before submission.
- For students who finish early, move them into the extension challenge rather than adding unrelated features.

## Extension Ideas

Design a naming system for a small material library and label which instances would be used for floor, wall, prop, or metal objects.

## Vocabulary Emphasis

- Master material: A reusable parent material designed to drive many material instances.
- Material instance: A child material variation that uses exposed parameters from a parent or master material.
- Default value: The value a parameter uses before an instance overrides it.
- Texture parameter: A texture input exposed so instances can swap maps without editing the parent graph.
- Static switch parameter: A parameter that turns a material branch on or off, such as using a metallic map only when needed.
- Metallic map: A grayscale or mask texture that controls which parts of a material behave like metal.
- Mask: A non-color texture that stores control data for a material.
- Packed mask: One texture that stores multiple masks in separate red, green, and blue channels.
- Reusable workflow: A setup that saves time because the same structure can support many assets.
- Naming convention: A consistent naming pattern such as M_ for materials and MI_ for material instances.

## What Evidence To Check Before Students Leave

- Screenshot of the master material or teacher-provided master material parameters.
- Screenshot of a material instance with texture or value parameters enabled.
- Screenshot of at least two applied material variations in the level.
- Short reflection explaining one benefit of a master material.
