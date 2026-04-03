export const TAG_COLORS = [
  "--color-my-accents-green",
  "--color-my-accents-red",
  "--color-my-accents-yellow",
  "--color-my-accents-purple",
  "--color-my-accents-blue",
  "--color-my-accents-cyan",
  "--color-my-accents-orange",
  "--color-my-accents-indigo",
] as const;

export type TagColor = (typeof TAG_COLORS)[number];
