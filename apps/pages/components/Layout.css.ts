import { style } from "@vanilla-extract/css";
import { vars } from "@0916dhkim/theme/theme.css";

export const container = style({
  minHeight: "100vh",
  backgroundColor: vars.palette.background,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const main = style({
  padding: "0 3rem 3rem 3rem",
  display: "flex",
  flexDirection: "column",
});
