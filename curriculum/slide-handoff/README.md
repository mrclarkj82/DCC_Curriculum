# Phase 9 Slide Handoff

This folder is the handoff package for generating DCC Creative Studio PowerPoints in ChatGPT Pro. Codex prepares curriculum, briefs, manifests, and prompts. ChatGPT Pro creates the actual editable PowerPoint decks later.

## Workflow

1. Codex completes curriculum artifacts and seed data.
2. Codex creates slide briefs and presentation briefs.
3. The teacher gives the master prompt, manifest, and presentation briefs to ChatGPT Pro.
4. ChatGPT Pro creates editable PowerPoint files.
5. The teacher uploads decks to Google Drive.
6. The teacher supplies Drive links using `SLIDE_LINK_RETURN_TEMPLATE.md`.
7. Codex updates lesson slide URLs and statuses after real links are provided.
8. The website displays the real slide links.

## Boundary

- No PowerPoint files are created in this repository.
- No slide images or generated artwork are created in this repository.
- No fake Google Drive links are added.
- `ready-for-chatgpt` means the brief is ready for deck generation, not that the deck exists.
