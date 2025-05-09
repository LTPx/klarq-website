import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import { WORDPRESS_API_URL } from "../constants";

export async function getWordPressPage(
  locale: "en" | "es" | "de",
  page: string
): Promise<WordPressFrontendPage> {
  const url = `${WORDPRESS_API_URL}/wp/v2/pages/${page}`;
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
