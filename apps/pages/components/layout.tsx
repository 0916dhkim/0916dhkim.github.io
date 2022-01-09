import * as styles from "./Layout.css";

import { Header } from "./shared/Header";
import { lightTheme } from "styles/theme.css";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={`${lightTheme} ${styles.container}`}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
