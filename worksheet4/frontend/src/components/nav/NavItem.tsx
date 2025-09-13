import { useRouter } from "next/router";
import React from "react";
import styles from "./Nav.module.scss";

type Props = {
  route?: string; // 导航项对应的路由地址
  children: React.ReactNode; // 导航项显示的内容
  end?: boolean; // 是否为导航栏末尾项（用于右对齐）
  dropdown?: boolean; // 是否包含下拉菜单
  onClick?: boolean | (() => void); // 点击事件（优先级高于路由跳转）
  style?: React.CSSProperties; // 自定义样式
};

const NavItem = ({ children, route, end, dropdown, onClick, style }: Props) => {
  const router = useRouter(); // 获取Next.js路由实例

  // 导航跳转处理函数
  const navigate: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (typeof route === "string") {
      router.push(route); // 跳转到指定路由
    }
    event.stopPropagation(); // 阻止事件冒泡
  };

  return (
    <div
      style={style}
      // 动态拼接类名：根据是否有路由/点击事件、是否为末尾项、是否有下拉菜单决定样式
      className={`${route || onClick ? styles.clickable : styles.navitem}${
        end ? ` ${styles.end}` : ""
      }${dropdown ? ` ${styles.dropdown}` : ""}`}
      // 点击事件：优先使用自定义onClick，否则使用导航跳转
      onClick={typeof onClick === "function" ? onClick : navigate}
    >
      {children}
    </div>
  );
};

export default NavItem;