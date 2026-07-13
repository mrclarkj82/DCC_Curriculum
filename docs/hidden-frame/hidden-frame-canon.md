# The Hidden Frame Canon

This document is the living story bible and canonical lore reference for The Hidden Frame. It records story, mystery, symbols, phrases, puzzle answers, character continuity, and future narrative threads.

Keep this document separate from `docs/hidden-frame/hidden-frame-spec.md`. The specification explains how the system is built. The canon explains what is true in the story.

## Canon Rules

- Hidden Frame is optional and school appropriate.
- It remains contained inside the DCC website, approved class materials, and approved project files.
- It does not ask students to investigate real people, contact strangers, use personal information, access private systems, or leave the DCC site.
- It avoids horror, gore, occult imagery, real-world conspiracy themes, and real hacking.
- No puzzle, password, archive entry, route, achievement, or narrative event is canon until documented here.
- If future continuity must change, document the retcon and the reason in Developer Notes.

## Characters

### The Archivist

The Archivist is the calm archive voice attached to recovered files. The Archivist rewards careful observation, composition awareness, and production vocabulary. No identity, biography, real-world role, or teacher/student connection is canon.

The Compression is named by the Phase 0 visual language as an antagonist or antagonist-state concept. Its identity, motive, rules, voice, and story role are not yet established.

## Timeline

### 2026-07-08 - Phase 0

The official visual foundation is imported. No in-world story events are established.

### 2026-07-08 - Phase 1

The first public-facing Hidden Frame entry point appears inside the DCC site. The Archive becomes accessible, File 001 becomes available, and the Archivist's first message is recoverable with the signal word `LUMEN`.

### 2026-07-08 - Phase 2

The Archive reveals the First Puzzle Chain. Files 001 through 005 can be recovered in sequence, each completed file unlocks the next file, and Frames 001 through 005 become local optional collectibles.

### 2026-07-13 - Phase 3

The first video-production signal appears in the Timeline. Files 006 through 008 extend the archive through timecode, lower thirds, and sound bridges. Frames 006 through 008 become local optional collectibles.

### 2026-07-13 - Phase 4

The first camera signal appears in the Cinematography Index. Files 009 through 011 extend the archive through rule of thirds, leading lines, and look space. Frames 009 through 011 become local optional collectibles.

### 2026-07-13 - Phase 5

The first Render Room signal appears. Files 012 through 014 extend the archive through vectors, Blueprints, and trigger volumes. Frames 012 through 014 become local optional collectibles.

## Locations

### Archive

A visual setting for forgotten digital records, recovered files, frame cards, and quiet mystery states. The Phase 2 archive hub is the source for the First Puzzle Chain.

### Compression

A visual state associated with red warnings, block artifacts, corruption, and antagonist pressure. Phase 2 uses Compression styling for locked and output-related states, but no specific Compression character event is canon yet.

### Render Room

An Unreal Engine themed in-site location suggested by Phase 0 art and established in Phase 5. It is a web page that behaves like an editor-room signal, not a playable Unreal build.

### Viewport Grid

A visual language for Unreal Engine, camera, composition, or spatial clue contexts. Phase 2 uses viewport ideas for File 005 and the ROTATION signal. Phase 4 uses grid overlays for composition clues. Phase 5 uses viewport readouts for Unreal concepts.

### VHS / Signal Space

A visual language for video production, broadcast, timeline, and media artifact contexts. Phase 2 uses this language for File 002 and the CUT signal. Phase 3 establishes `/hidden-frame/timeline` as the first dedicated video-production route.

## Archive Entries

### HF-ARCHIVE-PHASE-1

Title: Recovered Files

First appearance: `/hidden-frame/archive`

Summary: The first archive hub. Phase 1 made File 001 available and displayed Files 002 through 005 as locked placeholders.

### HF-ARCHIVE-PHASE-2

Title: First Puzzle Chain

First appearance: `/hidden-frame/archive`

