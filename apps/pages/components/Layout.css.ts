import { style } from "@vanilla-extract/css";
import { theme } from "@0916dhkim/theme/theme.css";

export const container = style({
  minHeight: "100vh",
  backgroundColor: theme.palette.background,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const main = style({
  padding: "0 3rem 3rem 3rem",
  display: "flex",
  flexDirection: "column",
});
