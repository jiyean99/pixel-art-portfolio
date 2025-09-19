// import React, { useState } from "react";
import type { IsoBlock } from "../../types/isometric";
// import ScrollController from "../../components/ScrollController";
// import CanvasRenderer from "../../components/CanvasRenderer";
// import imgUrl from "../../assets/images/character/stand-character.png";
import IsometricScroll from "../../components/IsometricScroll";
import { styled } from "styled-components";

const ProjectWrapper = styled.div`
  min-height: 3000px; /* 충분한 스크롤 공간 확보 */
  width: 30%;
  position: relative;
`;

const Project: React.FC = () => {
  // const [scrollY, setScrollY] = useState(0);

  const blocks: IsoBlock[] = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      blocks.push({
        x,
        y,
        z: (x + y) % 3,
        color: "#6c9bd1",
        shadow: true,
      });
    }
  }

  return (
    <ProjectWrapper>
      <IsometricScroll />
    </ProjectWrapper>
  );
};

export default Project;
