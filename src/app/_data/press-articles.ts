import { ImageAcf } from "../_interfaces/wordpress-page";
import { PublicationsWp } from "../_interfaces/wordpress-components";

// Opinion columns by Lluís Oliva Munar (KLARQ / COAIB Ibiza-Formentera) in
// Diario de Ibiza. Hardcoded here instead of going through WordPress/ACF —
// no CMS write access was available, and this content changes rarely enough
// that it doesn't need to be editor-managed. English copy is an original
// summary of each article's thesis, not a translation of the Spanish text
// (avoids reproducing copyrighted material beyond the short quoted title).
const PRESS_THUMBNAIL: ImageAcf = {
  ID: 0,
  id: 0,
  title: "Diario de Ibiza",
  filename: "press-diario-ibiza.svg",
  filesize: 0,
  url: "/images/press-diario-ibiza.svg",
  link: "",
  alt: "Diario de Ibiza — Opinión",
  author: "",
  description: "",
  caption: "",
  name: "press-diario-ibiza",
  status: "inherit",
  uploaded_to: 0,
  date: new Date("2026-01-01"),
  modified: new Date("2026-01-01"),
  menu_order: 0,
  mime_type: "image/svg+xml",
  type: "image",
  subtype: "svg+xml",
  icon: "",
  width: 800,
  height: 1000,
  sizes: {
    thumbnail: "/images/press-diario-ibiza.svg",
    "thumbnail-width": 150,
    "thumbnail-height": 188,
    medium: "/images/press-diario-ibiza.svg",
    "medium-width": 300,
    "medium-height": 375,
    medium_large: "/images/press-diario-ibiza.svg",
    "medium_large-width": 768,
    "medium_large-height": 960,
    large: "/images/press-diario-ibiza.svg",
    "large-width": 800,
    "large-height": 1000,
    "1536x1536": "/images/press-diario-ibiza.svg",
    "1536x1536-width": 800,
    "1536x1536-height": 1000,
    "2048x2048": "/images/press-diario-ibiza.svg",
    "2048x2048-width": 800,
    "2048x2048-height": 1000,
  },
};

interface PressArticleEntry {
  titleEn: string;
  titleEs: string;
  date: string;
  summaryEn: string;
  url: string;
}

