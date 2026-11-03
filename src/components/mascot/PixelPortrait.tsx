/**
 * Pixel self-portrait, drawn from a character grid so it's easy to tweak by hand.
 * Big curly hair (wider than the head, forehead window with a strand hooking in), black glasses
 * with a flat top and rounded bottom,
 * a squarish jaw with a soft chin, blue polo. Generated from shape rules, then hand-tunable here.
 * Edit a row to change the art; every row must be exactly 24 characters.
 */

const PALETTE: Record<string, string> = {
  H: "#1E1A17", // hair
  h: "#3E352E", // hair highlight (curl speckle)
  q: "#5A4537", // parting
  B: "#1E1A17", // brows
  S: "#D49C72", // skin
  s: "#B98058", // skin shade
  G: "#121110", // glasses frame
  L: "#E2B48F", // lens (skin seen through glass)
  E: "#1A1512", // eye
  W: "#FFFFFF", // eye glint
  M: "#9A5440", // mouth
  P: "#33609E", // polo
  p: "#264B7E", // polo shade
  C: "#4B7BBF", // collar
  K: "#E9E6DF", // buttons
};

// prettier-ignore
const ROWS = [
  ".......HhhH..hHHhh......",
  ".....HhhhHHhhHhHHhH.....",
  "....HHHhHHHHhhhhHHHH....",
  ".h.HhHHhHhHhhHhhhhHHH...",
  "..hhHhHHHHHHHhhhHHhhhHH.",
  ".hhhHHHHHHSSSShhHHHhHH..",
  "..hhHhHHHSSSSSSHhHhhhhh.",
  ".HHhhHHHhSSSSHHHHHHHHH..",
  "..HHHHHhSSSSSSSSHHHHHHH.",
  "..HhhHSBBBSSSSBBBShhHH..",
  "..HHhhSSSSSSSSSSSShhHH..",
  "..HHGGGGGGGGGGGGGGGGhh..",
  "..HsGLEWLLGSSGLEWLLGsH..",
  "...sGLEELLGSSGLEELLGs...",
  "...sSGGGGGSSSSGGGGGSs...",
  "...ssSSSSSSSsSSSSSSss...",
  "....sSSSSSSssSSSSSSs....",
  "....sSSSSSSSSSSSSSSs....",
  ".....sSSSMSSSSMSSSs.....",
  ".....sSSSSMMMMSSSSs.....",
  "......sSSSSSSSSSSs......",
  ".......sSSSSSSSSs.......",
  "........ssssssss........",
  ".........ssssss.........",
  ".........SSSSSS.........",
  ".....PPPPCCSSCCPPPP.....",
  "...PPPPPPPCKKCPPPPPPP...",
  "..pPPPPPPPPppPPPPPPPPp..",
  ".pPPPPPPPPPKpPPPPPPPPPp.",
  ".pPPPPPPPPPppPPPPPPPPPp.",
];

export const PORTRAIT_W = 24;
export const PORTRAIT_H = ROWS.length;

/** Merge horizontal runs of the same colour into single rects. */
const RECTS = ROWS.flatMap((row, y) => {
  if (row.length !== PORTRAIT_W) throw new Error(`PixelPortrait row ${y} is ${row.length} chars, expected ${PORTRAIT_W}`);
  const out: { x: number; y: number; w: number; fill: string }[] = [];
  let x = 0;
  while (x < row.length) {
    const c = row[x];
    let end = x + 1;
    while (end < row.length && row[end] === c) end++;
    if (c !== "." && PALETTE[c]) out.push({ x, y, w: end - x, fill: PALETTE[c] });
    x = end;
  }
  return out;
});

export function PixelPortrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${PORTRAIT_W} ${PORTRAIT_H}`}
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label="Pixel-art portrait of Uwais"
    >
      {RECTS.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
