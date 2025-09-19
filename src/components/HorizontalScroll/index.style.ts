import { keyframes, styled } from "styled-components";
import { stepsCount } from "../../styles/Home.style";

export const flowerMoveAni = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -400vw;
  }
`;

const bouncePause = keyframes`
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-8px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-5px);
  }
  80% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
`;

export const HorizontalScrollWrap = styled.div`
  height: 200vw;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 1024px) {
    height: 300vw;
  }
  @media (max-width: 768px) {
    height: 550vw;
  }
  @media (max-width: 425px) {
    height: 750vw;
  }
`;

export const ProjectSection = styled.section`
  position: fixed;
  top: 0;
  width: auto;
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  white-space: nowrap;
  transform: translateX(0);
  transition: transform 0.1s linear;
  scroll-behavior: smooth;
  animation: ${flowerMoveAni} 20s steps(${stepsCount}) forwards;

  .scroll-content {
    display: inline-flex;
    height: 100%;
  }

  .career-item {
    position: relative;
    display: inline-block;
    width: 100vw;
  }

  .click-bubble-btn {
    position: absolute;
    bottom: calc(36% + 110px);
    left: calc(70% - 24px);
    padding: 0;
    animation: ${bouncePause} 1.7s cubic-bezier(0, 0.92, 0.62, 0.99) infinite;
    button {
      cursor: pointer;
      padding: 16px 24px;
      background: ${({ theme }) => theme.color.TP};
      color: ${({ theme }) => theme.color.mainColor};
      font-size: ${({ theme }) => theme.font.small};
    }
  }

  .flower-icon {
    position: absolute;
    bottom: 36%;
    left: 70%;
    width: 4%;
    height: auto;
    max-width: 90px;
  }
`;
