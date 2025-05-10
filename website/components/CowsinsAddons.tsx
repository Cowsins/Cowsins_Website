import AssetCard from "./AssetCard";
import { siteConfig } from "@/config/site";

const CowsinsAddons = ({
  onCardClick,
}: {
  onCardClick: (key: string) => void;
}) => {
  return (
    <>
      <AssetCard
        subtitle="FPS ENGINE ADD-ON"
        title="Inventory Pro Add-On"
        imageSrc1="inventory.webp"
        imageSrc2="inventoryLogo.webp"
        imageSrc3=""
        link={siteConfig.links.platformerengine}
        isFree={false}
        onClick={() => onCardClick("inv_add_on")}
      />
      <AssetCard
        subtitle="FPS ENGINE ADD-ON"
        title="Save & Load Add-On"
        imageSrc1="SaveLoad.webp"
        imageSrc2="SaveLoadLogo.webp"
        imageSrc3=""
        link={siteConfig.links.bullethellengine}
        isFree={false}
        onClick={() => onCardClick("save_load_add_on")}
      />
      <AssetCard
        subtitle="FPS ENGINE ADD-ON"
        title="Legs + IKs Add-On"
        imageSrc1="legs.webp"
        imageSrc2="legsLogo.webp"
        imageSrc3=""
        link={siteConfig.links.legsaddon}
        isFree={true}
        onClick={() => onCardClick("legs_iks_add_on")}
      />
    </>
  );
};

export default CowsinsAddons;
