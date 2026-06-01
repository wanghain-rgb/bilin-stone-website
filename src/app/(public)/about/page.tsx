import { type Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Bilin Stone",
  description:
    "Bilin Stone is a global supply chain and manufacturing partner specializing in cooling and heating solutions. Production base in China, sales centers in Australia & USA.",
};

export default function AboutPage() {
  return <AboutContent />;
}
