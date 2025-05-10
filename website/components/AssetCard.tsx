import { motion } from "framer-motion";
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";

type AssetCardProps = {
  subtitle: string;
  title: string;
  imageSrc1: string;
  imageSrc2: string;
  imageSrc3: string;
  link: string;
  isFree: boolean;
  onClick?: () => void;
};

const AssetCard = ({
  subtitle,
  title,
  imageSrc1,
  imageSrc2,
  imageSrc3,
  link,
  isFree,
  onClick
}: AssetCardProps) => {
  return (
    <motion.div
      onClick={onClick || (() => window.open(link, "_blank"))}
      className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer"
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full w-full">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          {isFree && (
            <Chip color="secondary" style={{marginBottom: "5px"}}>Free</Chip>
          )}
          <div className="bg-black/75 p-2 rounded-lg">
            <p className="text-[10px] text-white/60 uppercase font-bold">{subtitle}</p>
            <h4 className="text-[14px] text-white font-semibold">{title}</h4>
          </div>
        </CardHeader>

        </CardHeader>
        <Image
          isZoomed
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={imageSrc1}
        />
        {imageSrc2 && imageSrc2 !== "" && (
        <Image
          removeWrapper
          alt="Card logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          src={imageSrc2}
          width="80%"
        />
      )}
         {imageSrc3 && imageSrc3 !== "" && (
          <Image
            removeWrapper
            alt="Top right corner image"
            className="absolute top-0 right-0 m-5 z-20 pointer-events-none"
            src={imageSrc3}
            style={{ width: "15%", borderRadius: "0" }}
          />
        )}
      </Card>
    </motion.div>
  );
};

export default AssetCard;
