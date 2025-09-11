"use client";

import { useEffect, useState } from "react";
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

type DeviceType = "mobile" | "tablet" | "desktop";

function ArchitectureWrapper({ projects, information }: Props) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [key, setKey] = useState(0);

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
    window.addEventListener("orientationchange", () => setKey(prev => prev + 1));

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", () => setKey(prev => prev + 1));
    };
  }, []);

  return (
    <div key={key}>
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
