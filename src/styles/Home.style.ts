import styled, { keyframes } from "styled-components";

export const bgMoveAni = keyframes`
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
`;
export const repeatBgMoveAni = keyframes`
  0% {
    left: 99%;
  }
  100% {
    left: 0%;
  }
`;

export const stepsCount = 300; // 배경 이미지의 가로 픽셀 수

export const CycleCharacterScrollWrap = styled.canvas`
  position: fixed;
  pointer-events: none;
  bottom: 37%;
  left: 19%;
  aspect-ratio: 1 / 1;
  width: 11.5% !important;
  min-height: 185px;
  min-width: 185px;
  z-index: 1;
`;

export const IntroSection = styled.section`
  &.career-container {
    position: fixed;
  }

  position: relative;
  height: 100vh;
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
    min-width: 180px;
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
  background: ${({ theme }) => theme.color.mainBg};
  color: ${({ theme }) => theme.color.themeTxt};
  padding: 48px;
  height: fit-content;
  min-height: calc(100vh - 92px);
  display: grid;
  grid-gap: 40px;
  gap: 40px;
  grid-template-rows: 1fr;
  grid-template-columns: max(30%) auto;
  .title-txt {
    font-size: ${({ theme }) => theme.font.large};
    font-weight: ${({ theme }) => theme.fontW.medium};
    margin-bottom: 16px;
    &--slogan {
      line-height: ${({ theme }) => theme.font.xlarge};
      font-size: ${({ theme }) => theme.font.xxlarge};
      font-weight: ${({ theme }) => theme.fontW.medium};
      position: absolute;
      left: 0;
      top: -60px;
    }
  }
  .area-box {
    padding: 40px 36px;
    background: ${({ theme }) => theme.color.subBg};
    border: 4px solid ${({ theme }) => theme.color.themeTxt};
    &.profile-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .profile-img {
      width: 50%;
      max-width: 180px;
    }
    &:last-child {
      line-height: ${({ theme }) => theme.font.large};
      grid-column: 2 / span 2;
      grid-row: 1 / span 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 80px;
      position: relative;
    }
    .sub-box {
      // margin-bottom: 24px;
    }
  }
  .bullet-list {
    list-style: square;
    margin-left: 24px;
  }

  @media (max-width: 1440px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 24px;
    .area-box {
      grid-column: 1 / 2 !important;
      grid-row: auto !important;
    }
    .title-txt {
      margin-bottom: 16px;
      &--slogan {
        font-size: 2rem;
      }
    }
  }

  @media (max-width: 768px) {
    gap: 16px;
    .area-box {
      &:last-child {
        margin-top: 30px;
      }
    }
    .title-txt {
      font-size: ${({ theme }) => theme.font.medium};
      font-weight: ${({ theme }) => theme.fontW.medium};
      margin-bottom: 16px;
      &--slogan {
        line-height: ${({ theme }) => theme.font.large};
        font-size: ${({ theme }) => theme.font.large};
        font-weight: ${({ theme }) => theme.fontW.medium};
        position: absolute;
        left: 0;
        top: -35px;
      }
    }
  }
`;
