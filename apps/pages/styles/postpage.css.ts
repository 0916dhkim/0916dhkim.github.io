import { globalStyle, style } from "@vanilla-extract/css";

import { theme } from "@0916dhkim/theme/theme.css";

export const title = style({
  fontSize: "3rem",
  color: theme.palette.primary.background,
  textAlign: "center",
});

export const markdown = style({
  maxWidth: 800,
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

globalStyle(`${markdown} p`, {
  marginTop: 8,
});
globalStyle(`${markdown} h1`, {
  color: theme.palette.secondary.background,
  marginTop: 32,
});
globalStyle(`${markdown} h2`, {
  color: theme.palette.secondary.background,
  marginTop: 16,
  borderBottom: "3px solid",
});
globalStyle(`${markdown} h3`, {
  color: theme.palette.secondary.background,
  marginTop: 16,
});
globalStyle(`${markdown} ul,ol`, {
  marginTop: 8,
  paddingLeft: 24,
});
globalStyle(`${markdown} blockquote`, {
  color: theme.palette.paper.text,
  background: theme.palette.paper.background,
  boxShadow: theme.shadow,
  padding: "0.5rem",
  margin: "0.75rem 0",
});
globalStyle(`${markdown} blockquote p`, {
  margin: 0,
});
globalStyle(`${markdown} pre`, {
  margin: "0.75rem 0",
  overflowX: "auto",
  boxShadow: theme.shadow,
});
globalStyle(`${markdown} img`, {
  width: "100%",
});
