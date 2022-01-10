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
  backgroundColor: theme.palette.paper,
  boxShadow: theme.shadow,
});

export const title = style({
  color: theme.palette.primary,
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
  color: theme.palette.secondary,
  alignSelf: "end",
  fontSize: "0.875rem",
});
