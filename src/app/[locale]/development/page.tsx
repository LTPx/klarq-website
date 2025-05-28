import { getChildPages, getWordPressCustomPage } from "@/app/_services/api";
import ArchitecturePage from "@/app/components/architecture-information-page";
import DevelopmentPage from "@/app/components/development-page";

async function Development(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;
  const page = "development";
  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";

  const data = await getWordPressCustomPage(locale, page);
  const allProjects = await getChildPages(page, locale, parentSlug);

  const { acf } = data;
  const { development_information } = acf;

  const selectedProjects = development_information.projects
    .map((item) => {
      const matched = allProjects.find((p) => p.id === item.project.ID);
      if (!matched) return undefined;

      return {
        project: matched,
        title: item.project.post_title,
        date: matched.acf.development_projects.date
      };
    })
    .filter(isDefined);

  return (
    <div className="architecture">
      <DevelopmentPage
        information={development_information.information}
        projects={selectedProjects}
      />
    </div>
  );
}

export default Development;

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
