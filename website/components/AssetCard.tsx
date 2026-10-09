import { motion } from "framer-motion";
import { Card, CardFooter, Chip, Image } from "@heroui/react";

type AssetCardProps = {
  subtitle: string;
  title: string;
  imageSrc1: string;
  imageSrc2: string; // Kept as requested, but no longer rendered in layers
  imageSrc3: string;
  link: string;
  isFree: boolean;
};

const AssetCard = ({
  subtitle,
  title,
  imageSrc1,
  // imageSrc2 is intentionally omitted from rendering to avoid layered backgrounds
  imageSrc3,
  link,
  isFree,
}: AssetCardProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block col-span-12 sm:col-span-4 h-[300px]">
      <motion.div
        className="h-full w-full cursor-pointer"
        whileHover={{ scale: 1.02, y: -4, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card isFooterBlurred className="group h-full w-full border border-white/10 rounded-[32px] overflow-hidden shadow-2xl bg-black/40">
          <Image
            removeWrapper
            alt={title}
            className="z-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            src={imageSrc1}
          />
          {imageSrc3 && imageSrc3 !== "" && (
            <div className="absolute top-5 right-5 z-20 pointer-events-none drop-shadow-2xl">
              <Image
                removeWrapper
                alt="Award"
                className="w-14 h-14 object-contain"
                src={imageSrc3}
              />
            </div>
          )}
          {subtitle && subtitle !== "" && (
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <div className="bg-black/30 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full shadow-md">
                <p className="text-[10px] text-white/90 uppercase font-bold tracking-[0.15em] leading-none mt-[1px]">
                  {subtitle}
                </p>
              </div>
            </div>
          )}
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-white/10 flex items-center justify-between backdrop-blur-2xl py-5 px-6">
            <h4 className="text-white font-semibold text-[20px] leading-tight truncate mr-3 tracking-tight">{title}</h4>
            {isFree && (
              <Chip className="bg-white/20 text-white backdrop-blur-xl border border-white/20 shadow-sm px-2 shrink-0" size="sm" radius="full">
                Free
              </Chip>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </a>
  );
};

export default AssetCard;
