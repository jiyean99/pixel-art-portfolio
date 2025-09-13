import { useEffect, useRef, useState } from "react";
import groundBgImg from "../../assets/images/bg/ground-bg.png";
import mountainBgImg from "../../assets/images/bg/mountain-bg.png";
import shadowBgImg from "../../assets/images/bg/shadow-bg.png";
import characterImg from "../../assets/images/character/cycle-character.gif";
import skyBgImg from "../../assets/images/bg/cloud-bg.png";
import { IntroSection, MyInfoSection } from "../../styles/Home.style";

export default function Home() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // 실제 스크롤 위치 (raw)
  const scrollYRef = useRef(window.scrollY);
  // 부드럽게 이징된 스크롤 위치 (애니메이션에서 사용)
  const easedScrollY = useRef(0);
  // 화면에 반영할 위치 상태
  const [, setRenderedY] = useState(0);

  // 이징 속도 제어
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
      // 현재 목표 스크롤 위치와 easedScrollY의 차이
      const diff = scrollYRef.current - easedScrollY.current;
      // easing 적용 (선형 보간법 대신 easing 함수 적용)
      easedScrollY.current += diff * easingSpeed;

      // easedScrollY가 거의 목표값에 도달하면 보정
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

  // 사용하기 편하게 easedScrollY 상태 값을 별도로 추출해도 됨
  // 다중 속도 조합 (scroll 비율별 이동 거리 차별화 + easing)
  const scrollY = easedScrollY.current;

  // 하한선 설정 (예: shadow 최대 이동 -150px)
  const shadowTranslateY = Math.max(-scrollY * 0.6, -100);

  // 반응형 예: 윈도우 높이가 작으면 캐릭터 크기/위치를 다르게 조정 대비
  const characterBottom = windowHeight < 600 ? "41%" : "41%";

  const handleScrollDown = () => {
    window.scrollBy({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <>
      <IntroSection>
        {/* Sky: 고정 + 페럴럭스 이동 */}
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
        {/* Ground */}
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
        {/* Mountain */}
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
        {/* Title */}
        <h1
          className="title-txt jersey-font"
          style={{ transform: `translate(-50%, ${scrollY * 1.5}px)` }}
        >
          Jiyean Portfolio!
        </h1>
        {/* Shadow */}
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
        {/* Character */}
        <img
          src={characterImg}
          alt="character"
          className="character"
          style={{
            transform: `translateY(${scrollY * 0.45}px)`,
            bottom: characterBottom,
          }}
        />
        {/* Scroll Down Button */}
        <button
          className="scroll-btn"
          onClick={handleScrollDown}
          aria-label="Scroll down"
        >
          Scroll Down
        </button>
      </IntroSection>
      <MyInfoSection>
        <div className="profile-area">
          {/* (이미지 등 캐릭터 렌더링 영역) */}
        </div>
        <div className="info-area">
          <h1>I&apos;m a developer ready to bloom.</h1>
          <div className="keywords">
            <h2>My Keyword</h2>
            <ul>
              <li>책임감을 원동력</li>
              <li>빠른 습득력</li>
              <li>자기주도 학습을 좋아합니다</li>
            </ul>
          </div>
          <div className="certificates">
            <h2>Certificate</h2>
            <ul>
              <li>2021.12 : 리더자격 기능사</li>
              <li>2022.10 : GTQ 1급</li>
              <li>2021.12 : 운전면허 2종 보통</li>
            </ul>
          </div>
          <div className="career">
            <h2>Career</h2>
            <ul>
              <li>2023.03 ~ 2025.08 : (주)컴퍼니백</li>
              <li>실시간 프로젝트 개발</li>
              <li>협업 시스템 프론트 개발</li>
              <li>React Native 프로젝트 프론트엔드 개발 참여</li>
            </ul>
          </div>
        </div>
        <div className="status-area">{/* (HP, STATUS 등 그래픽 영역) */}</div>
      </MyInfoSection>
    </>
  );
}
