import styled, { keyframes } from "styled-components";

const bgMoveAni = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
`;
const repeatBgMoveAni = keyframes`
  0% {
    left: 99%;
  }
  100% {
    left: 0%;
  }
`;

const stepsCount = 300; // 배경 이미지의 가로 픽셀 수

export const IntroSection = styled.section`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.color.skyBg};
  .sky-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    image-rendering: pixelated;
    object-fit: cover;
    animation: ${bgMoveAni} 400s steps(${stepsCount}) infinite;
    &--repeat {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      image-rendering: pixelated;
      object-fit: cover;
      animation: ${repeatBgMoveAni} 400s steps(${stepsCount}) infinite;
    }
  }
  .mountain-bg {
    position: absolute;
    top: 10%;
    width: 100%;
    height: 100vh;
    image-rendering: pixelated;
    object-fit: cover;
    animation: ${bgMoveAni} 150s steps(${stepsCount}) infinite;
    &--repeat {
      position: absolute;
      top: 10%;
      width: 100%;
      height: 100vh;
      image-rendering: pixelated;
      object-fit: cover;
      animation: ${repeatBgMoveAni} 150s steps(${stepsCount}) infinite;
    }
  }
  .ground-bg {
    position: absolute;
    top: 10%;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2;
    object-fit: cover;
    animation: ${bgMoveAni} 20s steps(${stepsCount}) infinite;
    image-rendering: pixelated;
    &--repeat {
      position: absolute;
      top: 10%;
      left: 100%;
      width: 100%;
      height: 100vh;
      z-index: 2;
      object-fit: cover;
      animation: ${repeatBgMoveAni} 20s steps(${stepsCount}) infinite;
      image-rendering: pixelated;
    }
  }
  .title-txt {
    position: absolute;
    top: 20vh;
    left: 50%;
    color: ${({ theme }) => theme.color.themeTxt};
    font-size: ${({ theme }) => theme.font.xxlarge};
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 3;
    transform: translate(-50%, 0);
    will-change: transform;
    font-weight: ${({ theme }) => theme.fontW.bold};
  }
  .shadow-bg {
    position: absolute;
    top: 22%;
    left: 0;
    width: 100%;
    height: 100vh;
    image-rendering: pixelated;
    z-index: 4;
    will-change: transform;
    object-fit: cover;
    animation: ${bgMoveAni} 20s steps(${stepsCount}) infinite;
    &--repeat {
      position: absolute;
      top: 22%;
      left: 0;
      width: 100%;
      height: 100vh;
      image-rendering: pixelated;
      z-index: 4;
      will-change: transform;
      object-fit: cover;
      animation: ${repeatBgMoveAni} 20s steps(${stepsCount}) infinite;
    }
  }
  .character {
    position: absolute;
    left: 8%;
    z-index: 1;
    width: 13%;
    image-rendering: pixelated;
  }
  .scroll-btn {
    position: absolute;
    bottom: 150px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    font-size: ${({ theme }) => theme.font.medium};
    background-color: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    z-index: 4;
    user-select: none;
    box-shadow: 0 3px 8px #0002;
    transition: filter 0.18s;
    &:active {
      filter: brightness(0.82);
    }
  }
`;
export const MyInfoSection = styled.section`
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-rows: 220px 120px;
  gap: 24px;
  background: ${({ theme }) => theme.color.mainBg};
  padding: 48px;
  min-height: 100vh;
  .profile-area {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    background: ${({ theme }) => theme.color.white};
    border: 2px solid ${({ theme }) => theme.color.gray};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 220px;
  }

  .info-area {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    background: ${({ theme }) => theme.color.whiteBg};
    border: 2px solid ${({ theme }) => theme.color.gray};
    padding: 24px 32px;
    h1 {
      font-size: ${({ theme }) => theme.font.largeNum};
      margin-bottom: 16px;
      font-weight: ${({ theme }) => theme.fontW.bold};
    }
    h2 {
      font-size: ${({ theme }) => theme.font.large};
      margin: 0 0 8px 0;
    }
    ul {
      margin-bottom: 12px;
      li {
        font-size: ${({ theme }) => theme.font.medium};
        margin-bottom: 5px;
      }
    }
  }

  .status-area {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    background: ${({ theme }) => theme.color.white};
    border: 2px solid ${({ theme }) => theme.color.gray};
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* HP/status 그래프 등 */
  }
`;
