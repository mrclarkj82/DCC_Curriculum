# Asset Migration Verification Assignment Sheet

## Objective

I can migrate assets between Unreal projects while preserving dependencies.

## Skill Focus

- Migration preserves dependencies better than manual file copying
- The destination must be the Unreal project Content folder
- The Asset Report shows what Unreal plans to copy
- Verification prevents hidden missing-reference problems
- Project folders and .uproject files help locate the correct destination

## Required Steps

1. Open the source project that contains the asset set.
2. Locate the asset or folder to migrate.
3. Right-click and choose Migrate.
4. Review the Asset Report and confirm the listed dependencies.
5. Find the destination project Content folder.
6. Select the destination Content folder, not the project root.
7. Confirm the migration.
8. Open the destination project.
9. Locate the migrated folder or assets in the Content Drawer.
10. Place or open at least one migrated asset to verify it works.
11. Capture screenshots of the source, migration step, destination, and verification.

## Naming Convention

Use this format when naming screenshots or exported evidence: LastName_FirstName_UE-Q1-A12_Description.

## Screenshot/File Evidence Requirements

- Screenshot of the source project asset or folder selected for migration.
- Screenshot of the migration asset list or confirmation step.
- Screenshot of the migrated folder or assets in the destination project.
- Screenshot of at least one migrated object placed or opened successfully.
- Short reflection explaining why dependencies matter.

## What To Do If Stuck

- Copying only one visible asset file instead of using Migrate.
- Selecting the project root instead of the destination Content folder.
- Ignoring the Asset Report and missing dependencies.
- Assuming migration worked without opening the destination project to verify.
- Migrating an oversized folder when only a small asset set is needed.

## 4-Point Rubric

- 4: Complete, polished, on time, and clearly meets or extends the stated requirements.
- 3: Complete and meets the stated requirements.
- 2: Partially complete or missing required evidence.
- 1: Attempted but incomplete, unclear, or not functional.
- 0: Not submitted.

## Extension Challenge

Create a small before-and-after note showing what would likely break if only the visible mesh file were copied without dependencies.

## Reflection Prompt

Explain why Unreal migrates dependencies with an asset and why the destination Content folder matters.
