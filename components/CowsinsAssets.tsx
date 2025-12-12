import { siteConfig } from "@/config/site";

import AssetCard from "./AssetCard";
import CowsinsAddons from "./CowsinsAddons";

const CowsinsAssets = () => {
  return (
    <>
      <AssetCard
        imageSrc1="fps-engine.webp"
        imageSrc2="FPS_Engine_Logo_White.webp"
        imageSrc3="Best-Development-Tool-Nomination-on-dark-background-_1_.webp"
        isFree={false}
        link={siteConfig.links.fpsengine}
        subtitle="Best Seller"
        title="FPS Engine"
      />
      <AssetCard
        imageSrc1="2d-engine.webp"
        imageSrc2="PlatformerEngine.webp"
        imageSrc3=""
        isFree={false}
        link={siteConfig.links.platformerengine}
        subtitle=""
        title="Platformer Engine"
      />
      <AssetCard
        imageSrc1="BulletHellEngine.webp"
        imageSrc2="BulletHellEngineLogo.webp"
        imageSrc3=""
        isFree={false}
        link={siteConfig.links.bullethellengine}
        subtitle=""
        title="Bullet Hell Engine"
      />
      <CowsinsAddons />
    </>
  );
};

export default CowsinsAssets;
