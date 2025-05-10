import { siteConfig } from "@/config/site";

import AssetCard from "./AssetCard";

const CommunityAssets = ({
  onCardClick,
}: {
  onCardClick: (key: string) => void;
}) => {
  return (
    <AssetCard
      imageSrc1="https://public-files.gumroad.com/kjjbk86jfi1iif5t05zmxpirsu5s"
      imageSrc2=""
      imageSrc3=""
      isFree={true}
      link={siteConfig.links.cowsinai}
      subtitle="FPS ENGINE COMMUNITY ADD-ON"
      title="COWSINS AI by Comrad Elmo"
      onClick={() => onCardClick("cowsins_ai")}
    />
  );
};

export default CommunityAssets;
