import { Header } from "./shared/Header";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles((theme) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: theme.palette.background,
    padding: "3rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
}));

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header />
      <hr />
      {children}
    </div>
  );
};
