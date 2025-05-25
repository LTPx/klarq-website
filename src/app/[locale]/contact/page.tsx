import { getWordPressCustomPage } from "@/app/_services/api";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

async function Contact(nextParams: { params: { locale: "en" | "es" | "de" } }) {
  const {
    params: { locale },
  } = nextParams;
  const t = await getTranslations();
  const data = await getWordPressCustomPage(locale, "contact");
  const { acf } = data;
  const { contact_information } = acf;

  return (
    <div className="lg:h-[calc(100dvh-50px)] lg:flex">
      <div className="fixed top-[35px] left-[35px]">
        <img src="/images/KLARQ.svg" className="h-[49px] w-full" />
      </div>
      <div className="absolute top-[35px] right-[35px]">
        <img src="/images/contact.svg" className="h-[49px] w-full" />
      </div>
      <div className="bg-green lg:w-1/2 h-full flex flex-col gap-[16px] justify-center items-center">
        <div
          className="contact-information"
          dangerouslySetInnerHTML={{
            __html: contact_information.description,
          }}
        />
        <div className="flex flex-col">
          <br />
          <p className="text-center text-[16px] leading-[22px] ">
            Síguenos en Instagram:
          </p>
        </div>
        <div className="flex gap-[15px]">
          <span className="text-[16px] leading-[15px] flex items-center rounded-[50px] border border-black border-[0.75px] h-[33px] px-[18px]">{`${t(
            "footer.architecture"
          )}`}</span>
          <span className="text-[16px] leading-[15px] flex items-center rounded-[50px] border border-black border-[0.75px] h-[33px] px-[18px]">{`${t(
            "footer.decor"
          )}`}</span>
          <span className="text-[16px] leading-[15px] flex items-center rounded-[50px] border border-black border-[0.75px] h-[33px] px-[18px]">{`${t(
            "footer.development"
          )}`}</span>
        </div>
      </div>
      <div className="lg:w-1/2 h-full">
        <img
          src={contact_information.cover.url}
          alt="contact"
          className="w-full h-[426px] lg:h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Contact;
