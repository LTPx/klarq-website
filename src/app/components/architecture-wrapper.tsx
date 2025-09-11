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

  useEffect(() => {
    const mediaQueries = {
      mobile: window.matchMedia("(max-width: 767px)"),
      tablet: window.matchMedia("(min-width: 768px) and (max-width: 1024px)"),
      desktop: window.matchMedia("(min-width: 1025px)")
    };

    const handleDeviceChange = () => {
      if (mediaQueries.mobile.matches) setDevice("mobile");
      else if (mediaQueries.tablet.matches) setDevice("tablet");
      else if (mediaQueries.desktop.matches) setDevice("desktop");
    };

    handleDeviceChange();

    Object.values(mediaQueries).forEach((mq) =>
      mq.addEventListener("change", handleDeviceChange)
    );

    return () => {
      Object.values(mediaQueries).forEach((mq) =>
        mq.removeEventListener("change", handleDeviceChange)
      );
    };
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
