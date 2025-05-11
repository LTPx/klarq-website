import { getWordPressPage } from "../_services/api";
import AppHeader from "../components/app-header";

interface Props {
  children: any;
  locale: "en" | "es" | "de";
}

async function App(props: Props) {
  const { children, locale } = props;

  return (
    <>
      <AppHeader
        params={{
          locale: locale,
        }}
      />
      <div>{children}</div>
    </>
  );
}

export default App;
