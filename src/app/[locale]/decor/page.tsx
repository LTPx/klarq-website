import { getChildPages, getWordPressCustomPage } from "@/app/_services/api";
import DecorWrapper from "@/app/components/decor-wrapper";

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
      <DecorWrapper decor_information={decor_information} />
    </div>
  );
}

export default Decor;

