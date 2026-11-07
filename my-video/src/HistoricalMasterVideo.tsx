import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { CSSProperties } from "react";
import type { DocumentaryVisual } from "./documentary-data";
import { SceneIllustration } from "./SceneIllustration";

export type HistoricalVisual =
  | "hook"
  | "map"
  | "pharaoh"
  | "aten"
  | "legacy"
  | "outro"
  | DocumentaryVisual;

export type HistoricalScene = {
  id: string;
  from: number;
  duration: number;
  visual: HistoricalVisual;
  chapter: string;
  title: string;
  caption: string;
  date?: string;
};

export type HistoricalEpisode = {
  title: string;
  durationInFrames: number;
  scenes: HistoricalScene[];
  sources: Array<{ label: string; url: string }>;
};

const palette = {
  black: "#050606",
  white: "#f5f2e9",
  dim: "#aaa99f",
  gold: "#d8b46b",
  goldDim: "rgba(216,180,107,.42)",
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const serif = "'Iowan Old Style', 'Palatino Linotype', Georgia, serif";
const sans = "Arial, Helvetica, sans-serif";

const svgGlow = {
  filter: "drop-shadow(0 0 12px rgba(245,242,233,.46))",
};

const ArchiveFrame: React.FC<{
  chapter: string;
  date?: string;
  children: React.ReactNode;
}> = ({ chapter, date, children }) => (
  <AbsoluteFill style={{ color: palette.white, fontFamily: sans }}>
    <div
      style={{
        position: "absolute",
        top: 170,
        left: 66,
        color: palette.gold,
        fontSize: 21,
        fontWeight: 700,
        letterSpacing: 6,
      }}
    >
      {chapter}
    </div>
    {date ? (
      <div
        style={{
          position: "absolute",
          top: 198,
          left: 66,
          color: palette.dim,
          fontSize: 20,
          letterSpacing: 3,
        }}
      >
        {date}
      </div>
    ) : null}
    {children}
  </AbsoluteFill>
);

const AncientTempleBackdrop: React.FC<{ frame: number }> = ({ frame }) => {
  const drift = Math.sin(frame / 31) * 10;
  return (
    <svg
      width="1080"
      height="820"
      viewBox="0 0 1080 820"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "visible", opacity: 0.62 }}
    >
      <g transform={`translate(${drift} 0)`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M66 685H1014M130 660V330L216 275 302 330V660M337 660V360L407 316 477 360V660M606 660V360L676 316 746 360V660M781 660V330L867 275 953 330V660" fill="rgba(245,242,233,.025)" stroke={palette.white} strokeOpacity=".78" strokeWidth="5" />
        <path d="M105 330H327L302 292H130ZM315 360H498L478 326H337ZM585 360H767L746 326H606ZM754 330H978L953 292H781Z" stroke={palette.gold} strokeWidth="6" />
        <path d="M173 347V633M216 347V633M259 347V633M368 379V633M407 379V633M446 379V633M638 379V633M676 379V633M714 379V633M824 347V633M867 347V633M910 347V633" stroke={palette.gold} strokeOpacity=".72" strokeWidth="4" />
        <path d="M63 697Q532 637 1017 697" stroke={palette.gold} strokeWidth="4" />
        <path d="M185 236V130M867 235V116M185 130 158 166M185 130 212 166M867 116 840 153M867 116 895 153" stroke={palette.white} strokeOpacity=".62" strokeWidth="4" />
      </g>
    </svg>
  );
};

