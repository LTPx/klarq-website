import Image from "next/image";

type ProjectCardProps = {
  title: string;
  image: string;
};

export function ProjectCard(props: ProjectCardProps) {
  const { title, image } = props;

  return (
    <>
      <div className="relative h-[360px] ipad-mini:h-[400px] lg:h-[570px]">
        <Image
          src={image}
          alt={title || "image"}
          fill
          // Rendered inside the related-projects carousel: ~1/3 of viewport
          // width on desktop (3 slides visible), a bit under full width on
          // mobile (slidesToShow 1.2 — the next card peeks in).
          sizes="(min-width: 1024px) 33vw, 85vw"
          quality={90}
          loading="lazy"
          className={"object-cover"}
        />
        <div
          className={`absolute h-[360px] ipad-mini:h-[400px] lg:h-[570px] inset-0`}
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
