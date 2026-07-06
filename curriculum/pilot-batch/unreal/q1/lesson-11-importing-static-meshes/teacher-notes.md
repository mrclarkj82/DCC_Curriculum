# Importing Static Meshes Teacher Notes

## Purpose of the Lesson

Students connect file import, folder organization, materials, and placement into one asset workflow. The lesson makes imported objects feel like manageable Unreal assets instead of mystery files.

## Suggested 90-Minute Block Schedule

- 0-7 minutes: Login, project setup, and bell ringer.
- 7-17 minutes: Teacher slides and success criteria.
- 17-35 minutes: Video/demo segment.
- 35-75 minutes: Unreal build task with teacher check-ins.
- 75-85 minutes: Submission evidence and file naming.
- 85-90 minutes: Exit ticket, save, and cleanup.

## Teacher Mini-Lesson Talking Points

- Define a static mesh as a 3D object asset.
- Create a clean folder for the imported asset set.
- Drag an FBX into the Content Drawer.
- Review import options and reset to defaults if needed.
- Disable automatic material or texture creation if using the class master material workflow.
- Place the mesh in the scene and check scale, rotation, and location.
- Import the related texture maps manually.
- Create a material instance from the master material.
- Assign color, roughness, normal, and optional metallic maps.
- Open the Static Mesh Editor and set the material slot as the default material.

## Likely Student Issues

- Importing assets into a messy or incorrect folder.
- Letting Unreal create unwanted materials when the class workflow uses a master material.
- Forgetting to assign a material to the static mesh.
- Only changing one placed copy instead of setting the default material slot when needed.
- Not checking scale before building a scene around the imported asset.

## Intervention Ideas

- Ask students to point to the exact setting, node, object, or screenshot that proves the skill.
- Pair students for a 2-minute evidence check before submission.
- For students who finish early, move them into the extension challenge rather than adding unrelated features.

## Extension Ideas

Create a small prop arrangement using at least three duplicates of the imported mesh with different transforms.

## Vocabulary Emphasis

- Static mesh: A 3D object asset made of vertices and faces that can be placed in an Unreal level.
- FBX: A common 3D model file format used to move static meshes between tools and Unreal.
- Import options: Settings Unreal shows when bringing a file such as an FBX into the project.
- Content Drawer: The panel where imported assets, folders, materials, textures, and meshes are organized.
- Static Mesh Editor: The editor used to inspect a static mesh and set options such as material slots.
- Material slot: A place on a mesh where a material can be assigned.
- Default material: The material assigned to the mesh asset so new placed copies use that material automatically.
- Texture set: A group of related texture maps used together on one material or asset.
- Packed mask: A texture that stores multiple masks in separate RGB channels.
- Scale check: A quick review to see whether an imported mesh is sized correctly in the scene.

## What Evidence To Check Before Students Leave

- Screenshot of the imported static mesh in the Content Drawer.
- Screenshot of the mesh placed in the scene.
- Screenshot of the material instance or default material slot used on the mesh.
- Short reflection explaining what to check when an imported mesh looks wrong.