export const HistoricalFigure: React.FC<{ frame: number }> = ({ frame }) => {
  const reveal = interpolate(frame, [0, 38], [1, 0], clamp);
  const float = Math.sin(frame / 22) * 7;

  return (
    <svg
      width="780"
      height="860"
      viewBox="0 0 780 860"
      role="img"
      aria-label="Ilustración esquemática de un faraón egipcio"
      style={{ width: "100%", height: "auto", overflow: "visible", ...svgGlow }}
    >
      <defs>
        <linearGradient id="pharaoh-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f4d994" />
          <stop offset="1" stopColor="#a77c38" />
        </linearGradient>
      </defs>
      <g
        transform={`translate(0 ${float})`}
        fill="none"
        stroke={palette.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
        strokeDasharray="2400"
        strokeDashoffset={2400 * reveal}
      >
        <path d="M266 707 Q275 558 315 491 L458 491 Q514 574 529 707" />
        <path d="M312 498 Q384 548 461 497 L499 746 L273 746 Z" />
        <path d="M324 499 Q380 456 454 499" />
        <path d="M338 461 Q310 425 321 332 Q327 209 405 177 Q491 195 497 325 L481 429 Q455 477 397 480 Q357 474 338 461Z" />
        <path d="M347 244 Q385 171 457 215 L479 282 Q442 253 408 254 Q375 266 346 293Z" />
        <path d="M489 330 L527 351 L489 367" />
        <path d="M444 310 Q463 302 477 311" />
        <path d="M447 326 Q462 333 477 325" />
        <path d="M434 374 Q456 379 478 367" />
        <path d="M376 398 Q398 410 425 398" />
        <path d="M337 505 L337 683 M463 505 L463 683" opacity=".62" />
        <path d="M299 731 L500 731" />
      </g>
      <path
        d="M343 222 Q381 148 463 198 L496 292 Q459 260 414 266 Q373 276 341 313Z"
        fill="none"
        stroke="url(#pharaoh-gold)"
        strokeWidth="12"
        strokeLinecap="round"
        style={{
          filter: "drop-shadow(0 0 14px rgba(216,180,107,.65))",
        }}
      />
      <path
        d="M347 474 Q393 492 452 471"
        fill="none"
        stroke={palette.gold}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="460" cy="317" r="5" fill={palette.gold} />
    </svg>
  );
};

export const AnimatedEgyptMap: React.FC<{ frame: number }> = ({ frame }) => {
  const routeProgress = interpolate(frame, [10, 100], [1, 0], clamp);

  return (
    <svg
      width="820"
      height="850"
      viewBox="0 0 820 850"
      role="img"
      aria-label="Mapa esquemático del valle del Nilo con Tebas y Ajetatón"
      style={{ width: "100%", height: "100%", overflow: "visible", ...svgGlow }}
    >
      <defs>
        <pattern id="map-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M36 0H0V36"
            fill="none"
            stroke="rgba(216,180,107,.12)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect
        x="45"
        y="45"
        width="730"
        height="740"
        rx="10"
        fill="url(#map-grid)"
        stroke={palette.goldDim}
        strokeWidth="2"
      />
      <path
        d="M386 95 L359 172 L392 247 L365 321 L400 397 L377 473 L409 552 L390 625 L424 712"
        fill="none"
        stroke={palette.white}
        strokeOpacity=".78"
        strokeWidth="17"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 14px rgba(245,242,233,.38))" }}
      />
      <path
        d="M386 95 L329 58 M386 95 L375 48 M386 95 L426 57 M386 95 L449 84 M386 95 L337 105"
        fill="none"
        stroke={palette.white}
        strokeOpacity=".62"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M410 351 C390 450 435 529 407 629"
        fill="none"
        stroke={palette.gold}
        strokeWidth="5"
        strokeDasharray="12 15"
        strokeDashoffset={120 * routeProgress}
        style={{ filter: "drop-shadow(0 0 8px rgba(216,180,107,.75))" }}
      />
      <g fill={palette.gold} style={{ filter: "drop-shadow(0 0 11px rgba(216,180,107,.8))" }}>
        <circle cx="407" cy="445" r="12" />
        <circle cx="407" cy="629" r="12" />
      </g>
      <g
        fill={palette.white}
        fontFamily={sans}
        fontSize="22"
        fontWeight="700"
        letterSpacing="3"
      >
        <text x="445" y="440">AJETATÓN</text>
        <text x="445" y="633">TEBAS</text>
        <text x="493" y="114" fill={palette.gold}>DELTA DEL NILO</text>
      </g>
      <text
        x="92"
        y="740"
        fill={palette.dim}
        fontFamily={sans}
        fontSize="17"
        letterSpacing="3"
      >
        ESQUEMA DEL VALLE DEL NILO · NO A ESCALA
      </text>
    </svg>
  );
};

