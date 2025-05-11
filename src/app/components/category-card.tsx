import { useTranslations } from "next-intl";

interface CategoryCardProps {
  title: string;
  description?: string;
  imageCategory: string;
  className?: string;
}

function CategoryCard(props: CategoryCardProps) {
  const { title, description, imageCategory, className } = props;

  return (
    <div className={""}>
      <img
        src={imageCategory}
        alt="Klarp"
        className="h-[65dvh] w-full object-cover"
      />
      <h1 className="absolute left-[30px] top-[20px] text-white text-[16px] leading-[16px] font-regular tracking-[-0.04em] z-[100]">
        {title}
      </h1>
      <div
        className={`hidden lg:absolute lg:h-full inset-0 h-full ${className}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.25))",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default CategoryCard;
