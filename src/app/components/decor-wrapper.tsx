"use client";

import { useEffect, useState } from "react";
import { DecorPageWp } from "../_interfaces/wordpress-components";
import DecorPageMobile from "./decor-page-mobile";
import DecorUnified from "./decor-page";

interface Props {
  decor_information: DecorPageWp;
}

type DeviceType = "mobile" | "desktop";

function DecorWrapper({ decor_information }: Props) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [key, setKey] = useState(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width <= 1023) {
        setDevice("mobile");
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
      {device === "mobile" ? (
        <DecorPageMobile decor_information={decor_information} />
      ) : (
        <DecorUnified decor_information={decor_information} />
      )}
    </div>
  );
}

export default DecorWrapper;
