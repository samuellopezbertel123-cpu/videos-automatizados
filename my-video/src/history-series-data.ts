/**
 * Crónicas del Tiempo: temporada de 3 episodios documentales de 60 segundos.
 * Guiones históricos revisados y relatos originales. No son instrucciones médicas.
 */
export type HistoryArt =
  | "med-entry" | "med-healer" | "med-skull" | "med-recovery"
  | "med-bloodletting" | "med-leech" | "med-mercury" | "med-warning"
  | "med-testing" | "med-finale"
  | "toilet-hook" | "toilet-rome" | "toilet-channel" | "toilet-street"
  | "toilet-castle" | "toilet-garderobe" | "toilet-chamberpot"
  | "toilet-sewers" | "toilet-modern" | "toilet-finale"
  | "hero-hook" | "hero-alexander" | "hero-thebes" | "hero-after"
  | "hero-columbus" | "hero-caribbean" | "hero-napoleon"
  | "hero-law" | "hero-memory" | "hero-finale";

export type HistoryScene = {
  kind: HistoryArt;
  title: string;
  label: string;
  from: number;
  duration: number;
  accent: string;
};

export type HistoryCaption = {
  from: number;
  duration: number;
  text: string;
};

export type HistoryEpisode = {
  slug: string;
  compositionId: string;
  name: string;
  title: string;
  narration: string;
  voicePath: string;
  sources: string[];
  scenes: HistoryScene[];
  captions: HistoryCaption[];
};

export const HISTORY_FPS = 30;
export const HISTORY_DURATION = 1800;
const cuts = [90,150,170,180,180,180,200,180,220,250] as const;
const buildScenes = (descriptors: Array<[HistoryArt,string,string,string]>): HistoryScene[] => {
  let from = 0;
  return descriptors.map(([kind,title,label,accent], i) => {
    const scene = {kind,title,label,accent,from,duration:cuts[i]};
    from += cuts[i];
    return scene;
  });
};

/** Storyboard captions are timing estimates. When real narration is available,
 * replace them with aligned words from the generated voice for final publishing. */
const buildCaptions = (narration: string): HistoryCaption[] => {
  const words = narration.trim().split(/\s+/);
  const groups: string[] = [];
  for(let i=0;i<words.length;i+=6){
    groups.push(words.slice(i,i+6).join(" "));
  }
  const fromStart = 15;
  const total = 1740;
  return groups.map((text,i)=>{
    const from = fromStart + Math.round((i / groups.length) * total);
    const next = fromStart + Math.round(((i+1) / groups.length) * total);
    return {from,duration:next-from,text};
  });
};

const medicalNarration = "¿Te atreverías a visitar a un médico de hace cientos de años? En algunas culturas, para tratar lesiones de la cabeza, practicaban la trepanación: abrían una parte del cráneo. Y aunque suena aterrador, ciertos huesos muestran señales de cicatrización. Algunas personas sobrevivieron. Pero no era el único tratamiento inquietante. Durante siglos, los médicos europeos recurrieron a las sangrías. Creían que extraer sangre ayudaba a equilibrar el cuerpo. A veces usaban instrumentos; otras veces, sanguijuelas. Y cuando la sífilis se extendió por Europa, desde finales del siglo quince se utilizaron remedios con mercurio. Hoy sabemos que ese metal puede provocar intoxicaciones graves. Lo sorprendente es que muchos médicos realmente intentaban ayudar con los conocimientos de su tiempo. Eso no convierte sus métodos en seguros. La medicina ha cambiado porque aprendimos a poner a prueba los tratamientos. ¿Cuál de estos tres te habría dado más miedo?";

const toiletNarration = "¿Te imaginas entrar a un baño y encontrar a varios desconocidos sentados a tu lado? En algunas ciudades del Imperio romano existían letrinas públicas con bancos de piedra y varios asientos, sin separaciones como las de hoy. El agua corría por canales para llevarse los desechos. La privacidad no siempre era la prioridad. Siglos después, en castillos medievales europeos, algunas letrinas estaban en pequeños cuartos construidos junto al muro. Los residuos caían a un pozo o al exterior, y alguien debía retirarlos. En muchas viviendas se utilizaban orinales que se vaciaban manualmente. Más tarde, los inodoros de descarga se extendieron, pero necesitaron redes de agua y alcantarillado para volverse prácticos. Y estos cambios no llegaron a todo el mundo al mismo tiempo. La próxima vez que cierres la puerta del baño, recuerda que esa privacidad y comodidad tienen una historia. ¿En cuál de estas épocas te habría costado más vivir?";