Summary: The first playable Hidden Frame sequence. File 001 is available by default. Completing File 001 unlocks File 002; completing File 002 unlocks File 003; completing File 003 unlocks File 004; completing File 004 unlocks File 005; completing File 005 marks the first chain complete.

Related files: `HF-FILE-001`, `HF-FILE-002`, `HF-FILE-003`, `HF-FILE-004`, `HF-FILE-005`

Related frames: `HF-FRAME-001`, `HF-FRAME-002`, `HF-FRAME-003`, `HF-FRAME-004`, `HF-FRAME-005`

### HF-ARCHIVE-PHASE-3

Title: Timeline Signal

First appearance: `/hidden-frame/timeline`

Summary: The first video-production expansion route. It contains in-app timeline clues for timecode, cuts, lower thirds, and sound bridges, and links to Files 006 through 008.

Related files: `HF-FILE-006`, `HF-FILE-007`, `HF-FILE-008`

Related frames: `HF-FRAME-006`, `HF-FRAME-007`, `HF-FRAME-008`

### HF-ARCHIVE-PHASE-4

Title: Camera Signal

First appearance: `/hidden-frame/camera`

Summary: The first cinematography expansion route. It contains in-app composition clues for rule of thirds, leading lines, symmetry, headroom, look space, repetition, and central framing, and links to Files 009 through 011.

Related files: `HF-FILE-009`, `HF-FILE-010`, `HF-FILE-011`

Related frames: `HF-FRAME-009`, `HF-FRAME-010`, `HF-FRAME-011`

### HF-ARCHIVE-PHASE-5

Title: Render Room Signal

First appearance: `/hidden-frame/render-room`

Summary: The first Unreal Engine expansion route. It contains in-app viewport clues for coordinates, rotation, scale, lighting, materials, Blueprints, trigger volumes, collision, and camera/player perspective, and links to Files 012 through 014.

Related files: `HF-FILE-012`, `HF-FILE-013`, `HF-FILE-014`

Related frames: `HF-FRAME-012`, `HF-FRAME-013`, `HF-FRAME-014`

## Recovered Files

### HF-FILE-001

File ID: `001`

Filename: The Edge of the Page

Media type: recovered text

First appearance: `/hidden-frame/file/001`

In-world source: Archive hub

Canon summary: File 001 establishes that the first clue is close to the frame and rewards looking at the border of the page rather than searching outside the DCC site.

Clue text: "You found the edge of the page. Most people never check the border. The first clue is not hidden far away. It is hidden in what the frame chooses to show."

Hint: "A scene cannot be seen until it has light."

Password: `LUMEN`

Reward frame: `HF-FRAME-001`

Unlocks: File 002

Archivist message: "The Archivist records the first edge. Light found the page, and Frame 001 now holds the signal LUMEN."

### HF-FILE-002

File ID: `002`

Filename: The First Cut

Media type: recovered video-production text

First appearance: `/hidden-frame/file/002`

In-world source: First Puzzle Chain

Canon summary: File 002 connects editing choices to meaning and asks students to identify the transition point between shots.

Clue text: "Motion becomes meaning only when someone chooses where to cut. The first editor did not hide the answer in the shot. They hid it in the decision between shots."

Hint: "What do editors call the moment one shot ends and another begins?"

Password: `CUT`

Accepted variant: `THE CUT`

Reward frame: `HF-FRAME-002`

Unlocks: File 003

Archivist message: "The Archivist marks the edit point. The story moved because you noticed where one frame gave way to the next."

### HF-FILE-003

File ID: `003`

Filename: The Cropped Student

Media type: recovered composition text

First appearance: `/hidden-frame/file/003`

In-world source: First Puzzle Chain

Canon summary: File 003 reinforces that framing and cropping can change what the viewer understands.

Clue text: "The student was not missing. The camera simply pointed elsewhere. What disappears outside the frame may still be part of the story."

Hint: "Check the edge. Check what the image excludes."

