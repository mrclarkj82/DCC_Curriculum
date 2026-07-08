export const normalizeHiddenFrameAnswer = (answer: string): string =>
  answer.trim().toLowerCase();

export const isHiddenFrameAnswerCorrect = (answer: string, correctAnswer: string): boolean =>
  normalizeHiddenFrameAnswer(answer) === normalizeHiddenFrameAnswer(correctAnswer);
