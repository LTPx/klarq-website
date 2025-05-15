interface Props {
  images: string[];
}

function GalleryImagesScroll(props: Props) {
  const { images } = props;

  return (
    <div className="w-full">
      <div
        className="flex overflow-x-auto scrollbar-hide gap-[8px] pb-[25px] no-scrollbar"
        style={{ cursor: "grab" }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`image-${index}`}
            className="h-[630px] object-contain shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export default GalleryImagesScroll;
