"use client";

import { useTranslations } from "next-intl";
import { WHATSAPP_NUMBER } from "../constants";
import HoverButton from "./hover-fill-btn";

export function WhatsappCta({ projectTitle }: { projectTitle?: string }) {
  const t = useTranslations();
  const message = projectTitle
    ? t("whatsapp.message_project", { project: projectTitle })
    : t("whatsapp.message_contact");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return <HoverButton href={href}>{t("whatsapp.cta")}</HoverButton>;
}

export default WhatsappCta;
