import type { VocabularyTerm } from '../types';

export function VocabularyList({ terms }: { terms: VocabularyTerm[] }) {
  if (!terms.length) {
    return <p className="muted">Vocabulary will be added when this lesson is expanded.</p>;
  }

  return (
    <dl className="vocabulary-list">
      {terms.map((term) => (
        <div key={term.term}>
          <dt>{term.term}</dt>
          <dd>{term.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

