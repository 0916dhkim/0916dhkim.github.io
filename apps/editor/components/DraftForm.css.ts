import { style } from "@vanilla-extract/css";

export const formgrid = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "1rem",
});

export const publish = style({
  alignSelf: "flex-end",
});
