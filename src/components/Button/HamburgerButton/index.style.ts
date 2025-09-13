import { styled } from "styled-components";

export const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 20;
  background: ${({ theme }) => theme.color.primary};
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.white};
`;
