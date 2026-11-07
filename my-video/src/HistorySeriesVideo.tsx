import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { HistoryEpisode, HistoryScene } from "./history-series-data";
import { historyAudioManifest } from "./history-audio-manifest";

const C = {
  ink: "#101923",
  darkest: "#080f18",
  ivory: "#F8E9C9",
  gold: "#E7BC70",
  goldDark: "#9D663C",
  clay: "#B96F52",
  red: "#C45B4B",
  teal: "#69BCB7",
  stone: "#B49B7F",
  water: "#4F9DB0",
  navy: "#253E52",
};
const clamp = {extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
const txy = (x:number,y:number,scale=1) =>
  "translate("+x+" "+y+") scale("+scale+")";

const Figure: React.FC<{
  x:number; y:number; scale?:number; frame:number;
  role?: "doctor"|"patient"|"roman"|"worker"|"king"|"sailor"|"napoleon"|"modern";
  action?: "talk"|"walk"|"run"|"point"|"examine"|"stand"|"worry";
}> = ({x,y,scale=1,frame,role="roman",action="stand"}) => {
  const walking = action==="walk"||action==="run";
  const rate = action==="run" ? 3 : 6;
  const stride = walking ? Math.sin(frame/rate)*26 : 0;
  const arm = action==="point" ? -48 : action==="examine" ? 33 + Math.sin(frame/6)*17 : action==="worry" ? -58 : walking ? Math.sin(frame/rate)*22 : Math.sin(frame/20)*7;
  const bob = walking ? Math.abs(Math.sin(frame/rate))*8 : Math.sin(frame/24)*3;
  const nod = action==="talk" ? Math.sin(frame/8)*5 : action==="worry" ? -7 : 0;
  const skin = role==="patient" ? "#DCA77C" : role==="king" ? "#B88565" : "#D7A275";
  const coat = role==="doctor" ? "#EEE0C7" : role==="patient" ? "#A4775F" :
    role==="king" ? "#A34E45" : role==="worker" ? "#B1A27F" :
    role==="sailor" ? "#688F9B" : role==="napoleon" ? "#30475A" :
    role==="modern" ? "#F1E9DF" : "#BD8060";
  return (
    <g transform={txy(x,y+bob,scale)}>
      <ellipse cx="0" cy="12" rx="65" ry="18" fill="#090C10" opacity=".32"/>
      <g transform={"rotate("+stride+" -20 -40)"}>
        <path d="M-20-76Q-32-23-38 4" fill="none" stroke="#4F3C39" strokeWidth="23" strokeLinecap="round"/>
        <path d="M-46 4H-13" stroke="#2C2829" strokeWidth="16" strokeLinecap="round"/>
      </g>
      <g transform={"rotate("+(-stride)+" 20 -40)"}>
        <path d="M20-76Q33-23 37 4" fill="none" stroke="#4F3C39" strokeWidth="23" strokeLinecap="round"/>
        <path d="M28 4H59" stroke="#2C2829" strokeWidth="16" strokeLinecap="round"/>
      </g>
      <g transform={"rotate("+nod+" 0 -155)"}>
        <path d="M-40-175Q-62-130-52-72L51-72Q62-142 40-175Z" fill={coat} stroke="#382D2B" strokeWidth="7"/>
        <path d="M-47-96Q0-76 45-96" stroke={role==="napoleon" ? "#E9BD6F" : "#D5B37F"} strokeWidth="11" fill="none"/>
        <g transform={"rotate("+(-arm)+" -40 -158)"}>
          <path d="M-40-157Q-74-138-72-97L-59-81" stroke={role==="doctor"||role==="modern" ? coat : skin} strokeWidth="22" strokeLinecap="round" fill="none"/>
        </g>
        <g transform={"rotate("+arm+" 40 -159)"}>
          <path d="M40-158Q77-139 74-97L67-81" stroke={role==="doctor"||role==="modern" ? coat : skin} strokeWidth="22" strokeLinecap="round" fill="none"/>
          {action==="point" && <path d="M67-82L101-120" stroke={skin} strokeWidth="9" strokeLinecap="round"/>}
        </g>
        <g transform={"translate(0 -214) rotate("+nod/2+")"}>
          <ellipse cy="-2" cx="0" rx="40" ry="48" fill={skin} stroke="#4B3027" strokeWidth="5"/>
          <path d="M-39-4Q-49-61 3-61Q45-57 42-9Q4-37-38-14Z" fill={role==="napoleon" ? "#2D2729" : "#4E342D"}/>
          <ellipse cx="-14" cy="-2" rx="4" ry={frame%91<4 ? 1 : 5} fill="#342725"/>
          <ellipse cx="14" cy="-2" rx="4" ry={frame%91<4 ? 1 : 5} fill="#342725"/>
          <path d={action==="worry" ? "M-11 26Q0 11 12 26" : "M-11 22Q0 28 12 22"} stroke="#753F36" strokeWidth="4" fill="none"/>
          {role==="doctor" && <path d="M-48-52Q0-84 46-52V-32H-48Z" fill="#DDD5C8" stroke="#413A39" strokeWidth="5"/>}
          {role==="king" && <path d="M-44-54  -31-95  -4-70  18-101  43-53Z" fill={C.gold} stroke="#6D4E37" strokeWidth="6"/>}
          {role==="napoleon" && <path d="M-56-51Q0-108 56-51L43-39H-43Z" fill="#2A2C34" stroke={C.gold} strokeWidth="7"/>}
          {role==="sailor" && <path d="M-45-44Q0-80 45-44H-45" stroke="#E9D1A1" strokeWidth="10" fill="#46576B"/>}
        </g>
      </g>
    </g>
  );
};

const MarbleArch: React.FC<{x:number;y:number;scale?:number;gray?:boolean}> =
({x,y,scale=1,gray=false})=>(
  <g transform={txy(x,y,scale)}>
    <path d="M-200 250V-140Q-200-345 0-345Q200-345 200-140V250Z" fill={gray?"#8D857E":"#C18D65"} stroke="#EDC99D" strokeWidth="26"/>
    <path d="M-114 250V-125Q-114-260 0-260Q114-260 114-125V250Z" fill={C.navy} stroke="#674D43" strokeWidth="18"/>
    <path d="M-225-140H225M-227 220H227" stroke="#E0C397" strokeWidth="25"/>
    <path d="M-155-280L152-280" stroke="#EBD1A9" strokeWidth="11" opacity=".65"/>
  </g>
);
const Lantern:React.FC<{x:number;y:number;frame:number;scale?:number}> = ({x,y,frame,scale=1}) => (
  <g transform={txy(x,y,scale)}>
    <ellipse rx={78+Math.sin(frame/9)*6} ry={95+Math.sin(frame/9)*8} fill="#FFB765" opacity=".13"/>
    <path d="M-22-32H22L33 32H-33Z" fill="#E6B46B" stroke="#4A3935" strokeWidth="7"/>
    <rect x="-16" y="-20" width="32" height="43" fill="#F8D18B"/>
    <path d="M-7-40V-56H7V-40" stroke="#E3CFA9" strokeWidth="6" fill="none"/>
  </g>
);
const Skull:React.FC<{x:number;y:number;frame:number;scale?:number}> = ({x,y,frame,scale=1}) => (
  <g transform={txy(x,y,scale)}>
    <ellipse rx="210" ry="236" cy="-30" fill="#E3C8A5" stroke="#5B4940" strokeWidth="20"/>
    <ellipse cx="-76" cy="-12" rx="54" ry="64" fill="#463932"/>
    <ellipse cx="76" cy="-12" rx="54" ry="64" fill="#463932"/>
    <path d="M0 2 -30 80 30 80Z" fill="#55423C"/>
    <path d="M-85 142Q0 185 85 142V203H-85Z" fill="#D8B893" stroke="#665348" strokeWidth="10"/>
    {Array.from({length:7},(_,i)=><path key={i} d={"M"+(-65+i*21)+" 157V200"} stroke="#73594B" strokeWidth="5"/>)}
    <circle cx="93" cy="-136" r={45+Math.sin(frame/15)*3} fill="#8A5950" stroke="#D9B477" strokeWidth="13"/>
    <path d="M51-153Q92-185 132-150" stroke="#F6DBA4" strokeWidth="9" fill="none"/>
  </g>
);
const Bottle:React.FC<{x:number;y:number;frame:number;label:string;accent?:string;scale?:number}> =
({x,y,frame,label,accent=C.teal,scale=1})=>(
  <g transform={txy(x,y+Math.sin(frame/18)*6,scale)}>
    <path d="M-36-165H36V-110Q80-63 83 3V120Q0 166-83 120V3Q-80-63-36-110Z" fill="#72A4A9" stroke="#E9D9B0" strokeWidth="13"/>
    <path d="M-66 23Q0 7 66 23V111Q0 136-66 111Z" fill={accent} opacity=".87"/>
    <path d="M-48-160H48" stroke="#FFE4B4" strokeWidth="16"/>
    <text y="65" fill="#201D20" textAnchor="middle" fontFamily="Georgia" fontWeight="bold" fontSize="47">{label}</text>
    <path d="M-49-56Q-30-87-13-76" stroke="#E8FFEE" strokeWidth="9" opacity=".6" fill="none"/>
  </g>
);

const MedicalArt:React.FC<{kind:HistoryScene["kind"];frame:number}> = ({kind,frame}) => {
  const skull = kind==="med-skull"||kind==="med-recovery";
  return (
    <>
      <MarbleArch x={530} y={920} scale={1.6}/>
      <rect x="0" y="1315" width="1080" height="605" fill="#553D3A"/>
      <path d="M0 1430H1080M0 1500H1080" stroke="#D3A779" strokeWidth="18" opacity=".5"/>
      <Lantern x={900} y={540} frame={frame}/>
      {skull ? (
        <>
          <Skull x={540} y={1020} frame={frame} scale={1.16}/>
          {kind==="med-skull" &&
            <g transform={"rotate("+(frame/5%45-22)+" 720 744)"}>
              <path d="M720 744V460" stroke="#B6BCC2" strokeWidth="19" strokeLinecap="round"/>
              <path d="M693 456H746" stroke="#EFE6CA" strokeWidth="19"/>
            </g>}
          {kind==="med-recovery" &&
            <path d={"M675 881Q710 "+(805+Math.sin(frame/17)*5)+" 752 824"} stroke={C.teal} strokeWidth="22" fill="none" strokeLinecap="round"/>}
        </>
      ):null}
      {kind==="med-entry"||kind==="med-healer" ? (
        <>
          <rect x="95" y="930" width="890" height="105" rx="18" fill="#B58B69" stroke="#E2C89E" strokeWidth="18"/>
          <Figure x={286} y={1400} frame={frame} scale={1.75} role="doctor" action="examine"/>
          <Figure x={790} y={1435} frame={frame+8} scale={1.45} role="patient" action={kind==="med-entry"?"worry":"talk"}/>
          <Bottle x={537} y={1081} frame={frame} label="Rx" scale={0.55}/>
        </>
      ):null}
      {kind==="med-bloodletting"||kind==="med-leech" ? (
        <>
          <Figure x={258} y={1430} frame={frame} scale={1.8} role="doctor" action="examine"/>
          <Figure x={840} y={1470} frame={frame} scale={1.5} role="patient" action="worry"/>
          <path d="M450 1256H674" stroke="#D6AF79" strokeWidth="25"/>
          {kind==="med-bloodletting" ?
            <Bottle x={555} y={1065} frame={frame} label="+" accent="#C45A56" scale={1.15}/> :
            <>
              <path d={"M457 1091Q"+(530+Math.sin(frame/13)*28)+" 1012 573 1091T690 1086"} fill="none" stroke="#352B2E" strokeWidth="32" strokeLinecap="round"/>
              <path d="M472 1084Q555 1015 675 1085" fill="none" stroke="#A5A07B" strokeWidth="8" strokeDasharray="21 24"/>
            </>}
        </>
      ):null}
      {kind==="med-mercury"||kind==="med-warning" ? (
        <>
          <Bottle x={505} y={980} frame={frame} label="Hg" accent="#B9BFC4" scale={1.65}/>
          <Figure x={200} y={1460} frame={frame} role="doctor" action="examine" scale={1.48}/>
          <Figure x={868} y={1470} frame={frame} role="patient" action="worry" scale={1.48}/>
          {kind==="med-warning" && <g opacity={0.65+Math.sin(frame/9)*0.2}>
            <circle cx="535" cy="581" r="110" fill="#AD4848" opacity=".3"/>
            <path d="M510 508 560 608M560 508 510 608" stroke="#FFE4C9" strokeWidth="25" strokeLinecap="round"/>
          </g>}
        </>
      ):null}
      {kind==="med-testing"||kind==="med-finale" ? (
        <>
          <Figure x={320} y={1440} frame={frame} role="modern" action="point" scale={1.8}/>
          <g transform={txy(760,850)}>
            <rect x="-175" y="-305" width="350" height="545" rx="22" fill="#F6E9D6" stroke="#49616A" strokeWidth="16"/>
            <path d="M-122-176 -62-90 30-210 117-24" stroke="#62B6AE" strokeWidth="19" fill="none"/>
            <path d="M-115 28H110M-115 92H95M-115 156H38" stroke="#8AACA6" strokeWidth="14"/>
          </g>
        </>
      ):null}
    </>
  );
};

const ToiletSeat: React.FC<{x:number;y:number;frame:number;scale?:number}> =
({x,y,frame,scale=1})=>(
  <g transform={txy(x,y,scale)}>
    <rect x="-126" y="-36" width="252" height="105" rx="20" fill="#D9C5A2" stroke="#544B49" strokeWidth="14"/>
    <ellipse cx="0" cy="0" rx="56" ry="20" fill="#27343C"/>
    <path d="M-105 69V275H105V69" fill="#B6A388" stroke="#5F4C44" strokeWidth="12"/>
    <path d="M-95 276H94" stroke="#DCC39B" strokeWidth="24"/>
    <path d={"M-80 "+(310+Math.sin(frame/7)*7)+"Q0 320 90 305"} stroke="#5FB9D6" strokeWidth="14" fill="none"/>
  </g>
);
const Castle:React.FC<{frame:number;scale?:number}> = ({frame,scale=1}) => (
  <g transform={txy(520,1100,scale)}>
    <path d="M-470 330V-275H-340V-400H-185V-285H160V-430H328V-270H465V330Z" fill="#99908A" stroke="#EEE0C6" strokeWidth="18"/>
    <path d="M-470-267H-410V-332H-340V-270M-185-285V-355H-120V-285M160-295V-355H223V-295M328-270V-345H390V-270" fill="none" stroke="#EFE4D6" strokeWidth="20"/>
    <path d="M-104 331V110Q0-15 104 110V331" fill="#22313A" stroke="#E5CFA9" strokeWidth="20"/>
    <path d="M-332-112H-202V48H-332ZM204-122H335V52H204Z" fill="#192931" stroke="#D6C2A6" strokeWidth="15"/>
    <path d="M-470 240Q0 220 465 245" stroke="#D2B391" strokeWidth="17" fill="none"/>
    <path d={"M-445 "+(420+Math.sin(frame/11)*5)+"H460"} stroke="#594337" strokeWidth="20" opacity=".7"/>
  </g>
);
const ToiletArt:React.FC<{kind:HistoryScene["kind"];frame:number}> = ({kind,frame}) => {
  const romans=["toilet-hook","toilet-rome","toilet-channel","toilet-street"].includes(kind);
  const medieval=["toilet-castle","toilet-garderobe","toilet-chamberpot"].includes(kind);
  return (
    <>
      {romans &&
        <>
          <path d="M0 490H1080V1470H0Z" fill="#BB896A"/>
          <g opacity=".75"><MarbleArch x={142} y={1040} scale={1.17}/><MarbleArch x={917} y={1030} scale={1.17}/></g>
          <path d="M0 1400H1080V1920H0Z" fill="#5E777B"/>
          <path d={"M0 "+(1500+Math.sin(frame/9)*9)+"Q360 1462 700 1506T1080 1470"} stroke="#7BC5D4" strokeWidth="25" fill="none" opacity=".8"/>
          <ToiletSeat x={252} y={1075} frame={frame} scale={kind==="toilet-channel"?0.85:1.1}/>
          <ToiletSeat x={580} y={1075} frame={frame+10} scale={kind==="toilet-channel"?0.85:1.1}/>
          <ToiletSeat x={905} y={1075} frame={frame+21} scale={kind==="toilet-channel"?0.85:1.1}/>
          {kind==="toilet-hook"||kind==="toilet-rome"||kind==="toilet-street" ?
            <>
              <Figure x={220+Math.sin(frame/13)*6} y={1630} frame={frame} role="roman" action="talk" scale={1.48}/>
              <Figure x={778} y={1615} frame={frame+10} role="roman" action="worry" scale={1.35}/>
            </>:null}
          {kind==="toilet-channel" &&
            <g><path d={"M60 "+(1720+Math.sin(frame/8)*5)+"Q300 1660 540 1720T1020 1710"} fill="none" stroke="#8DE1E8" strokeWidth="40"/>
              {Array.from({length:7},(_,i)=><circle key={i} cx={(i*195+frame*7)%1080} cy={1720+Math.sin(frame/10+i)*12} r={12+i%3*4} fill="#E7F0EE" opacity=".65"/>)}
            </g>}
        </>
      }
      {medieval &&
        <>
          <Castle frame={frame} scale={1.13}/>
          {kind==="toilet-castle" ? <><Figure x={325} y={1640} frame={frame} role="king" action="point" scale={1.75}/><Figure x={838} y={1640} frame={frame+12} role="worker" action="walk" scale={1.35}/></>:null}
          {kind==="toilet-garderobe" &&
            <>
              <rect x="617" y="1002" width="261" height="205" rx="15" fill="#4B4C49" stroke="#F3D7AD" strokeWidth="18"/>
              <ellipse cx="738" cy="1036" rx="64" ry="23" fill="#23272B" stroke="#F0DDB6" strokeWidth="11"/>
              <path d="M738 1057V1670" stroke="#8E7160" strokeWidth="18" strokeDasharray="15 26" opacity=".6"/>
              <Figure x={282} y={1637} frame={frame} role="king" action="worry" scale={1.6}/>
            </>}
          {kind==="toilet-chamberpot" &&
            <>
              <path d="M152 1370Q144 1625 321 1655H540Q713 1620 709 1370Z" fill="#D5B485" stroke="#F6E2BC" strokeWidth="22"/>
              <ellipse cx="430" cy="1376" rx="278" ry="55" fill="#56433B" stroke="#DDB98F" strokeWidth="19"/>
              <Figure x={810} y={1650} frame={frame} role="worker" action="point" scale={1.57}/>
            </>}
        </>
      }
      {(kind==="toilet-sewers"||kind==="toilet-modern"||kind==="toilet-finale") &&
        <>
          <rect x="70" y="450" width="940" height="1100" rx="54" fill="#C8D5CF" stroke="#F4E8D5" strokeWidth="20"/>
          <path d="M170 500V1480M900 500V1480" stroke="#91ABA5" strokeWidth="18"/>
          <rect x="470" y="920" width="325" height="410" rx="70" fill="#F1E8D8" stroke="#899B94" strokeWidth="24"/>
          <ellipse cx="632" cy="945" rx="153" ry="60" fill="#577E87" stroke="#F5E9D3" strokeWidth="28"/>
          <rect x="523" y="805" width="225" height="120" rx="22" fill="#F4EEE1" stroke="#91A8A4" strokeWidth="19"/>
          <circle cx="641" cy="862" r="15" fill="#6C9898"/>
          <path d={"M648 "+(1350+Math.sin(frame/5)*10)+"Q730 1380 784 1491"} stroke="#6EB8CE" strokeWidth="28" fill="none" opacity=".8"/>
          {kind==="toilet-sewers" &&
            <g><path d="M646 1350V1730M640 1730H120" stroke="#4B93A2" strokeWidth="64" fill="none"/>
              <path d={"M610 1670H"+(850+Math.sin(frame/10)*22)} stroke="#6CCBDC" strokeWidth="22"/>
            </g>}
          {kind==="toilet-modern"||kind==="toilet-finale" ? <Figure x={277} y={1590} frame={frame} role="modern" action="point" scale={1.33}/>:null}
        </>
      }
    </>
  );
};

const Ship:React.FC<{frame:number}> = ({frame})=>(
  <g transform={"translate(0 "+Math.sin(frame/13)*13+")"}>
    <path d="M104 1180Q550 1250 980 1180L868 1360H270Z" fill="#764E38" stroke="#E7C29A" strokeWidth="25"/>
    <path d="M542 1180V452M552 512 830 788 552 842Z" fill="#E9DEC3" stroke="#503C32" strokeWidth="14"/>
    <path d="M546 590 278 850 546 900Z" fill="#D2B98F" stroke="#503C32" strokeWidth="14"/>
    <path d="M540 400 540 1180" stroke="#4B3832" strokeWidth="22"/>
    <path d="M525 397 697 474 524 517Z" fill="#A44F42"/>
    <path d="M182 1207H909" stroke="#49322B" strokeWidth="15"/>
  </g>
);
const BattleTown:React.FC<{frame:number;destroyed:boolean}> = ({frame,destroyed})=>(
  <>
    <path d="M70 1412V817H360V1412M443 1412V747H820V1412M861 1412V858H1035V1412" fill={destroyed?"#6B5851":"#B58C68"} stroke="#E2C49C" strokeWidth="19"/>
    <path d="M45 824 204 689 385 824M408 764 632 613 848 764" fill={destroyed?"#4E4544":"#865D4C"} stroke="#F3D3A7" strokeWidth="15"/>
    <path d="M144 940H292V1105H144ZM520 888H739V1108H520Z" fill="#273747"/>
    {destroyed && <>
      <path d="M93 730 150 770M600 610 675 662M900 837 935 908" stroke="#F3B76C" strokeWidth="25"/>
      {Array.from({length:9},(_,i)=>(
        <circle key={i} cx={(i*159+frame*0.8)%1080} cy={270+i%4*108+Math.sin(frame/9+i)*16}
          r={32+i%3*11} fill="#6B6666" opacity=".42"/>
      ))}
    </>}
  </>
);
const HistoryHeroArt:React.FC<{kind:HistoryScene["kind"];frame:number}> = ({kind,frame})=>{
  const alex=["hero-hook","hero-alexander","hero-thebes","hero-after"].includes(kind);
  const col=["hero-columbus","hero-caribbean"].includes(kind);
  const nap=["hero-napoleon","hero-law"].includes(kind);
  return (
    <>
      {alex &&
        <>
          <BattleTown frame={frame} destroyed={kind==="hero-thebes"||kind==="hero-after"}/>
          <Figure x={294} y={1530} frame={frame} role="king" action={kind==="hero-thebes"?"worry":"point"} scale={2.07}/>
          <Figure x={811} y={1620} frame={frame+12} role="worker" action={kind==="hero-after"?"walk":"worry"} scale={1.28}/>
          {kind==="hero-thebes" && <path d="M0 1590Q280 1470 570 1570T1080 1530V1920H0Z" fill="#482C2C" opacity=".53"/>}
        </>
      }
      {col &&
        <>
          <circle cx="813" cy="560" r="230" fill="#E8B97B" opacity=".44"/>
          <path d="M0 1180Q290 1046 557 1190T1080 1124V1920H0Z" fill="#246276"/>
          <path d={"M0 "+(1470+Math.sin(frame/12)*11)+"Q240 1420 540 1470T1080 1450"} stroke="#7EC7CB" strokeWidth="22" fill="none"/>
          <Ship frame={frame}/>
          {kind==="hero-caribbean" &&
            <>
              <rect x="0" y="1320" width="1080" height="600" fill="#1E3B48" opacity=".62"/>
              <Figure x={264} y={1720} frame={frame} role="worker" action="worry" scale={1.75}/>
              <Figure x={854} y={1710} frame={frame+8} role="worker" action="worry" scale={1.68}/>
            </>}
        </>
      }
      {nap &&
        <>
          <rect x="113" y="410" width="855" height="900" rx="33" fill="#BFA88B" stroke="#EBD3AD" strokeWidth="20"/>
          <path d="M140 530H944M140 1130H943" stroke="#695342" strokeWidth="19"/>
          <Figure x={298} y={1540} frame={frame} role="napoleon" action="point" scale={2.15}/>
          {kind==="hero-law" &&
            <g>
              <path d="M565 700H940V1220H565Z" fill="#F5E5C5" stroke="#7E604F" strokeWidth="20"/>
              <text x="754" y="838" fill="#514239" fontFamily="Georgia" fontWeight="bold" fontSize="74" textAnchor="middle">1802</text>
              <path d="M622 929H877M622 1015H855M622 1090H816" stroke="#927963" strokeWidth="17"/>
            </g>}
          {kind==="hero-napoleon" &&
            <><path d="M605 790L865 855L617 920Z" fill="#E7BB78" stroke="#8B5B42" strokeWidth="15"/>
            <Lantern x={820} y={1140} frame={frame} scale={1.5}/></>}
        </>
      }
      {(kind==="hero-memory"||kind==="hero-finale") &&
        <>
          <BattleTown frame={frame} destroyed={false}/>
          <g opacity=".77">
            <Figure x={206} y={1570} frame={frame} role="king" action="stand" scale={1.6}/>
            <Figure x={535} y={1600} frame={frame+6} role="sailor" action="stand" scale={1.55}/>
            <Figure x={856} y={1580} frame={frame+12} role="napoleon" action="stand" scale={1.62}/>
          </g>
          <path d="M63 1661Q530 1530 1011 1654" stroke="#F1D4A9" strokeWidth="16" fill="none"/>
        </>
      )}
    </>
  );
};

