import GenericContentLayout from "@/src/layouts/GenericContentLayout";
import data from "./data.json";
import { generateMetadataByLang } from "@/src/utils/generateMetadataByLang";

export const generateMetadata = generateMetadataByLang(data.metadata);

const CareerLayout = ({ children }: { children: React.ReactNode }) => {
  return <GenericContentLayout>{children}</GenericContentLayout>;
};

export default CareerLayout;
