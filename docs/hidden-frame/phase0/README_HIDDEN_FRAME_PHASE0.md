# The Hidden Frame — Phase 0 Asset Kit

This package contains the foundational visual assets for the optional DCC Easter egg / ARG system **The Hidden Frame**.

## Contents

```text
public/hidden-frame/
  symbols/       Core broken-frame icon in PNG and SVG formats
  backgrounds/   Reusable dark archive, grid, VHS, compression, and render-room backgrounds
  ui/             Title card and style board
src/hidden-frame/
  hiddenFramePhase0Assets.ts   Optional TypeScript asset map
previews/
  phase0-contact-sheet.png     Quick visual overview
hidden-frame-phase0-manifest.json
README_HIDDEN_FRAME_PHASE0.md
CODEX_PHASE0_IMPLEMENTATION_NOTES.md
```

## Recommended use

Copy the `public/hidden-frame` folder into the project's public/static asset directory. If the app uses a `/public` folder, these files should resolve at paths such as:

```text
/hidden-frame/symbols/hidden-frame-symbol-glitch.png
/hidden-frame/backgrounds/archive-bg-dark.png
/hidden-frame/ui/hidden-frame-title-card.png
```

The `src/hidden-frame/hiddenFramePhase0Assets.ts` file is optional. It provides a simple asset map Codex can import into React/Next components.

## Creative direction

The visual language is: dark archive, hidden media, Unreal viewport grid, faint VHS/scanline texture, and a school-safe mystery tone. The antagonist state is represented by red compression warnings and block artifacts.

Primary phrase: **Check the frame.**

Core symbol: a broken square/frame with the bottom-right corner missing.

## Accessibility and safety notes

Clickable hidden icons should remain discoverable through hover, focus, and cursor behavior. Do not require students to leave the DCC site, use personal information, contact strangers, or access private systems.
