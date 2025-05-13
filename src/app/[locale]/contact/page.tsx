
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

async function Contact(nextParams: { params: { locale: "en" | "es" | "de" } }) {
  const {
    params: { locale },
  } = nextParams;
  const t = await getTranslations();

  return (
    <div className="lg:h-screen lg:flex">
      <div className="fixed top-[35px] left-[35px]">
        <img src="/images/KLARQ.svg" className="h-[49px] w-full" />
      </div>
      <div className="absolute top-[35px] right-[35px]">
        <img src="/images/contact.svg" className="h-[49px] w-full" />
      </div>
      <div className="bg-green lg:w-1/2 h-full flex flex-col gap-[16px] justify-center items-center">
        <div className="flex flex-col">
          <Link
            href={`mailto:info@klarq.eu`}
            className="text-center text-[16px] leading-[22px]"
          >
            info@klarq.eu
          </Link>
          <Link
            className="text-center text-[16px] leading-[22px] "
            href={`tel:+34656362863`}
          >
            <p className="text-[16px] leading-[22px] ">+34 656 362 863</p>
          </Link>
          <br />
          <p className="text-center text-[16px] leading-[22px] ">
            C/ Vicent Serra i Orvay, 49
            <br />
            07800 Ibiza
          </p>
          <br />
          <p className="text-center text-[16px] leading-[22px] ">
            Camino viejo de Pina
            <br />
            07210 Mallorca
          </p>
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
          src={
            "https://plus.unsplash.com/premium_photo-1694540892449-5c3170caf81c?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="contact"
          className="w-full h-[426px] lg:h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Contact;