export const AtenSymbol: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = 1 + Math.sin(frame / 10) * 0.025;
  const ray = interpolate(frame, [0, 42], [0, 1], clamp);
  const rays = Array.from({ length: 14 }, (_, index) => {
    const angle = (index / 14) * Math.PI * 2;
    const x1 = 400 + Math.cos(angle) * 128;
    const y1 = 400 + Math.sin(angle) * 128;
    const x2 = 400 + Math.cos(angle) * 255;
    const y2 = 400 + Math.sin(angle) * 255;
    return { x1, y1, x2, y2 };
  });

  return (
    <svg
      width="800"
      height="800"
      viewBox="0 0 800 800"
      role="img"
      aria-label="Disco solar de Atón con rayos terminados en manos"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <g
        stroke={palette.gold}
        strokeWidth="8"
        strokeLinecap="round"
        opacity=".88"
        style={{
          transform: `scale(${pulse})`,
          transformOrigin: "400px 400px",
          filter: "drop-shadow(0 0 13px rgba(216,180,107,.6))",
        }}
      >
        {rays.map(({ x1, y1, x2, y2 }, index) => {
          const endX = x1 + (x2 - x1) * ray;
          const endY = y1 + (y2 - y1) * ray;
          return (
            <g key={index}>
              <line x1={x1} y1={y1} x2={endX} y2={endY} />
              <path
                d={`M${endX} ${endY} l-8 8 m8 -8 l1 12 m-1 -12 l9 8`}
                strokeWidth="5"
              />
            </g>
          );
        })}
      </g>
      <circle
        cx="400"
        cy="400"
        r="112"
        fill="rgba(216,180,107,.12)"
        stroke={palette.gold}
        strokeWidth="9"
        style={{ filter: "drop-shadow(0 0 25px rgba(216,180,107,.72))" }}
      />
      <circle cx="400" cy="400" r="77" fill={palette.gold} opacity=".92" />
      <circle cx="375" cy="370" r="24" fill="#fff3cd" opacity=".66" />
    </svg>
  );
};

export const HistoricalObject: React.FC<{ frame: number }> = ({ frame }) => {
  const reveal = interpolate(frame, [0, 36], [0, 1], clamp);
  const rise = interpolate(frame, [0, 25], [35, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <svg
      width="390"
      height="430"
      viewBox="0 0 390 430"
      role="img"
      aria-label="Cartucho real esquemático en una ficha de archivo"
      style={{
        width: "100%",
        height: "auto",
        transform: `translateY(${rise}px)`,
        overflow: "visible",
        ...svgGlow,
      }}
    >
      <path
        d="M64 54 Q195 32 326 54 L326 340 Q195 389 64 340Z"
        fill="rgba(245,242,233,.035)"
        stroke={palette.gold}
        strokeWidth="5"
        strokeDasharray="1200"
        strokeDashoffset={1200 * (1 - reveal)}
      />
      <path
        d="M119 118 Q195 92 271 118 L259 280 Q195 312 131 280Z"
        fill="none"
        stroke={palette.white}
        strokeWidth="5"
        strokeDasharray="700"
        strokeDashoffset={700 * (1 - reveal)}
      />
      <path
        d="M194 143 L194 248 M160 181 L230 181 M165 218 L224 218"
        fill="none"
        stroke={palette.gold}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="320"
        strokeDashoffset={320 * (1 - reveal)}
      />
      <text
        x="195"
        y="370"
        textAnchor="middle"
        fill={palette.dim}
        fontFamily={sans}
        fontSize="16"
        letterSpacing="3"
      >
        SELLO REAL · RECREACIÓN GRÁFICA
      </text>
    </svg>
  );
};

const IntroHook: React.FC<{ frame: number; scene: HistoricalScene }> = ({
  frame,
  scene,
}) => {
  const zoom = interpolate(frame, [0, 60], [0.82, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <ArchiveFrame chapter={scene.chapter} date={scene.date}>
      <div style={{ position: "absolute", inset: "185px 0 auto", height: 830, overflow: "hidden" }}>
        <AncientTempleBackdrop frame={frame} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 265,
          left: 12,
          width: 590,
          height: 740,
          transform: `translateX(${Math.sin(frame / 22) * 7}px) scale(${zoom * 0.78})`,
          transformOrigin: "center bottom",
        }}
      >
        <HistoricalFigure frame={frame} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 245,
          right: 5,
          width: 520,
          height: 520,
          transform: `translateY(${Math.cos(frame / 18) * 12}px) scale(${0.68 + Math.sin(frame / 36) * 0.035})`,
          transformOrigin: "center",
        }}
      >
        <AtenSymbol frame={frame} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1000,
          left: 70,
          right: 70,
          textAlign: "center",
          fontFamily: serif,
          fontSize: 62,
          fontWeight: 700,
          lineHeight: 1.06,
          textShadow: "0 0 24px rgba(245,242,233,.25)",
        }}
      >
        {scene.title}
      </div>
    </ArchiveFrame>
  );
};

