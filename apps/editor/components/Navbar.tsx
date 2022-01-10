import * as styles from "./Navbar.css";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  );
};

export default Navbar;
