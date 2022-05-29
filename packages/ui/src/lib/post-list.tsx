import Link from "next/link";
import styled from "@emotion/styled";

const StyledContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const StyledItem = styled.div(({ theme }) => ({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "0.5rem",
  backgroundColor: theme.palette.paper.background,
  color: theme.palette.paper.text,
  boxShadow: theme.shadow,
}));

const StyledTitle = styled.h3(({ theme }) => ({
  color: theme.palette.primary.background,
}));

const StyledSummary = styled.p({
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipses",
  display: "-webkit-box",
  lineClamp: 3,
  boxOrient: "vertical",
});

const StyledDate = styled.span(({ theme }) => ({
  color: theme.palette.secondary.background,
  alignSelf: "end",
  fontSize: "0.875rem",
}));

type ListItemProps = {
  id: string;
  title: string;
  content: string;
  summary?: string | null;
  createdAt: string;
};

const ListItem = ({
  id,
  title,
  content,
  summary,
  createdAt,
}: ListItemProps) => {
  return (
    <StyledItem>
      <Link href={`posts/${id}`}>
        <a>
          <StyledTitle>{title}</StyledTitle>
        </a>
      </Link>
      <StyledSummary>{summary ?? content.substring(0, 100)}</StyledSummary>
      <StyledDate>{createdAt}</StyledDate>
    </StyledItem>
  );
};

type Props = {
  posts: ListItemProps[];
};

const PostList = ({ posts }: Props): React.ReactElement => {
  return (
    <StyledContainer>
      {posts.map((post) => (
        <ListItem key={post.id} {...post} />
      ))}
    </StyledContainer>
  );
};

export default PostList;
