# Migrating Assets Between Projects

- Program area: Unreal Engine Studio
- Quarter: Q1
- Lesson number: 12
- Lesson ID: ue-q1-l12
- Status: draft-pilot

## Today's Goal

I can migrate assets between Unreal projects while preserving dependencies.

## Bell Ringer

Why might copying only one file fail when moving assets between projects?

## Video Segment

- Source: Unreal Engine 5 Beginner Tutorial Transcript
- Timestamp range: 01:23:39-01:26:30
- Note: Covers opening a source project, identifying a folder of assets, using the Migrate command, reviewing the asset dependency list, choosing the destination project Content folder, confirming migration success, locating the migrated folder in the destination project, and using Show in Explorer as an alternate way to find the Content folder. Ends before the Lumen lighting explanation.

## Vocabulary

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

## Teacher Slides

- Slide deck title: Lesson 12 - Migrating Assets Between Projects
- Slide status: created
- Slide URL: https://docs.google.com/presentation/d/1rkXJkv-2a4Xwh3mhoDNEN5zWqfVT_twi/edit?usp=sharing&ouid=107038757575028800661&rtpof=true&sd=true

## Assignment Summary

Students migrate a small asset set from a source Unreal project into the class project, verify that the assets arrived in the destination Content folder, and prove one migrated asset works.

## Submission Checklist

- Screenshot of the source project asset or folder selected for migration.
- Screenshot of the migration asset list or confirmation step.
- Screenshot of the migrated folder or assets in the destination project.
- Screenshot of at least one migrated object placed or opened successfully.
- Short reflection explaining why dependencies matter.

## Extension Challenge

Create a small before-and-after note showing what would likely break if only the visible mesh file were copied without dependencies.

## Exit Ticket

Why does Unreal migrate dependencies with an asset?

## Common Problems and Fixes

- Copying only one visible asset file instead of using Migrate.
- Selecting the project root instead of the destination Content folder.
- Ignoring the Asset Report and missing dependencies.
- Assuming migration worked without opening the destination project to verify.
- Migrating an oversized folder when only a small asset set is needed.

## Student-Facing Help

- Use the lesson vocabulary when explaining your work.
- Capture screenshots that clearly show the required skill.
- If something does not update, check the exact setting, connection, or Apply/Save step named in the lesson.

## Source Alignment Note

This pilot lesson is aligned to the Unreal Engine 5 beginner tutorial transcript range 01:23:39-01:26:30. Covers opening a source project, identifying a folder of assets, using the Migrate command, reviewing the asset dependency list, choosing the destination project Content folder, confirming migration success, locating the migrated folder in the destination project, and using Show in Explorer as an alternate way to find the Content folder. Ends before the Lumen lighting explanation.
