"use client";

import { useEffect, useState } from "react";
import { InformationWp } from "../_interfaces/wordpress-components";

import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import DevelopmentMobile from "./development-mobile";
import DevelopmentDesktop from "./development-desktop";

interface Props {
  projects: {
    project: WordPressFrontendPage;
    title: string;
    date: string;
  }[];
  information: InformationWp;
}

function DevelopmentWrapper({ projects, information }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <DevelopmentMobile projects={projects} information={information} />
      ) : (
        <DevelopmentDesktop information={information} projects={projects} />
      )}
    </div>
  );
}

export default DevelopmentWrapper;
