export const normalizeHiddenFrameAnswer = (answer: string): string =>
  answer.trim().toLowerCase();

export const isHiddenFrameAnswerCorrect = (
  answer: string,
  correctAnswer: string,
  acceptedAnswers: string[] = [],
): boolean => {
  const normalizedAnswer = normalizeHiddenFrameAnswer(answer);
  const acceptedNormalizedAnswers = [correctAnswer, ...acceptedAnswers].map((candidate) =>
    normalizeHiddenFrameAnswer(candidate),
  );

  return acceptedNormalizedAnswers.includes(normalizedAnswer);
};
