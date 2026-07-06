# Q1 Quiz 3 Draft: Master Materials, Static Meshes, Migration, and Lumen

- Quiz ID: ue-q1-quiz-03
- Program area: Unreal Engine Studio
- Quarter: Q1
- Status: draft
- Published: false
- Covered lessons: ue-q1-l10, ue-q1-l11, ue-q1-l12, ue-q1-l13

Teacher note: This quiz is a draft. Review wording and answer expectations before publishing to students.

Pattern decision: Existing seed data already ties Quiz 3 to Lessons 10-13, with Lesson 13 as the opening quiz checkpoint. This draft preserves that pattern.

## 1. Why do master materials help a production workflow?

- Question ID: ue-q1-quiz-03-q01
- Type: multiple-choice
- Related lesson ID: ue-q1-l10
- Difficulty: easy
- Tag: master-material

Choices:
- They let creators reuse one parent setup while changing exposed values in instances.
- They delete all material instances from the project.
- They make imported meshes ignore scale.
- They replace the need for lighting.

Correct answer: They let creators reuse one parent setup while changing exposed values in instances.

Explanation: A master material provides the reusable structure, while instances expose controlled settings for variation.

## 2. What should you check soon after importing a static mesh?

- Question ID: ue-q1-quiz-03-q02
- Type: multiple-choice
- Related lesson ID: ue-q1-l11
- Difficulty: easy
- Tag: static-mesh-import

Choices:
- Scale, orientation, materials, and whether the asset appears correctly in the Content Drawer.
- Only the color of the viewport grid.
- Whether every light in the scene is static.
- Whether the mesh has a quiz attached.

Correct answer: Scale, orientation, materials, and whether the asset appears correctly in the Content Drawer.

Explanation: Imported meshes should be verified for scale, placement, and missing material issues before evidence is submitted.

## 3. Why is Unreal migration safer than copying a single visible asset file?

- Question ID: ue-q1-quiz-03-q03
- Type: multiple-choice
- Related lesson ID: ue-q1-l12
- Difficulty: easy
- Tag: migration

Choices:
- Migration includes dependencies such as materials and textures.
- Migration automatically creates a final screenshot.
- Migration makes every asset a Blueprint.
- Migration removes the need for a Content folder.

Correct answer: Migration includes dependencies such as materials and textures.

Explanation: Migration uses the asset report to copy related dependencies that the visible asset needs.

## 4. What does global illumination describe in the Lumen lesson?

- Question ID: ue-q1-quiz-03-q04
- Type: multiple-choice
- Related lesson ID: ue-q1-l13
- Difficulty: easy
- Tag: global-illumination

Choices:
- Light bouncing around a scene and filling areas indirectly.
- The keyboard shortcut for scaling objects.
- The list of folders in a project.
- A texture import setting for normal maps.

Correct answer: Light bouncing around a scene and filling areas indirectly.

Explanation: The transcript describes global illumination as light bounce that can also carry surface color into nearby areas.

## 5. Which evidence best proves a Lumen lighting improvement?

- Question ID: ue-q1-quiz-03-q05
- Type: multiple-choice
- Related lesson ID: ue-q1-l13
- Difficulty: medium
- Tag: lighting-evidence

Choices:
- Before and after screenshots from the same camera angle showing changed bounce light, shadow fill, or realism.
- A screenshot of the login page.
- A reflection that says "it looks better" with no visual evidence.
- A screenshot with every light hidden.

Correct answer: Before and after screenshots from the same camera angle showing changed bounce light, shadow fill, or realism.

Explanation: Lighting comparison evidence is strongest when the camera angle stays controlled and the visual change is clear.

## 6. Identify the term: the original reusable material that controls the structure and available settings for its instances.

- Question ID: ue-q1-quiz-03-q06
- Type: vocabulary
- Related lesson ID: ue-q1-l10
- Difficulty: easy
- Tag: vocabulary

Correct answer: Master material or parent material

Explanation: A master or parent material holds the reusable graph that instances inherit from.

## 7. Identify the term: a related asset that another asset needs in order to work correctly.