Password: `BORDER`

Reward frame: `HF-FRAME-003`

Unlocks: File 004

Archivist message: "The Archivist restores the margin. What the frame excludes still matters to the story."

### HF-FILE-004

File ID: `004`

Filename: Render Failed

Media type: recovered production-output text

First appearance: `/hidden-frame/file/004`

In-world source: First Puzzle Chain

Canon summary: File 004 connects finished visibility to the render/export process across Unreal and video production.

Clue text: "The project did not fail because nothing was made. It failed because the final image never finished becoming visible."

Hint: "In Unreal and video production, what do we call the process of producing the final image?"

Password: `RENDER`

Reward frame: `HF-FRAME-004`

Unlocks: File 005

Archivist message: "The Archivist steadies the output. The image was not gone; it was waiting to finish becoming visible."

### HF-FILE-005

File ID: `005`

Filename: The Door Facing Light

Media type: recovered Unreal/spatial text

First appearance: `/hidden-frame/file/005`

In-world source: First Puzzle Chain

Canon summary: File 005 connects direction, orientation, and viewport awareness. It completes the first puzzle chain.

Clue text: "The door is not locked. It is waiting to face the light. Position matters. Direction matters. A frame is not only where you are. It is where you are looking."

Hint: "In Unreal, changing where an object faces is changing its ______."

Password: `ROTATION`

Accepted variant: `OBJECT ROTATION`

Reward frame: `HF-FRAME-005`

Unlocks: File 006

Archivist message: "The Archivist turns the final door toward the light. The first chain is complete, and the recovered frames now remember the path."

### HF-FILE-006

File ID: `006`

Filename: The Timecode Drift

Media type: recovered video-production text

First appearance: `/hidden-frame/file/006`

In-world source: Timeline Signal

Canon summary: File 006 connects exact timeline addresses to close observation in editing.

Clue text: "The signal does not begin with a title. It begins with an address in time. Hours, minutes, seconds, and frames hold the first drift in place."

Hint: "Editors use this numbered address to find an exact moment in a timeline."

Password: `TIMECODE`

Accepted variant: `TIME CODE`

Reward frame: `HF-FRAME-006`

Unlocks: File 007

Archivist message: "The Archivist locks the drift to a frame address. Time is not only passing; it is being counted."

### HF-FILE-007

File ID: `007`

Filename: The Name Beneath the Frame

Media type: recovered broadcast graphics text

First appearance: `/hidden-frame/file/007`

In-world source: Timeline Signal

Canon summary: File 007 connects lower-third graphics to context and viewer attention.

Clue text: "The speaker was already visible, but the editor added a quiet label below the image. The clue lives in the part of the frame that tells viewers who they are seeing."

Hint: "Broadcast graphics often place this identifier in the lower part of the screen."

Password: `LOWER THIRD`

Accepted variant: `LOWERTHIRD`

Reward frame: `HF-FRAME-007`

Unlocks: File 008

Archivist message: "The Archivist restores the label beneath the image. Names guide attention without stopping the story."

### HF-FILE-008

File ID: `008`

Filename: The Sound Before the Cut

Media type: recovered editing text

First appearance: `/hidden-frame/file/008`

In-world source: Timeline Signal

Canon summary: File 008 connects sound bridges to continuity and edit pacing.

Clue text: "The next scene arrived before the picture changed. Sound crossed the boundary first, making the cut feel less like a break and more like a path."

Hint: "When audio connects two shots, editors often call it a sound ______."

Password: `BRIDGE`

Accepted variant: `SOUND BRIDGE`

Reward frame: `HF-FRAME-008`

Unlocks: File 009

Archivist message: "The Archivist hears the bridge before the picture changes. The timeline remembers that sound can lead the eye."

### HF-FILE-009

File ID: `009`

Filename: The Third Line

Media type: recovered cinematography text

First appearance: `/hidden-frame/file/009`

In-world source: Camera Signal

