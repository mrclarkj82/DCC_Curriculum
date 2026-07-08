import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { AssignmentGameAccessResult } from '../../services/assignmentGameAccessService';
import { AssignmentGameGateView } from './AssignmentGameGateView';

const lockedAccess: AssignmentGameAccessResult = {
  state: 'locked',
  canAccess: false,
  reason: 'Complete the required work first.',
  targetTitle: 'Assignment One',
  assignmentLink: '/assignments/assignment-1',
  submissionId: null,
};

const unlockedAccess: AssignmentGameAccessResult = {
  state: 'unlocked',
  canAccess: true,
  reason: 'Required evidence is complete.',
  targetTitle: 'Assignment One',
  assignmentLink: '/assignments/assignment-1',
  submissionId: 'submission-1',
};

describe('AssignmentGameGateView', () => {
  it('renders the locked route state', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <AssignmentGameGateView
          access={lockedAccess}
          saveData={null}
          isSaveLoading={false}
          isSaving={false}
          saveMessage={null}
          saveError={null}
          onSave={async () => undefined}
        />
      </MemoryRouter>,
    );

    expect(markup).toContain('Game Locked');
    expect(markup).toContain('Open Required Work');
  });

  it('renders the unlocked playable route state', () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <AssignmentGameGateView
          access={unlockedAccess}
          saveData={null}
          isSaveLoading={false}
          isSaving={false}
          saveMessage={null}
          saveError={null}
          onSave={async () => undefined}
        />
      </MemoryRouter>,
    );

    expect(markup).toContain('New Game');
    expect(markup).toContain('Ember Gate');
  });
});
