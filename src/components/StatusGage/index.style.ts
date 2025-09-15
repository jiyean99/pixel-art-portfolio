import { styled } from "styled-components";

export const StatusGageWrap = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;

  .hp-title,
  .status-title {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.font.small};
    font-weight: ${({ theme }) => theme.fontW.medium};
  }

  .hp-bar {
    display: flex;
    gap: 4px;
    margin-bottom: 28px;
    background: transparent;
    padding: 2px;
    border: 1.5px solid #00ff66;
  }

  .hp-bar-segment {
    width: 12px;
    height: 12px;
    background: #00ff663f;
    transition: background 0.15s;
  }

  .hp-bar-segment.active {
    background: #00ff66;
  }

  .status-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px 4%;
  }

  .status-box {
    z-index: 1;
    display: flex;
    align-items: center;
    position: relative;
    background: #00ff66;
    clip-path: polygon(0 100%, 0 12px, 16px 0, 100% 0, 100% 100%);
    height: 36px;
    border: 2px solid #00ff66;
    padding: 2px;
  }

  .status-box::before {
    content: "";
    display: flex;
    align-items: center;
    background: transparent;
    background: #fff;
    clip-path: polygon(0 100%, 0 12px, 16px 0, 100% 0, 100% 100%);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 2px);
    height: calc(100% + 3px);
    z-index: -1;
  }

  .status-label {
    flex: 1 1 auto;
    text-align: center;
    height: 100%;
    align-items: center;
    line-height: 36px;
    background: #ddd;
    margin-right: 3px;
    clip-path: polygon(0 100%, 0 12px, 16px 0, 100% 0, 100% 100%);
    color: #111;
  }

  .status-value {
    height: 100%;
    background: #16ff69;
    color: #111;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-label {
    font-size: ${({ theme }) => theme.font.small};
    font-weight: ${({ theme }) => theme.fontW.regular};
  }

  .status-value {
    font-size: ${({ theme }) => theme.font.small};
    font-weight: ${({ theme }) => theme.fontW.regular};
    background: #00ff88;
    padding: 0 4px;
    text-align: center;
  }

  /* 툴팁 스타일 */
  .tooltip {
    position: relative;
  }

  .tooltip-text {
    visibility: hidden;
    opacity: 0;
    white-space: nowrap;
    min-width: 160px;
    background: #222;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 14px;
    position: absolute;
    z-index: 20;
    left: 50%;
    top: -46px; /* 툴팁이 위에 뜨도록 조정 */
    transform: translateX(-50%);
    font-size: 15px;
    font-weight: 400;
    transition: opacity 0.18s;
    pointer-events: none;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
  }

  /* 툴팁 꼬리(아래 삼각형) */
  .tooltip-text::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: translateX(-50%);
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: #222 transparent transparent transparent;
  }

  .tooltip:hover .tooltip-text,
  .tooltip:focus .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;
