# The Hidden Frame Canon

This document is the living story bible and canonical lore reference for The Hidden Frame. It records story, mystery, symbols, phrases, puzzle answers, character continuity, and future narrative threads.

Keep this document separate from `docs/hidden-frame-spec.md`. The specification explains how the system is built. The canon explains what is true in the story.

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

## Locations

### Archive

A visual setting for forgotten digital records, recovered files, frame cards, and quiet mystery states. The Phase 2 archive hub is the source for the First Puzzle Chain.

### Compression

A visual state associated with red warnings, block artifacts, corruption, and antagonist pressure. Phase 2 uses Compression styling for locked and output-related states, but no specific Compression character event is canon yet.

### Render Room

A future Unreal Engine themed space suggested by Phase 0 art. Phase 2 references rendering and rotation, but no route, location map, or story event is canon yet.

### Viewport Grid

A visual language for Unreal Engine or spatial clue contexts. Phase 2 uses viewport ideas for File 005 and the ROTATION signal.

### VHS / Signal Space

A visual language for video production, broadcast, timeline, and media artifact contexts. Phase 2 uses this language for File 002 and the CUT signal.

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

Unlocks: First chain complete

Archivist message: "The Archivist turns the final door toward the light. The first chain is complete, and the recovered frames now remember the path."

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

## Compression Logs

No antagonist Compression logs are canon in Phase 2.

Phase 2 includes light system messages such as "First chain visible," "Record locked," "Collection waiting," and "First chain complete." These are interface atmosphere, not threats or story escalation.

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

## Passwords

Passwords are intentionally client-visible because Phase 2 is optional, ungraded, local-only, and not security-sensitive.

- File 001: `LUMEN`
- File 002: `CUT`
- File 003: `BORDER`
- File 004: `RENDER`
- File 005: `ROTATION`

Do not store future active passwords in client code unless they are intentionally public, purely narrative, and documented as safe to expose.

## Unanswered Questions

- What is The Compression?
- Who or what leaves the broken frame symbol?
- What is the Render Room?
- Why do recovered frames preserve production vocabulary?
- What happens after the first five frames are recovered?
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

No student discoveries are recorded in Phase 2.

Future entries should avoid naming students unless the teacher explicitly approves a privacy-safe classroom convention.

## Developer Notes

Phase 0 intentionally contained no story implementation. It established symbols, atmosphere, phrase seeds, and canon boundaries so later phases could expand without contradiction.

Phase 1 was only the first public-facing entry point. Phase 2 turns that entry point into a short first chain, but it is still not the full mystery.

Phase 2 frame rewards are optional local collectibles only. They are not grades, points, badges of mastery, or classroom credit.

If future story additions risk contradicting existing lore, consult this document first. Preserve continuity whenever possible. If continuity must change, document the retcon and the reasoning here.

## Retcons

Phase 2 supersedes the Phase 1 placeholder names for Files 002 through 005. Those placeholders were not active canon puzzles and are replaced by the First Puzzle Chain records documented above.
