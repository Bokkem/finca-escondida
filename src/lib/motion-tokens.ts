export const ease = {
  enter: [0.22, 1, 0.36, 1] as const,
  exit: [0.64, 0, 0.78, 0] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  micro: 0.2,
  meso: 0.4,
  macro: 0.7,
  slow: 1.2,
};

export const stagger = {
  tight: 0.04,
  normal: 0.08,
  loose: 0.12,
};
