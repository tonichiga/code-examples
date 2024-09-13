export const createRandomStringFromChars = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";

  const getRandomChar = (str) => str.charAt(Math.floor(Math.random() * str.length));

  return Array.from({ length: 10 }, () => getRandomChar(chars)).join("");
};
