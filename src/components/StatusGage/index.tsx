import { StatusGageWrap } from "./index.style";

const STATUS_DESCRIPTIONS = {
  SPD: "작업속도 (Speed): 빠르고 정확한 개발 속도",
  CHA: "친화력 (Charisma): 원활한 팀워크와 소통",
  POS: "긍정적태도 (Positivity): 창의·긍정적 문제 해결 태도",
  CRE: "창의력 (Creativity): 새롭고 감각적인 아이디어",
  PRS: "책임감 (Persistence): 결과물의 품질과 완수 책임",
  LEA: "학습력 (Learning): 빠른 인지와 적용 능력",
};

type StatusKey = keyof typeof STATUS_DESCRIPTIONS;

const statusList: { label: StatusKey; value: number }[] = [
  { label: "SPD", value: 90 },
  { label: "CHA", value: 99 },
  { label: "POS", value: 92 },
  { label: "CRE", value: 76 },
  { label: "PRS", value: 99 },
  { label: "LEA", value: 90 },
];

const maxTotal = 600; // 6개 항목 합의 최대값

const total = statusList.reduce((sum, x) => sum + x.value, 0);
const percent = Math.min((total / maxTotal) * 100, 100);

type StatusBoxProps = {
  label: StatusKey;
  value: number;
};

const StatusBox: React.FC<StatusBoxProps> = ({ label, value }) => (
  <div className="status-box tooltip" data-toolti="I'm up above it!">
    <span className="status-label">{label}</span>
    <span className="status-value">{value}</span>
    <span className="tooltip-text">{STATUS_DESCRIPTIONS[label]}</span>
  </div>
);

export default function StatusGauge() {
  return (
    <StatusGageWrap className="status-gauge-container">
      <div className="hp-title jersey-font">
        <p>HP</p>
        <span className="hp-count">
          {total}/{maxTotal}
        </span>
      </div>
      <div className="hp-bar">
        {Array.from({ length: 30 }).map((_, i) => {
          const step = 100 / 30;
          return (
            <div
              key={i}
              className={`hp-bar-segment ${
                percent >= (i + 1) * step ? "active" : ""
              }`}
            />
          );
        })}
      </div>
      <p className="status-title jersey-font">status</p>
      <div className="status-row jersey-font">
        {statusList.map((s, i) => (
          <StatusBox label={s.label} value={s.value} key={i} />
        ))}
      </div>
    </StatusGageWrap>
  );
}
