import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("ayush-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("ayush-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));
