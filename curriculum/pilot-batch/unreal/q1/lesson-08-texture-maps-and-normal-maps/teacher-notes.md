# Texture Maps and Normal Maps Teacher Notes

## Purpose of the Lesson

Students connect material graph basics to real texture assets. The lesson emphasizes correct map purposes, sRGB settings, and normal map surface detail while intentionally saving material instances for Lesson 09.

## Suggested 90-Minute Block Schedule

- 0-7 minutes: Login, project setup, and bell ringer.
- 7-17 minutes: Teacher slides and success criteria.
- 17-35 minutes: Video/demo segment.
- 35-75 minutes: Unreal build task with teacher check-ins.
- 75-85 minutes: Submission evidence and file naming.
- 85-90 minutes: Exit ticket, save, and cleanup.

## Teacher Mini-Lesson Talking Points

- Explain the difference between color information and data information.
- Show that Base Color goes to Base Color, Roughness goes to Roughness, and Normal goes to Normal.
- Model checking sRGB off for Roughness and Normal maps.
- Use one tiling adjustment only if students need it.
- Do not teach material instances in detail yet. Save them for Lesson 09.

## Likely Student Issues

- Leaving sRGB on for a roughness map.
- Using the normal map as a color texture instead of connecting it to Normal.
- Forgetting to Apply and Save after wiring the graph.
- Making the texture repeat too often because tiling/scale was not adjusted.
- Jumping ahead to material instances before the base material is understood.

## Intervention Ideas

- Ask students to point to the exact setting, node, object, or screenshot that proves the skill.
- Pair students for a 2-minute evidence check before submission.
- For students who finish early, move them into the extension challenge rather than adding unrelated features.

## Extension Ideas

Create two versions of the same material with different tiling values and label which one feels more believable for the object scale.

## Vocabulary Emphasis

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

## What Evidence To Check Before Students Leave

- Screenshot of imported texture assets.
- Screenshot of material graph connections.
- Screenshot of material applied in the level.
- Short reflection explaining what the normal map adds.
