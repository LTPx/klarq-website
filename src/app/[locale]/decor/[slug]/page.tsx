import { getChildDecorPage, getProjectChildBySlug } from "@/app/_services/api";
import ArchitectureInformation from "@/app/components/architecture-information";
import CallToAction from "@/app/components/call-to-action";
import Cover from "@/app/components/cover-pages";
import DecorProjects from "@/app/components/decor-projects";
import GalleryProjects from "@/app/components/gallery";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";

async function DecorSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

  const parentSlug =
    locale === "es"
      ? "spanish-pages"
      : locale === "de"
      ? "german-pages"
      : "english-pages";

  const data = await getChildDecorPage(slug, locale, parentSlug);
  const { acf } = data;
  const { decor_projects } = acf;

  return (
    <div className="architecture-slug-page">
      <div className="fixed top-[40px] left-[35px] mix-blend-difference text-white z-[1000]">
        <label className="text-[66px] leading-[46px] ">KLARQ</label>
      </div>
      <div className="fixed top-[40px] right-[40px] z-[1000] mix-blend-difference text-white">
        <label className="text-[66px] leading-[46px] tracking-[-0.03em]">
          DECOR
        </label>
      </div>
      <Cover img={getProxyImageUrl(decor_projects.cover_project.url)} />
      {/* <section className="py-[200px]">
        <CallToAction title={decor_projects.banner.title} />
      </section> */}
      <section className="px-[40px] flex flex-col gap-[180px] pb-[130px]">
        {decor_projects.projects &&
          decor_projects.projects.map((decor, index) => (
            <div key={index}>
              <DecorProjects
                title={decor.title}
                description={decor.description}
                images={decor.gallery}
                date={decor.date}
                // url="/"
              />
            </div>
          ))}
      </section>
    </div>
  );
}

export default DecorSlugPage;
