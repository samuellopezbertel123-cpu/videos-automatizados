import type { DocumentaryVideoData, DocumentaryScene } from "./documentary-data";

/**
 * Primer episodio listo para voz en español latinoamericano.
 * Duración exacta: 1.800 fotogramas a 30 fps = 60 segundos.
 * Voz: ElevenLabs "Strick RD – Narraciones", take Pompeya de ~54.96 s.
 * El ajuste ligero de 0.94x distribuye la narración a través del minuto
 * con una cola musical final de ~1 s. NO generar una nueva voz en cada render.
 * Copiar el MP3 descargado a public/assets/pompeya-voz-60s.mp3.
 */
const scenes: DocumentaryScene[] = [
  {
    id: "ciudad-viva", from: 0, duration: 240,
    chapter: "POMPEYA · AÑO 79", headline: "UNA CIUDAD LLENA DE VIDA",
    body: "La vida diaria antes de la erupción",
    visualLabel: "Mercado y calle romana · recreación",
    visual: "market", cameraMove: "push",
    beats: [
      { duration: 120, visual: "market", title: "ANTES DE LA CENIZA", cameraMove: "push", titlePosition: "left" },
      { duration: 120, visual: "street", title: "", cameraMove: "drift-left", titlePosition: "right" },
    ],
  },
  {
    id: "vesubio", from: 240, duration: 180,
    chapter: "EL VESUBIO", headline: "TODO CAMBIÓ",
    body: "Erupción del año 79 d. C.",
    visualLabel: "Monte Vesubio · reconstrucción",
    visual: "volcano", cameraMove: "tilt-up",
    beats: [
      { duration: 100, visual: "volcano", title: "AÑO 79 D. C.", cameraMove: "tilt-up", titlePosition: "left" },
      { duration: 80, visual: "eruption", title: "", cameraMove: "push", titlePosition: "right" },
    ],
  },
  {
    id: "erupcion", from: 420, duration: 330,
    chapter: "LA ERUPCIÓN", headline: "LA CENIZA CAE",
    body: "La ciudad quedó enterrada bajo material volcánico",
    visualLabel: "Habitantes, nube eruptiva y cenizas",
    visual: "eruption", cameraMove: "push",
    beats: [
      { duration: 140, visual: "eruption", title: "EL CIELO SE OSCURECIÓ", cameraMove: "push", titlePosition: "left" },
      { duration: 100, visual: "street", title: "", cameraMove: "drift-right", titlePosition: "right" },
      { duration: 90, visual: "buried", title: "", cameraMove: "tilt-down", titlePosition: "left" },
    ],
  },
  {
    id: "bajo-tierra", from: 750, duration: 180,
    chapter: "BAJO LA CENIZA", headline: "UNA CIUDAD OCULTA",
    body: "El pasado permaneció bajo los depósitos",
    visualLabel: "Estratos de ceniza y ciudad sepultada",
    visual: "cross-section", cameraMove: "tilt-down",
    beats: [
      { duration: 95, visual: "cross-section", title: "CAPA TRAS CAPA", cameraMove: "tilt-down", titlePosition: "left" },
      { duration: 85, visual: "ruins", title: "", cameraMove: "pull-out", titlePosition: "right" },
    ],
  },
  {
    id: "excavaciones", from: 930, duration: 270,
    chapter: "EL REDESCUBRIMIENTO", headline: "VOLVIERON A VER LA LUZ",
    body: "Las excavaciones comenzaron a revelar la ciudad",
    visualLabel: "Arqueólogos trabajando · reconstrucción",
    visual: "excavation", cameraMove: "push",
    beats: [
      { duration: 135, visual: "excavation", title: "SIGLOS DESPUÉS...", cameraMove: "push", titlePosition: "right" },
      { duration: 135, visual: "archaeology", title: "", cameraMove: "drift-left", titlePosition: "left" },
    ],
  },
  {
    id: "hallazgos", from: 1200, duration: 240,
    chapter: "LOS HALLAZGOS", headline: "HUELLAS DE VIDAS REALES",
    body: "Pinturas y objetos cotidianos preservados",
    visualLabel: "Frescos, vasijas y hallazgos arqueológicos",
    visual: "fresco", cameraMove: "drift-right",
    beats: [
      { duration: 120, visual: "fresco", title: "HISTORIAS EN LOS MUROS", cameraMove: "drift-left", titlePosition: "left" },
      { duration: 120, visual: "amphora", title: "", cameraMove: "push", titlePosition: "right" },
    ],
  },
  {
    id: "legado", from: 1440, duration: 210,
    chapter: "EL LEGADO", headline: "EL PASADO NO DESAPARECIÓ",
    body: "Sus restos siguen contando la historia",
    visualLabel: "Ruinas y ciudad romana",
    visual: "ruins", cameraMove: "pull-out",
    beats: [
      { duration: 105, visual: "ruins", title: "LA CIUDAD PERMANECE", cameraMove: "drift-right", titlePosition: "left" },
      { duration: 105, visual: "aerial", title: "", cameraMove: "pull-out", titlePosition: "center" },
    ],
  },
  {
    id: "pregunta", from: 1650, duration: 150,
    chapter: "EL MISTERIO CONTINÚA", headline: "¿QUÉ BUSCARÍAS PRIMERO?",
    body: "La historia está en los detalles",
    visualLabel: "Interior romano y vestigios",
    visual: "house", cameraMove: "push",
    beats: [
      { duration: 150, visual: "house", title: "¿QUÉ BUSCARÍAS PRIMERO?", cameraMove: "pull-out", titlePosition: "center" },
    ],
  },
];

