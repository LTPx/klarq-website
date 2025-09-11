"use client";

import { useEffect, useState } from "react";
import { DecorPageWp } from "../_interfaces/wordpress-components";

import DecorPageDesktop from "./decor-page";
import DecorPageMobile from "./decor-page-mobile";
import DecorTablet from "./decor-tablet";

interface Props {
  decor_information: DecorPageWp;
}

type DeviceType = "mobile" | "tablet" | "desktop";

function DecorWrapper({ decor_information }: Props) {
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
        <DecorPageMobile decor_information={decor_information} />
      )}
      {device === "tablet" && (
        <DecorTablet decor_information={decor_information} />
      )}
      {device === "desktop" && (
        <DecorPageDesktop decor_information={decor_information} />
      )}
    </div>
  );
}

export default DecorWrapper;