Canon summary: File 009 connects the rule of thirds to intentional attention inside the frame.

Clue text: "The subject did not move. The frame moved around them. Two vertical lines and two horizontal lines quietly divided the image into choices."

Hint: "Many camera guides divide a frame into three columns and three rows."

Password: `THIRDS`

Accepted variants: `RULE OF THIRDS`, `THE RULE OF THIRDS`

Reward frame: `HF-FRAME-009`

Unlocks: File 010

Archivist message: "The Archivist draws the guide lines. Attention shifts when the frame is divided with intention."

### HF-FILE-010

File ID: `010`

Filename: The Line That Leads

Media type: recovered cinematography text

First appearance: `/hidden-frame/file/010`

In-world source: Camera Signal

Canon summary: File 010 connects leading lines to visual direction and image flow.

Clue text: "The hallway did not speak, but it pointed. Rails, shadows, and edges all leaned toward the same place in the frame."

Hint: "What do cinematographers call lines that guide the viewer through an image?"

Password: `LEADING LINES`

Accepted variants: `LEADING`, `LINES`

Reward frame: `HF-FRAME-010`

Unlocks: File 011

Archivist message: "The Archivist follows the path through the image. The frame was pointing before anyone noticed."

### HF-FILE-011

File ID: `011`

Filename: The Space Ahead

Media type: recovered cinematography text

First appearance: `/hidden-frame/file/011`

In-world source: Camera Signal

Canon summary: File 011 connects look space and lead room to story direction.

Clue text: "The character looked toward an empty part of the image. The empty space was not empty at all. It was the direction of the story."

Hint: "This is the space left in front of a subject who is looking or moving."

Password: `LOOK SPACE`

Accepted variants: `LOOKSPACE`, `LEAD ROOM`, `LEADROOM`

Reward frame: `HF-FRAME-011`

Unlocks: File 012

Archivist message: "The Archivist leaves room for the gaze. The story can move because the frame makes space for it."

### HF-FILE-012

File ID: `012`

Filename: The Coordinate That Stayed

Media type: recovered Unreal text

First appearance: `/hidden-frame/file/012`

In-world source: Render Room Signal

Canon summary: File 012 connects Unreal transform coordinates to placement and direction inside a scene.

Clue text: "The object was not lost. Its location was written in three quiet numbers. X pointed across the room, Y pulled the path sideways, and Z lifted the clue into view."

Hint: "In Unreal, position and direction values are often stored as this three-number type."

Password: `VECTOR`

Accepted variant: `VECTORS`

Reward frame: `HF-FRAME-012`

Unlocks: File 013

Archivist message: "The Archivist records the coordinate. The room was not hiding the clue; it was placing it."

### HF-FILE-013

File ID: `013`

Filename: Blueprint Without Wires

Media type: recovered Unreal text

First appearance: `/hidden-frame/file/013`

In-world source: Render Room Signal

Canon summary: File 013 connects Blueprint-style visual scripting to responsive scene logic.

Clue text: "The door did not open because it was lucky. An event reached a node, a condition answered, and the room changed because someone built the logic."

Hint: "Unreal visual scripting graphs are commonly called this."

Password: `BLUEPRINT`

Accepted variant: `BLUEPRINTS`

Reward frame: `HF-FRAME-013`

Unlocks: File 014

Archivist message: "The Archivist reconnects the logic. A scene can react when its decisions are visible."

### HF-FILE-014

File ID: `014`

Filename: The Room That Knows You Entered

Media type: recovered Unreal text

First appearance: `/hidden-frame/file/014`

In-world source: Render Room Signal

Canon summary: File 014 connects trigger volumes and collision boundaries to safe scene interaction.

Clue text: "Nothing chased you. Nothing broke. The room simply noticed when a player crossed an invisible boundary and used that moment to change the scene."

Hint: "Designers often use this kind of volume to detect entry and fire an event."

Password: `TRIGGER`

Accepted variants: `TRIGGER VOLUME`, `TRIGGER BOX`

