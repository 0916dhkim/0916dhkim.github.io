import * as styles from "./Layout.css";

import { Header } from "./shared/Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
