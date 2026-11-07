import { interpolate } from "remotion";
import type { DocumentaryVisual } from "./documentary-data";

const ink = "#f2ead8";
const gold = "#c49a52";
const muted = "rgba(242,234,216,.36)";
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

export const SceneIllustration: React.FC<{
  kind: DocumentaryVisual;
  frame: number;
}> = ({ kind, frame }) => {
  const reveal = interpolate(frame, [0, 36], [1, 0], clamp);
  const route = interpolate(frame, [12, 88], [1, 0], clamp);
  const drift = Math.sin(frame / 25) * 9;
  const particles = Array.from({ length: 22 }, (_, index) => {
    const x = (index * 173 + frame * (index % 2 ? 0.7 : -0.38) + 1080) % 1080;
    const y = (index * 139 + frame * (index % 3 ? -0.45 : 0.3) + 820) % 820;
    return { x, y, size: index % 5 === 0 ? 4 : 2, opacity: 0.12 + (index % 4) * 0.045 };
  });

  return (
    <svg
      width="1080"
      height="820"
      viewBox="0 0 1080 820"
      role="img"
      aria-label={`Ilustración histórica: ${kind}`}
      style={{
        width: "100%",
        height: "100%",
        overflow: "visible",
        filter: "drop-shadow(0 0 12px rgba(242,234,216,.12))",
      }}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M75 686 Q540 614 1005 686" stroke={gold} strokeOpacity=".35" strokeWidth="2" />
        <path d="M115 710H965M160 735H920" stroke={muted} strokeWidth="2" />
        {kind === "eruption" && (
          <g transform={`translate(${drift} 0)`}>
            <path d="M436 576 564 280 629 391 709 215 842 576Z" fill="rgba(196,154,82,.12)" stroke={ink} strokeWidth="5" />
            <path d="M657 303Q615 247 678 190Q717 151 677 105M704 300Q775 249 726 194Q699 158 752 121M622 333Q563 288 605 236" stroke={gold} strokeWidth="9" strokeDasharray="22 19" strokeDashoffset={frame * 1.4} />
            <path d="M109 635V530L184 471 259 530V635ZM259 635V497L350 430 441 497V635ZM690 635V523L777 460 864 523V635ZM864 635V550L928 501 992 550V635Z" fill="#0c0d0d" stroke={ink} strokeWidth="5" />
            <path d="M174 635V565H215V635M306 635V530H350V635M756 635V555H800V635M910 635V573H946V635" stroke={gold} strokeWidth="4" />
            <path d="M120 568H249M276 535H425M705 553H849M875 565H980" stroke={gold} strokeWidth="3" />
            <circle cx="715" cy="254" r="118" stroke={gold} strokeOpacity=".23" strokeWidth="2" />
          </g>
        )}
        {kind === "map" && (
          <g>
            <path d="M170 134 432 92 520 126 774 88 916 154 904 644 671 688 510 650 279 699 164 636Z" fill="rgba(196,154,82,.035)" stroke={gold} strokeOpacity=".68" strokeWidth="4" />
            <path d="M501 142Q467 240 521 316T501 490Q543 566 517 652" stroke={ink} strokeOpacity=".72" strokeWidth="19" />
            <path d="M499 586Q466 478 514 386T493 165" stroke={gold} strokeWidth="6" strokeDasharray="12 15" strokeDashoffset={150 * route} />
            <path d="M241 246Q337 196 428 237M651 211Q762 179 833 232M264 551Q355 510 429 554M620 551Q727 490 816 545" stroke={muted} strokeWidth="3" />
            <circle cx="512" cy="388" r="18" fill={gold} stroke={ink} strokeWidth="4" />
            <circle cx="512" cy="164" r="13" fill={gold} />
            <circle cx="517" cy="649" r="13" fill={gold} />
            <path d="M811 168V100M811 100 793 134M811 100 829 134" stroke={ink} strokeWidth="4" />
            <text x="550" y="376" fill={ink} stroke="none" fontFamily="Arial" fontSize="25" letterSpacing="4">CIUDAD</text>
            <text x="558" y="169" fill={gold} stroke="none" fontFamily="Arial" fontSize="19" letterSpacing="3">NORTE</text>
            <text x="560" y="652" fill={gold} stroke="none" fontFamily="Arial" fontSize="19" letterSpacing="3">SUR</text>
          </g>
        )}
        {kind === "city" && (
          <g transform={`translate(0 ${drift})`}>
            <path d="M90 655H990M134 655V449L217 384 300 449V655M327 655V409L433 327 539 409V655M597 655V455L682 384 767 455V655M804 655V421L899 348 994 421V655" fill="#0b0d0d" stroke={ink} strokeWidth="5" />
            <path d="M159 450H275M358 410H509M630 458H735M839 424H960" stroke={gold} strokeWidth="5" />
            <path d="M180 483V618M217 483V618M254 483V618M373 449V620M433 449V620M493 449V620M648 485V620M682 485V620M716 485V620M861 459V620M899 459V620M937 459V620" stroke={gold} strokeOpacity=".65" strokeWidth="5" />
            <path d="M113 656Q530 550 966 656" stroke={gold} strokeWidth="4" />
            <circle cx="532" cy="243" r="69" fill="rgba(196,154,82,.12)" stroke={gold} strokeWidth="4" />
            <path d="M532 170V96M532 96 510 129M532 96 554 129M425 243H357M640 243H708" stroke={gold} strokeWidth="5" />
            <path d="M493 656V536H570V656" stroke={ink} strokeWidth="4" />
          </g>
        )}
        {kind === "excavation" && (
          <g>
            <path d="M117 311Q532 277 959 328L909 667Q536 719 168 660Z" fill="rgba(196,154,82,.08)" stroke={gold} strokeWidth="4" />
            <path d="M150 399Q527 370 933 416M159 499Q540 475 920 516M168 595Q528 573 913 610" stroke={ink} strokeOpacity=".55" strokeWidth="4" />
            <path d="M365 636V482L420 432 478 482V636M563 629V465L618 414 673 465V629" fill="#0b0d0d" stroke={ink} strokeWidth="5" />
            <path d="M205 264 260 219 315 264M765 284 813 233 861 284" stroke={gold} strokeWidth="6" />
            <circle cx="258" cy="286" r="14" fill={ink} /><path d="M258 300V368M258 320 226 342M258 321 289 339M258 368 237 400M258 368 281 400" stroke={ink} strokeWidth="8" />
            <path d="M218 416H317M712 681H846" stroke={gold} strokeWidth="5" strokeDasharray="9 13" />
            <path d="M738 617 770 580 802 617V678H738Z" fill="rgba(242,234,216,.12)" stroke={ink} strokeWidth="4" />
            <path d="M776 580V535" stroke={gold} strokeWidth="4" />
          </g>
        )}
        {kind === "artifact" && (
          <g transform={`translate(0 ${drift})`}>
            <path d="M331 137H749V680H331Z" fill="rgba(242,234,216,.025)" stroke={gold} strokeWidth="4" />
            <path d="M393 259Q540 199 687 259L655 561Q540 625 425 561Z" fill="rgba(196,154,82,.12)" stroke={ink} strokeWidth="7" />
            <path d="M393 259Q540 317 687 259M420 445Q540 492 670 445M460 257 479 578M540 245V606M620 257 601 578" stroke={gold} strokeWidth="5" />
            <path d="M172 206H282M172 256H253M172 306H289M791 514H910M818 564H910" stroke={ink} strokeWidth="4" />
            <path d="M213 185V331M849 488V602" stroke={gold} strokeWidth="3" strokeDasharray="7 9" />
            <circle cx="540" cy="390" r="199" stroke={gold} strokeOpacity=".2" strokeWidth="2" />
            <path d="M435 672H645" stroke={gold} strokeWidth="6" />
          </g>
        )}
        {kind === "ruins" && (
          <g transform={`translate(${drift} 0)`}>
            <path d="M91 660H983M171 652V355L226 319 279 355V652M293 652V411L345 377 398 411V652M661 652V360L714 326 767 360V652M786 652V418L837 385 888 418V652" fill="#0b0d0d" stroke={ink} strokeWidth="5" />
            <path d="M143 357H306L280 324H174ZM265 412H421L396 381H294ZM630 361H798L768 329H661ZM756 419H917L889 389H786Z" fill="none" stroke={gold} strokeWidth="5" />
            <path d="M279 354 262 429 294 481 274 554M662 360 692 424 674 494M398 412 376 484 400 553" stroke={gold} strokeWidth="4" />
            <path d="M439 653V560L484 521 529 560V653M529 653V577L581 538 633 577V653" fill="none" stroke={ink} strokeWidth="5" />
            <circle cx="753" cy="194" r="47" fill="rgba(196,154,82,.18)" stroke={gold} strokeWidth="4" />
          </g>
        )}
        {kind === "battle" && (
          <g>
            <path d="M105 654H978M155 576Q280 469 402 578M664 574Q787 463 924 574" stroke={gold} strokeWidth="5" />
            <path d="M228 357 274 315 320 357V460L274 500 228 460ZM732 357 778 315 824 357V460L778 500 732 460Z" fill="#0b0d0d" stroke={ink} strokeWidth="6" />
            <path d="M250 500 218 626M298 500 333 626M754 500 721 626M802 500 837 626" stroke={ink} strokeWidth="9" />
            <path d="M274 315V208M778 315V203M274 208 337 228 274 253ZM778 203 841 224 778 248Z" fill={gold} stroke={gold} strokeWidth="4" />
            <path d="M328 344 679 605M673 343 331 606M217 321 373 603M838 320 680 603" stroke={gold} strokeWidth="6" />
            <path d="M385 299 445 257 505 299V432L445 475 385 432ZM547 299 607 257 667 299V432L607 475 547 432Z" fill="#0b0d0d" stroke={ink} strokeWidth="5" />
            <path d="M423 475 400 605M467 475 490 605M585 475 562 605M629 475 652 605" stroke={ink} strokeWidth="8" />
            <circle cx="540" cy="200" r="91" stroke={gold} strokeOpacity=".4" strokeWidth="3" />
          </g>
        )}
        <path
          d="M75 686 Q540 614 1005 686"
          stroke={gold}
          strokeWidth="4"
          strokeDasharray="940"
          strokeDashoffset={940 * reveal}
        />
      </g>
      {particles.map(({ x, y, size, opacity }, index) => (
        <circle key={index} cx={x} cy={y} r={size} fill={index % 4 === 0 ? gold : ink} opacity={opacity} />
      ))}
      <path d="M42 96V42H96M984 42H1038V96M42 724V778H96M984 778H1038V724" fill="none" stroke={gold} strokeOpacity=".62" strokeWidth="3" />
    </svg>
  );
};
