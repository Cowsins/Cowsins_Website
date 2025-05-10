import AssetCard from "./AssetCard";
import { siteConfig } from "@/config/site";
import CowsinsAddons from "./CowsinsAddons";

const CowsinsAssets = ({
  onCardClick,
}: {
  onCardClick: (key: string) => void;
}) => {
  return (
    <>
      <AssetCard
        subtitle="Best Seller"
        title="FPS Engine"
        imageSrc1="fps-engine.webp"
        imageSrc2="FPS_Engine_Logo_White.webp"
        imageSrc3="Best-Development-Tool-Nomination-on-dark-background-_1_.webp"
        link={siteConfig.links.fpsengine}
        isFree={false}
        onClick={() => onCardClick("fps_engine")}
      />
      <AssetCard
        subtitle=""
        title="Platformer Engine"
        imageSrc1="2d-engine.webp"
        imageSrc2="PlatformerEngine.webp"
        imageSrc3=""
        link={siteConfig.links.platformerengine}
        isFree={false}
        onClick={() => onCardClick("platformer_engine")}
      />
      <AssetCard
        subtitle=""
        title="Bullet Hell Engine"
        imageSrc1="BulletHellEngine.webp"
        imageSrc2="BulletHellEngineLogo.webp"
        imageSrc3=""
        link={siteConfig.links.bullethellengine}
        isFree={false}
        onClick={() => onCardClick("bullet_hell_engine")}
      />
      <CowsinsAddons onCardClick={onCardClick} />
    </>
  );
};

export default CowsinsAssets;
