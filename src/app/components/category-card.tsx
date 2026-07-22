import Image from "next/image";

interface CategoryCardProps {
  title: string;
  description?: string;
  imageCategory: string;
  className?: string;
  showDescription?: boolean;
  anyCardHovering?: boolean;
  hasScrolled?: boolean;
  isMobile?: boolean;
  expandedIndexMobile?: number | null;
  index?: number;
  onExpandClick?: () => void;
}

function CategoryCard({
  title,
  imageCategory,
  className,
  description,
  showDescription,
  anyCardHovering,
  hasScrolled,
  isMobile,
  expandedIndexMobile,
  index,
  onExpandClick,
}: CategoryCardProps) {
  const isExpandedMobile = isMobile && expandedIndexMobile === index;

  const mobileHeight = isMobile
    ? expandedIndexMobile === null
      ? "h-[calc(30dvh-18px)]"
      : isExpandedMobile
      ? "h-[calc(50dvh-18px)]"
      : "h-[calc(20dvh-18px)]"
    : hasScrolled
    ? anyCardHovering
      ? "h-[calc(30dvh-18px)] lg:h-[60dvh]"
      : "h-[calc(30dvh-18px)] lg:h-[calc(60dvh-70px)]"
    : "h-[calc(30dvh-18px)] lg:h-[60dvh]";
  return (
    <div
      className={`relative w-full ${mobileHeight} ${className} transition-all duration-500 ease-in-out`}
    >
      <Image
        src={imageCategory}
        alt={title}
        fill
        sizes="(min-width: 1024px) 34vw, 100vw"
        priority
        quality={90}
        className="object-cover transition-all duration-500 ease-in-out"
      />
      <div className="absolute inset-0 bg-black/20 z-[50]" />
      <label className="font-zoom absolute left-[15px] lg:left-[20px] xl:left-[50px] top-[10px] lg:top-[45px] text-white text-[18px] leading-[22px] tracking-[-0.02em] z-[100] flex items-center gap-2">
        {title}
      </label>
      {isMobile && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onExpandClick?.();
          }}
          className="absolute right-[15px] top-[10px] z-[100] text-[18px] flex items-center justify-center"
        >
          <img
            src="images/expand.svg"
            alt={title}
            className={`w-[17.5px] h-[w-[17.5px] transition-transform duration-300 ${
              isExpandedMobile ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
      )}
      {description && (
        <div
          className={`absolute left-[15px] lg:left-[20px] xl:left-[50px] bottom-[15px] lg:bottom-[45px] text-white z-[100] max-w-[90%] lg:max-w-[428px] transition-opacity duration-500 ease-in-out ${
            showDescription || isExpandedMobile
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="description-cards-home"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryCard;
