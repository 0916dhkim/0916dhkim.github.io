import { style } from "@vanilla-extract/css";
import { theme } from "@0916dhkim/theme/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const item = style({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.5rem",
  backgroundColor: theme.palette.paper.background,
  color: theme.palette.paper.text,
  boxShadow: theme.shadow,
});

export const title = style({
  color: theme.palette.primary.background,
});

export const summary = style({
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipses",
  display: "-webkit-box",
  lineClamp: 3,
  boxOrient: "vertical",
});

export const date = style({
  color: theme.palette.secondary.background,
  alignSelf: "end",
  fontSize: "0.875rem",
});
