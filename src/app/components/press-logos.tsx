import Image from "next/image";
import { useTranslations } from "next-intl";

// Real logos, transparent background, cropped to their own content —
// sized by height only (w-auto) so very different native aspect ratios
// (a stacked newspaper mark vs. a wide magazine wordmark) still sit at a
// consistent visual weight in one row. grayscale + brightness-0 forces
// every logo to a flat, uniform tone regardless of its source colour
// (newspaper navy, a patterned illustration, etc.) — a plain grayscale
// filter alone would keep each logo's original lightness and the row
// would read as inconsistent.
// height/width here are each asset's native size — only used for Next/Image's
// aspect-ratio math, not the rendered size (that's the `h-*` classes below).
// `stacked` marks a two-line wordmark (a small title over a subtitle): at the
// same box height as a one-line logo, half its height is a second line of much
// smaller text, so it reads visually lighter — it needs a taller box than the
// one-line logos to land at the same visual weight.
const LOGOS: {
  name: string;
  src: string;
  width: number;
  height: number;
  stacked?: boolean;
}[] = [
  { name: "Diario de Ibiza", src: "/images/press-logos/diario-de-ibiza.png", width: 863, height: 89 },
  { name: "Sabato", src: "/images/press-logos/sabato.png", width: 1392, height: 471 },
  { name: "NAN Arquitectura", src: "/images/press-logos/nan-arquitectura.png", width: 150, height: 83, stacked: true },
  { name: "White Ibiza", src: "/images/press-logos/white-ibiza.svg", width: 1745, height: 142 },
  { name: "Domus Nova", src: "/images/press-logos/domus-nova.svg", width: 542, height: 50 },
  { name: "Ibiza Live Report", src: "/images/press-logos/ibiza-live-report.png", width: 600, height: 107 },
  { name: "Periódico de Ibiza", src: "/images/press-logos/periodico-ibiza.svg", width: 337, height: 50 },
  { name: "Arquitectura y Diseño", src: "/images/press-logos/arquitectura-y-diseno.svg", width: 139, height: 41, stacked: true },
];

// Every downloadable La Vanguardia mark (Wikimedia included) turns out to
// bake its navy masthead panel into the artwork itself — the lettering is
// negative space cut out of a solid navy shape, not separate text on a
// transparent background, so forcing it to a flat tone (like every other
// logo here) makes the whole panel render as one solid block instead of
// readable letterforms. Recreated as text instead: their real masthead is
// simply their name in a bold serif, no panel behind it.
function LaVanguardiaMark() {
  return (
    <span
      className="font-serif font-bold text-[17px] lg:text-[20px] tracking-tight"
      style={{ filter: "grayscale(1) brightness(0)", opacity: 0.6 }}
      aria-label="La Vanguardia"
    >
      La Vanguardia
    </span>
  );
}

export function PressLogos() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center gap-[28px] lg:gap-[36px] py-[40px] lg:py-[60px]">
      <div className="flex flex-col items-center gap-[6px]">
        <span className="text-[11px] lg:text-[12px] tracking-[0.15em] uppercase opacity-60">
          {t("footer.press_eyebrow")}
        </span>
        <span className="text-[20px] lg:text-[24px]">
          {t("footer.press_title")}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-[36px] gap-y-[24px] lg:gap-x-[56px] w-full max-w-[1100px] px-[15px]">
        <Image
          src={LOGOS[0].src}
          alt={LOGOS[0].name}
          width={LOGOS[0].width}
          height={LOGOS[0].height}
          className="h-[16px] lg:h-[20px] w-auto grayscale brightness-0 opacity-60"
        />
        <LaVanguardiaMark />
        {LOGOS.slice(1).map((logo) => (
          <Image
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className={`w-auto grayscale brightness-0 opacity-60 ${
              logo.stacked
                ? "h-[22px] lg:h-[28px]"
                : "h-[16px] lg:h-[20px]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PressLogos;
