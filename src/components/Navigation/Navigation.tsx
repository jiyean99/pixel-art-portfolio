import React from "react";
import { NavWrap } from "./index.style";
import ThemeToggleButton from "../Button/ThemeToggleButton";

export type NavItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

export type NavigationProps = {
  items: NavItem[];
  active: string;
  onSelect: (key: string) => void;
  isOpen: boolean; // 토글 상태 prop 추가
};

const Navigation: React.FC<NavigationProps> = ({
  items,
  active,
  onSelect,
  isOpen,
}) => (
  <NavWrap className={isOpen ? "open" : ""}>
    <ThemeToggleButton />
    {items.map((item) => (
      <button
        key={item.key}
        className={`nav-button${
          item.key === active ? " active" : ""
        } jersey-font`}
        onClick={() => onSelect(item.key)}
      >
        {item.icon}
        {item.label}
      </button>
    ))}
  </NavWrap>
);

export default Navigation;
