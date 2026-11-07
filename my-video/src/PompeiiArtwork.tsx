import { PompeiiFigure } from "./PompeiiFigure";
import type { DocumentaryVisual } from "./documentary-data";

type PompeiiArtworkProps = {
  kind: DocumentaryVisual;
  frame: number;
};

const colors = {
  night: "#08131d",
  deep: "#101e29",
  ivory: "#f0dfc0",
  stone: "#bca17c",
  gold: "#d6a858",
  clay: "#b96e4a",
  red: "#bd422e",
  fire: "#ff963f",
  ash: "#777771",
  soil: "#443630",
};

const RomanFacade: React.FC<{
  x: number;
  y: number;
  scale?: number;
  wall?: string;
  roof?: string;
}> = ({ x, y, scale = 1, wall = "#9e5e47", roof = "#453d39" }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 390V112L25 79H274L300 112V390Z" fill={wall} stroke="#392c2b" strokeWidth="9" />
    <path d="M-12 117H312L280 65H19Z" fill={roof} stroke="#2d2929" strokeWidth="9" />
    <path d="M19 141H282" stroke="#e0b986" strokeWidth="10" opacity=".8" />
    <path d="M38 390V271Q38 188 85 188Q132 188 132 271V390M167 390V271Q167 188 214 188Q261 188 261 271V390" fill="#19222a" stroke="#e5c08d" strokeWidth="9" />
    <path d="M43 280H127M172 280H256" stroke="#372b29" strokeWidth="8" />
    <path d="M151 390V303H150V390" stroke="#e5c08d" strokeWidth="6" />
    <rect x="17" y="152" width="17" height="22" fill="#e8bd80" />
    <rect x="266" y="152" width="17" height="22" fill="#e8bd80" />
    <path d="M-8 393H308" stroke="#e5c08d" strokeWidth="13" />
  </g>
);

const Archade: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <path d="M-40 1180V570H1120V1180Z" fill="#755248" />
    {Array.from({ length: 5 }, (_, index) => {
      const x = 20 + index * 235;
      const sway = Math.sin(frame / 10 + index) * 4;
      return (
        <g key={index} transform={`translate(${sway} 0)`}>
          <path d={`M${x} 1185V805Q${x} 650 ${x + 101} 650Q${x + 202} 650 ${x + 202} 805V1185Z`} fill="#16232d" stroke="#d7b889" strokeWidth="19" />
          <path d={`M${x + 9} 830H${x + 193}`} stroke="#a57c5d" strokeWidth="12" />
          <path d={`M${x - 11} 1178H${x + 215}`} stroke="#e3c69b" strokeWidth="26" />
          <path d={`M${x - 10} 621H${x + 212}`} stroke="#e3c69b" strokeWidth="22" />
        </g>
      );
    })}
  </g>
);

