import { QuestionWithAnswers } from "../../../../lib/types";

export function getShifted(
  currentItem: QuestionWithAnswers,
  items: QuestionWithAnswers[],
  shiftBy: number
): QuestionWithAnswers | undefined {
  const currentIndex = items.indexOf(currentItem);
  const shiftedIndex = currentIndex + shiftBy;

  if (shiftedIndex < 0 || shiftedIndex > items.length - 1) {
    return undefined;
  }

  return items[shiftedIndex];
}
