import { Link } from "@/navigation";
import { ImageAcf } from "../_interfaces/wordpress-page";
import GalleryImagesScroll from "./gallery-images-scroll";

interface Props {
  title: string;
  date?: string;
  description: string;
  images: ImageAcf[];
  // url?: string;
}

function DecorProjects(props: Props) {
  const { title, description, images, date } = props;

  return (
    <div className="DecorProjects w-full">
      <GalleryImagesScroll
        animationType="fade-left"
        stagger={false}
        images={images}
      />
      <div className="grid gap-[30px] lg:gap-[0px] grid-cols-1 lg:grid-cols-2 pt-[25px]">
        <div className="flex pr-[15px] lg:pr-[0px] lg:flex-col lg:justify-start justify-between flex-row">
          {/* <Link href={url || ""}> */}
          <h2 className="text-[18px] leading-[22px]">{title}</h2>
          {/* </Link> */}
          <span className="text-[18px] leading-[22px]">{date}</span>
        </div>
        <div
          className="designer-description pr-[15px] lg:pr-[50px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

export default DecorProjects;
