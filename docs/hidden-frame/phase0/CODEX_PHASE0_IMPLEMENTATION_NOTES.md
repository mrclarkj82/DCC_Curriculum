# Codex Phase 0 Implementation Notes

Build The Hidden Frame as a reusable, data-driven ARG foundation. Phase 0 should not hard-code the full mystery. It should establish visual identity, asset paths, and lightweight components that later phases can expand.

## Suggested initial components

```text
HiddenFrameIcon
HiddenFrameBackground
HiddenFrameTitleCard
HiddenFrameStyleTokens
```

## Suggested public routes for later phases

```text
/hidden-frame
/hidden-frame/archive
/hidden-frame/file/[id]
```

## Suggested first usage

Place `HiddenFrameIcon` in a small, low-contrast area of one DCC assignment page. On hover/focus, use the glitch symbol or a subtle cyan glow. Link it to `/hidden-frame`.

## Asset references

Use `src/hidden-frame/hiddenFramePhase0Assets.ts` as a starting asset map.

## UI notes

- Use `archive-bg-dark.png` for the first landing page.
- Use `hidden-frame-title-card.png` as a hero image or Open Graph/preview image.
- Use `archive-bg-grid.png` for Unreal-adjacent pages.
- Use `archive-bg-vhs-static.png` for video/timeline pages.
- Use `archive-bg-compression.png` only for Compression/error/antagonist states.
- Use `archive-bg-render-room.png` as future concept art for the Render Room hub.

## Safety copy for first hidden page

The Hidden Frame is optional. It is not graded. It will never ask students to leave the DCC site, contact strangers, use personal information, or access anything private. Every answer is hidden inside DCC pages, class materials, videos, or approved project files.

If something feels unsafe, it is not part of the mystery.

Check the frame.
