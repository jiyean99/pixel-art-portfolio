import { styled } from "styled-components";

export const PixelPopupWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.24);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-content {
    position: absolute;
    left: 50%;
    top: 38%;
    transform: translate(-50%, -50%);
    min-width: 540px;
    min-height: 320px;
    background: #fff;
    border: 4px solid #222;
    box-sizing: border-box;
    box-shadow: 8px 8px 0 0 #aaa;
    padding: 40px 42px 40px 42px;
  }

  .popup-title {
    margin: 0 0 28px 0;
    font-weight: 700;
    font-size: 2.1rem;
    letter-spacing: 1px;
    color: #222;
    line-height: 1.3;
  }

  .popup-inner {
    position: relative;
    z-index: 10;
  }

  .popup-close-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 4;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;
