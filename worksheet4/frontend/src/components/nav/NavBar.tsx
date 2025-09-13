import React from "react";
import styles from "./Nav.module.scss";

type Props = {
  children: React.ReactNode; // 子组件（导航项）
};

const NavBar = ({ children }: Props) => {
  return <nav className={styles.navbar}>{children}</nav>;
};

export default NavBar;