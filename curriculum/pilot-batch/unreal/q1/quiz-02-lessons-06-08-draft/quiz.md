# Q1 Quiz 2 Draft: Post-Process, Materials, and Texture Maps

- Quiz ID: ue-q1-quiz-02
- Program area: Unreal Engine Studio
- Quarter: Q1
- Status: draft
- Published: false
- Covered lessons: ue-q1-l06, ue-q1-l07, ue-q1-l08

Teacher note: This quiz is a draft for Lessons 06-08. Review wording and answer expectations before publishing to students.

## 1. What does auto exposure do in an Unreal scene?

- Question ID: ue-q1-quiz-02-q01
- Type: multiple-choice
- Related lesson ID: ue-q1-l06
- Difficulty: easy
- Tag: auto-exposure

Choices:
- It automatically adjusts rendered brightness as the camera views darker or brighter areas.
- It changes the size of every light in the level.
- It deletes shadows so the scene renders faster.
- It turns all materials into glowing materials.

Correct answer: It automatically adjusts rendered brightness as the camera views darker or brighter areas.

Explanation: Auto exposure changes perceived brightness, similar to eyes adapting when moving between dark and bright spaces.

## 2. What is the main purpose of a Post Process Volume?

- Question ID: ue-q1-quiz-02-q02
- Type: multiple-choice
- Related lesson ID: ue-q1-l06
- Difficulty: easy
- Tag: post-process-volume

Choices:
- To apply camera and image effects after the scene is rendered.
- To permanently resize every mesh in the level.
- To create a new project folder automatically.
- To convert texture maps into 3D models.

Correct answer: To apply camera and image effects after the scene is rendered.

Explanation: Post-process settings affect the final rendered image, including exposure, bloom, vignette, and color changes.

## 3. Why would you enable Infinite Extent Unbound on a Post Process Volume?

- Question ID: ue-q1-quiz-02-q03
- Type: multiple-choice
- Related lesson ID: ue-q1-l06
- Difficulty: medium
- Tag: infinite-extent-unbound

Choices:
- To make the post-process settings affect the entire level.
- To make the volume invisible in the Outliner.
- To lock every object so it cannot move.
- To make all texture maps import at full resolution.

Correct answer: To make the post-process settings affect the entire level.

Explanation: Without Infinite Extent Unbound, the effect only applies while the camera is inside the volume bounds.

## 4. In the material graph, which input controls the main visible color of a surface?

- Question ID: ue-q1-quiz-02-q04
- Type: multiple-choice
- Related lesson ID: ue-q1-l07
- Difficulty: easy
- Tag: material-graph

Choices:
- Base Color
- Roughness
- Normal
- World Outliner

Correct answer: Base Color

Explanation: Base Color is the material input for the main color information of a surface.

## 5. Which sRGB setup is correct for a basic texture set?

- Question ID: ue-q1-quiz-02-q05
- Type: multiple-choice
- Related lesson ID: ue-q1-l08
- Difficulty: medium
- Tag: srgb

Choices:
- sRGB on for Base Color; sRGB off for Roughness and Normal maps.
- sRGB off for every texture, including Base Color.
- sRGB on for Roughness and Normal maps only.
- sRGB only matters for mesh scale, not textures.

Correct answer: sRGB on for Base Color; sRGB off for Roughness and Normal maps.

Explanation: Base Color is color data, while Roughness and Normal maps store non-color information that should not be interpreted as color.

## 6. Identify the term: a glow effect that appears around bright parts of the rendered image.

- Question ID: ue-q1-quiz-02-q06
- Type: vocabulary
- Related lesson ID: ue-q1-l06
- Difficulty: easy
- Tag: bloom

Correct answer: Bloom

Explanation: Bloom adds a visible glow around bright areas.

## 7. Identify the term: a shading or darkening effect around the edges of the image.

- Question ID: ue-q1-quiz-02-q07
- Type: vocabulary
- Related lesson ID: ue-q1-l06
- Difficulty: easy
- Tag: vignette

Correct answer: Vignette

Explanation: Vignette affects the edges of the frame and can change the mood or focus of an image.