export const PompeiiArtwork: React.FC<PompeiiArtworkProps> = ({ kind, frame }) => {
  const pulse = 0.5 + (Math.sin(frame / 5) + 1) * 0.12;
  const ash = Array.from({ length: 38 }, (_, index) => {
    const x = (index * 283 + frame * (index % 2 ? 0.73 : -0.31) + 2200) % 1200 - 60;
    const y = (index * 197 + frame * (index % 3 === 0 ? 0.56 : -0.26) + 2400) % 1950;
    return { x, y, r: index % 7 === 0 ? 5 : index % 3 === 0 ? 3 : 1.8 };
  });
  const subtitleShade = kind === "eruption" || kind === "volcano" || kind === "buried" ? 0.16 : 0.06;

  return (
    <svg
      width="1080"
      height="1920"
      viewBox="0 0 1080 1920"
      role="img"
      aria-label={`Escena ilustrada de Pompeya: ${kind}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="pompeii-sky" x1="0" x2="0.8" y1="0" y2="1">
          <stop offset="0" stopColor={kind === "eruption" ? "#101b27" : "#182532"} />
          <stop offset=".48" stopColor={kind === "eruption" ? "#633b35" : "#4a4741"} />
          <stop offset="1" stopColor="#111820" />
        </linearGradient>
        <linearGradient id="pompeii-fire" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffba63" />
          <stop offset=".45" stopColor="#ed6834" />
          <stop offset="1" stopColor="#7f2c26" />
        </linearGradient>
        <linearGradient id="pompeii-ash" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#999087" />
          <stop offset="1" stopColor="#484541" />
        </linearGradient>
        <radialGradient id="pompeii-lamp">
          <stop offset="0" stopColor="#ffd68a" stopOpacity=".9" />
          <stop offset="1" stopColor="#e57836" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#pompeii-sky)" />

      {kind === "eruption" && (
        <>
          <circle cx="825" cy="610" r={350 + pulse * 80} fill="url(#pompeii-lamp)" opacity=".8" />
          <path d="M0 1070 162 864 287 925 433 719 564 869 710 594 808 829 957 708 1080 861V1320H0Z" fill="#25252a" />
          <path d="M410 1146 590 626 690 816 786 505 976 1146Z" fill="#29282b" stroke="#53453e" strokeWidth="12" />
          <path d="M738 583Q676 484 725 376Q750 314 718 247Q813 289 815 365Q875 296 855 224Q967 338 897 446Q878 512 912 579Z" fill="url(#pompeii-fire)" opacity=".95" />
          <path d="M677 681Q642 600 700 556M838 658Q885 565 837 487" stroke="#ffc46f" strokeWidth="24" opacity=".72" />
          <g
            fill="#4a4849"
            opacity=".93"
            transform={`translate(${Math.sin(frame / 12) * 22} ${Math.cos(frame / 17) * 10})`}
          >
            <ellipse cx="706" cy="284" rx="151" ry="101" />
            <ellipse cx="832" cy="236" rx="189" ry="139" />
            <ellipse cx="944" cy="339" rx="196" ry="114" />
            <ellipse cx="774" cy="409" rx="207" ry="106" />
            <ellipse cx="979" cy="474" rx="155" ry="92" />
          </g>
          <g fill="#77716b" opacity=".54">
            <ellipse cx="802" cy="307" rx="176" ry="88" />
            <ellipse cx="975" cy="272" rx="115" ry="75" />
          </g>
          <RomanFacade x={-70} y={1054} scale={1.18} wall="#824d42" />
          <RomanFacade x={620} y={1001} scale={1.27} wall="#795044" />
          <path d="M0 1480Q261 1381 456 1472T1080 1449V1920H0Z" fill="#231f20" />
          <PompeiiFigure frame={frame} x={264 + (frame % 44) * 2.4} y={1585} scale={1.32} action="run" />
          <PompeiiFigure frame={frame + 8} x={515} y={1640} scale={1.16} style="guard" action="point" />
          <PompeiiFigure frame={frame + 16} x={782 - (frame % 44) * 1.8} y={1604} scale={1.26} action="run" />
          <path d={`M0 ${1422 + Math.sin(frame / 7) * 18}Q210 1368 421 1437T850 1422Q963 1387 1080 1419V1640H0Z`} fill="url(#pompeii-ash)" opacity=".8" />
        </>
      )}

      {kind === "map" && (
        <>
          <path d="M0 0H1080V1920H0Z" fill="#c6a875" opacity=".12" />
          <path d="M84 230 941 176 1008 1480 121 1629Z" fill="#c6a875" stroke="#eddbb6" strokeWidth="9" />
          <path d="M124 315 939 252M141 1462 974 1350M166 300V1480M910 247V1397" stroke="#6b5546" strokeWidth="3" opacity=".55" />
          <path d="M247 443Q384 354 499 457L484 730Q388 819 270 739ZM623 320Q770 252 864 354L861 606Q744 661 623 586Z" fill="#9e684e" stroke="#e6c997" strokeWidth="9" />
          <path d="M312 518Q440 580 574 706T782 1102" fill="none" stroke="#a5372d" strokeWidth="14" strokeDasharray="23 24" strokeDashoffset={frame * -1.6} />
          <path d="M777 1084 803 1142 746 1124" fill="none" stroke="#a5372d" strokeWidth="14" />
          <path d="M238 969Q427 917 587 995T895 916M221 1080Q381 1054 504 1103" fill="none" stroke="#52666a" strokeWidth="15" opacity=".74" />
          <path d="M167 1280Q335 1176 487 1255T783 1215" fill="none" stroke="#748074" strokeWidth="34" opacity=".45" />
          <circle cx="385" cy="581" r="30" fill="#f3d37e" stroke="#533e31" strokeWidth="8" />
          <circle cx="783" cy="1102" r="28" fill="#c6402c" stroke="#f4cf97" strokeWidth="8" />
          <text x="192" y="407" fill="#382d29" fontSize="31" fontFamily="Georgia" fontWeight="bold">VESUBIO</text>
          <text x="684" y="1196" fill="#382d29" fontSize="31" fontFamily="Georgia" fontWeight="bold">POMPEYA</text>
          <path d="M874 531V378M874 378 850 420M874 378 899 420" stroke="#49382e" strokeWidth="8" />
          <path d="M0 1690 250 1611 480 1687 690 1607 1080 1698V1920H0Z" fill="#1e2528" opacity=".82" />
        </>
      )}

      {kind === "volcano" && (
        <>
          <path d="M0 0H1080V1920H0Z" fill="#121d29" />
          <circle cx="776" cy="750" r="418" fill="url(#pompeii-lamp)" opacity=".72" />
          <path d="M-65 1450 145 1214 268 1262 489 784 612 920 763 563 918 922 1085 1083V1657H-65Z" fill="#302d30" stroke="#51433d" strokeWidth="14" />
          <path d="M481 817Q545 708 666 702Q728 611 788 568Q851 645 912 713Q946 807 903 943Z" fill="#1e2228" />
          <path d="M727 598Q676 510 736 414Q782 340 750 255Q850 320 841 418Q900 346 877 262Q1001 396 918 516Q892 575 939 660Z" fill="url(#pompeii-fire)" />
          <g fill="#4d4a49" opacity=".92" transform={`translate(${Math.sin(frame / 10) * 31} ${Math.sin(frame / 16) * 12})`}>
            <ellipse cx="751" cy="371" rx="157" ry="104" />
            <ellipse cx="884" cy="333" rx="196" ry="137" />
            <ellipse cx="1010" cy="450" rx="184" ry="118" />
            <ellipse cx="847" cy="492" rx="190" ry="111" />
          </g>
          <path d="M0 1508Q210 1391 430 1500T850 1455Q962 1397 1080 1457V1920H0Z" fill="#29282a" />
          <path d="M0 1661 1080 1517" stroke="#db7346" strokeWidth="8" opacity=".55" />
          <RomanFacade x={-70} y={1433} scale={0.67} wall="#744b40" />
          <RomanFacade x={736} y={1392} scale={0.71} wall="#744b40" />
          <PompeiiFigure frame={frame} x={483} y={1652} scale={1.22} style="guard" action="point" />
          <g fill="#ffb05a">
            {Array.from({ length: 14 }, (_, index) => (
              <circle
                key={index}
                cx={(index * 147 + frame * (index % 2 ? 1.2 : -0.8) + 1080) % 1080}
                cy={1080 + ((index * 97 + frame * 1.6) % 660)}
                r={index % 4 === 0 ? 6 : 3}
                opacity=".78"
              />
            ))}
          </g>
        </>
      )}

      {(kind === "city" || kind === "street") && (
        <>
          <path d="M0 0H1080V700L0 910Z" fill="#7f4e3e" />
          <Archade frame={frame} />
          <path d="M0 660 1080 420V1120L0 1395Z" fill="#b88d64" />
          <path d="M0 1000 1080 733V1640L0 1720Z" fill="#756353" />
          <RomanFacade x={-88} y={432} scale={1.13} wall="#b46f50" />
          <RomanFacade x={711} y={314} scale={1.16} wall="#b77c5c" roof="#493e3a" />
          <path d="M0 1396 530 907 1080 1387V1920H0Z" fill="#493e39" />
          <path d="M0 1454 531 999 1080 1444M0 1587 531 1163 1080 1575M0 1744 531 1333 1080 1728" fill="none" stroke="#d1ac7d" strokeWidth="16" opacity=".7" />
          <path d="M527 922V1570M372 1077V1638M699 1075V1638" stroke="#d8b88b" strokeWidth="12" opacity=".66" />
          <path d="M325 436H465V606H325ZM733 384H855V543H733Z" fill="#edc68d" opacity=".75" />
          <PompeiiFigure frame={frame} x={225 + frame * 1.45} y={1535} scale={1.35} action="walk" />
          <PompeiiFigure frame={frame + 12} x={754 - frame * 0.9} y={1487} scale={1.42} style="guard" action="look" />
          <PompeiiFigure frame={frame + 21} x={540} y={1398} scale={0.88} action="walk" />
          <path d="M70 927 444 834M664 851 1000 772" stroke="#e8c88e" strokeWidth="18" />
          <path d={`M280 1760Q540 ${1710 + Math.sin(frame / 16) * 10} 810 1762`} stroke="#e2bb86" strokeWidth="15" opacity=".52" />
        </>
      )}

      {kind === "market" && (
        <>
          <path d="M0 0H1080V1150H0Z" fill="#332f31" />
          <RomanFacade x={-51} y={437} scale={1.22} wall="#9b5b43" />
          <RomanFacade x={718} y={425} scale={1.17} wall="#a7684d" />
          <path d="M85 650 302 517 517 650Z" fill="#d2a65f" stroke="#f0d19a" strokeWidth="8" />
          <path d="M84 650 157 650 181 535 228 650 301 650 349 535 384 650 517 650" fill="#943f35" />
          <path d="M572 643 744 526 932 643Z" fill="#d5b179" stroke="#eddaa8" strokeWidth="8" />
          <path d="M572 643H650L682 552 717 643H789L834 552 867 643H933V1180H572Z" fill="#697154" />
          <path d="M0 1220 1080 1088V1920H0Z" fill="#826446" />
          <path d="M90 1237Q225 1188 367 1237V1408H90ZM706 1191Q819 1147 965 1191V1370H706Z" fill="#6b4031" stroke="#d7b47f" strokeWidth="12" />
          <ellipse cx="238" cy="1190" rx="146" ry="58" fill="#c99a53" />
          <circle cx="191" cy="1175" r="30" fill="#b53f31" /><circle cx="252" cy="1158" r="33" fill="#e0b450" /><circle cx="301" cy="1191" r="34" fill="#7d8c51" />
          <PompeiiFigure frame={frame} x={521} y={1592} scale={1.2} action="point" />
          <PompeiiFigure frame={frame + 13} x={798} y={1550} scale={1.12} style="guard" action="walk" />
          <g transform={`translate(0 ${Math.sin(frame / 9) * 6})`}><path d="M80 1420H1005" stroke="#e5c896" strokeWidth="18" /><path d="M80 1442H1005" stroke="#443933" strokeWidth="7" /></g>
        </>
      )}

      {kind === "house" && (
        <>
          <rect y="0" width="1080" height="1220" fill="#7a5646" />
          <path d="M63 226H1017V1414H63Z" fill="#bd8c68" stroke="#4a3630" strokeWidth="19" />
          <path d="M529 226V1414M64 824H1017M64 287H1017" stroke="#e0bd8c" strokeWidth="21" />
          <path d="M124 367H462V740H124ZM626 357H948V741H626Z" fill="#232b30" stroke="#704a3b" strokeWidth="15" />
          <path d="M158 398H427V710H158ZM658 387H915V709H658Z" fill="#35414a" />
          <path d="M157 537H428M658 530H915M289 398V711M787 387V710" stroke="#d6b187" strokeWidth="14" />
          <path d="M431 824Q540 725 648 824V1212H431Z" fill="#171f25" stroke="#e1bb86" strokeWidth="16" />
          <path d="M455 824Q540 753 624 824" fill="none" stroke="#e1bb86" strokeWidth="12" />
          <ellipse cx="540" cy="1306" rx="290" ry="97" fill="#62766d" opacity=".82" />
          <circle cx="540" cy="1256" r="55" fill="#dec391" /><path d="M433 1428Q444 1319 540 1319Q638 1319 648 1428Z" fill="#b3533d" />
          <PompeiiFigure frame={frame} x={324} y={1556} scale={1.02} action="look" />
          <PompeiiFigure frame={frame + 11} x={751} y={1565} scale={0.96} style="citizen" action="walk" />
          <path d="M88 1563H1000" stroke="#e4c691" strokeWidth="17" />
        </>
      )}

      {kind === "cross-section" && (
        <>
          <path d="M0 0H1080V811Q844 881 562 812T0 881Z" fill="#17232c" />
          <path d="M0 750Q251 701 520 768T1080 728V1009Q815 1096 529 1017T0 1082Z" fill="#aaa094" />
          <path d="M0 991Q242 907 520 999T1080 973V1920H0Z" fill="#483a32" />
          <path d="M0 1000Q255 919 525 1000T1080 978" fill="none" stroke="#d0c3b0" strokeWidth="22" />
          <path d="M0 1130Q269 1054 536 1134T1080 1100M0 1390Q252 1312 519 1392T1080 1351" fill="none" stroke="#a27c5c" strokeWidth="17" opacity=".7" />
          <path d="M145 1513V1268L244 1175 344 1268V1513M377 1542V1320L474 1231 573 1320V1542M640 1500V1284L739 1191 837 1284V1500" fill="#312e2e" stroke="#c6a579" strokeWidth="15" />
          <path d="M176 1300H318M412 1355H539M673 1320H805" stroke="#9e553d" strokeWidth="15" />
          <path d="M228 1532V1382Q244 1322 260 1382V1532M436 1552V1419Q475 1368 514 1419V1552M698 1518V1392Q739 1349 780 1392V1518" fill="#111d25" stroke="#ddbf91" strokeWidth="10" />
          <path d="M0 823Q258 752 522 835T1080 793" fill="none" stroke="#e2d4c2" strokeWidth="7" strokeDasharray="8 21" />
          <g fill="#d0b28a" opacity=".76">
            {Array.from({ length: 22 }, (_, index) => (
              <circle
                key={index}
                cx={(index * 173 + frame * 0.7) % 1080}
                cy={1050 + ((index * 109 + frame * 0.3) % 780)}
                r={index % 5 === 0 ? 7 : 3}
              />
            ))}
          </g>
        </>
      )}

      {(kind === "excavation" || kind === "archaeology" || kind === "buried") && (
        <>
          <path d="M0 0H1080V885Q877 1007 640 940T0 1000Z" fill="#283540" />
          <path d="M0 813Q246 733 482 836T1080 788V1066Q832 1129 565 1054T0 1135Z" fill="#98724f" />
          <path d="M0 1125Q259 1046 508 1149T1080 1090V1395Q799 1467 523 1375T0 1448Z" fill="#78563f" />
          <path d="M0 1440Q245 1382 496 1454T1080 1405V1920H0Z" fill="#493a32" />
          <path d="M272 1375V1041L411 921 553 1041V1375M549 1379V1123L679 1012 811 1123V1379" fill="#413d37" stroke="#d5b284" strokeWidth="18" />
          <path d="M304 1080H523M580 1162H778" stroke="#a75740" strokeWidth="20" />
          <path d="M359 1380V1203Q359 1112 414 1112Q470 1112 470 1203V1380" fill="#15222a" stroke="#d6b88c" strokeWidth="14" />
          <path d="M712 1381V1246Q712 1175 758 1175Q804 1175 804 1246V1381" fill="#17242a" stroke="#d6b88c" strokeWidth="14" />
          <PompeiiFigure frame={frame} x={185 + Math.sin(frame / 13) * 19} y={1502} scale={1.54} style="archaeologist" action="dig" />
          <PompeiiFigure frame={frame + 10} x={884 + Math.sin(frame / 11) * 15} y={1457} scale={1.35} style="archaeologist" action="point" />
          <path d="M145 1575 283 1660 393 1588M804 1550 932 1622" stroke="#caa36c" strokeWidth="20" strokeLinecap="round" />
          <path d="M468 1680Q545 1603 625 1680" fill="none" stroke="#e8c99a" strokeWidth="15" />
          {kind === "buried" && (
            <g>
              <path d="M0 796Q265 725 520 812T1080 778V977Q813 1035 540 955T0 1000Z" fill="url(#pompeii-ash)" opacity=".95" />
              <path d="M0 786Q240 707 496 790T1080 748" fill="none" stroke="#c6b7a3" strokeWidth="23" />
              <path d={`M0 ${706 + Math.sin(frame / 6) * 9}Q300 663 540 716T1080 680`} stroke="#e6d9c4" strokeWidth="11" opacity=".66" />
            </g>
          )}
        </>
      )}

      {kind === "artifact" && (
        <>
          <rect y="0" width="1080" height="1920" fill="#111b24" />
          <circle cx="518" cy="877" r="506" fill="url(#pompeii-lamp)" />
          <path d="M0 1485Q244 1372 540 1466T1080 1390V1920H0Z" fill="#292b2d" />
          <path d="M281 1488 340 1108 406 1028 419 877Q467 786 540 786Q617 786 661 877L671 1028 738 1108 797 1488Z" fill="#9a543b" stroke="#d8b57d" strokeWidth="19" />
          <path d="M420 882Q537 930 660 881M416 1027Q540 1074 673 1025M339 1112Q540 1202 739 1112" fill="none" stroke="#4c3029" strokeWidth="17" />
          <path d="M442 869Q540 817 638 869V917Q542 962 442 917Z" fill="#bf714b" />
          <ellipse cx="540" cy="781" rx="87" ry="24" fill="#684033" stroke="#d8b57d" strokeWidth="12" />
          <path d="M369 1490H711" stroke="#d9b880" strokeWidth="28" />
          <g fill="#d8ba8d" opacity=".7"><circle cx="268" cy="1556" r="19" /><circle cx="812" cy="1604" r="29" /><path d="M346 1589 401 1568 420 1607Z" /><path d="M677 1590 724 1560 746 1600Z" /></g>
          <PompeiiFigure frame={frame} x={143 + Math.sin(frame / 9) * 12} y={1640} scale={1.18} style="archaeologist" action="point" />
          <path d={`M335 1362Q430 ${1270 + Math.sin(frame / 6) * 12} 534 1327`} fill="none" stroke="#f4d598" strokeWidth="15" strokeLinecap="round" />
          <circle cx="539" cy="1325" r="32" fill="#f6ddb0" opacity=".72" />
        </>
      )}

      {(kind === "amphora" || kind === "fresco") && (
        <>
          <rect y="0" width="1080" height="1920" fill={kind === "fresco" ? "#24323a" : "#141d27"} />
          <path d="M0 306Q249 210 512 304T1080 249V1430Q821 1525 533 1434T0 1495Z" fill={kind === "fresco" ? "#9d704f" : "#23282c"} stroke="#d5b47c" strokeWidth="22" />
          {kind === "fresco" ? (
            <>
              <path d="M151 502Q540 347 930 506V1223Q536 1397 151 1210Z" fill="#b37c59" stroke="#edcc94" strokeWidth="25" />
              <path d="M192 704Q283 531 387 703L386 1170H192ZM695 704Q794 523 894 703V1170H695Z" fill="#793d36" />
              <circle cx="538" cy="693" r="102" fill="#d4ab65" />
              <path d="M386 1067Q542 876 696 1067V1236H386Z" fill="#405650" />
              <path d="M218 1222Q534 1110 866 1224" stroke="#e7c491" strokeWidth="24" />
              <path d="M246 613 259 1189M819 607 831 1190" stroke="#e2c99e" strokeWidth="19" />
              <PompeiiFigure frame={frame} x={917} y={1596} scale={1.08} style="archaeologist" action="look" />
              <path d={`M829 1378Q747 ${1315 + Math.sin(frame / 8) * 10} 674 1350`} stroke="#dbbd88" strokeWidth="15" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M0 1418H1080V1920H0Z" fill="#47392e" />
              <path d="M296 1419V1304H781V1419Z" fill="#d7a665" stroke="#493d36" strokeWidth="16" />
              <path d="M387 1304 420 1026 465 971 470 853Q502 765 540 765Q584 765 609 853L616 971 661 1026 694 1304Z" fill="#a14f39" stroke="#e2bc84" strokeWidth="19" />
              <ellipse cx="540" cy="756" rx="75" ry="24" fill="#673f32" stroke="#e2bc84" strokeWidth="13" />
              <path d="M452 851Q540 896 628 851M468 975Q540 1008 613 975" fill="none" stroke="#54352d" strokeWidth="13" />
              <path d="M392 1023Q317 974 307 1071L328 1234Q371 1270 403 1226M688 1023Q762 977 771 1073L751 1234Q712 1272 677 1226" fill="none" stroke="#d8a878" strokeWidth="21" />
              <path d="M0 1515Q525 1440 1080 1500" stroke="#dec08d" strokeWidth="18" />
              <PompeiiFigure frame={frame} x={185} y={1633} scale={0.9} style="archaeologist" action="look" />
              <circle cx="868" cy="680" r="184" fill="url(#pompeii-lamp)" opacity=".6" />
            </>
          )}
        </>
      )}

      {kind === "ruins" && (
        <>
          <path d="M0 0H1080V950L0 1226Z" fill="#293642" />
          <path d="M0 921 177 763 315 872 458 666 590 821 742 587 879 803 1080 698V1284L0 1541Z" fill="#413a39" />
          <path d="M0 1197 1080 954V1390L0 1670Z" fill="#77716a" />
          <path d="M0 1361 1080 1108V1262L0 1523Z" fill="#bb9a75" />
          <path d="M0 1512 1080 1260V1920H0Z" fill="#493b33" />
          <path d="M91 1375V923L164 857 243 921V1345M266 1344V1010L331 954 397 1007V1314M681 1241V886L754 810 826 874V1205M847 1197V974L918 916 991 965V1164" fill="#5b4840" stroke="#d0b38a" strokeWidth="19" />
          <path d="M67 935H259L237 890H97ZM244 1019H417L392 981H271ZM656 899H851L826 854H681ZM826 984H1011L990 946H853Z" fill="#554038" stroke="#e1bd89" strokeWidth="13" />
          <path d="M160 923 142 1065 180 1147 157 1283M756 876 790 1007 764 1106M329 1007 307 1120 339 1208" fill="none" stroke="#bb7854" strokeWidth="15" />
          <PompeiiFigure frame={frame} x={521} y={1576} scale={1.33} style="archaeologist" action="point" />
          <circle cx="815" cy="535" r="118" fill="url(#pompeii-lamp)" opacity=".5" />
        </>
      )}

      {kind === "aerial" && (
        <>
          <path d="M0 0H1080V1920H0Z" fill="#242c32" />
          <path d="M0 248 1080 171 1080 1100 0 1260Z" fill="#9d7052" />
          {Array.from({ length: 10 }, (_, index) => {
            const x = -140 + index * 146;
            const width = 168 - index * 7;
            const y = 380 + (index % 3) * 98;
            return (
              <g key={index} transform={`translate(${x} ${y})`}>
                <path d={`M0 100 80 20 ${width} 100V${350 - index * 11}H0Z`} fill={index % 2 ? "#b77755" : "#86533f"} stroke="#e3bb85" strokeWidth="9" />
                <path d={`M-13 104 80 0 ${width + 13} 104`} fill="#55433b" stroke="#dfbd91" strokeWidth="12" />
                <path d={`M29 135H${width - 30}V${230 - index * 7}H29Z`} fill="#24313a" />
              </g>
            );
          })}
          <path d="M36 1168 270 976 505 1136 715 895 1042 1125" fill="none" stroke="#d5b17c" strokeWidth="32" />
          <path d="M0 1297Q248 1199 519 1307T1080 1277V1920H0Z" fill="#303232" opacity=".94" />
          <PompeiiFigure frame={frame} x={350} y={1544} scale={1.05} action="walk" />
          <PompeiiFigure frame={frame + 11} x={722} y={1508} scale={1.16} style="guard" action="look" />
        </>
      )}

      {kind === "battle" && (
        <>
          <path d="M0 0H1080V1920H0Z" fill="#263441" />
          <path d="M0 1060 250 681 432 866 610 580 800 831 954 652 1080 792V1380H0Z" fill="#513d36" />
          <path d="M0 1340Q280 1176 540 1316T1080 1233V1920H0Z" fill="#5e493a" />
          <path d="M0 1517H1080M83 1460 987 1352" stroke="#d0ac72" strokeWidth="20" opacity=".5" />
          <PompeiiFigure frame={frame} x={252} y={1624} scale={1.38} style="guard" action="run" />
          <PompeiiFigure frame={frame + 9} x={486} y={1575} scale={1.27} style="guard" action="point" />
          <PompeiiFigure frame={frame + 17} x={789} y={1628} scale={1.41} style="citizen" action="run" />
          <path d="M284 1311 395 1052M736 1300 662 1003M452 1270 522 1012" stroke="#d7ae70" strokeWidth="18" />
        </>
      )}

      {kind === "skyline" && (
        <>
          <path d="M0 0H1080V1920H0Z" fill="#101d2a" />
          <circle cx="800" cy="540" r="240" fill="url(#pompeii-lamp)" />
          <path d="M0 1034 178 836 298 913 441 719 571 881 714 613 866 836 968 724 1080 829V1364H0Z" fill="#353536" />
          <path d="M0 1315 1080 1160V1920H0Z" fill="#312e2e" />
          <RomanFacade x={-106} y={1000} scale={1.13} wall="#95604a" />
          <RomanFacade x={662} y={906} scale={1.25} wall="#895746" />
          <path d="M0 1530Q330 1390 652 1512T1080 1470V1920H0Z" fill="#211f20" opacity=".86" />
          <PompeiiFigure frame={frame} x={485} y={1623} scale={1.45} action="look" />
          <path d="M370 1734H708" stroke="#d6a858" strokeWidth="17" opacity=".8" />
        </>
      )}

      <g opacity={kind === "eruption" || kind === "buried" ? 0.55 : 0.25}>
        {ash.map(({ x, y, r }, index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={r}
            fill={index % 6 === 0 ? colors.fire : index % 4 === 0 ? colors.gold : colors.ivory}
            opacity={0.38 + (index % 5) * 0.1}
          />
        ))}
      </g>
      <rect width="1080" height="1920" fill={`rgba(4,9,14,${subtitleShade})`} />
      <path d="M0 0H1080V1920H0Z" fill="none" stroke="rgba(238,207,157,.12)" strokeWidth="28" />
    </svg>
  );
};