const heroesNarration = "Nos enseñaron a admirarlos como conquistadores y grandes líderes. Pero la historia tiene un lado que a veces desaparece de los retratos. Alejandro Magno construyó un imperio enorme. Sin embargo, en el año trescientos treinta y cinco antes de Cristo, tras una rebelión, Tebas fue destruida y muchos supervivientes fueron esclavizados. Siglos después, Cristóbal Colón cruzó el Atlántico, dando inicio a un encuentro que transformó continentes. Pero también participó en la esclavización de indígenas del Caribe. Y Napoleón, célebre por sus victorias y reformas, impulsó en mil ochocientos dos políticas que restablecieron la esclavitud en territorios coloniales franceses. Ninguno de estos hechos borra su influencia histórica. Pero tampoco desaparecen solo porque alguien los llame héroes. Una misma figura puede ser celebrada en monumentos y recordada con dolor por otros pueblos. Estudiar historia no es buscar ídolos perfectos: es mirar también a quienes pagaron el precio. ¿A cuál te habían contado de otra manera?";

const accent = {
  rose: "#D77F68", gold: "#E0B36A", teal: "#66C6BF",
  blue: "#7EADDC", violet: "#AFA6DB", ember: "#E77D45"
};

export const medicalHistory: HistoryEpisode = {
  slug:"medicina-antigua", compositionId:"CRONICAS-MEDICINA-60S",
  name:"Tratamientos médicos antiguos que hoy dan miedo",
  title:"LOS TRATAMIENTOS MÁS INQUIETANTES",
  narration:medicalNarration, voicePath:"assets/voz-medicina.mp3",
  sources:[
    "Smithsonian National Museum of American History: https://www.americanhistory.si.edu/collections/object/nmah_1028361",
    "Smithsonian Institution, Bloodletting Instruments: https://repository.si.edu/items/511fb8ed-253c-43eb-a822-f65612352168",
    "Science Museum Group, tratamiento histórico con mercurio: https://collection.sciencemuseumgroup.org.uk/objects/co8100445/mercurial-cream-used-to-treat-syphilis-england-1880-1941"
  ],
  scenes:buildScenes([
    ["med-entry","¿IRÍAS A ESTE MÉDICO?","MEDICINA DE OTRAS ÉPOCAS",accent.ember],
    ["med-healer","SIN ANESTESIA MODERNA","EL MÉDICO Y SU PACIENTE",accent.gold],
    ["med-skull","TREPANACIÓN","INTERVENCIONES EN EL CRÁNEO",accent.rose],
    ["med-recovery","ALGUNOS SOBREVIVIERON","HUELLAS DE CICATRIZACIÓN",accent.teal],
    ["med-bloodletting","EXTRAER SANGRE","UNA ANTIGUA CREENCIA",accent.rose],
    ["med-leech","SANGUIJUELAS","TRATAMIENTO HISTÓRICO",accent.gold],
    ["med-mercury","MERCURIO PARA CURAR","SIGLOS XV AL XIX",accent.violet],
    ["med-warning","UN METAL TÓXICO","RIESGOS REALES",accent.ember],
    ["med-testing","LA MEDICINA CAMBIÓ","EVIDENCIA Y PRUEBAS",accent.teal],
    ["med-finale","¿CUÁL TE DARÍA MIEDO?","TÚ DECIDES",accent.gold],
  ]),
  captions:buildCaptions(medicalNarration)
};