## 8. Identify the workflow term: a realistic material workflow that uses values such as metallic and roughness.

- Question ID: ue-q1-quiz-02-q08
- Type: vocabulary
- Related lesson ID: ue-q1-l07
- Difficulty: medium
- Tag: pbr

Correct answer: PBR

Explanation: PBR stands for physically based rendering and uses realistic material values.

## 9. Identify the texture map: a map that fakes small bumps and surface direction changes so lighting responds with more detail.

- Question ID: ue-q1-quiz-02-q09
- Type: vocabulary
- Related lesson ID: ue-q1-l08
- Difficulty: medium
- Tag: normal-map

Correct answer: Normal map

Explanation: A normal map does not change the actual mesh shape, but it changes how light appears to hit the surface.

## 10. A student changes exposure values in a Post Process Volume, but the scene does not look different in play mode. Name one thing they should check.

- Question ID: ue-q1-quiz-02-q10
- Type: scenario
- Related lesson ID: ue-q1-l06
- Difficulty: medium
- Tag: troubleshooting

Correct answer: They should check that the exposure property checkbox is enabled, the volume affects the camera, and Infinite Extent Unbound is enabled if it needs to affect the whole level.

Explanation: Post-process values may not apply if the property is not enabled or if the camera is outside a bounded volume.

## 11. A student changes a material in the graph, including roughness and metallic values, but the object in the level still looks the same. What likely step did they miss?

- Question ID: ue-q1-quiz-02-q11
- Type: scenario
- Related lesson ID: ue-q1-l07
- Difficulty: medium
- Tag: apply-save

Correct answer: They likely forgot to press Apply and Save, or the material is not assigned to the object.

Explanation: Material changes must be applied and saved before they reliably update in the level.

## 12. A roughness map is imported, but the material behaves strangely and the grayscale information looks interpreted like color. What setting should the student check?

- Question ID: ue-q1-quiz-02-q12
- Type: scenario
- Related lesson ID: ue-q1-l08
- Difficulty: medium
- Tag: roughness-map

Correct answer: They should check that sRGB is turned off for the roughness map.

Explanation: Roughness maps are data maps, so sRGB should be off.

## 13. Put this post-process workflow in order: add a Post Process Volume, enable needed properties, make the volume affect the intended area, adjust exposure/effects, capture comparison screenshots.

- Question ID: ue-q1-quiz-02-q13
- Type: process-order
- Related lesson ID: ue-q1-l06
- Difficulty: medium
- Tag: workflow

Correct answer: 1. Add a Post Process Volume. 2. Make the volume affect the intended area. 3. Enable the needed properties. 4. Adjust exposure or effects such as bloom, vignette, or saturation. 5. Capture comparison screenshots.

Explanation: Students should place and configure the volume before relying on the visual changes for evidence.

## 14. Put this texture material workflow in order: import texture maps, check sRGB/compression settings, create a material, connect maps to inputs, adjust tiling with Texture Coordinate or Multiply, apply the material to a surface.

- Question ID: ue-q1-quiz-02-q14
- Type: process-order
- Related lesson ID: ue-q1-l08
- Difficulty: medium
- Tag: texture-coordinate-tiling

Correct answer: 1. Import texture maps. 2. Check sRGB and compression settings. 3. Create a material. 4. Connect maps to the correct inputs. 5. Adjust tiling with Texture Coordinate or Multiply if needed. 6. Apply the material to a surface.

Explanation: Correct import settings should be checked before building and judging the final material, and tiling should be adjusted before evidence screenshots.

## 15. In 2-3 sentences, explain what a normal map adds to a material and why roughness or normal maps should usually have sRGB turned off.

- Question ID: ue-q1-quiz-02-q15
- Type: short-response
- Related lesson ID: ue-q1-l08
- Difficulty: hard
- Tag: short-response

Correct answer: A strong answer explains that a normal map fakes small surface bumps or direction changes so lighting looks more detailed without changing the mesh. It also explains that non-color data maps such as Roughness and Normal should have sRGB off because they store control data, not color.

Explanation: This checks conceptual understanding across normal maps and color-versus-data texture settings.
