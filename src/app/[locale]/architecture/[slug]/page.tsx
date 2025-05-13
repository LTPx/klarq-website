import ArchitectureInformation from "@/app/components/architecture-information";
import Cover from "@/app/components/cover-pages";

async function ArchitectureSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

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
      <Cover img="https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
