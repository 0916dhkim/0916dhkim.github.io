import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const header = style({
  position: "sticky",
  top: 0,
  background: vars.palette.primary,
  color: vars.palette.white,
  padding: "1rem",
  display: "flex",
  gap: "0.5rem",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: vars.shadow,
});

export const navbar = style({
  display: "flex",
  flexDirection: "row",
  gap: "2em",
  justifyContent: "center",
});

export const navlink = style({
  textDecoration: "underline",
});
