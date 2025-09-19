export type IsoBlock = {
  x: number; // 이소메트릭 좌표 x
  y: number; // 이소메트릭 좌표 y
  z: number; // 높이 (블록 높이)
  color: string; // 블록 색상
  state?: "active" | "inactive"; // 상태값 (옵션)
  shadow?: boolean; // 그림자 적용 여부 (확장 기능)
  animation?: boolean; // 애니메이션 적용 여부 (확장 기능)
};
