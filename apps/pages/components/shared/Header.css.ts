import { style } from "@vanilla-extract/css";
import { theme } from "@0916dhkim/theme/theme.css";

export const header = style({
  position: "sticky",
  top: 0,
  background: theme.palette.paper.background,
  color: theme.palette.paper.text,
  padding: "1rem",
  display: "flex",
  gap: "0.5rem",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: theme.shadow,
});
