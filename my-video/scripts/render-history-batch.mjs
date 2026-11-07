/**
 * Renderiza 3 documentales de 60 segundos en el Codespace.
 * Detecta automáticamente si existen las voces y el manifiesto de tiempos.
 * Por defecto no realiza solicitudes de pago a ElevenLabs.
 */
import {existsSync,mkdirSync,writeFileSync,readFileSync} from "node:fs";
import {join} from "node:path";
import {spawnSync} from "node:child_process";

const project=process.cwd();
const output=join(project,"out");
mkdirSync(output,{recursive:true});
const manifest=readFileSync(join(project,"src/history-audio-manifest.ts"),"utf8");
const videos=[
  ["medicina-antigua","CRONICAS-MEDICINA-60S","medicina.mp4","voz-medicina.mp3"],
  ["banos-historia","CRONICAS-BANOS-60S","banos.mp4","voz-banos.mp3"],
  ["heroes-controvertidos","CRONICAS-HEROES-60S","heroes.mp4","voz-heroes.mp3"]
];
for(const [slug,id,mp4,audio] of videos){
  const voiceExists=existsSync(join(project,"public/assets",audio));
  const aligned=manifest.includes('"'+slug+'": {');
  const voiceEnabled=voiceExists;
  if(voiceEnabled&&!aligned)console.warn("ADVERTENCIA: "+slug+" no tiene tiempos reales; revisar subtítulos antes de publicar.");
  if(!voiceEnabled)console.warn("PREVISUALIZACIÓN SIN VOZ: "+slug+". Para publicar, ejecuta npm run voices:history.");
  const propsFile=join(output,slug+"-props.json");
  writeFileSync(propsFile,JSON.stringify({voiceEnabled}));
  console.log("Renderizando "+id+" ("+(voiceEnabled?"con voz":"sin voz")+")...");
  const res=spawnSync("npx",["remotion","render","src/index.ts",id,join("out",mp4),"--props",propsFile],{
    cwd:project,stdio:"inherit",shell:process.platform==="win32"
  });
  if(res.status!==0)process.exit(res.status||1);
  console.log("Exportado:",join(output,mp4));
}
console.log("Listos los tres MP4. Verificar imagen, voz y subtítulos ANTES de publicar.");
