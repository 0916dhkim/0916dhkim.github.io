import { style } from "@vanilla-extract/css";
import { theme } from "@0916dhkim/theme/theme.css";

export const navbar = style({
  position: "sticky",
  top: 0,
  padding: "1rem",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",

  color: theme.palette.paper.text,
  backgroundColor: theme.palette.paper.background,
});

export const navlink = style({
  fontWeight: "bold",
});