const SceneArtwork: React.FC<{ scene: HistoricalScene; frame: number }> = ({
  scene,
  frame,
}) => {
  const cameraZoom = 1.04 + Math.sin(frame / 78) * 0.045;
  const cameraX = Math.sin(frame / 57) * 25;
  const cameraY = Math.cos(frame / 71) * 13;
  const compositionScale = scene.visual === "legacy" ? 0.88 : 1;
  const artworkStyle: CSSProperties = {
    position: "absolute",
    top: 250,
    left: 0,
    right: 0,
    height: 850,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraZoom * compositionScale})`,
  };

  if (scene.visual === "map") {
    return (
      <div style={{ ...artworkStyle, overflow: "hidden" }}>
        <AnimatedEgyptMap frame={frame} />
        <div
          style={{
            position: "absolute",
            right: 48,
            bottom: 42,
            width: 360,
            height: 245,
            border: `1px solid ${palette.goldDim}`,
            background: "rgba(5,6,6,.86)",
            transform: `translateY(${Math.sin(frame / 21) * 9}px)`,
          }}
        >
          <SceneIllustration kind="city" frame={frame} />
        </div>
      </div>
    );
  }
  if (scene.visual === "pharaoh") {
    return (
      <div style={{ ...artworkStyle, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <AncientTempleBackdrop frame={frame} />
        </div>
        <div style={{ width: 650, height: 715, transform: `translate(${Math.sin(frame / 24) * 8}px, ${Math.cos(frame / 19) * 7}px)` }}>
          <HistoricalFigure frame={frame} />
        </div>
        <div
          style={{
            position: "absolute",
            right: 65,
            bottom: 32,
            width: 310,
            transform: `translateY(${Math.sin(frame / 17) * 11}px)`,
          }}
        >
          <HistoricalObject frame={frame} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 8,
            width: 300,
            height: 300,
            opacity: 0.72,
            transform: `scale(${0.95 + Math.sin(frame / 30) * 0.04})`,
          }}
        >
          <AtenSymbol frame={frame} />
        </div>
      </div>
    );
  }
  if (scene.visual === "aten") {
    return (
      <div style={{ ...artworkStyle, alignItems: "flex-start", paddingTop: 50, gap: 20 }}>
        <div style={{ width: 450, height: 500, marginTop: 130, transform: `translateY(${Math.sin(frame / 19) * 8}px)` }}>
          <HistoricalFigure frame={frame} />
        </div>
        <div style={{ width: 430, height: 430, transform: `translateY(${Math.cos(frame / 17) * 14}px)` }}>
          <AtenSymbol frame={frame} />
        </div>
      </div>
    );
  }
  if (scene.visual === "legacy") {
    return (
      <div style={{ ...artworkStyle, gap: 8, overflow: "hidden" }}>
        <div style={{ width: 730, height: 555 }}>
          <SceneIllustration kind="ruins" frame={frame} />
        </div>
        <div style={{ width: 310, transform: `translateY(${Math.sin(frame / 16) * 12}px)` }}>
          <HistoricalObject frame={frame} />
        </div>
      </div>
    );
  }
  if (scene.visual === "city" || scene.visual === "battle" || scene.visual === "artifact" || scene.visual === "eruption" || scene.visual === "excavation" || scene.visual === "ruins") {
    return (
      <div style={{ ...artworkStyle, overflow: "hidden" }}>
        <SceneIllustration kind={scene.visual} frame={frame} />
      </div>
    );
  }
  return <div style={artworkStyle}><HistoricalObject frame={frame} /></div>;
};

const AnimatedSubtitle: React.FC<{ text: string; frame: number }> = ({
  text,
  frame,
}) => {
  const opacity = interpolate(frame, [0, 8, 24], [0, 1, 1], clamp);
  const y = interpolate(frame, [0, 12], [20, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 66,
        right: 66,
        bottom: 170,
        minHeight: 170,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px 20px",
        boxSizing: "border-box",
        borderTop: `1px solid ${palette.goldDim}`,
        color: palette.white,
        fontFamily: sans,
        fontSize: 42,
        fontWeight: 700,
        lineHeight: 1.2,
        textShadow: "0 2px 16px #000, 0 0 16px rgba(245,242,233,.28)",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {text}
    </div>
  );
};

const HistoricalSceneCard: React.FC<{ scene: HistoricalScene }> = ({
  scene,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], clamp);
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [1, 0],
    clamp,
  );
  const titleY = interpolate(frame, [0, 18], [22, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const opacity = fadeIn * fadeOut;

  if (scene.visual === "hook") {
    return <IntroHook frame={frame} scene={scene} />;
  }
  if (scene.visual === "outro") {
    return <Outro scene={scene} frame={frame} />;
  }

  return (
    <ArchiveFrame chapter={scene.chapter} date={scene.date}>
      <div style={{ ...({ position: "absolute", inset: 0, opacity } as CSSProperties) }}>
        <SceneArtwork scene={scene} frame={frame} />
        <div
          style={{
            position: "absolute",
            top: 1120,
            left: 72,
            right: 72,
            textAlign: "center",
            fontFamily: serif,
            fontSize: 49,
            fontWeight: 700,
            lineHeight: 1.08,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {scene.title}
        </div>
        <AnimatedSubtitle text={scene.caption} frame={frame} />
      </div>
    </ArchiveFrame>
  );
};

const Outro: React.FC<{ scene: HistoricalScene; frame: number }> = ({
  scene,
  frame,
}) => {
  const scale = interpolate(frame, [0, 150], [0.92, 1.04], clamp);
  const glow = 0.35 + Math.sin(frame / 13) * 0.12;
  return (
    <ArchiveFrame chapter={scene.chapter} date={scene.date}>
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${scale})`,
          opacity: 0.8,
          ...svgGlow,
        }}
      >
        <AtenSymbol frame={frame} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1010,
          left: 70,
          right: 70,
          color: palette.white,
          fontFamily: serif,
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.08,
          textAlign: "center",
          textShadow: `0 0 28px rgba(216,180,107,${glow})`,
        }}
      >
        {scene.title}
      </div>
      <AnimatedSubtitle text={scene.caption} frame={frame} />
    </ArchiveFrame>
  );
};

