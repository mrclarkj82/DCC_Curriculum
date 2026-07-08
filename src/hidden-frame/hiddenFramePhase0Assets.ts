// Phase 0 asset map for The Hidden Frame.
// Use this registry instead of hardcoded paths in future Hidden Frame UI.

export const HIDDEN_FRAME_PUBLIC_BASE_PATH = '/hidden-frame' as const;

export const hiddenFramePhase0Assets = {
  manifests: {
    app: '/hidden-frame/manifest.json',
    originalPhase0: '/hidden-frame/hidden-frame-phase0-manifest.json',
  },
  symbols: {
    white: '/hidden-frame/symbols/hidden-frame-symbol-white.png',
    whiteSvg: '/hidden-frame/symbols/hidden-frame-symbol-white.svg',
    black: '/hidden-frame/symbols/hidden-frame-symbol-black.png',
    blackSvg: '/hidden-frame/symbols/hidden-frame-symbol-black.svg',
    transparent: '/hidden-frame/symbols/hidden-frame-symbol-transparent.png',
    glitch: '/hidden-frame/symbols/hidden-frame-symbol-glitch.png',
    smallSvg: '/hidden-frame/symbols/hidden-frame-symbol-small.svg',
  },
  backgrounds: {
    archiveDark: '/hidden-frame/backgrounds/archive-bg-dark.png',
    archiveGrid: '/hidden-frame/backgrounds/archive-bg-grid.png',
    vhsStatic: '/hidden-frame/backgrounds/archive-bg-vhs-static.png',
    compression: '/hidden-frame/backgrounds/archive-bg-compression.png',
    renderRoom: '/hidden-frame/backgrounds/archive-bg-render-room.png',
  },
  ui: {
    titleCard: '/hidden-frame/ui/hidden-frame-title-card.png',
    styleBoard: '/hidden-frame/ui/hidden-frame-style-board.png',
    designTokens: '/hidden-frame/ui/hidden-frame-design-tokens.json',
  },
  previews: {
    contactSheet: '/hidden-frame/previews/phase0-contact-sheet.png',
  },
} as const;

export const hiddenFramePhase0AssetRoles = {
  officialSymbol: hiddenFramePhase0Assets.symbols.transparent,
  archiveBackground: hiddenFramePhase0Assets.backgrounds.archiveDark,
  compressionBackground: hiddenFramePhase0Assets.backgrounds.compression,
  renderRoomBackground: hiddenFramePhase0Assets.backgrounds.renderRoom,
  unrealBackground: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  videoBackground: hiddenFramePhase0Assets.backgrounds.vhsStatic,
} as const;

export type HiddenFramePhase0AssetKey = keyof typeof hiddenFramePhase0Assets;
