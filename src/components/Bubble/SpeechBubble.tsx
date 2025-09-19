import React from "react";
import { SpeechBubbleWrap } from "./index.style";

type SpeechBubbleProps = {
  children: React.ReactNode;
  className?: string;
};

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  children,
  className = "",
}) => (
  <SpeechBubbleWrap className={`${className}`}>
    <span className="speech-content">{children}</span>
  </SpeechBubbleWrap>
);

export default SpeechBubble;
