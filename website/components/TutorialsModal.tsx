import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
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

  const filteredVideos = videos.filter((v) => v.category === selectedTab);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Cowsins Official Tutorials
        </ModalHeader>
        <ModalBody>
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            aria-label="Tutorial categories"
          >
            <Tab key="FPS Engine" title="FPS Engine" />
            <Tab key="Inventory Pro Add-On" title="Inventory Pro Add-On" />
            <Tab key="Save & Load Add-On" title="Save & Load Add-On" />
            <Tab key="Platformer Engine" title="Platformer Engine" />
            <Tab key="Bullet Hell Engine" title="Bullet Hell Engine" />
            <Tab key="Legs + IKs Add-On" title="Legs + IKs Add-On" />
          </Tabs>
          <p className="text-sm text-gray-600 mt-4 px-1">
              Showing {filteredVideos.length} tutorial{filteredVideos.length !== 1 ? "s" : ""} in <span className="font-medium">{selectedTab}</span>
            </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto px-1 mt-4">
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
                No videos available in this category.
              </p>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TutorialsModal;
