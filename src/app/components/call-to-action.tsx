interface Props {
  title: string;
}

function CallToAction(props: Props) {
  const { title } = props;

  return (
    <div className="flex flex-col gap-[45px] justify-center items-center ">
      <div
        data-aos="fade-up"
        className="call-title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="flex gap-[15px]" data-aos="fade-up">
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
