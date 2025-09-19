import styled from "styled-components";

export const IsometricScrollWrap = styled.div`
  --scroll: 0;
  display: flex;
  flex-wrap: wrap; /* 여러 행으로 감쌈 */
  gap: 1.5vw; /* grid-gap 대신 사용 */
  position: fixed;
  top: 30%;
  left: 40%;
  transform-origin: center top;
  transform: rotateX(50deg) rotateZ(37deg) translateY(calc(-1 * var(--scroll)));
  transform-style: preserve-3d;
  width: max-content;
  max-width: 80vw;

  .grid-bg {
    position: fixed;
    top: -100vh;
    left: -50vw;
    width: 150vw;
    height: auto;
    background: ${({ theme }) => theme.color.mainBg};
    transform: translate(0, 0);
    z-index: -10;
    pointer-events: none;
  }

  .header-txt {
    color: ${({ theme }) => theme.color.themeTxt};
    font-size: 1.5vw;
    font-weight: bold;
    text-align: center;
  }

  .texture-animation-canvas {
    top: 80vh !important;
    left: 30% !important;
    transform: rotateX(360deg) rotateZ(325deg) scale(2);
  }
`;
