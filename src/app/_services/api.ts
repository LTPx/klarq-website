import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import { WORDPRESS_API_URL } from "../constants";

export async function getWordPressPage(
  page: string
): Promise<WordPressFrontendPage> {
  const url = `${WORDPRESS_API_URL}/wp/v2/pages?slug=${page}`;
  console.log("url: ", url);
  const response = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getWordPressCustomPage(
  locale: "en" | "es" | "de",
  slug: string
): Promise<WordPressFrontendPage> {
  const parentPages = {
    es: "spanish-pages",
    de: "german-pages",
    en: "english-pages",
  };
  const parentPage = parentPages[locale];
  const url = `${WORDPRESS_API_URL}/custom/v1/page_by_slug?slug=${slug}&parent_slug=${parentPage}&lang=${locale}`;
  console.log("url custom page: ", url);
  const response = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });
  const page = await response.json();
  if (!response.ok) throw new Error(page.message);
  return page;
}

export async function getChildPages(
  slug: string,
  locale: "en" | "es" | "de",
  parentSlug: string
): Promise<WordPressFrontendPage[]> {
  const url = `${WORDPRESS_API_URL}/custom/v1/projects_children?slug=${slug}&parent_slug=${parentSlug}&lang=${locale}`;
  console.log("url child page: ", url);
  try {
    const response = await fetch(url, {
      next: {
        revalidate: 0,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener las páginas hijas.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener páginas hijas:", error);
    throw new Error("No se pudieron obtener las páginas hijas.");
  }
}

export async function getChildDecorPage(
  slug: string,
  locale: "en" | "es" | "de",
  parentSlug: string
): Promise<WordPressFrontendPage> {
  const url = `${WORDPRESS_API_URL}/custom/v1/project_child_decor/?slug=${slug}&parent_slug=${parentSlug}&lang=${locale}`;
  console.log("URL decor child page:", url);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 0,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la página hija de decor.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener página hija de decor:", error);
    throw new Error("No se pudo obtener la página hija de decor.");
  }
}

export async function getChildDevelopmentPage(
  slug: string,
  locale: "en" | "es" | "de",
  parentSlug: string
): Promise<WordPressFrontendPage> {
  const url = `${WORDPRESS_API_URL}/custom/v1/project_child_development/?slug=${slug}&parent_slug=${parentSlug}&lang=${locale}`;
  console.log("URL development child page:", url);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 0,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la página hija de development.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener página hija de development:", error);
    throw new Error("No se pudo obtener la página hija de development.");
  }
}

export async function getProjectChildBySlug(
  slug: string,
  locale: "en" | "es" | "de"
): Promise<WordPressFrontendPage> {
  const parentPages = {
    es: "spanish-pages",
    de: "german-pages",
    en: "english-pages",
  };
  const parentPage = parentPages[locale];
  const url = `${WORDPRESS_API_URL}/custom/v1/project_child?slug=${slug}&parent_slug=${parentPage}&lang=${locale}`;

  console.log("url project child: ", url);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 0,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la página hija.");
    }
    const page = await response.json();
    return page;
  } catch (error) {
    console.error("Error al obtener la página hija:", error);
    throw new Error("No se pudo obtener la página hija.");
  }
}
