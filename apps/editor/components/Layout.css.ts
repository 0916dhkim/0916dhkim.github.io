import { style } from "@vanilla-extract/css";
import { theme } from "@0916dhkim/theme/theme.css";

export const root = style({
  minWidth: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",

  color: theme.palette.default.text,
  backgroundColor: theme.palette.default.background,
});

export const main = style({
  padding: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
