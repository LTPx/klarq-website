import { getWordPressPage } from "../_services/api";

interface Props {
  children: any;
  locale: 'en' | 'es' | 'de';
}

async function App(props: Props) {
  const { children, locale } = props;

  return (
    <div>{children}</div>
  );
}

export default App;
