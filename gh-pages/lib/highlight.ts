import "highlight.js/styles/github-dark.css";

import hljs from "highlight.js";
import { useEffect } from "react";

export const useHighlight = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
};
