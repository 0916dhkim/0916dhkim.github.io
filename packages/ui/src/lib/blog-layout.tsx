import Header from "./blog-header";
import { Provider } from "./theme";
import styled from "@emotion/styled";

const StyledContainer = styled.div(({ theme }) => ({
  minHeight: "100vh",
  color: theme.palette.default.text,
  backgroundColor: theme.palette.default.background,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
}));

const StyledMain = styled.main({
  padding: "0 3rem 3rem 3rem",
  display: "flex",
  flexDirection: "column",
});

type BlogLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <Provider>
      <StyledContainer>
        <Header />
        <StyledMain>{children}</StyledMain>
      </StyledContainer>
    </Provider>
  );
};

export default BlogLayout;
