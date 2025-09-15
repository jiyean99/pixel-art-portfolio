import React, { useState, useEffect } from "react";
import { IntroSection } from "../../styles/Home.style";
import groundBgImg from "../../assets/images/bg/ground-bg.png";
import mountainBgImg from "../../assets/images/bg/mountain-bg.png";
import shadowBgImg from "../../assets/images/bg/shadow-bg.png";
import characterImg from "../../assets/images/character/cycle-character.gif";
import skyBgImg from "../../assets/images/bg/cloud-bg.png";

const Career: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [animSpeed, setAnimSpeed] = useState(400); // 기본 애니메이션 지속시간
  const speedBase = 400;
  const speedMin = 50;

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      // 스크롤이 연속될 때마다 속도 즉시 조절 (스크롤 값에 따라 시간 감소)
      const newSpeed = Math.max(speedMin, speedBase - currentScroll);
      setAnimSpeed(newSpeed);

      // 스크롤 멈춤 감지: 150ms 후에 애니메이션 속도 원복
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setAnimSpeed(speedBase);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // section 가로 이동 범위 조정용 함수 (예: 스크롤 최대값에 비례)
  const maxTranslateX = window.innerWidth;
  const translateX = Math.min(scrollY, maxTranslateX);

  return (
    <div style={{ height: "300vw" }}>
      <IntroSection
        className="career-container"
        style={{ "--anim-duration": `${animSpeed}s` } as React.CSSProperties}
      >
        {/* Sky: 고정 + 페럴럭스 이동 */}
        <img src={skyBgImg} alt="sky" className="sky-bg" />
        <img src={skyBgImg} alt="sky" className="sky-bg--repeat" />
        {/* Ground */}
        <img src={groundBgImg} alt="ground" className="ground-bg" />
        <img src={groundBgImg} alt="ground" className="ground-bg--repeat" />
        {/* Mountain */}
        <img src={mountainBgImg} alt="mountain" className="mountain-bg" />
        <img
          src={mountainBgImg}
          alt="mountain"
          className="mountain-bg--repeat"
        />
        {/* Shadow */}
        <img src={shadowBgImg} alt="shadow" className="shadow-bg" />
        <img src={shadowBgImg} alt="shadow" className="shadow-bg--repeat" />
        {/* Character */}
        <img
          src={characterImg}
          alt="character"
          className="character"
          style={{
            bottom: "37%",
          }}
        />
      </IntroSection>
      <section
        style={{
          position: "fixed",
          top: "0",
          transform: `translateX(-${translateX}px)`,
          transition: "transform 0.1s linear",
          whiteSpace: "nowrap", // 가로로 쭉 펼치기(텍스트 등 붙는 경우)
          overflow: "hidden",
        }}
      >
        <div style={{ display: "inline-block", width: 800, marginRight: 20 }}>
          <h2 className="intro-title jersey-font">Career</h2>
          <p className="intro-subtitle">
            2023.03 ~ 2025.08 : &#40;주&#41;잼퍼블릭
          </p>
          <button>프로젝트 A</button>
        </div>
        <div style={{ display: "inline-block", width: 800, marginRight: 20 }}>
          <h2 className="intro-title jersey-font">Career</h2>
          <p className="intro-subtitle">
            2023.03 ~ 2025.08 : &#40;주&#41;잼퍼블릭
          </p>
          <button>프로젝트 B</button>
        </div>
        <div style={{ display: "inline-block", width: 800, marginRight: 20 }}>
          <h2 className="intro-title jersey-font">Career</h2>
          <p className="intro-subtitle">
            2023.03 ~ 2025.08 : &#40;주&#41;잼퍼블릭
          </p>
          <button>프로젝트 C</button>
        </div>
      </section>
    </div>
  );
};

export default Career;
