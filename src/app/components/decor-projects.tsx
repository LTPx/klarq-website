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
