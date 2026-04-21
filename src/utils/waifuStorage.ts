export const getSelectedWaifu = () => {
  return localStorage.getItem("selectedWaifu");
};

export const setSelectedWaifu = (id: string) => {
  localStorage.setItem("selectedWaifu", id);
};