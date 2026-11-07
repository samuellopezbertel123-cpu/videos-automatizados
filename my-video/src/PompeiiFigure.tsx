export type PompeiiFigureStyle = "citizen" | "guard" | "archaeologist";
export type PompeiiFigureAction = "walk" | "run" | "point" | "look" | "dig";

const costume: Record<PompeiiFigureStyle, { tunic: string; trim: string; skin: string }> = {
  citizen: { tunic: "#b85135", trim: "#e7b66c", skin: "#d7a47d" },
  guard: { tunic: "#3e566c", trim: "#d4ae63", skin: "#bf886a" },
  archaeologist: { tunic: "#c5a36d", trim: "#ead4a6", skin: "#c99874" },
};

export const PompeiiFigure: React.FC<{
  frame: number;
  x: number;
  y: number;
  scale?: number;
  style?: PompeiiFigureStyle;
  action?: PompeiiFigureAction;
}> = ({ frame, x, y, scale = 1, style = "citizen", action = "walk" }) => {
  const colors = costume[style];
  const stride = Math.sin(frame / (action === "run" ? 2.8 : 5)) * (action === "run" ? 27 : 13);
  const armSwing = Math.sin(frame / (action === "run" ? 2.8 : 5)) * (action === "run" ? 25 : 12);
  const pointAngle = action === "point" ? -48 : action === "dig" ? 52 : armSwing;
  const leftArm = action === "point" ? -pointAngle : action === "dig" ? 26 : -armSwing;
  const lean = action === "run" ? 12 : action === "dig" ? 25 : 0;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="3" rx="43" ry="12" fill="rgba(5,12,19,.35)" />
      <g transform={`rotate(${lean} 0 -99)`}>
        <path d="M-25-128Q-40-110-33-83L-26-42Q0-31 27-43L32-87Q39-111 24-128Z" fill={colors.tunic} stroke="#291f1d" strokeWidth="5" />
        <path d="M-27-119Q0-105 27-119M-24-54Q0-44 25-54" fill="none" stroke={colors.trim} strokeWidth="7" />
        <path d="M-19-122 0-94 18-122" fill="none" stroke="#f4d18c" strokeWidth="4" />
        <g transform={`rotate(${leftArm} -24 -114)`}>
          <path d="M-24-113Q-47-94-48-68L-39-55" fill="none" stroke={colors.skin} strokeWidth="15" strokeLinecap="round" />
          <path d="M-40-63  -45-56M-44-64 -50-57" stroke="#e8bd93" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${pointAngle} 24 -114)`}>
          <path d="M24-113Q46-96 48-72L43-60" fill="none" stroke={colors.skin} strokeWidth="15" strokeLinecap="round" />
          {action === "point" ? (
            <path d="M43-62 77-89M43-62 56-55" fill="none" stroke={colors.skin} strokeWidth="7" strokeLinecap="round" />
          ) : (
            <path d="M43-63 49-57M43-63 38-56" fill="none" stroke={colors.skin} strokeWidth="4" strokeLinecap="round" />
          )}
        </g>
        <g transform="translate(0 -147)">
          <ellipse cx="0" cy="0" rx="28" ry="34" fill={colors.skin} stroke="#382522" strokeWidth="4" />
          <path d="M-29-3Q-28-39 1-39Q25-38 30-10L22-18Q2-27-20-15Z" fill={style === "archaeologist" ? "#43352e" : "#342824"} />
          <ellipse cx="-11" cy="0" rx="4" ry="5" fill="#382522" />
          <ellipse cx="12" cy="0" rx="4" ry="5" fill="#382522" />
          <path d="M1 3 0 11M-8 19Q1 23 10 18" fill="none" stroke="#764a39" strokeWidth="3" strokeLinecap="round" />
          {action === "run" ? (
            <ellipse cx="2" cy="20" rx="7" ry="9" fill="#633d34" />
          ) : null}
          {style === "guard" && (
            <path d="M-31-18Q0-46 31-18L27-7Q0-21-27-6Z" fill="#d2a84f" stroke="#49361e" strokeWidth="3" />
          )}
          {style === "archaeologist" && (
            <path d="M-34-21Q0-48 34-21L30-10Q0-28-30-10Z" fill="#d9c18c" stroke="#65563d" strokeWidth="3" />
          )}
        </g>
      </g>
      <g transform={`rotate(${stride} -12 -42)`}>
        <path d="M-17-44Q-27-24-27 0L-40 3" fill="none" stroke={colors.tunic} strokeWidth="17" strokeLinecap="round" />
        <path d="M-41 4  -52 6" fill="none" stroke="#44302a" strokeWidth="10" strokeLinecap="round" />
      </g>
      <g transform={`rotate(${-stride} 12 -42)`}>
        <path d="M17-44Q27-24 27 0L40 3" fill="none" stroke={colors.tunic} strokeWidth="17" strokeLinecap="round" />
        <path d="M39 4 50 6" fill="none" stroke="#44302a" strokeWidth="10" strokeLinecap="round" />
      </g>
    </g>
  );
};
