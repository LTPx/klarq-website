import Cover from "@/app/components/cover-pages";

async function Decor(nextParams: {
  params: { locale: "en" | "es" | "de" };
}) {
  const {
    params: { locale },
  } = nextParams;

  return (
    <div className="decor">
      <div className="fixed top-[35px] left-[35px]">
        <img src="/images/KLARQ.svg" className="h-[49px] w-full" />
      </div>
      <Cover img="https://images.unsplash.com/photo-1746730251085-34132b6dcec5?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
  );
}

export default Decor;
