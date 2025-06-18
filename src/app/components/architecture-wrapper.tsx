"use client";

import { useEffect, useState } from "react";
import {
  DecorPageWp,
  InformationWp,
} from "../_interfaces/wordpress-components";

import DecorPageDesktop from "./decor-page";
import DecorPageMobile from "./decor-page-mobile";
import ArchitectureDesktop from "./architecture-desktop";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
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
        <ArchitecturePageMobile projects={projects} information={information} />
      ) : (
        <ArchitectureDesktop information={information} projects={projects} />
      )}
    </div>
  );
}

export default ArchitectureWrapper;
