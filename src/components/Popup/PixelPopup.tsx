import React, { type PropsWithChildren, type CSSProperties } from "react";
import { PixelPopupWrap } from "./index.style";

type PixelPopupProps = PropsWithChildren<{
  visible: boolean;
  onClose?: () => void;
  title?: string;
  style?: CSSProperties;
  className?: string;
}>;

// 닫기(X) 버튼 SVG
function PixelClose({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        top: 14,
        right: 14,
        zIndex: 4,
        width: 32,
        height: 32,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      aria-label="팝업 닫기"
    >
      <svg width={32} height={32} viewBox="0 0 32 32">
        <rect x={0} y={0} width={32} height={32} fill="none" />
        <rect
          x={8}
          y={15}
          width={16}
          height={2}
          fill="#222"
          transform="rotate(45 16 16)"
        />
        <rect
          x={8}
          y={15}
          width={16}
          height={2}
          fill="#222"
          transform="rotate(-45 16 16)"
        />
      </svg>
    </button>
  );
}

const PixelPopup: React.FC<PixelPopupProps> = ({
  visible,
  onClose,
  title,
  children,
  style,
  className,
}) => {
  if (!visible) return null;
  return (
    <PixelPopupWrap>
      <div className={`popup-content ${className ?? ""}`} style={style}>
        <PixelClose onClick={onClose} />
        <div className="popup-inner">
          {!!title && <h2 className="popup-title jersey-font">{title}</h2>}
          {children}
        </div>
      </div>
    </PixelPopupWrap>
  );
};

export default PixelPopup;
