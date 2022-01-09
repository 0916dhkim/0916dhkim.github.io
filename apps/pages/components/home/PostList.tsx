import * as styles from "./PostList.css";

import Link from "next/link";

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
    <div className={styles.item}>
      <Link href={`posts/${id}`}>
        <a>
          <h3 className={styles.title}>{title}</h3>
        </a>
      </Link>
      <p className={styles.summary}>{summary ?? content.substring(0, 100)}</p>
      <span className={styles.date}>{createdAt}</span>
    </div>
  );
};

type Props = {
  posts: ListItemProps[];
};
export const PostList = ({ posts }: Props): React.ReactElement => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <ListItem key={post.id} {...post} />
      ))}
    </div>
  );
};
