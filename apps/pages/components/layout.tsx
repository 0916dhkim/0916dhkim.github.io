import { Header } from "./shared/Header";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles((theme) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: theme.palette.background,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  main: {
    padding: "0 3rem 3rem 3rem",
    display: "flex",
    flexDirection: "column",
  },
}));

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.main}>{children}</main>
    </div>
  );
};
