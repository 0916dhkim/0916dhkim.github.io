import Link from "next/link";
import { Metadata } from "lib/articles";
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
  metadata: Metadata;
};

const ListItem = ({ metadata }: ListItemProps) => {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      <Link href={`articles/${metadata.slug}`}>
        <a>
          <h3 className={classes.title}>{metadata.title}</h3>
        </a>
      </Link>
      <p className={classes.summary}>{metadata.summary}</p>
      <span className={classes.date}>{metadata.date}</span>
    </div>
  );
};

type Props = {
  metadatList: Metadata[];
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
