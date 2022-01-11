import * as styles from "./Header.css";

import Link from "next/link";

export const Header = (): React.ReactElement => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>{"danny.blog"}</h1>
        </a>
      </Link>
    </header>
  );
};
