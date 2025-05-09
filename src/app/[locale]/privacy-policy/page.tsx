import { Suspense } from "react";
import { getWordPressPage } from "@/app/_services/api";

async function PrivacyPolicy(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;

  return (
    <div>pending..</div>
  );
}

export default PrivacyPolicy;
