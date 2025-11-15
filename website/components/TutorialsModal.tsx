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
import React, { useState, useEffect, useRef } from "react";
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
    // Handle values that might be double-encoded (e.g. pasted URLs with %25)
    let out = val as string;
    // Try decoding up to 3 times or until there are no percent-encoded sequences left
    for (let i = 0; i < 3; i++) {
      try {
        const decoded = decodeURIComponent(out);
        // If decode changes the string, keep going; otherwise stop
        if (decoded === out) break;
        out = decoded;
      } catch (e) {
        break;
      }
    }
    return out;
  };

  const filteredVideos = videos.filter((v) => v.category === selectedTab);

  // On mount: if URL has ?tutorial=..., open modal and set section
  useEffect(() => {
    if (!router.isReady) return;
    const q = getTutorialFromQuery();
    if (q) {
      initialQueryTutorialRef.current = true;
      if (q !== selectedTab) setSelectedTab(q);
      if (!isOpen) onOpenChange(true);
      // Prevent the sync effect from immediately pushing/replacing the URL
      // (avoids races where selectedTab hasn't updated yet).
      skipNextSyncRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // Sync URL when modal open/closed or when selectedTab changes
  useEffect(() => {
    if (!router.isReady) return;

    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    const currentQuery = getTutorialFromQuery();

    // When modal opens, ensure URL contains tutorial param
    if (isOpen) {
      const desired = encodeURIComponent(selectedTab);
      if (currentQuery !== selectedTab) {
        if (initialQueryTutorialRef.current) {
          // came from URL - replace to reflect the selected tab without adding history
          router.replace(
            { pathname: router.pathname, query: { ...router.query, tutorial: desired } },
            undefined,
            { shallow: true }
          );
        } else {
          // opened via UI - push a new history entry so back will close
          router.push(
            { pathname: router.pathname, query: { ...router.query, tutorial: desired } },
            undefined,
            { shallow: true }
          );
          pushedRef.current = true;
        }
      }
    } else {
      // modal closed - remove tutorial param from URL
      if (currentQuery) {
        if (pushedRef.current) {
          // we pushed when opening; go back to previous history entry
          router.back();
          pushedRef.current = false;
        } else {
          // came from URL originally - replace to remove param
          const nextQuery = { ...router.query } as any;
          delete nextQuery.tutorial;
          router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedTab, router.isReady]);

  // React to user navigating history / changing the query externally
  useEffect(() => {
    if (!router.isReady) return;
    const q = getTutorialFromQuery();
    if (q && !isOpen) {
      // open modal if query present
      onOpenChange(true);
    } else if (!q && isOpen) {
      // close modal if query removed
      onOpenChange(false);
    }
    if (q && q !== selectedTab) setSelectedTab(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent className="h-[70vh] max-h-[70vh]">
        <ModalHeader className="flex flex-col gap-1">
          Cowsins Official Tutorials
        </ModalHeader>
        <ModalBody className="p-4 flex flex-col h-full">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto px-1 mt-4 flex-1">
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