export const pompeiiFinal: DocumentaryVideoData = {
  durationInFrames: 1800,
  scenes,
  captions: [
  {
    "from": 15,
    "duration": 68,
    "text": "Pompeya parecía una ciudad romana como"
  },
  {
    "from": 83,
    "duration": 84,
    "text": "cualquier otra: mercados llenos de voces,"
  },
  {
    "from": 167,
    "duration": 57,
    "text": "familias en las calles y templos"
  },
  {
    "from": 224,
    "duration": 46,
    "text": "que miraban al Vesubio."
  },
  {
    "from": 270,
    "duration": 34,
    "text": "Pero en el año setenta y"
  },
  {
    "from": 304,
    "duration": 79,
    "text": "nueve después de Cristo, todo cambió."
  },
  {
    "from": 383,
    "duration": 66,
    "text": "El volcán entró en erupción."
  },
  {
    "from": 449,
    "duration": 63,
    "text": "Una nube gigantesca se elevó sobre"
  },
  {
    "from": 512,
    "duration": 62,
    "text": "la montaña y la ceniza comenzó"
  },
  {
    "from": 574,
    "duration": 54,
    "text": "a caer sobre los tejados."
  },
  {
    "from": 628,
    "duration": 56,
    "text": "La gente buscó refugio mientras los"
  },
  {
    "from": 684,
    "duration": 78,
    "text": "edificios desaparecían bajo piedra pómez y"
  },
  {
    "from": 762,
    "duration": 60,
    "text": "material volcánico. Lo que parecía el"
  },
  {
    "from": 822,
    "duration": 92,
    "text": "fin dejó, sin embargo, un testimonio"
  },
  {
    "from": 914,
    "duration": 64,
    "text": "extraordinario. Con el paso de los"
  },
  {
    "from": 978,
    "duration": 86,
    "text": "siglos, los arqueólogos fueron descubriendo calles,"
  },
  {
    "from": 1064,
    "duration": 88,
    "text": "pinturas, vasijas y objetos cotidianos que"
  },
  {
    "from": 1152,
    "duration": 96,
    "text": "habían permanecido enterrados. Cada hallazgo revela"
  },
  {
    "from": 1248,
    "duration": 72,
    "text": "cómo vivían personas reales hace casi"
  },
  {
    "from": 1320,
    "duration": 74,
    "text": "dos mil años: qué compraban, cómo"
  },
  {
    "from": 1394,
    "duration": 57,
    "text": "decoraban sus hogares y por dónde"
  },
  {
    "from": 1451,
    "duration": 69,
    "text": "caminaban. Pompeya no volvió a ser"
  },
  {
    "from": 1520,
    "duration": 50,
    "text": "la ciudad que fue, pero sus"
  },
  {
    "from": 1570,
    "duration": 71,
    "text": "restos siguen contando su historia."
  },
  {
    "from": 1641,
    "duration": 54,
    "text": "Y tú, si pudieras entrar en"
  },
  {
    "from": 1695,
    "duration": 57,
    "text": "una de sus casas, ¿qué buscarías"
  },
  {
    "from": 1752,
    "duration": 48,
    "text": "primero?"
  }
],
  audio: {
    narration: "assets/pompeya-voz-60s.mp3",
    narrationStartFrame: 15,
    narrationPlaybackRate: 0.94,
    music: "assets/pompeii-ambience.wav",
    musicVolume: 0.15,
    soundEffects: [],
  },
  researchNotes: [
    "UNESCO World Heritage Centre: Archaeological Areas of Pompei, Herculaneum and Torre Annunziata. https://whc.unesco.org/en/list/829",
    "Parco Archeologico di Pompei: consultar documentación actual antes de publicar nuevos hallazgos.",
    "Imágenes SVG originales; no reproducir materiales de plantilla de terceros.",
  ],
};
