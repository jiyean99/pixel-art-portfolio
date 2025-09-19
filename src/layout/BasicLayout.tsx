import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation, { type NavItem } from "../components/Navigation/Navigation";
import BasicLayoutWrap from "./index.style";
import homeIconImg from "../assets/images/icon/home-icon.png";
import careerIconImg from "../assets/images/icon/career-icon.png";
import projectIconImg from "../assets/images/icon/project-icon.png";
import contactIconImg from "../assets/images/icon/contact-icon.png";
import { HamburgerButton } from "../components/Button/HamburgerButton/index.style";

// 네비게이션 메뉴 정의 (props로 넘길 수 있음)
const navItems: NavItem[] = [
  { key: "/", label: "HOME", icon: <img src={homeIconImg} alt="HOME" /> },
  {
    key: "/career",
    label: "CAREER",
    icon: <img src={careerIconImg} alt="CAREER" />,
  },
  {
    key: "/project",
    label: "PROJECT",
    icon: <img src={projectIconImg} alt="PROJECT" />,
  },
  {
    key: "/contact",
    label: "CONTACT",
    icon: <img src={contactIconImg} alt="CONTACT" />,
  },
];

const BasicLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();

  const handleSelect = (path: string) => {
    navigate(path);
    setNavOpen(false);
  };

  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen((prev) => !prev);
  return (
    <BasicLayoutWrap>
      <HamburgerButton className="ham-btn" onClick={toggleNav}>
        ☰
      </HamburgerButton>
      <Navigation
        items={navItems}
        active={pathname}
        onSelect={handleSelect}
        isOpen={navOpen}
      />
      <main>{children}</main>
    </BasicLayoutWrap>
  );
};

export default BasicLayout;
