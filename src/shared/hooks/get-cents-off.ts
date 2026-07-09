export const getCentsOff = (current: number, target: number) => {
  return target > 0 ? Math.round(1200 * Math.log2(current / target)) : 0;
};
