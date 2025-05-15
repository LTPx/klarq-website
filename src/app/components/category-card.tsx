interface CategoryCardProps {
  title: string;
  description?: string;
  imageCategory: string;
  className?: string;
}

function CategoryCard({ title, imageCategory, className }: CategoryCardProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={imageCategory}
        alt={title}
        className="w-full h-[calc(60dvh-70px)] object-cover"
      />
      <h1 className="absolute left-[30px] top-[20px] text-white text-[16px] leading-[16px] font-regular tracking-[-0.04em] z-[100]">
        {title}
      </h1>
    </div>
  );
}

export default CategoryCard;