Reward frame: `HF-FRAME-014`

Unlocks: First Render Room signal complete

Archivist message: "The Archivist labels the invisible boundary. Interaction begins when the scene knows what entered it."

## Frame Cards

### HF-FRAME-001

Frame ID: `frame-001`

Title: LUMEN

Discovery location: File 001

Unlock condition: Complete File 001

Student-facing text: A frame for seeing the edge once light reaches it.

### HF-FRAME-002

Frame ID: `frame-002`

Title: CUT

Discovery location: File 002

Unlock condition: Complete File 002

Student-facing text: A frame for noticing the decision between two shots.

### HF-FRAME-003

Frame ID: `frame-003`

Title: BORDER

Discovery location: File 003

Unlock condition: Complete File 003

Student-facing text: A frame for remembering what the camera leaves outside.

### HF-FRAME-004

Frame ID: `frame-004`

Title: RENDER

Discovery location: File 004

Unlock condition: Complete File 004

Student-facing text: A frame for bringing the final image into view.

### HF-FRAME-005

Frame ID: `frame-005`

Title: ROTATION

Discovery location: File 005

Unlock condition: Complete File 005

Student-facing text: A frame for turning the door toward the light.

### HF-FRAME-006

Frame ID: `frame-006`

Title: TIMECODE

Discovery location: File 006

Unlock condition: Complete File 006

Student-facing text: A frame for finding the exact moment a signal begins.

### HF-FRAME-007

Frame ID: `frame-007`

Title: LOWER THIRD

Discovery location: File 007

Unlock condition: Complete File 007

Student-facing text: A frame for naming what appears beneath the image.

### HF-FRAME-008

Frame ID: `frame-008`

Title: BRIDGE

Discovery location: File 008

Unlock condition: Complete File 008

Student-facing text: A frame for hearing the edit before seeing it.

### HF-FRAME-009

Frame ID: `frame-009`

Title: THIRDS

Discovery location: File 009

Unlock condition: Complete File 009

Student-facing text: A frame for dividing the image with intention.

### HF-FRAME-010

Frame ID: `frame-010`

Title: LEADING LINES

Discovery location: File 010

Unlock condition: Complete File 010

Student-facing text: A frame for following the path the image creates.

### HF-FRAME-011

Frame ID: `frame-011`

Title: LOOK SPACE

Discovery location: File 011

Unlock condition: Complete File 011

Student-facing text: A frame for leaving room in the direction of attention.

### HF-FRAME-012

Frame ID: `frame-012`

Title: VECTOR

Discovery location: File 012

Unlock condition: Complete File 012

Student-facing text: A frame for placing the clue with coordinates and direction.

### HF-FRAME-013

Frame ID: `frame-013`

Title: BLUEPRINT

Discovery location: File 013

Unlock condition: Complete File 013

Student-facing text: A frame for making a scene respond through visible logic.

### HF-FRAME-014

Frame ID: `frame-014`

Title: TRIGGER

Discovery location: File 014

Unlock condition: Complete File 014

Student-facing text: A frame for noticing the invisible boundary that starts an event.

## Compression Logs

No antagonist Compression logs are canon in Phase 2.

Phase 2 includes light system messages such as "First chain visible," "Record locked," "Collection waiting," and "First chain complete." These are interface atmosphere, not threats or story escalation.

Phase 3 includes "Timeline signal" and "Signal scope" messages. These are safety and atmosphere copy, not plot threats.

Phase 4 includes "Camera signal" and "Observation scope" messages. These are safety and atmosphere copy, not plot threats.

Phase 5 includes "Render Room signal," "Editor preview," and "Engine scope" messages. These are safety and atmosphere copy, not simulated malware, threats, or real engine instructions.

## Symbols

### Broken Frame

The broken frame symbol is the official icon and logo of Hidden Frame. It represents a missing piece, an altered frame, a hidden layer, and the act of checking media carefully.

