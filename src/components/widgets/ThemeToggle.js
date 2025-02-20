import { useEffect } from "react";
import themeToggleIconLight from "../../assets/images/theme-toggle-light.svg";
import themeToggleIconDark from "../../assets/images/theme-toggle-dark.svg";

const ThemeToggle = ({ theme, setTheme }) => {
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <img src={themeToggleIconLight} alt="Light theme" /> : <img src={themeToggleIconDark} alt="Dark theme" />}
    </button>
  );
};

export default ThemeToggle;
