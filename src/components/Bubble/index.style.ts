import { styled } from "styled-components";

export const SpeechBubbleWrap = styled.div`
  position: relative;
  display: inline-block;
  background: ${({ theme }) => theme.color.mainBg};
  border: 4px solid ${({ theme }) => theme.color.mainColor};
  font-size: 1rem;
  color: 4px solid ${({ theme }) => theme.color.mainColor};
  padding: 16px 24px;
  margin: 16px;
  box-shadow: 4px 4px 0 #888;
  border-radius: 0;

  &::after,
  &::before {
    content: "";
    position: absolute;
    left: 35px; /* 꼬리 위치 조절 */
    bottom: -22px; /* 꼬리 위치 조절 */
    width: 0;
    height: 0;
    border-style: solid;
  }

  &::before {
    border-width: 0 0 20px 18px;
    border-color: transparent transparent transparent
      ${({ theme }) => theme.color.mainColor};
    z-index: 1;
    bottom: -19px;
    left: 43px;
  }

  /* 꼬리 바탕색 (안쪽) */
  &::after {
    border-width: 0 0 20px 16px;
    border-color: transparent transparent transparent
      ${({ theme }) => theme.color.mainBg};
    left: 37px;
    bottom: -18px;
    z-index: 2;
  }
  .speech-content {
    font-size: ${({ theme }) => theme.font.small};
    white-space: pre-wrap;
  }
`;
