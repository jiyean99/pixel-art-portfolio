import React, { useEffect, useRef, useState } from "react";
import skyBgImg from "../../assets/images/bg/cloud-bg.png";
import groundBgImg from "../../assets/images/bg/ground-bg.png";
import mountainBgImg from "../../assets/images/bg/mountain-bg.png";
import shadowBgImg from "../../assets/images/bg/shadow-bg.png";
import characterImg from "../../assets/images/character/cycle-character.gif";
import { IntroSection, MyInfoSection } from "../../styles/Home.style";
import StatusGauge from "../StatusGage";
import profileImg from "../../assets/images/character/stand-character.png";

const ParallaxScroll: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const scrollYRef = useRef(window.scrollY);
  const easedScrollY = useRef(0);
  const [, setRenderedY] = useState(0);
  const easingSpeed = 0.1;

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    let rafId: number;
    const animate = () => {
      const diff = scrollYRef.current - easedScrollY.current;
      easedScrollY.current += diff * easingSpeed;
      if (Math.abs(diff) < 0.1) easedScrollY.current = scrollYRef.current;
      setRenderedY(easedScrollY.current);
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollY = easedScrollY.current;

  // 스크롤 다운 버튼 핸들러
  const handleScrollDown = () => {
    const targetPosition = window.scrollY + windowHeight;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 2000;
    let startTime: number | null = null;

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const shadowTranslateY = Math.max(-scrollY * 0.6, -100);
  const characterBottom = windowHeight < 600 ? "37%" : "37%";

  return (
    <>
      <IntroSection>
        <img
          src={skyBgImg}
          alt="sky"
          className="sky-bg"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        />
        <img
          src={skyBgImg}
          alt="sky"
          className="sky-bg--repeat"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        />
        <img
          src={groundBgImg}
          alt="ground"
          className="ground-bg"
          style={{ transform: `translateY(${scrollY * 0.45}px)` }}
        />
        <img
          src={groundBgImg}
          alt="ground"
          className="ground-bg--repeat"
          style={{ transform: `translateY(${scrollY * 0.45}px)` }}
        />
        <img
          src={mountainBgImg}
          alt="mountain"
          className="mountain-bg"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <img
          src={mountainBgImg}
          alt="mountain"
          className="mountain-bg--repeat"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <img
          src={shadowBgImg}
          alt="shadow"
          className="shadow-bg"
          style={{ transform: `translateY(${shadowTranslateY}px)` }}
        />
        <img
          src={shadowBgImg}
          alt="shadow"
          className="shadow-bg--repeat"
          style={{ transform: `translateY(${shadowTranslateY}px)` }}
        />
        <img
          src={characterImg}
          alt="character"
          className="character"
          style={{
            transform: `translateY(${scrollY * 0.45}px)`,
            bottom: characterBottom,
          }}
        />
        <button
          className="scroll-btn"
          onClick={handleScrollDown}
          aria-label="Scroll down"
        >
          Scroll Down
        </button>
      </IntroSection>
      <MyInfoSection>
        <div className="area-box profile-box">
          <img src={profileImg} alt="프로필 캐릭터" className="profile-img" />
        </div>
        <div className="area-box" style={{ overflow: "hidden" }}>
          <StatusGauge />
        </div>
        <div className="area-box">
          <h3 className="title-txt--slogan jersey-font">
            I&apos;m a developer ready to bloom. - Jiyean Lee
          </h3>
          <div className="sub-box">
            <h4 className="title-txt jersey-font">My Keyword</h4>
            <p>
              &#39;좋았다면 추억이고 나빴다면 경험이다.&#39;
              <br />
              문제라는 부정적 자세가 아닌 해결해야 할 상황으로 받아들이는 긍정의
              에너지를 갖췄습니다.
            </p>
            <ul className="bullet-list">
              <li>책임감 있는 태도</li>
              <li>빠른 수긍과 존중</li>
              <li>자전거 타기를 좋아합니다!</li>
            </ul>
          </div>
          <div className="sub-box">
            <h4 className="title-txt jersey-font">Certificate</h4>
            <ul>
              <li>2021.12 &#58; 웹디자인 기능사</li>
              <li>2022.10 &#58; GTQ 1급</li>
              <li>2022.09 &#58; GTQ-i 1급</li>
              <li>2020.12 &#58; 운전면허 2종 보통</li>
            </ul>
          </div>
          <div className="sub-box">
            <h4 className="title-txt jersey-font">Career</h4>
            <p>2023.03 ~ 2025.08 &#58; &#40;주&#41;잼퍼블릭</p>
            <ul className="bullet-list">
              <li>승부사 온라인 프론트 개발</li>
              <li>챔프포커 웹뷰 퍼블리싱</li>
              <li>사내 대시보드 프론트 개발</li>
              <li>React Native 프로젝트 프로토타입 개발 참여</li>
            </ul>
          </div>
        </div>
      </MyInfoSection>
    </>
  );
};

export default ParallaxScroll;
