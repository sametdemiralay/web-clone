import data from "./data.json";
import { generateMetadataByLang } from "@/src/utils/generateMetadataByLang";

export const generateMetadata = generateMetadataByLang(data.metadata);

type Props = {
  children: React.ReactNode;
};

export default async function Layout(props: Props) {
  return <>{props.children}</>;
}
