import { IoMdArrowDropdown } from "react-icons/io"; // 导入下拉箭头图标
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <NavBar>
      {/* 导航栏标题（不可点击） */}
      <NavItem>SPEED</NavItem>
      {/* 首页导航项（精确匹配路由“/”） */}
      <NavItem route="/" end>
        首页
      </NavItem>
      {/* 文章导航项（包含下拉菜单） */}
      <NavItem dropdown route="/articles">
        文章 <IoMdArrowDropdown />
        {/* 下拉菜单内容 */}
        <NavDropdown>
          <NavItem route="/articles">查看文章</NavItem>
          <NavItem route="/articles/new">提交新文章</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;