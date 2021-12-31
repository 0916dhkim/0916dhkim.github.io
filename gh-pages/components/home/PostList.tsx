import Link from "next/link";
import { SerializedPost } from "lib/postUtils";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  item: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "0.5rem",
    backgroundColor: theme.palette.paper,
    boxShadow: theme.shadow,
  },
  title: {
    color: theme.palette.primary,
  },
  summary: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipses",
    display: "-webkit-box",
    lineClamp: 3,
    boxOrient: "vertical",
  },
  date: {
    color: theme.palette.secondary,
    alignSelf: "end",
    fontSize: "0.875rem",
  },
}));

type ListItemProps = {
  post: SerializedPost;
};

const ListItem = ({ post: post }: ListItemProps) => {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      <Link href={`posts/${post.id}`}>
        <a>
          <h3 className={classes.title}>{post.title}</h3>
        </a>
      </Link>
      <p className={classes.summary}>
        {post.summary ?? post.content.substring(0, 100)}
      </p>
      <span className={classes.date}>{post.createdAt}</span>
    </div>
  );
};

type Props = {
  posts: SerializedPost[];
};
export const PostList = ({ posts }: Props): React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <ListItem key={post.id} post={post} />
      ))}
    </div>
  );
};