export const toiletHistory: HistoryEpisode = {
  slug:"banos-historia",compositionId:"CRONICAS-BANOS-60S",
  name:"Cómo era ir al baño en distintas épocas",
  title:"¡IR AL BAÑO ERA MUY DIFERENTE!",
  narration:toiletNarration,voicePath:"assets/voz-banos.mp3",
  sources:[
    "Smithsonian Magazine, baños romanos: https://www.smithsonianmag.com/history/how-the-ancient-romans-went-to-the-bathroom-180979056/",
    "English Heritage, baños a través del tiempo: https://www.english-heritage.org.uk/visit/inspire-me/blog/blog-posts/top-10-toilets-through-time/",
    "British Association of Urological Surgeons, historia de descarga: https://www.baus.org.uk/museum/164/the_flush_toilet"
  ],
  scenes:buildScenes([
    ["toilet-hook","¡SIN PUERTAS NI PAREDES!","UN VIAJE AL PASADO",accent.teal],
    ["toilet-rome","ROMA: TODOS JUNTOS","LETRINAS COMUNALES",accent.gold],
    ["toilet-channel","AGUA BAJO LOS ASIENTOS","INGENIERÍA ROMANA",accent.blue],
    ["toilet-street","LA PRIVACIDAD ERA OTRA","LA VIDA EN LA CIUDAD",accent.teal],
    ["toilet-castle","CASTILLOS MEDIEVALES","EUROPA MEDIEVAL",accent.violet],
    ["toilet-garderobe","UNA ABERTURA EN EL MURO","EL GARDEROBE",accent.gold],
    ["toilet-chamberpot","ORINALES EN CASA","SIN TUBERÍAS MODERNAS",accent.rose],
    ["toilet-sewers","LLEGARON LAS CLOACAS","REDES DE AGUA",accent.blue],
    ["toilet-modern","EL BAÑO QUE CONOCEMOS","COMODIDAD MODERNA",accent.teal],
    ["toilet-finale","¿EN QUÉ ÉPOCA VIVIRÍAS?","ELIGE UNA",accent.gold],
  ]),
  captions:buildCaptions(toiletNarration)
};

export const heroesHistory: HistoryEpisode = {
  slug:"heroes-controvertidos", compositionId:"CRONICAS-HEROES-60S",
  name:"Héroes famosos con un lado terrible",
  title:"HÉROES... ¿O VILLANOS?",
  narration:heroesNarration, voicePath:"assets/voz-heroes.mp3",
  sources:[
    "Encyclopaedia Britannica, Alejandro y la destrucción de Tebas: https://www.britannica.com/biography/Alexander-the-Great",
    "HISTORY, Colón y esclavitud indígena: https://www.history.com/articles/christopher-columbus",
    "Asamblea Nacional de Francia, política de 1802: https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/consulat-et-premier-empire/retablissement-progressif-de-l-esclavage",
    "Bibliothèque nationale de France, expedición a Saint-Domingue: https://heritage.bnf.fr/france-ameriques/en/1802-expedition-saint-domingue-haiti-and-louisiana-purchase"
  ],
  scenes:buildScenes([
    ["hero-hook","¿HÉROES DE VERDAD?","OTRA CARA DE LA HISTORIA",accent.ember],
    ["hero-alexander","ALEJANDRO MAGNO","EL GRAN CONQUISTADOR",accent.gold],
    ["hero-thebes","TEBAS FUE DESTRUIDA","335 A. C.",accent.rose],
    ["hero-after","VICTORIA CON UN PRECIO","LOS VENCIDOS",accent.violet],
    ["hero-columbus","CRISTÓBAL COLÓN","1492 Y EL CARIBE",accent.blue],
    ["hero-caribbean","TAMBIÉN HUBO ESCLAVITUD","COMUNIDADES INDÍGENAS",accent.rose],
    ["hero-napoleon","NAPOLEÓN BONAPARTE","PODER Y REFORMAS",accent.gold],
    ["hero-law","1802: ESCLAVITUD COLONIAL","DECISIONES DEL CONSULADO",accent.ember],
    ["hero-memory","UNA HISTORIA COMPLEJA","DIFERENTES MEMORIAS",accent.violet],
    ["hero-finale","¿QUÉ OTRO HÉROE REVISARÍAS?","CUÉNTANOS",accent.gold],
  ]),
  captions:buildCaptions(heroesNarration)
};

export const historyEpisodes: HistoryEpisode[] = [medicalHistory,toiletHistory,heroesHistory];
