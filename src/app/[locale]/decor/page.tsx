import { getChildPages, getWordPressCustomPage } from "@/app/_services/api";
import Cover from "@/app/components/cover-pages";
import DecorPage from "@/app/components/decor-page";

async function Decor(nextParams: { params: { locale: "en" | "es" | "de" } }) {
  const {
    params: { locale },
  } = nextParams;

  const page = "decor";
  const data = await getWordPressCustomPage(locale, page);

  const { acf } = data;
  const { decor_information } = acf;

  return (
    <div className="decor">
      <DecorPage decor_information={decor_information} />
    </div>
  );
}

export default Decor;

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
