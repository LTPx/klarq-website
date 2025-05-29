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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const selectedMember = members[selectedIndex];

  return (
    <div className="grid grid-cols-3">
      <div className="flex gap-[15px]">
        {members.map((member, index) => (
          <button
            key={index}
            className={`rounded-[50px] h-[33px] border border-[0.75px] border-black px-[25px] transition-colors duration-200 ${
              selectedIndex === index ? "bg-black/30 text-black" : "text-black"
            }`}
            onClick={() => setSelectedIndex(index)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {member.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[100px]">
        {isHovering ? (
          <img
            src={getProxyImageUrl(team.image_team.url)}
            alt={team.image_team.alt || "Equipo KLARQ"}
            className="w-[535px] h-[633px] object-cover transition-opacity duration-300"
          />
        ) : (
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
              data-aos="fade-up"
              className="designer-description font-pp_light"
              dangerouslySetInnerHTML={{ __html: selectedMember.description }}
            />
          </>
        )}
      </div>

      <div></div>
    </div>
  );
}

export default DesignersSection;