- Question ID: ue-q1-quiz-03-q07
- Type: vocabulary
- Related lesson ID: ue-q1-l12
- Difficulty: easy
- Tag: vocabulary

Correct answer: Dependency

Explanation: Dependencies can include materials, textures, meshes, or other linked project assets.

## 8. Identify the term: an Unreal asset representing imported 3D geometry that can be placed in a level.

- Question ID: ue-q1-quiz-03-q08
- Type: vocabulary
- Related lesson ID: ue-q1-l11
- Difficulty: easy
- Tag: vocabulary

Correct answer: Static mesh

Explanation: A static mesh is a 3D model asset used for props, environment pieces, and other non-skeletal objects.

## 9. Identify the term: lighting that updates while lights or objects move instead of relying only on baked light maps.

- Question ID: ue-q1-quiz-03-q09
- Type: vocabulary
- Related lesson ID: ue-q1-l13
- Difficulty: medium
- Tag: vocabulary

Correct answer: Real-time lighting or dynamic lighting

Explanation: The Lumen section focuses on dynamic global illumination that can respond as scene elements move.

## 10. A student creates a material instance but no useful controls appear in the instance. What should they check?

- Question ID: ue-q1-quiz-03-q10
- Type: scenario
- Related lesson ID: ue-q1-l10
- Difficulty: medium
- Tag: troubleshooting

Correct answer: They should check that values in the parent or master material were converted to named parameters and that Apply and Save were used.

Explanation: Material instances can only edit exposed parameters from the parent setup.

## 11. A migrated object appears in the destination project but its material is missing. What likely went wrong?

- Question ID: ue-q1-quiz-03-q11
- Type: scenario
- Related lesson ID: ue-q1-l12
- Difficulty: medium
- Tag: troubleshooting

Correct answer: The student may have copied only the visible mesh or selected the wrong destination instead of using Migrate with dependencies into the Content folder.

Explanation: Missing materials often mean dependencies were not copied correctly or the destination workflow was wrong.

## 12. A lighting screenshot looks brighter after an exposure change, but the shadows still look flat. What should the student explain or test next?

- Question ID: ue-q1-quiz-03-q12
- Type: scenario
- Related lesson ID: ue-q1-l13
- Difficulty: medium
- Tag: troubleshooting

Correct answer: They should explain that exposure changes brightness, then test bounce light, indirect light, movable light behavior, or Lumen/global illumination evidence.

Explanation: Exposure and global illumination are related visually but are not the same concept.

## 13. Put this migration workflow in order: choose asset/folder, choose Migrate, review asset report, select destination Content folder, verify in destination project.

- Question ID: ue-q1-quiz-03-q13
- Type: process-order
- Related lesson ID: ue-q1-l12
- Difficulty: medium
- Tag: workflow

Correct answer: 1. Choose the asset or folder. 2. Choose Migrate. 3. Review the asset report. 4. Select the destination project Content folder. 5. Verify the migrated assets in the destination project.

Explanation: Students should use the migration workflow and verify the destination result before submitting evidence.

## 14. Put this lighting comparison workflow in order: frame a camera angle, capture before screenshot, adjust lighting/Lumen-related setting, capture after screenshot, write reflection.

- Question ID: ue-q1-quiz-03-q14
- Type: process-order
- Related lesson ID: ue-q1-l13
- Difficulty: medium
- Tag: workflow

Correct answer: 1. Frame a camera angle. 2. Capture the before screenshot. 3. Adjust the lighting or Lumen-related setting. 4. Capture the after screenshot from the same angle. 5. Write a reflection explaining the visual change.

Explanation: A controlled comparison makes lighting evidence clearer and easier to grade.

## 15. In 2-3 sentences, explain why reusable material workflows and asset migration both help a studio work faster.

- Question ID: ue-q1-quiz-03-q15
- Type: short-response
- Related lesson ID: ue-q1-l12
- Difficulty: hard
- Tag: short-response

Correct answer: A strong answer explains that reusable materials let artists create controlled variations without rebuilding graphs, while migration brings needed dependencies together so assets work in another project. Both reduce repeated work and prevent broken results.

Explanation: This checks cross-lesson understanding of reuse, dependencies, and efficient production workflow.
