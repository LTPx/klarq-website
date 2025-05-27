import { getChildPages, getWordPressCustomPage } from "@/app/_services/api";
import ArchitecturePage from "@/app/components/architecture-information-page";

async function Architecture(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;
  const page = "architecture";
  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";

  const data = await getWordPressCustomPage(locale, page);
  const allProjects = await getChildPages(page, locale, parentSlug);

  const { acf } = data;
  const { architecture_information } = acf;

  const selectedProjects = architecture_information.projects
    .map((item) => {
      const matched = allProjects.find((p) => p.id === item.project.ID);
      if (!matched) return undefined;

      return {
        project: matched,
        title: item.project.post_title,
      };
    })
    .filter(isDefined);

  return (
    <div className="architecture">
      <ArchitecturePage
        information={architecture_information.information}
        projects={selectedProjects}
      />
    </div>
  );
}

export default Architecture;

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
