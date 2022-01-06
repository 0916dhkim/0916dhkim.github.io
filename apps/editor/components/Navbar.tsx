import Link from "next/link";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(() => ({
  navbar: {
    position: "sticky",
    top: 0,
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <nav className={classes.navbar}>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  );
};

export default Navbar;
