import type { HistoricalEpisode } from "./HistoricalMasterVideo";

export const akhenatenDemo: HistoricalEpisode = {
  title: "Akenatón y el culto a Atón",
  durationInFrames: 900,
  scenes: [
    {
      id: "hook",
      from: 0,
      duration: 60,
      visual: "hook",
      chapter: "EL FARAÓN QUE DESAFIÓ LA TRADICIÓN",
      title: "¿Y si un faraón intentara cambiar la religión de Egipto?",
      caption: "Una revolución comenzó en la corte.",
    },
    {
      id: "map",
      from: 60,
      duration: 165,
      visual: "map",
      chapter: "UNA NUEVA CAPITAL",
      date: "EGIPTO · IMPERIO NUEVO",
      title: "Fundó Ajetatón, hoy conocida como Amarna.",
      caption:
        "El poder se trasladó a una ciudad nueva, entre Tebas y el delta del Nilo.",
    },
    {
      id: "pharaoh",
      from: 225,
      duration: 165,
      visual: "pharaoh",
      chapter: "EL CAMBIO DE NOMBRE",
      date: "AMENHOTEP IV → AKENATÓN",
      title: "El faraón adoptó un nombre ligado a Atón.",
      caption:
        "Amenhotep IV pasó a llamarse Akenatón e impulsó el culto al disco solar.",
    },
    {
      id: "aten",
      from: 390,
      duration: 180,
      visual: "aten",
      chapter: "EL DISCO SOLAR",
      date: "ATÓN · FUENTE DE VIDA",
      title: "Atón tomó el centro de la imagen real.",
      caption:
        "En el arte de la época, sus rayos terminan en manos que ofrecen vida.",
    },
    {
      id: "legacy",
      from: 570,
      duration: 165,
      visual: "legacy",
      chapter: "UNA REVOLUCIÓN BREVE",
      date: "EL LEGADO DE AKENATÓN",
      title: "Pero el cambio no perduró.",
      caption:
        "Tras su reinado, Ajetatón dejó de ser capital y el culto tradicional volvió a ganar fuerza.",
    },
    {
      id: "outro",
      from: 735,
      duration: 165,
      visual: "outro",
      chapter: "EL DEBATE CONTINÚA",
      title: "¿Revolución de un faraón… o cambio imposible de sostener?",
      caption: "¿Qué crees que hizo fracasar su proyecto?",
    },
  ],
  sources: [
    {
      label:
        "The Metropolitan Museum of Art, Akhenaten and the Amarna Period",
      url: "https://www.metmuseum.org/toah/hd/akhen/hd_akhen.htm",
    },
    {
      label: "Amarna Project, Amarna the Place: mapa y arqueología del sitio",
      url: "https://www.amarnaproject.com/amarna-the-place/",
    },
  ],
};
