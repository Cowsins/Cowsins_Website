import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Chip, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { VideoProvider, getThumbnailUrl } from "@/utils/videos";

interface VideoCardProps {
  videoId: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  provider?: VideoProvider;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "success";
    case "Intermediate":
      return "warning";
    case "Advanced":
      return "danger";
    default:
      return "default";
  }
};

const VideoCard: React.FC<VideoCardProps> = ({
  videoId,
  title,
  level,
  provider = "vimeo",
}) => {
  const router = useRouter();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const handleClick = useCallback(() => {
    setNavigating(true);
  }, []);

  useEffect(() => {
    const done = () => setNavigating(false);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router]);

  return (
    <Link href={`/videos/${videoId}`} onClick={handleClick}>
      <div className="cursor-pointer rounded-2xl overflow-hidden relative">
        {navigating && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
            <Spinner color="white" size="lg" />
          </div>
        )}
        <motion.div
          whileHover={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="overflow-hidden rounded-lg"
        >
          <div className="relative aspect-video w-full bg-neutral-800 rounded-lg overflow-hidden">
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Spinner color="white" size="sm" />
              </div>
            )}
            <img
              src={getThumbnailUrl(provider, videoId)}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </motion.div>
        <div className="p-2">
          <h3 className="text-md font-semibold mb-2">{title}</h3>
          <Chip color={getLevelColor(level)} size="sm" variant="flat">
            {level}
          </Chip>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
