import { getWordPressCustomPage } from "@/app/_services/api";
import { Link } from "@/navigation";
import { getProxyImageUrl } from "@/utils/image_proxy";
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
      <Link className="cursor-pointer" href={'/'}>
        <div className="cursor-pointer fixed top-[40px] left-[35px] z-[1000]">
          <label className="font-zoom cursor-pointer text-[66px] leading-[46px] ">KLARQ</label>
        </div> 
      </Link>
      <div className="fixed top-[40px] right-[40px] z-[1000] mix-blend-difference text-white">
        <label className="font-zoom text-[66px] leading-[46px] tracking-[-0.03em]">
          CONTACT
        </label>
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
          src={getProxyImageUrl(contact_information.cover.url)}
          alt="contact"
          className="w-full h-[426px] lg:h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Contact;
