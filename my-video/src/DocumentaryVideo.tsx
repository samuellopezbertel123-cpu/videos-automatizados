import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type {
  CaptionCue,
  DocumentaryBeat,
  DocumentaryScene,
  DocumentaryVideoData,
} from "./documentary-data";
import { PompeiiArtwork } from "./PompeiiArtwork";

type DocumentaryVideoProps = {
  video: DocumentaryVideoData;
};

const colors = {
  black: "#080e14",
  paper: "#f4e8d2",
  gold: "#d6a858",
  ember: "#e76c3d",
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const fallbackBeat = (scene: DocumentaryScene): DocumentaryBeat => ({
  duration: scene.duration,
  visual: scene.visual,
  title: scene.headline,
  cameraMove: scene.cameraMove,
  titlePosition: "left",
});

const CinematicShot: React.FC<{
  scene: DocumentaryScene;
  beat: DocumentaryBeat;
  showChapter: boolean;
}> = ({ scene, beat, showChapter }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / Math.max(1, durationInFrames - 1);
  const zoom =
    beat.cameraMove === "pull-out"
      ? interpolate(progress, [0, 1], [1.22, 1.025], clamp)
      : interpolate(progress, [0, 1], [1.025, 1.19], clamp);
  const cameraX =
    beat.cameraMove === "drift-left"
      ? interpolate(progress, [0, 1], [65, -65], clamp)
      : beat.cameraMove === "drift-right"
        ? interpolate(progress, [0, 1], [-65, 65], clamp)
        : Math.sin(frame / 31) * 11;
  const cameraY =
    beat.cameraMove === "tilt-up"
      ? interpolate(progress, [0, 1], [54, -58], clamp)
      : beat.cameraMove === "tilt-down"
        ? interpolate(progress, [0, 1], [-58, 54], clamp)
        : Math.cos(frame / 39) * 12;
  const titleOpacity = interpolate(frame, [0, 12, durationInFrames - 7], [0, 1, 1], clamp);
  const wipe = interpolate(frame, [0, 12], [-400, 1500], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const placement =
    beat.titlePosition === "center"
      ? { left: 80, right: 80, textAlign: "center" as const }
      : beat.titlePosition === "right"
        ? { right: 72, width: 730, textAlign: "right" as const }
        : { left: 72, width: 760, textAlign: "left" as const };
  const titleTop =
    beat.titlePosition === "center"
      ? 1125
      : beat.visual === "map" || beat.visual === "aerial" || beat.visual === "skyline"
        ? 430
        : beat.visual === "amphora" || beat.visual === "artifact" || beat.visual === "house"
          ? 1180
          : 1060;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.black, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: -75,
          transform: `translate3d(${cameraX}px, ${cameraY}px, 0) scale(${zoom})`,
          transformOrigin: "50% 50%",
        }}
      >
        {scene.image ? (
          <Img
            src={staticFile(scene.image)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <PompeiiArtwork kind={beat.visual} frame={frame} />
        )}
      </div>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(7,13,20,.12) 0%, transparent 28%, rgba(7,13,20,.035) 57%, rgba(6,10,15,.42) 100%), radial-gradient(ellipse at center, transparent 40%, rgba(2,7,12,.3) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 112,
          left: 76,
          height: 3,
          width: 92,
          background: colors.ember,
          boxShadow: "0 0 24px rgba(231,108,61,.64)",
          transform: `scaleX(${interpolate(frame, [0, 14], [0, 1], clamp)})`,
          transformOrigin: "left",
        }}
      />
      {showChapter ? (
        <div
          style={{
            position: "absolute",
            top: 136,
            left: 76,
            color: colors.gold,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 5,
            opacity: titleOpacity,
          }}
        >
          {scene.chapter}
        </div>
      ) : null}
      {beat.title ? (
        <div
          style={{
            position: "absolute",
            top: titleTop,
            ...placement,
            color: colors.paper,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -1,
            opacity: titleOpacity,
            transform: `translateY(${interpolate(frame, [0, 13], [22, 0], {
              ...clamp,
              easing: Easing.out(Easing.cubic),
            })}px)`,
            textShadow: "0 5px 25px rgba(0,0,0,.8)",
          }}
        >
          {beat.title}
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          top: -80,
          bottom: -80,
          left: wipe,
          width: 330,
          transform: "skewX(-18deg)",
          opacity: frame < 13 ? 1 : 0,
          background:
            "linear-gradient(90deg, transparent, rgba(4,9,14,.91) 48%, rgba(214,168,88,.78) 50%, rgba(4,9,14,.91) 52%, transparent)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

const SceneTimeline: React.FC<{ scene: DocumentaryScene }> = ({ scene }) => {
  const beats = scene.beats?.length ? scene.beats : [fallbackBeat(scene)];
  let from = 0;

  return (
    <AbsoluteFill>
      {beats.map((beat, index) => {
        const beatFrom = from;
        from += beat.duration;
        return (
          <Sequence
            key={`${scene.id}-${index}`}
            from={beatFrom}
            durationInFrames={beat.duration}
            name={beat.title || `${scene.chapter} · plano ${index + 1}`}
          >
            <CinematicShot scene={scene} beat={beat} showChapter={index === 0} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const highlightedWords = new Set([
  "vesubio",
  "pompeya",
  "ceniza",
  "ciudad",
  "calles",
  "objetos",
  "excavaciones",
  "pinturas",
  "restos",
  "roma",
  "bajo",
  "huellas",
]);

const KineticCaption: React.FC<{ cue: CaptionCue }> = ({ cue }) => {
  const frame = useCurrentFrame();
  const words = cue.text.split(/\s+/);
  const reveal = interpolate(frame, [3, cue.duration * 0.55], [0, words.length], clamp);
  const opacity = interpolate(frame, [0, 7, cue.duration - 10, cue.duration], [0, 1, 1, 0], clamp);
  const lift = interpolate(frame, [0, 11], [22, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        bottom: 206,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `translateY(${lift}px)`,
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 9,
          rowGap: 2,
          maxWidth: 930,
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 31,
          fontWeight: 600,
          lineHeight: 1.25,
          textShadow: "0 3px 20px rgba(0,0,0,.95)",
        }}
      >
        {words.map((word, index) => {
          const cleanWord = word.toLocaleLowerCase("es").replace(/[.,;:!?¿¡]/g, "");
          const emphasized = highlightedWords.has(cleanWord);
          const wordOpacity = interpolate(reveal, [index, index + 0.85], [0.18, 1], clamp);
          return (
            <span
              key={`${index}-${word}`}
              style={{
                color: emphasized ? colors.gold : colors.paper,
                opacity: wordOpacity,
                transform: `translateY(${(1 - wordOpacity) * 8}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 16,
          width: 100,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${colors.ember}, ${colors.gold}, transparent)`,
          transform: `scaleX(${interpolate(frame, [0, cue.duration], [0.15, 1], clamp)})`,
        }}
      />
    </div>
  );
};

export const DocumentaryVideo: React.FC<DocumentaryVideoProps> = ({ video }) => (
  <AbsoluteFill style={{ backgroundColor: colors.black }}>
    {video.scenes.map((scene) => (
      <Sequence
        key={scene.id}
        from={scene.from}
        durationInFrames={scene.duration}
        name={scene.chapter}
      >
        <SceneTimeline scene={scene} />
      </Sequence>
    ))}
    {video.captions.map((cue, index) => (
      <Sequence
        key={`${cue.from}-${index}`}
        from={cue.from}
        durationInFrames={cue.duration}
        name={`Subtítulo ${index + 1}`}
      >
        <KineticCaption cue={cue} />
      </Sequence>
    ))}
    {video.audio.narration ? <Audio src={staticFile(video.audio.narration)} volume={1} /> : null}
    {video.audio.music ? (
      <Audio src={staticFile(video.audio.music)} volume={video.audio.musicVolume} />
    ) : null}
    {video.audio.soundEffects.map((effect, index) => (
      <Sequence
        key={`${effect.src}-${index}`}
        from={effect.from}
        durationInFrames={video.durationInFrames - effect.from}
        name={`Efecto ${index + 1}`}
      >
        <Audio src={staticFile(effect.src)} volume={effect.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
