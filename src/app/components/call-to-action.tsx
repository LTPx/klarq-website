interface Props {
  title: string;
}

function CallToAction(props: Props) {
  const { title } = props;

  return (
    <div className="flex flex-col gap-[45px] justify-center items-center ">
      <h3 className="text-center text-[35px] leading-[45px] lg:w-[55%]">
        We design & deliver bespoke interiors, kitchens & more. Visit our
        exclusive Ibiza boutique for curated materials, furniture & décor.
      </h3>
      <div className="flex gap-[15px]">
        <span className="flex items-center capitalize text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[25px]">
          cocinas
        </span>
        <span className="flex items-center capitalize text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[25px]">
          baños
        </span>
        <span className="flex items-center capitalize text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[25px]">
          muebles
        </span>
        <span className="flex items-center capitalize text-[16px] leading-[15px] rounded-[50px] border border-black border-[0.75px] h-[33px] px-[25px]">
          armarios
        </span>
      </div>
    </div>
  );
}

export default CallToAction;
