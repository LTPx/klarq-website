"use client";

import { useEffect, useState } from "react";
import { InformationWp } from "../_interfaces/wordpress-components";

import ArchitectureDesktop from "./architecture-desktop";
import ArchitecturePageMobile from "./architecture-mobile";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import ArchitectureTablet from "./architecture-tablet";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

type DeviceType = "mobile" | "tablet" | "desktop";

function ArchitectureWrapper({ projects, information }: Props) {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 900) {
        setDevice("mobile");
      } else if (width <= 1200) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
