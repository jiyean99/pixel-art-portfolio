import React, { type PropsWithChildren, type CSSProperties } from "react";

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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(10,10,10,0.24)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          minWidth: 540,
          maxWidth: 680,
          minHeight: 320,
          background: "#fff",
          border: "4px solid #222",
          boxSizing: "border-box",
          boxShadow: "8px 8px 0 0 #aaa",
          padding: "40px 42px 40px 42px",
          ...style,
        }}
        className={className}
      >
        {/* 네 꼭짓점에 픽셀 계단 코너 */}
        <PixelClose onClick={onClose} />
        <div
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          {!!title && (
            <h2
              style={{
                margin: "0 0 28px 0",
                fontWeight: 700,
                fontSize: "2.1rem",
                letterSpacing: "1px",
                color: "#222",
                lineHeight: 1.3,
              }}
            >
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PixelPopup;
