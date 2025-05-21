import { ImageAcf } from "../_interfaces/wordpress-page";

interface Props {
  images: ImageAcf[];
  imageClassName?: string;
}

function GalleryImagesScroll(props: Props) {
  const { images, imageClassName = "lg:h-[630px]" } = props;

  return (
    <div className="w-full">
      <div
        className="flex overflow-x-auto scrollbar-hide gap-[8px] no-scrollbar"
        style={{ cursor: "grab" }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src.url}
            alt={`image-${index}`}
            className={`object-contain shrink-0 ${imageClassName}`}
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryImagesScroll;
