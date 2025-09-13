import React from "react";
import styles from "./Nav.module.scss";

type Props = {
  children?: React.ReactNode; // 下拉菜单中的子项
};

const NavDropdown = ({ children }: Props) => {
  return <div className={styles.dropdown_container}>{children}</div>;
};

export default NavDropdown;