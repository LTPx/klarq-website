"use client";

import { useState } from "react";
import { ImageAcf } from "../_interfaces/wordpress-page";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface TeamMember {
  name: string;
  profession: string;
  description: string;
}

interface Props {
  team: {
    image_team: ImageAcf;
    first_team_member: TeamMember;
    second_team_member: TeamMember;
  };
}

export function DesignersSection({ team }: Props) {
  const members = [team.first_team_member, team.second_team_member];
  const t = useTranslations();

  const [fixedIndex, setFixedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverOrigin, setHoverOrigin] = useState<"left" | "right">("left");
  const [isHovered, setIsHovered] = useState(false);

  const selectedIndex = fixedIndex;
  const selectedMember = selectedIndex !== null ? members[selectedIndex] : null;

  const handleClick = (index: number) => {
    setFixedIndex(index);
  };

  const handleReset = () => {
    setFixedIndex(null);
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const origin = x < rect.width / 2 ? "left" : "right";
    setHoverOrigin(origin);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="grid grid-row gap-[65px] md:gap-[0px] md:grid-cols-3">
      <div className="flex gap-[15px]">
        {members.map((member, index) => (
          <button
            key={index}
            className="relative overflow-hidden rounded-[50px] h-[33px] border border-[0.75px] border-black px-[25px] text-black group"
            onClick={() => handleClick(index)}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`absolute inset-0 rounded-[50px] bg-black/30 z-0 transition-transform duration-700 ease-in-out ${
                selectedIndex === index || hoveredIndex === index
                  ? "scale-x-100"
                  : "scale-x-0"
              }`}
              style={{
                transformOrigin:
                  selectedIndex === index || hoveredIndex === index
                    ? hoverOrigin
                    : "left",
              }}
            />
            <span className="relative top-[1px] z-10 transition-colors duration-300">
              {member.name.split(" ")[0]}
            </span>
          </button>
        ))}

        {fixedIndex !== null && (
          <img
            className="cursor-pointer w-[33px] h-[33px]"
            onClick={handleReset}
            src={"/images/close-h.svg"}
            alt={"close-h"}
          />
        )}
      </div>
      <div className="relative md:w-[535px] min-h-[422px] md:h-[633px]">
        <img
          src={getProxyImageUrl(team.image_team.url)}
          alt={team.image_team.alt || "Equipo KLARQ"}
          className={`absolute top-0 left-0 w-full h-[422px] md:h-full object-cover transition-opacity duration-500 ease-in-out ${
            selectedMember ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`lg:absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out flex flex-col gap-[50px] md:gap-[100px] pt-[13px] py-[0px] ${
            selectedMember ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {selectedMember && (
            <>
              <div>
                <h3 className="text-[26px] leading-[30px] lg:leading-[26px] font-pp_light">
                  {selectedMember.name}
                </h3>
                <p className="text-[18px] leading-[26px] lg:leading-[30px] font-pp_light">
                  {selectedMember.profession}
                </p>
              </div>
              <div className="flex flex-col gap-[25px]">
                <div
                  className="designer-description font-pp_light"
                  dangerouslySetInnerHTML={{
                    __html: selectedMember.description,
                  }}
                />
                <div
                  className="flex items-center gap-[10px]"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    src={
                      isHovered
                        ? "/images/circle-black.svg"
                        : "/images/circle.svg"
                    }
                    className="h-[10px] w-[10px]"
                    alt=""
                  />
                  <Link
                    className="underline"
                    href={selectedIndex === 0 ? "/decor" : "/architecture"}
                  >
                    {selectedIndex === 0
                      ? `${t("home.see_decor")}`
                      : `${t("home.see_architecture")}`}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="hidden lg:block"></div>
    </div>
  );
}

export default DesignersSection;
