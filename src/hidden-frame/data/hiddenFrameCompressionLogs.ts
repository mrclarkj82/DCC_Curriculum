export type HiddenFrameCompressionLogTone = 'warning' | 'redacted' | 'template' | 'corrupted';

export interface HiddenFrameCompressionLog {
  id: string;
  title: string;
  tone: HiddenFrameCompressionLogTone;
  timestampLabel: string;
  summary: string;
  visibleText: string;
  redactedTerms?: string[];
  restoredPrompt: string;
}

export const hiddenFrameCompressionLogs: HiddenFrameCompressionLog[] = [
  {
    id: 'compression-log-original-choice',
    title: 'Original Choice Detected',
    tone: 'warning',
    timestampLabel: '00:00:18:00',
    summary: 'The Compression tries to flatten a specific creative choice into a generic output.',
    visibleText:
      'A student-selected camera angle was marked unusual. The archive preserved it because unusual does not mean wrong.',
    redactedTerms: ['generic angle', 'default template'],
    restoredPrompt: 'Name the human choice before accepting the default.',
  },
  {
    id: 'compression-log-template-drift',
    title: 'Template Drift',
    tone: 'template',
    timestampLabel: '00:00:24:12',
    summary: 'A project begins to sound like every other project after its details are removed.',
    visibleText:
      'The edit still renders, but every specific detail has been replaced with safe placeholder language.',
    redactedTerms: ['unique pacing', 'specific audience', 'personal style'],
    restoredPrompt: 'Restore one specific decision that makes the work belong to its creator.',
  },
  {
    id: 'compression-log-redacted-context',
    title: 'Context Redacted',
    tone: 'redacted',
    timestampLabel: '00:00:31:09',
    summary: 'The Compression removes context until the project becomes technically correct but forgettable.',
    visibleText:
      'The model, shot, and timeline are still present. The reason for the choices has been hidden.',
    redactedTerms: ['why this shot', 'why this material', 'why this cut'],
    restoredPrompt: 'Check the frame for the reason behind the technical choice.',
  },
  {
    id: 'compression-log-flat-output',
    title: 'Flat Output Warning',
    tone: 'corrupted',
    timestampLabel: '00:00:45:00',
    summary: 'A final export becomes less interesting when every risky decision is removed.',
    visibleText:
      'Nothing dangerous happened. The work simply lost the strange edges that made it feel alive.',
    redactedTerms: ['strange edge', 'specific voice', 'human decision'],
    restoredPrompt: 'The antidote is not noise. The antidote is a deliberate choice.',
  },
];

export const getHiddenFrameCompressionLogById = (
  id: string,
): HiddenFrameCompressionLog | undefined =>
  hiddenFrameCompressionLogs.find((log) => log.id === id);