const PRESS_ARTICLES_ES: PressArticleEntry[] = [
  {
    titleEn: "Another patch on a broken planning system (III)",
    titleEs: "Otro parche para un planeamiento que pide el cambio (III)",
    date: "19.07.2026",
    summaryEn:
      "Breaking down real cost figures from two public housing developments in Ibiza (IBAVI), the author shows that even with land donated for free, construction costs already exceed the legal maximum sale price for regulated housing in several unit sizes. His conclusion: Law 4/2025's requirement that municipalities run economic feasibility studies before setting affordable-housing quotas isn't a concession to developers — it's basic arithmetic.",
    url: "https://www.diariodeibiza.es/opinion/2026/07/19/parche-planeamiento-pide-cambio-iii-132587588.html",
  },
  {
    titleEn: "Another patch on a broken planning system (Part II)",
    titleEs: "Otro parche para un planeamiento que pide el cambio (Parte II)",
    date: "12.07.2026",
    summaryEn:
      "Two Ibiza municipalities just approved unlocking \"transition zones\" for 100%-affordable housing developments. The author argues the headlines will outlast the results: once land cost, permits, technical fees and financing are added up, developer margins on price-capped housing evaporate — and no developer takes on years of risk for a return worse than a savings account.",
    url: "https://www.diariodeibiza.es/opinion/2026/07/12/parche-planeamiento-pideel-cambio-parte-132367026.html",
  },
  {
    titleEn: "Another patch on a broken planning system (Part I)",
    titleEs: "Otro parche para un planeamiento que pide el cambio (Parte I)",
    date: "27.06.2026",
    summaryEn:
      "Opening a three-part series, the author examines Ibiza's move to reclassify rural land adjoining urban areas (\"transition zones\") under new Balearic housing law. He compares it to scaffolding propped against a building whose structure was never reinforced, and points to construction costs as the real obstacle even where qualifying parcels exist.",
    url: "https://www.diariodeibiza.es/opinion/2026/06/27/parche-planeamiento-pide-cambio-parte-131855908.html",
  },
  {
    titleEn: "The island that opens nightclubs, closes camps",
    titleEs: "La isla que abre discotecas y cierra campamentos",
    date: "29.05.2026",
    summaryEn:
      "Timed to the start of tourist season, this piece confronts the parallel reality of six informal settlement evictions in two years — seasonal and year-round workers living in caravans and tents because they can't afford housing. The author argues eviction without an alternative just displaces the problem, and points to activating Ibiza's existing empty housing stock as a lever that needs no new land at all.",
    url: "https://www.diariodeibiza.es/opinion/2026/05/29/isla-abre-discotecas-cierra-campamentos-130771700.html",
  },
  {
    titleEn: "The expansion nobody asked for, the homes that don't come",
    titleEs: "La ampliación que no pedimos, las viviendas que no llegan",
    date: "28.05.2026",
    summaryEn:
      "Contrasting swift political consensus against an unpopular airport expansion with the near-total absence of funded incentives for affordable housing, the author lists stalled public housing projects across Ibiza and Formentera. His argument: housing needs to be treated as an essential good running alongside the free market, not folded into it.",
    url: "https://www.diariodeibiza.es/opinion/2026/05/28/ampliacion-pedimos-viviendas-llegan-130729655.html",
  },
  {
    titleEn: "Housing in Ibiza and Formentera: an unavoidable roadmap",
    titleEs: "La vivienda en Ibiza y Formentera: una hoja de ruta ineludible",
    date: "27.03.2026",
    summaryEn:
      "Closing a conference series held by the Ibiza-Formentera chapter of the Balearic Architects' Association (COAIB), the author sets out an institutional roadmap: a 50-year, cross-party territorial pact, denser urban models instead of oversized minimum-plot rules, legal security to bring empty homes onto the rental market, and real tax incentives for developers to build price-capped housing for residents.",
    url: "https://www.diariodeibiza.es/opinion/2026/03/27/vivienda-ibiza-formentera-hoja-ruta-128459702.html",
  },
  {
    titleEn: "Ibiza and Formentera face their territorial test",
    titleEs: "Ibiza y Formentera ante el examen de su territorio",
    date: "13.03.2026",
    summaryEn:
      "Reflecting on a lecture by urbanist Jin Taira on reading island territory as a single interconnected system — housing, roads, transport nodes, population density — the author admits Ibiza and Formentera have never actually mapped how their own islands function, with urban plans left unrevised for 30-40 years.",
    url: "https://www.diariodeibiza.es/opinion/2026/03/13/ibiza-formentera-examen-territorio-127889209.html",
  },
  {
    titleEn: "Social housing in the Pitiusas: good architecture, bad numbers",
    titleEs: "VPO en las Pitiusas: buena arquitectura, malas cuentas",
    date: "26.02.2026",
    summaryEn:
      "Pushing back on the stigma that social housing (VPO) means lower-quality design, the author points to real projects proving otherwise — then turns to why so little of it gets built: regulated sale prices are fixed by law while construction costs, driven up by double-insularity material costs and skilled-labour shortages, keep rising.",
    url: "https://www.diariodeibiza.es/opinion/2026/02/26/vpo-pitiusas-buena-arquitectura-malas-127271693.html",
  },
  {
    titleEn: "Housing in Ibiza: the monster is here",
    titleEs: "Vivienda en Ibiza: el monstruo está aquí",
    date: "07.02.2026",
    summaryEn:
      "Built around journalist Jorge Dioni López's talk at a COAIB housing conference, this piece uses a horror-film framing — first a hint, then a glimpse, then the monster in full view — to argue Ibiza's housing crisis is no longer deniable, tracing its roots to 1950s housing policy and the missed opportunity of the 2008 crisis.",
    url: "https://www.diariodeibiza.es/opinion/2026/02/07/vivienda-ibiza-monstruo-126537855.html",
  },
  {
    titleEn: "Ibiza, a luxury backdrop emptied of citizens",
    titleEs: "Ibiza, un decorado de lujo vacío de ciudadanía",
    date: "22.01.2026",
    summaryEn:
      "Opening a four-session COAIB conference cycle on Ibiza's housing crisis, the author cites new data: three in ten residents are considering leaving the island, and seven in ten spend over 30% of their income on housing. Rather than dwelling on the diagnosis, the piece looks to Vancouver's tax on empty homes, Navarra and Ireland's rehabilitation-for-rent-control schemes, and Barcelona's housing cooperatives as working models Ibiza has yet to try.",
    url: "https://www.diariodeibiza.es/opinion/2026/01/22/ibiza-decorado-lujo-vacio-ciudadania-125937570.html",
  },
];

export function getPressPublications(locale: "es" | "en" | "de"): PublicationsWp[] {
  return PRESS_ARTICLES_ES.map((article) => ({
    image: PRESS_THUMBNAIL,
    title: locale === "en" ? article.titleEn : article.titleEs,
    sub_title:
      locale === "en"
        ? `${article.date} — Published in Diario de Ibiza.`
        : `${article.date} — Publicado en Diario de Ibiza.`,
    url: article.url,
  }));
}
