export type CameraMove =
  | "push"
  | "pull-out"
  | "drift-left"
  | "drift-right"
  | "tilt-up"
  | "tilt-down";

export type DocumentaryVisual =
  | "eruption"
  | "escape"
  | "map"
  | "city"
  | "excavation"
  | "artifact"
  | "ruins"
  | "battle"
  | "street"
  | "market"
  | "house"
  | "buried"
  | "archaeology"
  | "amphora"
  | "fresco"
  | "aerial"
  | "skyline"
  | "volcano"
  | "cross-section";

export type DocumentaryBeat = {
  duration: number;
  visual: DocumentaryVisual;
  title: string;
  cameraMove: CameraMove;
  titlePosition: "left" | "right" | "center";
};

export type DocumentaryScene = {
  id: string;
  from: number;
  duration: number;
  chapter: string;
  headline: string;
  body: string;
  visualLabel: string;
  visual: DocumentaryVisual;
  image?: string;
  cameraMove: CameraMove;
  beats?: DocumentaryBeat[];
};

export type CaptionCue = {
  from: number;
  duration: number;
  text: string;
};

export type DocumentaryAudio = {
  narration?: string;
  /** Fotograma en que entra la voz (permite un breve arranque musical). */
  narrationStartFrame?: number;
  /** Compensa pequeñas diferencias entre la locución generada y los 60 segundos. */
  narrationPlaybackRate?: number;
  music?: string;
  musicVolume: number;
  soundEffects: Array<{
    from: number;
    src: string;
    volume: number;
  }>;
};

export type DocumentaryVideoData = {
  durationInFrames: number;
  scenes: DocumentaryScene[];
  captions: CaptionCue[];
  audio: DocumentaryAudio;
  researchNotes: string[];
};

