import { siteConfig } from "@/config/site";

import AssetCard from "./AssetCard";

const CowsinsAddons = () => {
  return (
    <>
      <AssetCard
        imageSrc1="inventory.webp"
        imageSrc2="inventoryLogo.webp"
        imageSrc3=""
        isFree={false}
        link={siteConfig.links.platformerengine}
        subtitle="FPS ENGINE ADD-ON"
        title="Inventory Pro Add-On"
      />
      <AssetCard
        imageSrc1="SaveLoad.webp"
        imageSrc2="SaveLoadLogo.webp"
        imageSrc3=""
        isFree={false}
        link={siteConfig.links.bullethellengine}
        subtitle="FPS ENGINE ADD-ON"
        title="Save & Load Add-On"
      />
      <AssetCard
        imageSrc1="legs.webp"
        imageSrc2="legsLogo.webp"
        imageSrc3=""
        isFree={true}
        link={siteConfig.links.legs_iks_addon}
        subtitle="FPS ENGINE ADD-ON"
        title="Legs + IKs Add-On"
      />
    </>
  );
};

export default CowsinsAddons;
