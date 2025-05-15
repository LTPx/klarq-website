import GalleryImagesScroll from "./gallery-images-scroll";

interface Props {
  title: string;
  date?: string;
  description: string;
  images: string[];
}

function DecorProjects(props: Props) {
  const { title, description, images } = props;

  return (
    <div className="DecorProjects w-full">
      <GalleryImagesScroll images={images}/>
      <div className="grid grid-cols-2">
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
    </div>
  );
}

export default DecorProjects;
