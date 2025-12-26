import React from "react";
import Link from "next/link";
import { Image, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

interface VideoCardProps {
  videoId: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
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

const VideoCard: React.FC<VideoCardProps> = ({ videoId, title, level }) => {
  return (
    <Link href={`/videos/${videoId}`}>
      <div className="cursor-pointer rounded-2xl overflow-hidden">
        <motion.div
          whileHover={{ scale: .96 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="overflow-hidden rounded-lg"
        >
          <Image
            src={`https://vumbnail.com/${videoId}.jpg?cb=${Date.now()}`}
            alt={title}
            radius="lg"
            className="aspect-video w-full object-cover"
          />
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
