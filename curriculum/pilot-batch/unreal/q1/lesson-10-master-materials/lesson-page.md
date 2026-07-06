# Master Materials

- Program area: Unreal Engine Studio
- Quarter: Q1
- Lesson number: 10
- Lesson ID: ue-q1-l10
- Status: draft-pilot

## Today's Goal

I can describe why master materials help organize reusable material workflows.

## Bell Ringer

What kinds of settings would be useful to reuse across many objects?

## Video Segment

- Source: Unreal Engine 5 Beginner Tutorial Transcript
- Timestamp range: 01:09:01-01:14:43
- Note: Covers the master material concept, neutral default values, exposing texture parameters, swapping Base Color/Roughness/Normal textures in instances, adding a Metallic map, using a Static Switch Parameter for metallic behavior, and building a reusable material workflow.

## Vocabulary

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

## Teacher Slides Placeholder

- Slide deck title: Lesson 10 - Master Materials
- Slide status: not-created
- Slide URL: to be added after deck creation

## Assignment Summary

Students build or inspect a starter master material, identify reusable parameters, and create controlled material variations from that shared parent workflow.

## Submission Checklist

- Screenshot of the master material or teacher-provided master material parameters.
- Screenshot of a material instance with texture or value parameters enabled.
- Screenshot of at least two applied material variations in the level.
- Short reflection explaining one benefit of a master material.

## Extension Challenge

Design a naming system for a small material library and label which instances would be used for floor, wall, prop, or metal objects.

## Exit Ticket

What is one benefit of using a master material?

## Common Problems and Fixes

- Making the master material too specific to one surface.
- Leaving non-neutral default values that make every instance start with the wrong look.
- Forgetting to expose a texture as a parameter before trying to swap it in an instance.
- Using a metallic map on non-metal materials without a switch or default off state.
- Using inconsistent names that make parent materials and instances hard to identify.

## Student-Facing Help

- Use the lesson vocabulary when explaining your work.
- Capture screenshots that clearly show the required skill.
- If something does not update, check the exact setting, connection, or Apply/Save step named in the lesson.

## Source Alignment Note

This pilot lesson is aligned to the Unreal Engine 5 beginner tutorial transcript range 01:09:01-01:14:43. Covers the master material concept, neutral default values, exposing texture parameters, swapping Base Color/Roughness/Normal textures in instances, adding a Metallic map, using a Static Switch Parameter for metallic behavior, and building a reusable material workflow.
