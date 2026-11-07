/**
 * Genera las 3 narraciones con la MISMA voz "Strick RD – Narraciones" usada en Pompeya.
 * ElevenLabs cobra por la síntesis: se ejecuta solo bajo orden explícita.
 * Al no pasar --force nunca se cobra dos veces por una voz ya descargada.
 * Requiere ELEVENLABS_API_KEY como variable de entorno/secret local.
 */
import {readFileSync,writeFileSync,mkdirSync,existsSync} from "node:fs";
import {join,dirname} from "node:path";

const here=process.cwd();
const source=readFileSync(join(here,"src/history-series-data.ts"),"utf8");
const key=process.env.ELEVENLABS_API_KEY;
if(!key){
  console.error("Falta ELEVENLABS_API_KEY. Configúrala en Codespaces Secrets, no en archivos ni en el chat.");
  process.exit(1);
}
const voiceId=process.env.ELEVENLABS_VOICE_ID || "9TZnk0CAGA9YiCg6gU9Q";
const modelId=process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
const force=process.argv.includes("--force");
const all=[
  {slug:"medicina-antigua",prefix:"medical",file:"voz-medicina.mp3"},
  {slug:"banos-historia",prefix:"toilet",file:"voz-banos.mp3"},
  {slug:"heroes-controvertidos",prefix:"heroes",file:"voz-heroes.mp3"},
];
const manifestPath=join(here,"src/history-audio-manifest.ts");
const saved={};
const existing=readFileSync(manifestPath,"utf8");
const marker="export const historyAudioManifest: Record<string, HistoryAudioInfo> = ";
const at=existing.indexOf(marker);
if(at>=0){
  try{saved.original=JSON.parse(existing.slice(at+marker.length).trim().replace(/;$/,""));}catch{}
}
const manifest=saved.original||{};
const toTranscriptWords=(aligned)=>{
  const letters=aligned.characters||[];
  const starts=aligned.character_start_times_seconds||[];
  const ends=aligned.character_end_times_seconds||[];
  const words=[];
  let text="",start=0,end=0;
  const flush=()=>{
    if(text){words.push({text,start,end});text="";}
  };
  letters.forEach((c,i)=>{
    if(/\s/.test(c)){flush();return;}
    if(!text)start=starts[i]??0;
    text+=c;
    end=ends[i]??start;
  });
  flush();
  return words;
};
function saveManifest(){
  writeFileSync(manifestPath,
    'import type { HistoryCaption } from "./history-series-data";\n'+
    'export type HistoryAudioInfo = { playbackRate: number; captions: HistoryCaption[]; durationSeconds: number };\n'+
    'export const historyAudioManifest: Record<string, HistoryAudioInfo> = '+JSON.stringify(manifest,null,2)+';\n');
}
for(const e of all){
  const filename=join(here,"public/assets",e.file);
  if(existsSync(filename)&&!force){
    console.log("Omitiendo archivo existente (sin gasto de créditos):",e.file);
    continue;
  }
  const match=source.match(new RegExp('const '+e.prefix+'Narration = "([^"]+)";'));
  if(!match)throw Error("No se encontró el guion de "+e.slug);
  console.log("Generando narración: "+e.slug);
  const resp=await fetch("https://api.elevenlabs.io/v1/text-to-speech/"+voiceId+"/with-timestamps?output_format=mp3_44100_128",{
    method:"POST",
    headers:{"xi-api-key":key,"Content-Type":"application/json"},
    body:JSON.stringify({text:match[1],model_id:modelId,voice_settings:{stability:.56,similarity_boost:.78}}),
  });
  if(!resp.ok){
    const message=(await resp.text()).slice(0,650);
    throw Error("ElevenLabs respondió "+resp.status+" en "+e.slug+": "+message);
  }
  const result=await resp.json();
  if(!result.audio_base64)throw Error("ElevenLabs no devolvió audio para "+e.slug);
  const alignment=result.normalized_alignment||result.alignment;
  if(!alignment?.characters?.length)throw Error("Sin alineación real para "+e.slug);
  const words=toTranscriptWords(alignment);
  const durationSeconds=alignment.character_end_times_seconds.at(-1);
  if(!durationSeconds||durationSeconds<=0)throw Error("Duración de voz inválida");
  const playbackRate=Number((durationSeconds/58.5).toFixed(4));
  if(playbackRate<.80||playbackRate>1.27){
    throw Error("Locución fuera del margen para 60s: "+durationSeconds.toFixed(1)+"s. Ajustar guion antes de pagar otra voz.");
  }
  const cues=[];
  const groups=[];
  for(let i=0;i<words.length;i+=6)groups.push(words.slice(i,i+6));
  groups.forEach((group,i)=>{
    const from=Math.min(1790,15+Math.round(group[0].start/playbackRate*30));
    const next=i===groups.length-1?1799:Math.min(1799,15+Math.round(groups[i+1][0].start/playbackRate*30));
    cues.push({from,duration:Math.max(5,next-from),text:group.map(w=>w.text).join(" ")});
  });
  mkdirSync(dirname(filename),{recursive:true});
  writeFileSync(filename,Buffer.from(result.audio_base64,"base64"));
  manifest[e.slug]={playbackRate,captions:cues,durationSeconds};
  saveManifest();
  console.log("Audio y subtítulos sincronizados:",e.slug,durationSeconds.toFixed(1)+" s",cues.length+" subtítulos");
}
saveManifest();
console.log("Completado. Para exportar: npm run render:historia-batch");
