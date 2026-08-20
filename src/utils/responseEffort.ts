export type ResponseEffortCategory = 'strong' | 'developing' | 'quick-review';

export interface ResponseEffortAssessment {
  category: ResponseEffortCategory;
  reason: string;
}

export interface ResponseEffortStudent {
  studentName: string;
  response: string;
}

export interface ResponseEffortGroups {
  strong: string[];
  developing: string[];
  quickReview: string[];
}

const placeholderPattern =
  /^(?:idk|i\s+don'?t\s+know|dont\s+know|none|nothing|n\/?a|no|yes|ok(?:ay)?|done|test|testing|skip|asdf|lol)[.!?]*$/i;
const repeatedCharacterPattern = /([^\s])\1{4,}/i;
const conciseIdentificationPattern =
  /^(?:name|identify|select|where|who)\b|\b(?:which|what)\s+(?:panel|tool|button|setting|shortcut|term|command|file|format|mode|view|workspace|key|type)\b/i;
const explanationPromptPattern =
  /\b(?:why|how|explain|describe|compare|what helped|and what|and how|give an example|for example)\b/i;
const detailMarkerPattern =
  /\b(?:because|example|instance|such as|when|while|helped|learned|watched|practiced|tried|used|noticed|changed|created|made|fixed|tested|adjusted)\b/i;

function responseWords(value: string): string[] {
  return value.toLowerCase().match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) ?? [];
}

function isExtremelyRepetitive(words: string[]): boolean {
  if (words.length < 4) {
    return false;
  }

  const counts = new Map<string, number>();
  words.forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
  const highestCount = Math.max(...counts.values());

  return highestCount / words.length >= 0.6;
}

function mostlyCopiesPrompt(promptWords: string[], words: string[]): boolean {
  if (words.length < 4 || !promptWords.length) {
    return false;
  }

  const promptWordSet = new Set(promptWords);
  const promptOverlap = words.filter((word) => promptWordSet.has(word)).length / words.length;

  return promptOverlap >= 0.9 && words.length <= promptWords.length + 2;
}

export function assessResponseEffort(prompt: string, response: string): ResponseEffortAssessment {
  const trimmedResponse = response.trim();
  const words = responseWords(trimmedResponse);
  const uniqueWords = new Set(words);
  const promptWords = responseWords(prompt);

  if (
    !trimmedResponse ||
    placeholderPattern.test(trimmedResponse) ||
    repeatedCharacterPattern.test(trimmedResponse) ||
    isExtremelyRepetitive(words) ||
    mostlyCopiesPrompt(promptWords, words)
  ) {
    return {
      category: 'quick-review',
      reason: 'Likely placeholder, prompt copy, or extremely repetitive response.',
    };
  }

  const isConciseIdentification =
    conciseIdentificationPattern.test(prompt) && !explanationPromptPattern.test(prompt);

  if (isConciseIdentification) {
    return words.length >= 1 && uniqueWords.size >= 1
      ? {
          category: 'strong',
          reason: 'Provides a direct response to a concise identification prompt.',
        }
      : {
          category: 'quick-review',
          reason: 'Does not provide a usable identification response.',
        };
  }

  const expectsExplanation = explanationPromptPattern.test(prompt);
  const hasDetailMarker = detailMarkerPattern.test(trimmedResponse);

  if (
    words.length >= (expectsExplanation ? 12 : 10) &&
    uniqueWords.size >= (expectsExplanation ? 8 : 7) &&
    (hasDetailMarker || words.length >= (expectsExplanation ? 18 : 15))
  ) {
    return {
      category: 'strong',
      reason: 'Includes enough distinct detail to meet the prompt’s expected response style.',
    };
  }

  if (words.length >= 4 && uniqueWords.size >= 3) {
    return {
      category: 'developing',
      reason: 'Provides a usable response but may be missing explanation or specific detail.',
    };
  }

  return {
    category: 'quick-review',
    reason: 'Very brief response that may need a quick teacher review.',
  };
}

export function groupStudentsByResponseEffort(
  prompt: string,
  students: ResponseEffortStudent[],
): ResponseEffortGroups {
  const groups: ResponseEffortGroups = {
    strong: [],
    developing: [],
    quickReview: [],
  };

  students.forEach((student) => {
    const assessment = assessResponseEffort(prompt, student.response);

    if (assessment.category === 'strong') {
      groups.strong.push(student.studentName);
    } else if (assessment.category === 'developing') {
      groups.developing.push(student.studentName);
    } else {
      groups.quickReview.push(student.studentName);
    }
  });

  groups.strong.sort((firstName, secondName) => firstName.localeCompare(secondName));
  groups.developing.sort((firstName, secondName) => firstName.localeCompare(secondName));
  groups.quickReview.sort((firstName, secondName) => firstName.localeCompare(secondName));

  return groups;
}
