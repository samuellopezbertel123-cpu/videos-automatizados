/**
 * Recuperación de Crónicas del Tiempo: genera locuciones Strick RD,
 * mezcla con el audio original y publica tres MP4 en GitHub Releases.
 * Uso: cd my-video && node /tmp/cronicas-voz-final.mjs
 * No modifica los MP4 de origen ni el código de Remotion.
 */
import {existsSync, mkdirSync, readFileSync, writeFileSync, statSync} from "node:fs";
import {join} from "node:path";
import {spawnSync} from "node:child_process";

const repo = "samuellopezbertel123-cpu/videos-automatizados";
const releaseTag = "rescate-cronicas-2026-11-08";
const voiceId = "9TZnk0CAGA9YiCg6gU9Q";
const key = process.env.ELEVENLABS_API_KEY;
const base = process.cwd();
const outputDir = join(base, "out", "voz-finales");
const sourceUrl = "https://raw.githubusercontent.com/" + repo + "/341f3c7e84503a93fbdf75d25d8d3b2a6bd5183f/my-video/src/history-series-data.ts";
const videos = [
 {title:"MEDICINA", code:"medical", input:"out/CRONICAS-MEDICINA-ANTIGUA.mp4", output:"CRONICAS-MEDICINA-4K-CON-VOZ.mp4", audio:"voz-medicina-strick.mp3"},
 {title:"BAÑOS", code:"toilet", input:"out/CRONICAS-BANO-HISTORICO-completo-4K.mp4", output:"CRONICAS-BANOS-4K-CON-VOZ.mp4", audio:"voz-banos-strick.mp3"},
 {title:"HÉROES", code:"heroes", input:"out/CRONICAS-HEROES-REVISADOS-completo-4K.mp4", output:"CRONICAS-HEROES-4K-CON-VOZ.mp4", audio:"voz-heroes-strick.mp3"}
];
function run(command,args,options={}){
 const r=spawnSync(command,args,{stdio:options.capture?"pipe":"inherit",encoding:"utf8",maxBuffer:1024*1024*16});
 if(r.error)throw new Error(command+": "+r.error.message);
 if(r.status!==0)throw new Error(command+" terminó con código "+r.status+(options.capture?": "+r.stderr:""));
 return options.capture?(r.stdout||"").trim():"";
}
if(!key){console.error("No se detecta ELEVENLABS_API_KEY en Codespaces.");process.exit(1);}
for(const cmd of ["ffmpeg","ffprobe","gh"]){try{run(cmd,["-version"],{capture:true});}catch(e){
 if(cmd==="gh"){try{run("gh",["--version"],{capture:true});continue;}catch{}}
 console.error("Falta "+cmd+". Instala FFmpeg con: sudo apt-get update && sudo apt-get install -y ffmpeg");process.exit(1);
}}
try{run("gh",["auth","status"],{capture:true});}catch{console.error("GitHub CLI no autenticada. Usa gh auth login.");process.exit(1);}
mkdirSync(outputDir,{recursive:true});
console.log("Consultando guiones originales sin modificar los archivos nuevos...");
const res=await fetch(sourceUrl);
if(!res.ok)throw new Error("No se pudo recuperar el guion original: HTTP "+res.status);
const source=await res.text();
const transcript={};
for(const video of videos){
 const match=source.match(new RegExp('const '+video.code+'Narration = "([^"]+)";'));
 if(!match)throw new Error("No se encuentra el guion "+video.code);
 transcript[video.code]=match[1];
}
console.log("Fuente comprobada. Se generará voz Strick RD para los tres episodios; ElevenLabs puede consumir créditos.");
for(const video of videos){
 try{
  const original=join(base,video.input);
  const target=join(outputDir,video.output);
  const voiceFile=join(outputDir,video.audio);
  if(!existsSync(original)||statSync(original).size<1000000){console.error("NO EXISTE MP4 COMPLETO: "+video.input);continue;}
  if(existsSync(target)&&statSync(target).size>1000000){console.log("Ya existe video final, se omite: "+video.output);}
  else{
   if(!existsSync(voiceFile)||statSync(voiceFile).size<1000){
    console.log("Generando con ElevenLabs: "+video.title+" (voz Strick RD)...");
    const response=await fetch("https://api.elevenlabs.io/v1/text-to-speech/"+voiceId+"?output_format=mp3_44100_128",{
     method:"POST",
     headers:{"xi-api-key":key,"Content-Type":"application/json"},
     body:JSON.stringify({text:transcript[video.code],model_id:"eleven_multilingual_v2",voice_settings:{stability:0.56,similarity_boost:0.78}})
    });
    if(!response.ok)throw new Error("ElevenLabs HTTP "+response.status+": "+(await response.text()).slice(0,400));
    const bytes=Buffer.from(await response.arrayBuffer());
    if(bytes.length<1000)throw new Error("La voz descargada está vacía");
    writeFileSync(voiceFile,bytes);
   }else console.log("Reutilizando voz Strick RD existente para "+video.title);
   const durationText=run("ffprobe",["-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",voiceFile],{capture:true});
   const duration=Number(durationText);
   if(!Number.isFinite(duration)||duration<=0)throw new Error("Duración de narración inválida");
   const speed=Math.max(0.5,Math.min(2,duration/58.5));
   console.log(video.title+": narración "+duration.toFixed(1)+"s; velocidad ajustada x"+speed.toFixed(3));
   if(duration/58.5>1.4)console.warn("AVISO: Locución larga, revisar naturalidad de la velocidad antes de publicar.");
   const audioProbe=run("ffprobe",["-v","error","-select_streams","a","-show_entries","stream=index","-of","csv=p=0",original],{capture:true});
   const containsSound=audioProbe.length>0;
   const delay="adelay=400|400";
   let args=["-y","-i",original,"-i",voiceFile];
   if(containsSound){
    args.push("-filter_complex","[0:a:0]volume=0.48[original];[1:a:0]atempo="+speed.toFixed(5)+","+delay+",volume=1.35[narracion];[original][narracion]amix=inputs=2:duration=first:dropout_transition=0,alimiter=limit=0.95[mezcla]",
      "-map","0:v:0","-map","[mezcla]");
   }else{
    args.push("-filter:a","atempo="+speed.toFixed(5)+","+delay+",volume=1.1","-map","0:v:0","-map","1:a:0");
   }
   args.push("-c:v","copy","-c:a","aac","-b:a","192k","-t","60","-movflags","+faststart",target);
   console.log("Mezclando audio con MP4 4K sin volver a renderizar video...");
   run("ffmpeg",args);
   if(!existsSync(target)||statSync(target).size<1000000)throw new Error("No se produjo archivo MP4");
   const audioCheck=run("ffprobe",["-v","error","-select_streams","a","-show_entries","stream=codec_name","-of","csv=p=0",target],{capture:true});
   if(!audioCheck.includes("aac"))throw new Error("No se verificó pista de voz");
  }
  console.log("Subiendo MP4 narrado a GitHub Releases...");
  run("gh",["release","upload",releaseTag,target,"-R",repo,"--clobber"]);
  console.log("COMPLETADO: "+video.output);
 }catch(e){console.error("ERROR EN "+video.title+": "+e.message);}
}
console.log("FIN. Abre GitHub Releases, borrador 'Crónicas del Tiempo - Videos recuperados'.");
console.log("Los originales 4K permanecen intactos. Revisa sincronización y volumen antes de publicar.");
