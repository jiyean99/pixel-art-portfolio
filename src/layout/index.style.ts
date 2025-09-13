import styled from "styled-components";
import { NavWidth } from "../styles/base.style";

const BasicLayoutWrap = styled.div`
  display: flex;
  min-height: 100vh;
  nav {
    position: fixed;
    z-index: 10;
    width: ${NavWidth};
    min-height: 100vh;
    background: ${({ theme }) => theme.color.mainBg};
    padding: 40px 0;
    border-right: 4px solid ${({ theme }) => theme.color.themeTxt};
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }
  main {
    width: calc(100% - ${NavWidth});
    margin-left: ${NavWidth};
  }
  .ham-btn {
    display: none;
  }

  // 반응형 레이아웃
  @media (max-width: 768px) {
    .ham-btn {
      display: block;
    }
    nav {
      display: none;
      &.open {
        display: flex;
      }
    }

    main {
      width: 100%;
      margin-left: 0;
    }
  }
`;

export default BasicLayoutWrap;
