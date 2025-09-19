import React, { useState, useEffect, useRef } from "react";
import groundBgImg from "../../assets/images/bg/ground-bg.png";
import mountainBgImg from "../../assets/images/bg/mountain-bg.png";
import shadowBgImg from "../../assets/images/bg/shadow-bg.png";
import skyBgImg from "../../assets/images/bg/cloud-bg.png";
import { IntroSection } from "../../styles/Home.style";
import CycleCharacterScroll from "../CycleCharacterScroll";
import { HorizontalScrollWrap, ProjectSection } from "./index.style";
import SpeechBubble from "../Bubble/SpeechBubble";
import flowerIconImg from "../../assets/images/icon/flower-icon.png";
import PixelPopup from "../Popup/PixelPopup";

type ProjectItem = {
  id: number;
  title: string;
  overview: string;
  techStack: string;
  achievements: string;
};

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Adventurer",
    overview: "스포츠 베팅 웹앱 게임 서비스입니다.",
    techStack:
      "React, TypeScript, MobX, Styled-components, emotion, Ant Design",
    achievements:
      "스켈레톤 개선과 이미지 컴포넌트 설계 등 렌더링 성능 및 사용자 경험 개선, 팝업 모듈화를 통해 유지보수 및 확장성 개선 등",
  },
  {
    id: 2,
    title: "CHAMP POCKER WEB VIEW",
    overview:
      "챔프포커 게임의 공지사항, 이벤트 등 웹뷰 페이지를 제작하였습니다.",
    techStack: "HTML, Javscript, CSS, Styled-components",
    achievements:
      "스켈레톤 개선과 이미지 컴포넌트 설계 등 렌더링 성능 및 사용자 경험 개선, 팝업 모듈화를 통해 유지보수 및 확장성 개선 등",
  },
  {
    id: 3,
    title: "DASH BOARD",
    overview:
      "사내 매출 대시보드 페이지로, 실시간 매출 및 지표를 확인할 수 있습니다. 각종 차트와 그래프를 통해 데이터를 시각화하여 제공합니다.",
    techStack: "Vue.js, Typescript, Styled-components",
    achievements:
      "스켈레톤 개선과 이미지 컴포넌트 설계 등 렌더링 성능 및 사용자 경험 개선, 팝업 모듈화를 통해 유지보수 및 확장성 개선 등",
  },
];

type BgImage = {
  src: string;
  alt: string;
  className: string;
  repeat?: boolean;
  style?: React.CSSProperties;
};

const Backgrounds: React.FC<{ commonStyle: React.CSSProperties }> = ({
  commonStyle,
}) => {
  const bgImages: BgImage[] = [
    { src: skyBgImg, alt: "sky", className: "sky-bg" },
    { src: skyBgImg, alt: "sky", className: "sky-bg--repeat" },
    { src: groundBgImg, alt: "ground", className: "ground-bg" },
    { src: groundBgImg, alt: "ground", className: "ground-bg--repeat" },
    { src: mountainBgImg, alt: "mountain", className: "mountain-bg" },
    { src: mountainBgImg, alt: "mountain", className: "mountain-bg--repeat" },
    { src: shadowBgImg, alt: "shadow", className: "shadow-bg" },
    { src: shadowBgImg, alt: "shadow", className: "shadow-bg--repeat" },
  ];

  return (
    <>
      {bgImages.map(({ src, alt, className }, idx) => (
        <img
          key={idx}
          src={src}
          alt={alt}
          className={className}
          style={commonStyle}
        />
      ))}
    </>
  );
};

const HorizontalScroll: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [animSpeed, setAnimSpeed] = useState(400);
  const [animDirection, setAnimDirection] = useState<"normal" | "reverse">(
    "normal"
  );
  const speedBase = 400;
  const speedMin = 50;
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const [openPopupId, setOpenPopupId] = useState<number | null>(null);

  const resetOnMount = useRef(true);

  useEffect(() => {
    if (resetOnMount.current) {
      window.scrollTo(0, 0);
      resetOnMount.current = false;
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScrollY.current) {
        alert("역방향 스크롤은 허용되지 않습니다.");
        if (!resetOnMount.current) {
          window.scrollTo(0, lastScrollY.current);
        }
        return;
      }

      if (currentScroll > lastScrollY.current) {
        setAnimDirection("normal");
      } else if (currentScroll < lastScrollY.current) {
        setAnimDirection("reverse");
      }

      setScrollY(currentScroll);

      const scrollSpeedRaw = Math.abs(currentScroll - lastScrollY.current);
      lastScrollY.current = currentScroll;

      const newSpeed = Math.max(speedMin, speedBase - scrollSpeedRaw * 10);
      setAnimSpeed(newSpeed);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setAnimSpeed(speedBase);
      }, 900);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [speedBase, speedMin]);

  useEffect(() => {
    const maxDelta = 5; // 최대 스크롤 이동량 제한(px)

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // 기본 스크롤 막기

      let delta = e.deltaY;

      // delta 제한
      if (delta > maxDelta) delta = maxDelta;
      if (delta < -maxDelta) delta = -maxDelta;

      const newScroll = Math.max(0, window.scrollY + delta); // 음수 스크롤 방지

      window.scrollTo(0, newScroll);
      setScrollY(newScroll);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const animPlayState =
    Math.floor(animSpeed) !== speedBase ? "running" : "paused";

  const commonStyle: React.CSSProperties = {
    animationPlayState: animPlayState,
    animationDirection: animDirection,
    ["--anim-duration" as any]: `${animSpeed}s`,
  };

  const openPopup = (id: number) => {
    setOpenPopupId(id);
  };

  const closePopup = () => {
    setOpenPopupId(null);
  };

  return (
    <>
      <HorizontalScrollWrap>
        <IntroSection className="career-container">
          <Backgrounds commonStyle={commonStyle} />
          <CycleCharacterScroll scrollY={scrollY} />
        </IntroSection>

        <ProjectSection
          style={{
            animationPlayState: animPlayState,
            animationDirection: animDirection,
          }}
        >
          <div className="scroll-content">
            {projects.map(({ id }) => (
              <div key={id} className="career-item">
                <img
                  className="flower-icon"
                  src={flowerIconImg}
                  alt="flower-icon"
                  loading="lazy"
                />
                <SpeechBubble
                  className="click-bubble-btn"
                  children={
                    <button onClick={() => openPopup(id)}>click me!</button>
                  }
                />
              </div>
            ))}
          </div>
        </ProjectSection>
      </HorizontalScrollWrap>
      {projects.map(({ id, title, overview, techStack, achievements }) => (
        <PixelPopup
          key={id}
          visible={openPopupId === id}
          title={title}
          onClose={closePopup}
        >
          <div style={{ marginBottom: 32 }}>
            <b className="jersey-font">Overview</b>
            <div>{overview}</div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <b className="jersey-font">Tech Stack</b>
            <div>{techStack}</div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <b className="jersey-font">Achievements</b>
            <div>{achievements}</div>
          </div>
        </PixelPopup>
      ))}
    </>
  );
};

export default HorizontalScroll;
