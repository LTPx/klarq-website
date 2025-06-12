type ProjectCardProps = {
  title: string;
  image: string;
};

export function ProjectCard(props: ProjectCardProps) {
  const { title, image } = props;

  return (
    <>
      <div className="relative h-[360px] lg:h-[570px]">
        <img
          src={image}
          alt={"image"}
          className={"absolute inset-0 h-full w-full object-cover"}
        />
        <div
          className={`absolute h-[360px] lg:h-[570px] inset-0`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.25))",
            zIndex: 1,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-white text-[16px] lg:text-[18px] leading-[22px]">
            {title}
          </span>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
