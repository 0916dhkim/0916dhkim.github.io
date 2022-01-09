import { style } from "@vanilla-extract/css";
import { vars } from "@0916dhkim/theme/theme.css";

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
  backgroundColor: vars.palette.paper,
  boxShadow: vars.shadow,
});

export const title = style({
  color: vars.palette.primary,
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
  color: vars.palette.secondary,
  alignSelf: "end",
  fontSize: "0.875rem",
});
