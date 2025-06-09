interface CategoryCardProps {
  title: string;
  description?: string;
  imageCategory: string;
  className?: string;
  showDescription?: boolean;
  anyCardHovering?: boolean;
}

function CategoryCard({
  title,
  imageCategory,
  className,
  description,
  showDescription,
  anyCardHovering,
}: CategoryCardProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={imageCategory}
        alt={title}
        className={`w-full object-cover transition-[height] duration-600 ease-in-out ${
          anyCardHovering ? "h-[60dvh]" : "h-[calc(60dvh-70px)]"
        }`}
      />
      <div className="absolute inset-0 bg-black/20 z-[50]" />
      <h1 className="font-zoom absolute left-[50px] top-[45px] text-white text-[18px] leading-[22px] tracking-[-0.02em] z-[100]">
        {title}
      </h1>
      {description && (
        <div
          className={`absolute left-[50px] bottom-[45px] text-white z-[100] lg:w-[428px] transition-opacity duration-500 ease-in-out ${
            showDescription ? "opacity-100" : "opacity-0 pointer-events-none"
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
