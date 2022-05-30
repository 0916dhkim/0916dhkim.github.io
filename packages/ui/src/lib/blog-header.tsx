import Link from "next/link";
import styled from "@emotion/styled";

const StyledHeader = styled.header(({ theme }) => ({
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
}));

const BlogHeader = (): React.ReactElement => {
  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <h1>{"danny.blog"}</h1>
        </a>
      </Link>
    </StyledHeader>
  );
};

export default BlogHeader;