export const pompeiiDemo: DocumentaryVideoData = {
  durationInFrames: 1800,
  scenes: [
    {
      id: "hook",
      from: 0,
      duration: 90,
      chapter: "EL ÚLTIMO DÍA",
      headline: "UNA ERUPCIÓN SEPULTÓ POMPEYA.",
      body: "El Vesubio cambió el destino de la ciudad.",
      visualLabel: "Vesubio · reconstrucción vectorial original",
      visual: "eruption",
      cameraMove: "push",
      beats: [
        { duration: 45, visual: "eruption", title: "EL CIELO SE ENCIENDE", cameraMove: "push", titlePosition: "left" },
        { duration: 45, visual: "city", title: "", cameraMove: "drift-right", titlePosition: "right" },
      ],
    },
    {
      id: "mystery",
      from: 90,
      duration: 270,
      chapter: "EL MISTERIO",
      headline: "¿QUÉ QUEDÓ BAJO LA CENIZA?",
      body: "La erupción cubrió Pompeya y otras poblaciones próximas.",
      visualLabel: "El paisaje antes y después de la erupción",
      visual: "map",
      cameraMove: "drift-left",
      beats: [
        { duration: 68, visual: "map", title: "UNA CIUDAD AL PIE DEL VESUBIO", cameraMove: "push", titlePosition: "right" },
        { duration: 68, visual: "volcano", title: "", cameraMove: "tilt-up", titlePosition: "left" },
        { duration: 67, visual: "buried", title: "LA CENIZA CUBRE LOS TECHOS", cameraMove: "tilt-down", titlePosition: "right" },
        { duration: 67, visual: "ruins", title: "", cameraMove: "pull-out", titlePosition: "left" },
      ],
    },
    {
      id: "daily-life",
      from: 360,
      duration: 420,
      chapter: "UNA CIUDAD ROMANA",
      headline: "UNA CIUDAD LLENA DE VIDA.",
      body: "Los restos conservan evidencias materiales de la vida urbana romana.",
      visualLabel: "Calles, hogares y espacios públicos",
      visual: "city",
      cameraMove: "drift-right",
      beats: [
        { duration: 70, visual: "aerial", title: "TEJADOS AL MEDIODÍA", cameraMove: "pull-out", titlePosition: "left" },
        { duration: 70, visual: "street", title: "", cameraMove: "push", titlePosition: "right" },
        { duration: 70, visual: "market", title: "VOCES EN EL MERCADO", cameraMove: "drift-left", titlePosition: "left" },
        { duration: 70, visual: "house", title: "", cameraMove: "drift-right", titlePosition: "right" },
        { duration: 70, visual: "fresco", title: "COLOR SOBRE LOS MUROS", cameraMove: "push", titlePosition: "left" },
        { duration: 70, visual: "amphora", title: "", cameraMove: "pull-out", titlePosition: "right" },
      ],
    },
    {
      id: "excavations",
      from: 780,
      duration: 420,
      chapter: "EL REDESCUBRIMIENTO",
      headline: "ALGUIEN VOLVIÓ A MIRAR BAJO TIERRA.",
      body: "El trabajo arqueológico sacó a la luz edificios, pinturas y objetos.",
      visualLabel: "Trabajo arqueológico · recreación ilustrada",
      visual: "excavation",
      cameraMove: "push",
      beats: [
        { duration: 70, visual: "archaeology", title: "UN CEPILLO RETIRA EL POLVO", cameraMove: "push", titlePosition: "right" },
        { duration: 70, visual: "excavation", title: "", cameraMove: "tilt-down", titlePosition: "left" },
        { duration: 70, visual: "buried", title: "CAPA TRAS CAPA", cameraMove: "pull-out", titlePosition: "right" },
        { duration: 70, visual: "artifact", title: "", cameraMove: "push", titlePosition: "left" },
        { duration: 70, visual: "fresco", title: "EL COLOR REAPARECE", cameraMove: "drift-left", titlePosition: "right" },
        { duration: 70, visual: "ruins", title: "", cameraMove: "drift-right", titlePosition: "left" },
      ],
    },
    {
      id: "revelation",
      from: 1200,
      duration: 330,
      chapter: "EL GIRO",
      headline: "LA CENIZA CONSERVÓ SUS HUELLAS.",
      body: "Piedra, pintura y objetos permiten leer la ciudad.",
      visualLabel: "Una ciudad preservada en sus restos",
      visual: "ruins",
      cameraMove: "drift-left",
      beats: [
        { duration: 66, visual: "ruins", title: "MUROS QUE RESISTIERON", cameraMove: "push", titlePosition: "left" },
        { duration: 66, visual: "street", title: "", cameraMove: "drift-right", titlePosition: "right" },
        { duration: 66, visual: "fresco", title: "LOS COLORES SOBREVIVEN", cameraMove: "push", titlePosition: "left" },
        { duration: 66, visual: "artifact", title: "", cameraMove: "pull-out", titlePosition: "right" },
        { duration: 66, visual: "aerial", title: "LA CIUDAD EMERGE", cameraMove: "tilt-up", titlePosition: "left" },
      ],
    },
    {
      id: "closing",
      from: 1530,
      duration: 270,
      chapter: "EL LEGADO DE POMPEYA",
      headline: "BAJO NUESTROS PIES, OTRA CIUDAD.",
      body: "Pompeya aún tiene historias por contar.",
      visualLabel: "El pasado permanece bajo la superficie",
      visual: "artifact",
      cameraMove: "push",
      beats: [
        { duration: 67, visual: "cross-section", title: "BAJO LA SUPERFICIE", cameraMove: "tilt-down", titlePosition: "left" },
        { duration: 68, visual: "archaeology", title: "", cameraMove: "push", titlePosition: "right" },
        { duration: 67, visual: "amphora", title: "UNA HUELLA, DOS MIL AÑOS", cameraMove: "pull-out", titlePosition: "left" },
        { duration: 68, visual: "skyline", title: "LA HISTORIA SIGUE AQUÍ", cameraMove: "tilt-up", titlePosition: "center" },
      ],
    },
  ],
  captions: [
    { from: 0, duration: 90, text: "UNA ERUPCIÓN SEPULTÓ POMPEYA." },
    {
      from: 90,
      duration: 135,
      text: "La erupción del Vesubio cubrió Pompeya.",
    },
    {
      from: 225,
      duration: 135,
      text: "Otras poblaciones próximas también fueron afectadas.",
    },
    {
      from: 360,
      duration: 210,
      text: "Calles, viviendas y objetos cotidianos quedaron bajo los depósitos volcánicos.",
    },
    {
      from: 570,
      duration: 210,
      text: "Hoy son evidencias materiales de la vida urbana romana.",
    },
    {
      from: 780,
      duration: 210,
      text: "Las excavaciones sacaron a la luz edificios y pinturas.",
    },
    {
      from: 990,
      duration: 210,
      text: "También recuperaron numerosos objetos de la ciudad.",
    },
    {
      from: 1200,
      duration: 165,
      text: "Pompeya no desapareció sin dejar rastro.",
    },
    {
      from: 1365,
      duration: 165,
      text: "Sus restos permiten estudiar el mundo romano.",
    },
    {
      from: 1530,
      duration: 270,
      text: "¿Qué detalle de Pompeya te gustaría conocer? Compártelo.",
    },
  ],
  audio: {
    music: "assets/pompeii-ambience.wav",
    musicVolume: 0.58,
    soundEffects: [],
  },
  researchNotes: [
    "UNESCO World Heritage Centre: Archaeological Areas of Pompeii, Herculaneum and Torre Annunziata.",
    "Parco Archeologico di Pompei: fuentes oficiales para comprobar fechas, hallazgos y contexto antes de publicar.",
  ],
};