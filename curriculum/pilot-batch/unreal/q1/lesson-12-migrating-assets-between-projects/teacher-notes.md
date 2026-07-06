# Migrating Assets Between Projects Teacher Notes

## Purpose of the Lesson

Students learn the safer Unreal workflow for moving assets between projects. The lesson emphasizes dependencies, choosing the correct Content folder, and verifying the result before moving on.

## Suggested 90-Minute Block Schedule

- 0-7 minutes: Login, project setup, and bell ringer.
- 7-17 minutes: Teacher slides and success criteria.
- 17-35 minutes: Video/demo segment.
- 35-75 minutes: Unreal build task with teacher check-ins.
- 75-85 minutes: Submission evidence and file naming.
- 85-90 minutes: Exit ticket, save, and cleanup.

## Teacher Mini-Lesson Talking Points

- Open the source Unreal project.
- Locate the folder or asset set to migrate.
- Right-click the asset or folder and choose Migrate.
- Review the Asset Report so students see dependencies.
- Find the destination project folder and open its Content folder.
- Select the destination Content folder.
- Confirm migration and wait for success.
- Open or return to the destination project.
- Find the migrated folder in the Content Drawer.
- Place or open one migrated asset to verify that it works.

## Likely Student Issues

- Copying only one visible asset file instead of using Migrate.
- Selecting the project root instead of the destination Content folder.
- Ignoring the Asset Report and missing dependencies.
- Assuming migration worked without opening the destination project to verify.
- Migrating an oversized folder when only a small asset set is needed.

## Intervention Ideas

- Ask students to point to the exact setting, node, object, or screenshot that proves the skill.
- Pair students for a 2-minute evidence check before submission.
- For students who finish early, move them into the extension challenge rather than adding unrelated features.

## Extension Ideas

Create a small before-and-after note showing what would likely break if only the visible mesh file were copied without dependencies.

## Vocabulary Emphasis

- Migration: The Unreal workflow for moving assets from one project to another while including needed dependencies.
- Dependency: A related asset that another asset needs in order to work correctly, such as a material or texture.
- Source project: The project that currently contains the assets being moved.
- Destination project: The project receiving the migrated assets.
- Content folder: The Unreal project folder where migrated assets must be placed.
- Asset Report: The migration window that lists assets and dependencies Unreal will copy.
- Show in Explorer: A command that opens the selected project folder location in Windows File Explorer.
- Project file: The .uproject file used to open an Unreal project and locate its folders.
- Verification: Checking that migrated assets appear and function correctly in the destination project.
- Broken reference: A missing connection that can happen when an asset is copied without its dependencies.

## What Evidence To Check Before Students Leave

- Screenshot of the source project asset or folder selected for migration.
- Screenshot of the migration asset list or confirmation step.
- Screenshot of the migrated folder or assets in the destination project.
- Screenshot of at least one migrated object placed or opened successfully.
- Short reflection explaining why dependencies matter.
