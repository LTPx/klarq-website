"use client";

import { isMobile, isTablet } from "react-device-detect";
import { InformationWp } from "../_interfaces/wordpress-components";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";

import ArchitectureDesktop from "./architecture-desktop";
import ArchitectureTablet from "./architecture-tablet";
import ArchitecturePageMobile from "./architecture-mobile";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

function ArchitectureWrapper({ projects, information }: Props) {
  let device: "mobile" | "tablet" | "desktop" = "desktop";

  if (isMobile) {
    device = "mobile";
  } else if (isTablet) {
    device = "tablet";
  } else {
    device = "desktop";
  }

  return (
    <div>
      {device === "mobile" && (
        <ArchitecturePageMobile projects={projects} information={information} />
      )}
      {device === "tablet" && (
        <ArchitectureTablet projects={projects} information={information} />
      )}
      {device === "desktop" && (
        <ArchitectureDesktop projects={projects} information={information} />
      )}
    </div>
  );
}

export default ArchitectureWrapper;
