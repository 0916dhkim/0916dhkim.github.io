import Link from "next/link";
import { MetaData } from "lib/articles";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  item: {
    height: "8.75rem",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    backgroundColor: theme.palette.paper,
    boxShadow: theme.shadow,
  },
  summary: {
    flexGrow: 1,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
  },
  x: {
    textOverflow: "ellipsis",
  },
  date: {
    alignSelf: "end",
    fontSize: "0.875rem",
  },
}));

type ListItemProps = {
  metadata: MetaData;
};

const ListItem = ({ metadata }: ListItemProps) => {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      <Link href={`articles/${metadata.slug}`}>
        <a>
          <h3>{metadata.title}</h3>
        </a>
      </Link>
      <p className={classes.summary}>{metadata.summary}</p>
      <span className={classes.date}>{metadata.date}</span>
    </div>
  );
};

type Props = {
  metadatList: MetaData[];
};
export const ArticleList = ({ metadatList }: Props): React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {metadatList.map((metadata) => (
        <ListItem key={metadata.slug} metadata={metadata} />
      ))}
    </div>
  );
};
