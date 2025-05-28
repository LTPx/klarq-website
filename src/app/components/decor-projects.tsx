import { Link } from "@/navigation";
import { ImageAcf } from "../_interfaces/wordpress-page";
import GalleryImagesScroll from "./gallery-images-scroll";

interface Props {
  title: string;
  date?: string;
  description: string;
  images: ImageAcf[];
  url?: string;
}

function DecorProjects(props: Props) {
  const { title, description, images, date, url } = props;

  return (
    <div className="DecorProjects w-full">
      <GalleryImagesScroll images={images}/>
      <div className="grid grid-cols-2 pt-[25px]">
        <div>
          <Link href={url || ''}>
            <h2 className="text-[18px] leading-[22px]">{title}</h2>
          </Link>
          <span className="text-[18px] leading-[22px]">
            {date}
          </span>
        </div>
        <div
          data-aos="fade-up"
          className="designer-description pr-[50px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}

export default DecorProjects;
