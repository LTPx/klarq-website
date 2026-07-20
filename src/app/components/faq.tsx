"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];

export function Faq() {
  const t = useTranslations();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const items = FAQ_KEYS.map((key) => ({
    key,
    question: t(`faq.${key}_question`),
    answer: t(`faq.${key}_answer`),
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="faq border-t border-t-black border-t-[0.75px] pt-[24px] lg:pt-[35px] pb-[10px] lg:pb-[15px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-[22px] leading-[26px] lg:text-[26px] lg:leading-[32px] pb-[16px] lg:pb-[24px]">
        {t("faq.title")}
      </h2>
      <div className="flex flex-col">
        {items.map((item) => {
          const isOpen = openKey === item.key;
          return (
            <div
              key={item.key}
              className="border-t border-t-black border-t-[0.5px] first:border-t-0"
            >
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : item.key)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-[12px] py-[14px] lg:py-[18px] text-left"
              >
                <span className="text-[14px] leading-[20px] lg:text-[16px] lg:leading-[22px]">
                  {item.question}
                </span>
                <img
                  src="/images/more.svg"
                  alt=""
                  className={`shrink-0 h-[13px] w-[13px] transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                />
              </button>
              {isOpen && (
                <p className="pb-[16px] lg:pb-[20px] text-[13px] leading-[19px] lg:text-[15px] lg:leading-[21px] text-black/70 pr-[24px]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
