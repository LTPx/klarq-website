"use client";

import { useState } from "react";
import { ImageAcf } from "../_interfaces/wordpress-page";
import { getProxyImageUrl } from "@/utils/image_proxy";

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
  const selectedMember = hoveredIndex !== null ? members[hoveredIndex] : null;

  return (
    <div className="grid grid-cols-3">
      <div className="flex gap-[15px]">
        {members.map((member, index) => (
          <button
            key={index}
            className={`rounded-[50px] h-[33px] border border-[0.75px] border-black px-[25px] transition-colors duration-200 ${
              hoveredIndex === index ? "bg-black/30 text-black" : "text-black"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {member.name.split(" ")[0]}
          </button>
        ))}
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
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out flex flex-col gap-[100px] px-[20px] py-[40px] ${
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
              <div
                className="designer-description font-pp_light"
                dangerouslySetInnerHTML={{
                  __html: selectedMember.description,
                }}
              />
            </>
          )}
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default DesignersSection;
