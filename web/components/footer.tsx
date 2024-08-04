import { choose } from "@/utils/helper";

interface Props {
  lang: string;
}

const Footer = ({ lang }: Props) => {
  return (
    <footer className="p-2">
      <p className="text-center text-vpwhite text-sm">
        ©{" "}
        {choose(lang, "All rights reserved by FelysNeko", "银河猫猫侠版权所有")}
      </p>
    </footer>
  );
};

export default Footer;