const VisualShot:React.FC<{scene:HistoryScene;episode:HistoryEpisode}> = ({scene,episode}) => {
  const frame=useCurrentFrame();
  const pct=Math.min(1,frame/Math.max(1,scene.duration-1));
  const zoom=1.025+0.055*pct;
  const travelX=episode.slug==="banos-historia" ? -18+30*pct : 17-34*pct;
  const travelY=12-30*pct;
  const textOpacity=interpolate(frame,[0,10,scene.duration-20,scene.duration-1],[0,1,1,.15],clamp);
  const titleY=interpolate(frame,[0,17],[32,0],{...clamp,easing:Easing.out(Easing.cubic)});
  const category=episode.slug==="medicina-antigua"?"MEDICINA":episode.slug==="banos-historia"?"COSTUMBRES":"PERSONAJES";
  const med=episode.slug==="medicina-antigua";
  const bath=episode.slug==="banos-historia";
  return <AbsoluteFill style={{backgroundColor:C.darkest,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:-30,transform:"translate("+travelX+"px,"+travelY+"px) scale("+zoom+")"}}>
      <svg width="100%" height="100%" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="history-bg" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0" stopColor={med?"#1B2430":bath?"#213E48":"#212C3B"}/>
            <stop offset=".66" stopColor={med?"#62433C":bath?"#405B60":"#64473F"}/>
            <stop offset="1" stopColor="#171B24"/>
          </linearGradient>
          <radialGradient id="history-halo">
            <stop offset="0" stopColor={scene.accent} stopOpacity=".52"/>
            <stop offset="1" stopColor={scene.accent} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#history-bg)"/>
        <circle cx={830-frame*.23} cy={465+Math.sin(frame/30)*15} r="450" fill="url(#history-halo)"/>
        <g opacity=".16">
          {Array.from({length:25},(_,i)=>(
            <circle key={i} cx={(i*147+frame*(i%2?0.7:-0.3)+4000)%1080} cy={(i*263+frame*.8)%1920}
              r={i%5===0?5:2.3} fill={C.ivory}/>
          ))}
        </g>
        <g transform={"translate(0 "+Math.sin(frame/33)*4+")"}>
          {med?<MedicalArt kind={scene.kind} frame={frame}/>:bath?<ToiletArt kind={scene.kind} frame={frame}/>:<HistoryHeroArt kind={scene.kind} frame={frame}/>}
        </g>
        <rect x="0" y="1450" width="1080" height="470" fill={C.ink} opacity=".64"/>
      </svg>
    </div>
    <AbsoluteFill style={{background:"linear-gradient(0deg,rgba(7,14,23,.87) 0%,rgba(7,14,23,.15) 37%,transparent 67%,rgba(7,14,23,.27) 100%)",pointerEvents:"none"}}/>
    <div style={{position:"absolute",left:75,top:122,color:scene.accent,fontSize:22,fontWeight:750,fontFamily:"Arial",letterSpacing:5,opacity:textOpacity}}>
      {category} <span style={{color:C.ivory,opacity:.68}}> / {scene.label}</span>
    </div>
    <div style={{position:"absolute",left:72,right:72,top:1185,opacity:textOpacity,transform:"translateY("+titleY+"px)"}}>
      <div style={{height:5,width:112,background:scene.accent,boxShadow:"0 0 18px "+scene.accent,marginBottom:27}}/>
      <div style={{fontFamily:"Georgia,serif",fontSize:70,fontWeight:800,lineHeight:1.05,color:C.ivory,textShadow:"0 6px 30px #08101F",letterSpacing:-1}}>
        {scene.title}
      </div>
    </div>
    <div style={{position:"absolute",bottom:90,right:65,color:scene.accent,fontFamily:"Arial",letterSpacing:3,fontSize:15,opacity:.65}}>
      ● {Math.floor(scene.from/30).toString().padStart(2,"0")}:00
    </div>
  </AbsoluteFill>;
};
const Subtitle:React.FC<{text:string;length:number}> = ({text,length})=>{
  const frame=useCurrentFrame();
  const opacity=interpolate(frame,[0,5,Math.max(7,length-6),length-1],[0,1,1,0],clamp);
  const pop=interpolate(frame,[0,7],[12,0],clamp);
  return <div style={{position:"absolute",bottom:218,left:64,right:64,textAlign:"center",opacity,
    transform:"translateY("+pop+"px)",pointerEvents:"none"}}>
    <span style={{display:"inline",fontFamily:"Arial,Helvetica,sans-serif",fontWeight:800,fontSize:42,
      color:C.ivory,lineHeight:1.18,textShadow:"0 5px 7px #09111B, 0 0 23px #05080D",
      background:"rgba(8,15,24,.56)",boxDecorationBreak:"clone",padding:"8px 13px",borderRadius:12}}>
      {text}
    </span>
  </div>;
};
export const HistorySeriesVideo:React.FC<{episode:HistoryEpisode;voiceEnabled?:boolean}> =
({episode,voiceEnabled=false})=>{
  const frame=useCurrentFrame();
  const aligned=historyAudioManifest[episode.slug];
  const cues=voiceEnabled && aligned?.captions.length ? aligned.captions : episode.captions;
  return <AbsoluteFill style={{backgroundColor:C.ink}}>
    {episode.scenes.map(scene=>(
      <Sequence key={scene.kind} from={scene.from} durationInFrames={scene.duration} name={scene.label}>
        <VisualShot scene={scene} episode={episode}/>
      </Sequence>
    ))}
    {cues.map((cue,i)=>(
      <Sequence key={"c"+i} from={cue.from} durationInFrames={cue.duration} name={"Subtítulo "+(i+1)}>
        <Subtitle text={cue.text} length={cue.duration}/>
      </Sequence>
    ))}
    <Audio src={staticFile("assets/pompeii-ambience.wav")} loop volume={voiceEnabled ? .09 : .22}/>
    {voiceEnabled && <Sequence from={15} name="Narración documental">
      <Audio src={staticFile(episode.voicePath)} volume={1} playbackRate={aligned?.playbackRate ?? 1}/>
    </Sequence>}
    <div style={{position:"absolute",left:0,bottom:0,height:7,width:(frame/1800)*1080,background:"#E2B468"}}/>
  </AbsoluteFill>;
};
