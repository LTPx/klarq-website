"use client";

interface Props {
  name: string;
  profession: string;
  description: string;
}

export function DesignersSection(props: Props) {
  const { name, profession, description } = props;

  return (
    <div className="grid grid-cols-3">
      <div className="flex gap-[15px]">
        <button className="rounded-[50px] h-[33px] border border-[0.75px] border-black px-[25px]">Kimberly</button>
      </div>
      <div className="flex flex-col gap-[100px]">
        <div className="">
          <h3 className="text-[26px] leading-[26px]">{name}</h3>
          <p className="text-[18px] leading-[30px]">{profession}</p>
        </div>
        <div
          data-aos="fade-up"
          className="designer-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div></div>
    </div>
  );
}

export default DesignersSection;
