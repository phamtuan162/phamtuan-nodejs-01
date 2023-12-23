export const getLocalStorage = (string) => {
  return JSON.parse(localStorage.getItem(string)) || [];
};
