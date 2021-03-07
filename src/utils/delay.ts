export const delay = (ms: number) =>
  new Promise((res) => setTimeout(() => res(true), ms));
