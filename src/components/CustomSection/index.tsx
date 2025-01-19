import { ReactNode } from "react";

interface CustomSectionProps {
  children: ReactNode;
  background?: boolean;
  backgroundColor?: string;
}

const CustomSection = ({
  children,
  background = false,
  backgroundColor = "#f8f9fa",
}: CustomSectionProps) => {
  return (
    <section
      className={`
          py-12 ${backgroundColor ? backgroundColor : ""}
          ${background ? "aaabg-opacity-100" : "aaabg-opacity-0"}
        `}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

export default CustomSection;
