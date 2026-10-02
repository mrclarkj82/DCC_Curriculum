export const validateLessonDates = (lesson, instructionalDayByDate) => {
  const deferredCycles = lesson.deferredCycles || [];
  if (
    !Array.isArray(deferredCycles) ||
    new Set(deferredCycles).size !== deferredCycles.length ||
    deferredCycles.some((cycle) => !['A', 'B'].includes(cycle))
  ) {
    throw new Error(`Lesson schedule ${lesson.id} has invalid deferredCycles`);
  }

  const slots = [];
  for (const cycle of ['A', 'B']) {
    const prefix = cycle === 'A' ? 'aDay' : 'bDay';
    const date = lesson[`${prefix}Date`];
    if (lesson[`${prefix}Cycle`] !== cycle) {
      throw new Error(`Lesson schedule ${lesson.id} ${prefix}Cycle must be ${cycle}`);
    }
    if (deferredCycles.includes(cycle)) {
      if (date !== '' || lesson.status !== 'needs-teacher-review' || !lesson.notes?.trim()) {
        throw new Error(
          `Lesson schedule ${lesson.id} ${cycle} deferral needs a blank date, review status, and explanation`,
        );
      }
      continue;
    }

    const day = instructionalDayByDate.get(date);
    if (!date || !day?.isInstructionalDay || day.cycleDay !== cycle) {
      throw new Error(
        `Lesson schedule ${lesson.id} ${cycle} date must be a valid instructional ${cycle} day`,
      );
    }
    slots.push({ date, cycleDay: cycle });
  }
  if (!slots.length) {
    throw new Error(`Lesson schedule ${lesson.id} must retain at least one scheduled class date`);
  }
  return slots;
};
