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
const LOGOS: {
  name: string;
  src: string;
  width: number;
  height: number;
}[] = [
  { name: "Diario de Ibiza", src: "/images/press-logos/diario-de-ibiza.png", width: 863, height: 89 },
  { name: "Sabato", src: "/images/press-logos/sabato.png", width: 1392, height: 471 },
  { name: "NAN Arquitectura", src: "/images/press-logos/nan-arquitectura.png", width: 150, height: 83 },
  { name: "White Ibiza", src: "/images/press-logos/white-ibiza.svg", width: 1745, height: 142 },
  { name: "Domus Nova", src: "/images/press-logos/domus-nova.svg", width: 542, height: 50 },
  { name: "Ibiza Live Report", src: "/images/press-logos/ibiza-live-report.png", width: 600, height: 107 },
  { name: "Periódico de Ibiza", src: "/images/press-logos/periodico-ibiza.svg", width: 337, height: 50 },
];

// Arquitectura y Diseño's own site blocks automated fetches entirely (WAF),
// and every third-party logo mirror served only a low-res copy — recreated
// as text instead, matching the real masthead's stacked bold condensed
// treatment (ARQUITECTURA over DISEÑO) closely enough for a small mono
// trust badge, rather than using a blurry raster.
function ArquitecturaYDisenoMark() {
  return (
    <div
      className="flex flex-col items-center leading-[0.85] font-sans font-black uppercase tracking-tight"
      style={{ filter: "grayscale(1) brightness(0)", opacity: 0.6 }}
      aria-label="Arquitectura y Diseño"
    >
      <span className="text-[13px] lg:text-[15px]">Arquitectura</span>
      <span className="text-[13px] lg:text-[15px]">Diseño</span>
    </div>
  );
}

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
            className="h-[16px] lg:h-[20px] w-auto grayscale brightness-0 opacity-60"
          />
        ))}
        <ArquitecturaYDisenoMark />
      </div>
    </div>
  );
}

export default PressLogos;
