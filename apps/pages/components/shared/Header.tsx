import * as styles from "./Header.css";

import Link from "next/link";

type NavlinkProps = {
  children: string;
  href: string;
};
const Navlink = ({ children, href }: NavlinkProps): React.ReactElement => {
  return (
    <Link href={href}>
      <a className={styles.navlink}>{children}</a>
    </Link>
  );
};

const Navbar = (): React.ReactElement => {
  return (
    <nav className={styles.navbar}>
      <Navlink href="/">Archive</Navlink>
      <Navlink href="/tags">Tags</Navlink>
      <Navlink href="/lang">Language</Navlink>
    </nav>
  );
};

export const Header = (): React.ReactElement => {
  return (
    <header className={styles.header}>
      <h1>{"danny.blog"}</h1>
      <Navbar />
    </header>
  );
};