The bottom-right break is part of the official symbol and should remain visually consistent.

### Compression Blocks

Compression blocks represent interference, corruption, or antagonist pressure. Their exact story rules are not yet canon.

### Scanlines And Timecode

Scanlines and timecode represent media artifacts, recovered recordings, and close reading of video. Their exact puzzle rules are not yet canon.

## Dialogue

### The Archivist - File 001

"The Archivist records the first edge. Light found the page, and Frame 001 now holds the signal LUMEN."

### The Archivist - File 002

"The Archivist marks the edit point. The story moved because you noticed where one frame gave way to the next."

### The Archivist - File 003

"The Archivist restores the margin. What the frame excludes still matters to the story."

### The Archivist - File 004

"The Archivist steadies the output. The image was not gone; it was waiting to finish becoming visible."

### The Archivist - File 005

"The Archivist turns the final door toward the light. The first chain is complete, and the recovered frames now remember the path."

### The Archivist - File 006

"The Archivist locks the drift to a frame address. Time is not only passing; it is being counted."

### The Archivist - File 007

"The Archivist restores the label beneath the image. Names guide attention without stopping the story."

### The Archivist - File 008

"The Archivist hears the bridge before the picture changes. The timeline remembers that sound can lead the eye."

### The Archivist - File 009

"The Archivist draws the guide lines. Attention shifts when the frame is divided with intention."

### The Archivist - File 010

"The Archivist follows the path through the image. The frame was pointing before anyone noticed."

### The Archivist - File 011

"The Archivist leaves room for the gaze. The story can move because the frame makes space for it."

### The Archivist - File 012

"The Archivist records the coordinate. The room was not hiding the clue; it was placing it."

### The Archivist - File 013

"The Archivist reconnects the logic. A scene can react when its decisions are visible."

### The Archivist - File 014

"The Archivist labels the invisible boundary. Interaction begins when the scene knows what entered it."

## Recurring Phrases

The Phase 0 token file establishes these phrases:

- Check the frame.
- The first frame was never missing.
- Originality leaves artifacts.

Phase 1 adds:

- The edge of the page.
- What the frame chooses to show.

Phase 2 adds:

- The decision between shots.
- What disappears outside the frame.
- The final image becoming visible.
- The door facing light.
- Where you are looking.

Phase 3 adds:

- Address in time.
- The name beneath the frame.
- Sound before picture.
- The timeline remembers.

Phase 4 adds:

- The third line.
- The line that leads.
- The space ahead.
- Room for the gaze.

Phase 5 adds:

- The coordinate that stayed.
- Blueprint without wires.
- The room that knows you entered.
- Invisible boundary.

## Puzzle Solutions

### First Puzzle Chain

Prompt type: signal word gates

Unlock order:

1. File 001 - `LUMEN` - rewards Frame 001 and unlocks File 002.
2. File 002 - `CUT` - rewards Frame 002 and unlocks File 003.
3. File 003 - `BORDER` - rewards Frame 003 and unlocks File 004.
4. File 004 - `RENDER` - rewards Frame 004 and unlocks File 005.
5. File 005 - `ROTATION` - rewards Frame 005 and completes the first chain.

Accepted input behavior: case-insensitive and trims surrounding whitespace. File 002 also accepts `THE CUT`. File 005 also accepts `OBJECT ROTATION`.

### Timeline Signal

Prompt type: signal word gates and timeline clue cards

Unlock order:

1. File 006 - `TIMECODE` - rewards Frame 006 and unlocks File 007.
2. File 007 - `LOWER THIRD` - rewards Frame 007 and unlocks File 008.
3. File 008 - `BRIDGE` - rewards Frame 008 and completes the first video-production signal.

Accepted input behavior: case-insensitive and trims surrounding whitespace. File 006 also accepts `TIME CODE`. File 007 also accepts `LOWERTHIRD`. File 008 also accepts `SOUND BRIDGE`.

### Camera Signal

Prompt type: signal word gates and composition clue cards

