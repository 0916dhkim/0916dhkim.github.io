import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.nav(({ theme }) => ({
  position: "sticky",
  top: 0,
  padding: "1rem",
  display: "flex",
  flexDirection: "row",
  gap: "2rem",

  color: theme.palette.paper.text,
  backgroundColor: theme.palette.paper.background,
}));

const StyledAnchor = styled.a({
  fontWeight: "bold",
});

const EditorNavbar = () => {
  return (
    <Container>
      <Link href="/">
        <StyledAnchor>Home</StyledAnchor>
      </Link>
    </Container>
  );
};

export default EditorNavbar;
