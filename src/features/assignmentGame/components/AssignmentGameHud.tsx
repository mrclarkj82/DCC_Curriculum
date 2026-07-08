import { assignmentGameHudPlaceholders } from '../gameShellConstants';

export function AssignmentGameHud() {
  return (
    <aside className="assignment-game-hud" aria-label="Game HUD placeholders">
      {assignmentGameHudPlaceholders.map((item) => (
        <div className="assignment-game-hud-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </aside>
  );
}