Unlock order:

1. File 009 - `THIRDS` - rewards Frame 009 and unlocks File 010.
2. File 010 - `LEADING LINES` - rewards Frame 010 and unlocks File 011.
3. File 011 - `LOOK SPACE` - rewards Frame 011 and unlocks File 012.

Accepted input behavior: case-insensitive and trims surrounding whitespace. File 009 also accepts `RULE OF THIRDS` and `THE RULE OF THIRDS`. File 010 also accepts `LEADING` and `LINES`. File 011 also accepts `LOOKSPACE`, `LEAD ROOM`, and `LEADROOM`.

### Render Room Signal

Prompt type: signal word gates and Unreal viewport clue cards

Unlock order:

1. File 012 - `VECTOR` - rewards Frame 012 and unlocks File 013.
2. File 013 - `BLUEPRINT` - rewards Frame 013 and unlocks File 014.
3. File 014 - `TRIGGER` - rewards Frame 014 and completes the first Render Room signal.

Accepted input behavior: case-insensitive and trims surrounding whitespace. File 012 also accepts `VECTORS`. File 013 also accepts `BLUEPRINTS`. File 014 also accepts `TRIGGER VOLUME` and `TRIGGER BOX`.

## Passwords

Passwords are intentionally client-visible because Phases 1 through 5 are optional, ungraded, local-only, and not security-sensitive.

- File 001: `LUMEN`
- File 002: `CUT`
- File 003: `BORDER`
- File 004: `RENDER`
- File 005: `ROTATION`
- File 006: `TIMECODE`
- File 007: `LOWER THIRD`
- File 008: `BRIDGE`
- File 009: `THIRDS`
- File 010: `LEADING LINES`
- File 011: `LOOK SPACE`
- File 012: `VECTOR`
- File 013: `BLUEPRINT`
- File 014: `TRIGGER`

Do not store future active passwords in client code unless they are intentionally public, purely narrative, and documented as safe to expose.

## Unanswered Questions

- What is The Compression?
- Who or what leaves the broken frame symbol?
- Why do recovered frames preserve production vocabulary?
- What happens after the first five frames are recovered?
- What does the timeline signal reveal after the first three video frames are recovered?
- Why do composition guides appear before the Render Room fully opens?
- Why does the Render Room respond to coordinates, logic, and trigger boundaries?
- How do Unreal, Blender, cinematography, and video clues connect beyond this first chain?
- Why does the Archivist care about what a frame includes and excludes?

These questions are prompts for future phases, not canon answers.

## Future Story Threads

Potential future threads:

- Archive records that reveal missing or altered media frames.
- Unreal locations that hide visual clues in composition, lighting, rotation, or scene layout.
- Blender clues based on modeling, materials, topology, or object naming.
- Cinematography clues based on framing, continuity, shot size, or camera movement.
- Video clues based on timelines, audio, exports, compression artifacts, and broadcast updates.
- Frame cards that reward observation and connect multiple disciplines.
- Compression logs that create pressure without becoming horror or real-world conspiracy.

## Student Discoveries

No student discoveries are recorded through Phase 5.

Future entries should avoid naming students unless the teacher explicitly approves a privacy-safe classroom convention.

## Developer Notes

Phase 0 intentionally contained no story implementation. It established symbols, atmosphere, phrase seeds, and canon boundaries so later phases could expand without contradiction.

Phase 1 was only the first public-facing entry point. Phase 2 turns that entry point into a short first chain, but it is still not the full mystery.

Phase 2 frame rewards are optional local collectibles only. They are not grades, points, badges of mastery, or classroom credit.

If future story additions risk contradicting existing lore, consult this document first. Preserve continuity whenever possible. If continuity must change, document the retcon and the reasoning here.

## Retcons

Phase 2 supersedes the Phase 1 placeholder names for Files 002 through 005. Those placeholders were not active canon puzzles and are replaced by the First Puzzle Chain records documented above.
