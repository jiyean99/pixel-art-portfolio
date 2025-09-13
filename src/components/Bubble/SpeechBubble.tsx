import React from "react";

type SpeechBubbleProps = {
  children: React.ReactNode;
  className?: string;
};

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  children,
  className = "",
}) => (
  <div className={`nes-speech-bubble ${className}`}>
    <span className="nes-speech-content">{children}</span>
  </div>
);

export default SpeechBubble;
