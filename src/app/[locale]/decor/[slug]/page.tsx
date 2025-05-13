import ArchitectureInformation from "@/app/components/architecture-information";
import CallToAction from "@/app/components/call-to-action";
import Cover from "@/app/components/cover-pages";
import DecorProjects from "@/app/components/decor-projects";
import GalleryProjects from "@/app/components/gallery";

async function DecorSlugPage(nextParams: {
  params: { locale: "es" | "de" | "en"; slug: string };
}) {
  const {
    params: { locale, slug },
  } = nextParams;

  const images = [
    "https://images.unsplash.com/photo-1746990263194-0e2826fed608?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1674217930032-825b6e1d8511?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=3607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746990263194-0e2826fed608?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1674217930032-825b6e1d8511?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=3607&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="architecture-slug-page">
      <div className="fixed top-[35px] left-[35px]">
        <label className="dark:mix-blend-difference text-white text-[66px] leading-[46px] mix-blend-difference">
          KLARQ
        </label>
      </div>
      <div className="fixed top-[35px] right-[35px]">
        <label className="text-[66px] leading-[46px] tracking-[-0.03em] mix-blend-difference">
          DECOR
        </label>
      </div>
      <Cover img="https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <section className="py-[200px]">
        <CallToAction title={""} />
      </section>
      <section className="px-[40px]">
        <DecorProjects
          title={""}
          description={
            "Un lugar donde la luz se encuentra con la sombra, donde el agua se encuentra con el aire y la naturaleza. Un espacio peculiar, una luz natural mágica, un lugar rodeado de vegetación, de tranquilidad y relajación, cálido y con bellos materiales naturales. Espacios armónicos y curvos, naturales, sinuosos."
          }
          images={images}
        />
      </section>
    </div>
  );
}

export default DecorSlugPage;
