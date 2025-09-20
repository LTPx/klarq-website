"use client";

import { useEffect, useState } from "react";
import { InformationWp } from "../_interfaces/wordpress-components";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";

import DevelopmentMobile from "./development-mobile";
import DevelopmentUnified from "./development-desktop";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

type DeviceType = "mobile" | "desktop";

function DevelopmentWrapper({ projects, information }: Props) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [key, setKey] = useState(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setDevice(width <= 1023 ? "mobile" : "desktop");
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
      {device === "mobile" ? (
        <DevelopmentMobile projects={projects} information={information} />
      ) : (
        <DevelopmentUnified projects={projects} information={information} />
      )}
    </div>
  );
}

export default DevelopmentWrapper;
