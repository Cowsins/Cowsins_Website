import AssetCard from "./AssetCard";
import { siteConfig } from "@/config/site";

const CommunityAssets  = ({ onCardClick }: { onCardClick: (key: string) => void }) => {
  return (
            <AssetCard
            subtitle="FPS ENGINE COMMUNITY ADD-ON"
            title="COWSINS AI by Comrad Elmo"
            imageSrc1="https://public-files.gumroad.com/kjjbk86jfi1iif5t05zmxpirsu5s"
            imageSrc2=""
            imageSrc3=""
            link= {siteConfig.links.cowsinai}
            isFree={true}
            onClick={() => onCardClick("cowsins_ai")}
          />
  );
};

export default CommunityAssets;