const FilmGrainVhs: React.FC = () => {
  const frame = useCurrentFrame();
  const flicker = 0.035 + (frame % 3) * 0.008;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: flicker,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.22) 0px, rgba(255,255,255,.22) 1px, transparent 1px, transparent 5px)",
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,.62) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${18 + ((frame * 13) % 1780)}px`,
          left: 0,
          right: 0,
          height: 2,
          opacity: frame % 90 < 3 ? 0.2 : 0.035,
          background: palette.white,
          boxShadow: "0 0 12px rgba(245,242,233,.6)",
        }}
      />
      {Array.from({ length: 26 }, (_, index) => {
        const x = (index * 193 + frame * (index % 2 ? 3 : -2) + 1080) % 1080;
        const y = (index * 317 + frame * 5) % 1920;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: index % 4 === 0 ? 2 : 1,
              height: index % 3 === 0 ? 3 : 2,
              opacity: index % 3 === frame % 3 ? 0.18 : 0.06,
              background: palette.white,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const TransitionOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const transition = Math.min(
    interpolate(frame, [0, 12], [0, 1], clamp),
    interpolate(
      frame,
      [durationInFrames - 12, durationInFrames],
      [1, 0],
      clamp,
    ),
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          opacity: 1 - transition,
          background: palette.black,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${interpolate(frame, [0, 12], [-12, 1080], clamp)}px`,
          width: 5,
          opacity: 1 - transition,
          background: palette.gold,
          boxShadow: "0 0 28px rgba(216,180,107,.9)",
        }}
      />
    </AbsoluteFill>
  );
};

export const HistoricalMasterVideo: React.FC<{
  episode: HistoricalEpisode;
}> = ({ episode }) => (
  <AbsoluteFill style={{ backgroundColor: palette.black }}>
    {episode.scenes.map((scene) => (
      <Sequence
        key={scene.id}
        from={scene.from}
        durationInFrames={scene.duration}
        name={scene.chapter}
      >
        <HistoricalSceneCard scene={scene} />
        <TransitionOverlay />
      </Sequence>
    ))}
    <FilmGrainVhs />
  </AbsoluteFill>
);
