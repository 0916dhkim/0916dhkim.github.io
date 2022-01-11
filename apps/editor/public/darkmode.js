window.addEventListener("load", () => {
  console.log("loading dark");
  const isOsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const root = document.documentElement;
  root.setAttribute("data-theme", isOsDark ? "dark" : "light");
});
