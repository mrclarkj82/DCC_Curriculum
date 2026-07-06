# Texture Maps and Normal Maps

- Program area: Unreal Engine Studio
- Quarter: Q1
- Lesson number: 8
- Lesson ID: ue-q1-l08
- Status: draft-pilot

## Today's Goal

I can import texture maps and connect base color, roughness, and normal maps correctly to build a more believable material.

## Bell Ringer

What is the difference between color detail and surface depth detail?

## Video Segment

- Source: Unreal Engine 5 Beginner Tutorial Transcript
- Timestamp range: 00:54:38-01:03:02
- Note: Covers importing texture maps, Base Color maps, Roughness maps, Normal maps, sRGB settings, mask/non-color texture settings, normal map compression, material connections, Texture Coordinate, Multiply, tiling/scale, and optional color tint. Ends before material instances.

## Vocabulary

- Texture map: An image file used by a material to control part of the surface appearance.
- Base color map: A color texture that provides the main visible color detail of a material.
- Roughness map: A grayscale texture that controls which parts of a surface look shiny or rough.
- Normal map: A texture that fakes small bumps and surface direction changes so lighting reacts with more detail.
- sRGB: A color interpretation setting that should be on for color textures and off for non-color data maps.
- Mask: A non-color texture that stores control information, often in black, white, or grayscale values.
- Compression setting: An import setting that tells Unreal how to treat and optimize a texture file.
- Texture coordinate: A node that controls how texture UVs are read by a material.
- UVs: The 2D coordinate layout used to place a texture on a 3D surface.
- Tiling: How often a texture repeats across a surface.

## Teacher Slides

- Slide deck title: Lesson 08 - Texture Maps and Normal Maps
- Slide status: created
- Slide URL: https://docs.google.com/presentation/d/13Vz9agA9hyv7wrxRqyTQs3dccfHU1Pz4/edit?usp=sharing&ouid=107038757575028800661&rtpof=true&sd=true

## Assignment Summary

Students import or use provided texture maps, check basic texture settings, create a material using base color, roughness, and normal maps, then adjust tiling/scale using texture coordinates or a multiply node.

## Submission Checklist

- Screenshot of imported texture assets.
- Screenshot of material graph connections.
- Screenshot of material applied in the level.
- Short reflection explaining what the normal map adds.

## Extension Challenge

Create two versions of the same material with different tiling values and label which one feels more believable for the object scale.

## Exit Ticket

Why should sRGB usually be turned off for roughness maps and normal maps?

## Common Problems and Fixes

- Leaving sRGB on for a roughness map.
- Using the normal map as a color texture instead of connecting it to Normal.
- Forgetting to Apply and Save after wiring the graph.
- Making the texture repeat too often because tiling/scale was not adjusted.
- Jumping ahead to material instances before the base material is understood.

## Student-Facing Help

- Use the lesson vocabulary when explaining your work.
- Capture screenshots that clearly show the required skill.
- If something does not update, check the exact setting, connection, or Apply/Save step named in the lesson.

## Source Alignment Note

This pilot lesson is aligned to the Unreal Engine 5 beginner tutorial transcript range 00:54:38-01:03:02. Covers importing texture maps, Base Color maps, Roughness maps, Normal maps, sRGB settings, mask/non-color texture settings, normal map compression, material connections, Texture Coordinate, Multiply, tiling/scale, and optional color tint. Ends before material instances.
