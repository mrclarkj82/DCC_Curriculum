export function ExpansionSafetyPanel() {
  return (
    <aside className="hidden-frame-expansion-safety" aria-labelledby="hidden-frame-expansion-safety-title">
      <p className="hidden-frame-kicker">Admin expansion scope</p>
      <h2 id="hidden-frame-expansion-safety-title">Safe Expansion Rules</h2>
      <ul className="hidden-frame-list">
        <li>This page does not display hidden answers.</li>
        <li>This page does not read or display student data.</li>
        <li>Future content must stay optional, ungraded, and inside DCC Creative Studio.</li>
        <li>New persistence, uploads, or account sync require a separate documented review.</li>
      </ul>
    </aside>
  );
}
