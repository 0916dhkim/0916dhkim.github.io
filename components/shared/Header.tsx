import Link from "next/link";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    background: theme.palette.background,
    padding: "1rem",
    display: "flex",
    gap: "0.5rem",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: theme.shadow,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    gap: "2em",
    justifyContent: "center",
  },
  navlink: {
    textDecoration: "underline",
  },
}));

type NavlinkProps = {
  children: string;
  href: string;
};
const Navlink = ({ children, href }: NavlinkProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <Link href={href}>
      <a className={classes.navlink}>{children}</a>
    </Link>
  );
};

const Navbar = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <nav className={classes.navbar}>
      <Navlink href="/">Archive</Navlink>
      <Navlink href="/tags">Tags</Navlink>
      <Navlink href="/lang">Language</Navlink>
    </nav>
  );
};

export const Header = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1>{"Danny's Blog"}</h1>
      <Navbar />
    </header>
  );
};
