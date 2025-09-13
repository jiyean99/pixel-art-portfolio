import styled from "styled-components";

export const NavWrap = styled.nav`
  .nav-button {
    width: 84%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 17px 14px;
    border-radius: 11px;
    border: none;
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontW.bold};
    font-size: ${({ theme }) => theme.font.title};
    color: ${({ theme }) => theme.color.themeTxt};
    margin-bottom: 12px;
    background: transparent;
    filter: none;
    transition: background 0.3s, filter 0.3s;

    &.active {
      background: ${({ theme }) => theme.color.accordion1};
      filter: brightness(1.08);
    }
  }
  // 네비게이션 아이콘 스타일
  img {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: none;
  }
`;
