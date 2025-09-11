"use client";

import { useEffect, useState } from "react";
import { InformationWp } from "../_interfaces/wordpress-components";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";

import DevelopmentMobile from "./development-mobile";
import DevelopmentTablet from "./development-tablet";
import DevelopmentDesktop from "./development-desktop";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

type DeviceType = "mobile" | "tablet" | "desktop";

function DevelopmentWrapper({ projects, information }: Props) {
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

    const onOrientationChange = () => setKey((prev) => prev + 1);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", onOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", onOrientationChange);
    };
  }, []);

  return (
    <div key={key}>
      {device === "mobile" && (
        <DevelopmentMobile projects={projects} information={information} />
      )}
      {device === "tablet" && (
        <DevelopmentTablet projects={projects} information={information} />
      )}
      {device === "desktop" && (
        <DevelopmentDesktop projects={projects} information={information} />
      )}
    </div>
  );
}

export default DevelopmentWrapper;
