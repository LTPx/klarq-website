"use client";

import { useEffect, useRef, useState } from "react";
import { WordPressFrontendPage } from "../_interfaces/wordpress-page";
import CoverDynamic from "./cover-dynamic";
import {
  DecorPageWp,
  InformationWp,
} from "../_interfaces/wordpress-components";
import CallToAction from "./call-to-action";
import DecorProjects from "./decor-projects";
import { getProxyImageUrl } from "@/utils/image_proxy";
import AOS from "aos";
import "aos/dist/aos.css";
import { useExpandStore } from "../store/expand-store";

interface Props {
  decor_information: DecorPageWp;
}

function DecorPage({ decor_information }: Props) {
  const [expanded, setExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isExpandedReady, setIsExpandedReady } = useExpandStore();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  useEffect(() => {
    if (expanded) {
      AOS.refresh();
    }
  }, [expanded]);

  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => {
        setIsExpandedReady(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsExpandedReady(false);
    }
  }, [expanded]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!expanded && e.deltaY > 30) {
        setExpanded(true);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("wheel", onWheel);
    return () => container?.removeEventListener("wheel", onWheel);
  }, [expanded]);

  return (
    <div
      ref={scrollContainerRef}
      className={`bg-white ${expanded ? "" : "overflow-y-hidden"}`}
    >
      <div className="DecorPage relative">
        <CoverDynamic
          img={getProxyImageUrl(decor_information.cover.url)}
          information={decor_information.information}
          labelTitle="Decor"
          expanded={expanded}
        />
      </div>
      {isExpandedReady && (
        <>
          <section className="py-[200px]">
            <CallToAction title={decor_information.page_content.title_banner} />
          </section>
          <section className="pl-[40px] flex flex-col gap-[180px] pb-[130px]">
            {decor_information.page_content.projects_decor?.map(
              (decor, index) => (
                <div key={index}>
                  <DecorProjects
                    title={decor.title}
                    description={decor.description}
                    images={decor.gallery}
                    date={decor.date}
                    url="/"
                  />
                </div>
              )
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default DecorPage;
