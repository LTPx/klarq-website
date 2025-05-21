import ArchitectureImages from "./architecture-images";
import CarouselProjects from "./carosuel-projects";

interface Props {
  title: string;
  date?: string;
  description: string;
  // images?: string[];
}

function ArchitectureInformation(props: Props) {
  const { title, description } = props;
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
    <div className="architectureInformation">
      <div className="grid grid-cols-2 px-[40px]">
        <div>
          <h2 className="text-[35px] leading-[46px]">Can Duarte</h2>
          <span className="text-[18px] leading-[26px] tracking-[-0.03em]">
            Ibiza 2020-2022
          </span>
        </div>
        <div
          data-aos="fade-up"
          className="designer-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <section className="pt-[170px] px-[40px]">
        <ArchitectureImages images={images}/>
      </section>
      <section className="pt-[170px] px-[40px]">
        <CarouselProjects images={images}/>
      </section>
    </div>
  );
}

export default ArchitectureInformation;
