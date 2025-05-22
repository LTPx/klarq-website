import { getProjectChildBySlug } from "@/app/_services/api";
import ArchitectureInformation from "@/app/components/architecture-information";
import Cover from "@/app/components/cover-pages";

async function ArchitectureSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

  const data = await getProjectChildBySlug(slug, locale);
  const { acf } = data;
  const { architecture_projects } = acf;

  return (
    <div className="architecture-slug-page relative bg-white overflow-hidden">
      <div className="fixed top-[35px] left-[35px]">
        <label className="dark:mix-blend-difference text-white text-[66px] leading-[46px] mix-blend-difference">
          KLARQ
        </label>
      </div>
      <div className="fixed top-[35px] right-[35px]">
        <label className="text-[66px] leading-[46px] tracking-[-0.03em] mix-blend-difference">
          ARCHITECTURE
        </label>
      </div>
      <Cover img={architecture_projects.cover_project.url} />
      <section className="pt-[60px]">
        <ArchitectureInformation
          title={""}
          description={
            "Ibiza evoca esa sensación de eternas vacaciones que todos deseamos disfrutar todo el año. Su atmósfera relajada, el ambiente familiar y su maravilloso clima contribuyen al privilegio de vivir al aire libre gran parte del tiempo, independientemente de la estación."
          }
        />
      </section>
    </div>
  );
}

export default ArchitectureSlugPage;
