import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  Input,
} from "@heroui/react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("FPS Engine");

  const initialQueryTutorialRef = useRef<boolean>(false);
  const pushedRef = useRef<boolean>(false);
  const skipNextSyncRef = useRef<boolean>(false);

  const getTutorialFromQuery = () => {
    const q = router.query.tutorial;
    if (!q) return null;
    const val = Array.isArray(q) ? q[0] : q;
    let out = val as string;
    for (let i = 0; i < 3; i++) {
      try {
        const decoded = decodeURIComponent(out);
        if (decoded === out) break;
        out = decoded;
      } catch (e) {
        break;
      }
    }
    return out;
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideosByCategory = useMemo(
    () => videos.filter((v) => v.category === selectedTab),
    [selectedTab],
  );

  const filteredVideos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return filteredVideosByCategory;
    return filteredVideosByCategory.filter((v) =>
      v.title.toLowerCase().includes(q),
    );
  }, [filteredVideosByCategory, searchQuery]);

  useEffect(() => {
    if (!router.isReady) return;
    const q = getTutorialFromQuery();
    if (q) {
      initialQueryTutorialRef.current = true;
      if (q !== selectedTab) setSelectedTab(q);
      if (!isOpen) onOpenChange(true);
      skipNextSyncRef.current = true;
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;

    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    const currentQuery = getTutorialFromQuery();

    if (isOpen) {
      const desired = encodeURIComponent(selectedTab);
      if (currentQuery !== selectedTab) {
        if (initialQueryTutorialRef.current) {
          router.replace(
            { pathname: router.pathname, query: { ...router.query, tutorial: desired } },
            undefined,
            { shallow: true }
          );
        } else {
          router.push(
            { pathname: router.pathname, query: { ...router.query, tutorial: desired } },
            undefined,
            { shallow: true }
          );
          pushedRef.current = true;
        }
      }
    } else {
      if (currentQuery) {
        const nextQuery = { ...router.query } as any;
        delete nextQuery.tutorial;
        router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
        pushedRef.current = false;
      }
    }
  }, [isOpen, selectedTab, router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    const q = getTutorialFromQuery();
    if (q && !isOpen) {
      onOpenChange(true);
    } else if (!q && isOpen) {
      onOpenChange(false);
    }
    if (q && q !== selectedTab) setSelectedTab(q);
  }, [router.asPath]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent className="tutorials-modal w-full max-w-3xl sm:max-w-4xl md:max-w-5xl h-[85vh] sm:h-[70vh] max-h-[85vh] sm:max-h-[70vh] flex flex-col">
        <ModalHeader className="flex flex-col gap-1">
          Cowsins Official Tutorials
        </ModalHeader>
        <ModalBody className="p-3 sm:p-4 flex flex-col h-full min-h-0">
          <div className="relative -mx-3 sm:-mx-4 px-3 sm:px-4">
            <div className="overflow-x-auto no-scrollbar relative">
              <Tabs
                className="min-w-max"
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
            </div>
          </div>
          <div className="mt-4 px-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="w-full sm:max-w-md">
              <Input
                aria-label="Search tutorials"
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials..."
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-600">
              Showing {filteredVideos.length} tutorial{filteredVideos.length !== 1 ? "s" : ""} in <span className="font-medium">{selectedTab}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-y-auto px-1 mt-4 flex-1 min-h-0 pr-2">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, i) => (
                <VideoCard
                  key={i}
                  videoId={extractVimeoId(video.url)}
                  title={video.title}
                  level={video.level as "Beginner" | "Intermediate" | "Advanced"}
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
