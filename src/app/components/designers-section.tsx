"use client";

import { useState } from "react";
import { ImageAcf } from "../_interfaces/wordpress-page";
import { getProxyImageUrl } from "@/utils/image_proxy";
import { Link } from "@/navigation";

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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [fixedIndex, setFixedIndex] = useState<number | null>(null);
  const [hoverOrigin, setHoverOrigin] = useState<"left" | "right">("left");

  const selectedIndex = fixedIndex !== null ? fixedIndex : hoveredIndex;
  const selectedMember = selectedIndex !== null ? members[selectedIndex] : null;

  const handleMouseEnter = (e: React.MouseEvent, index: number) => {
    if (fixedIndex !== null) return; // desactivar hover si hay selección fija

    const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const origin = x < rect.width / 2 ? "left" : "right";
    setHoverOrigin(origin);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (fixedIndex !== null) return; // no ocultar si está fijo
    setHoveredIndex(null);
  };

  const handleClick = (index: number) => {
    setFixedIndex(index);
  };

  const handleReset = () => {
    setFixedIndex(null);
    setHoveredIndex(null);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="grid grid-cols-3">
      <div className="flex gap-[15px]">
        {members.map((member, index) => (
          <button
            key={index}
            className="relative overflow-hidden rounded-[50px] h-[33px] border border-[0.75px] border-black px-[25px] group text-black"
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            <span
              className={`absolute inset-0 rounded-[50px] bg-black/30 z-0 transition-transform duration-700 ease-in-out ${
                selectedIndex === index ? "scale-x-100" : "scale-x-0"
              }`}
              style={{
                transformOrigin: selectedIndex === index ? hoverOrigin : "left",
              }}
            />
            <span className="relative z-10 transition-colors duration-300">
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

      <div className="relative w-[535px] h-[633px]">
        <img
          src={getProxyImageUrl(team.image_team.url)}
          alt={team.image_team.alt || "Equipo KLARQ"}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
            selectedMember ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out flex flex-col gap-[100px] pt-[13px] py-[0px] ${
            selectedMember ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {selectedMember && (
            <>
              <div>
                <h3 className="text-[26px] leading-[26px] font-pp_light">
                  {selectedMember.name}
                </h3>
                <p className="text-[18px] leading-[30px] font-pp_light">
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
                  <Link className="underline" href={"/decor"}>
                    Ver Decor
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default DesignersSection;
