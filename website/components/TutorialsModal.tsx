import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from "@heroui/react";
import React, { useState } from "react";
import VideoCard from "./VideoCard";
import { videos } from "@/utils/videos";

interface TutorialsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const extractVimeoId = (url: string) => {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : "";
};

const TutorialsModal: React.FC<TutorialsModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [selectedTab, setSelectedTab] = useState("FPS Engine");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = videos.filter(
    (v) =>
      v.category === selectedTab &&
      v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent className="max-h-[75vh] overflow-hidden">
        <ModalHeader className="flex flex-col gap-1">
          Cowsins Official Tutorials
        </ModalHeader>
        <ModalBody className="p-0">
  <div className="sticky top-0 z-10 p-4">
    <Tabs
      selectedKey={selectedTab}
      onSelectionChange={(key) => {
        setSelectedTab(key as string);
        setSearchQuery("");
      }}
      aria-label="Tutorial categories"
    >
      <Tab key="FPS Engine" title="FPS Engine" />
      <Tab key="Inventory Pro Add-On" title="Inventory Pro Add-On" />
      <Tab key="Save & Load Add-On" title="Save & Load Add-On" />
      <Tab key="Platformer Engine" title="Platformer Engine" />
      <Tab key="Bullet Hell Engine" title="Bullet Hell Engine" />
      <Tab key="Legs + IKs Add-On" title="Legs + IKs Add-On" />
    </Tabs>

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start sm:gap-3 mt-4">
      <Input
        placeholder="Search tutorials..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="sm:w-[280px] w-full"
      />
      <p className="text-sm text-gray-600 sm:ml-3 mt-2 sm:mt-0 whitespace-nowrap">
        Showing {filteredVideos.length} tutorial
        {filteredVideos.length !== 1 ? "s" : ""} in{" "}
        <span className="font-medium">{selectedTab}</span>
      </p>
    </div>
  </div>

  {/* Scrollable video area */}
  <div className="overflow-y-auto px-4 py-6" style={{ maxHeight: "calc(75vh - 180px)" }}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.length > 0 ? (
        filteredVideos.map((video, i) => (
          <VideoCard
            key={i}
            videoId={extractVimeoId(video.url)}
            title={video.title}
            level={video.level}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 mt-6">
          No videos found.
        </p>
      )}
    </div>
  </div>
</ModalBody>

      </ModalContent>
    </Modal>
  );
};

export default TutorialsModal;
