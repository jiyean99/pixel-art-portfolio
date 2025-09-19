import React, { useEffect, useRef, useState } from "react";
import { IsometricScrollWrap } from "./index.style";
import TextureAnimationCanvas from "../TextureAnimationCanvas";

const drawDotPattern = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gap: number
) => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(100, 100, 100, 0.3)";

  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 1 * Math.PI); // 반지름 1px 점
      ctx.fill();
    }
  }
};
// 디자인 미완으로 보류
const IsometricScroll: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const busCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(new Image());

  const bgImageSrc = ""; // 배경 이미지 경로를 여기에 설정하세요.

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      cardsRef.current.style.setProperty("--scroll", `${scrollY * 0.5}px`);
    }
  }, [scrollY]);

  // 배경 캔버스에 점 패턴
  useEffect(() => {
    if (!backgroundCanvasRef.current) return;
    const ctx = backgroundCanvasRef.current.getContext("2d");
    if (!ctx) return;

    const width = backgroundCanvasRef.current.width;
    const height = backgroundCanvasRef.current.height;

    drawDotPattern(ctx, width, height, 5);
  }, [scrollY]);

  // 이미지 렌더링 캔버스에 그림 그리기
  useEffect(() => {
    if (!busCanvasRef.current) return;
    const ctx = busCanvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = imgRef.current;
    img.src = bgImageSrc;
    img.onload = () => {
      if (!busCanvasRef.current) return;
      ctx.clearRect(
        0,
        0,
        busCanvasRef.current.width,
        busCanvasRef.current.height
      );
      ctx.drawImage(
        img,
        0,
        0,
        busCanvasRef.current.width,
        busCanvasRef.current.height
      );
    };
  }, [bgImageSrc]);

  return (
    <>
      <IsometricScrollWrap ref={cardsRef}>
        <canvas
          className="grid-bg"
          width={window.innerWidth * 0.8}
          height={window.innerHeight * 5}
          ref={backgroundCanvasRef}
        />
        <h2 className="header-txt">꽃을 피울 준비가 된 개발자 이지연입니다.</h2>
        <button
          className="btn"
          onClick={() => {
            alert("Clicked!");
          }}
        >
          Click Me
        </button>

        <TextureAnimationCanvas />
      </IsometricScrollWrap>
    </>
  );
};

export default IsometricScroll;
