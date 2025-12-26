import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from "@heroui/react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCrosshairs,
  FaBoxOpen,
  FaSave,
  FaGamepad,
  FaSkull,
  FaRunning,
  FaSearch
} from "react-icons/fa";

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

const categories = [
  { id: "FPS Engine", label: "FPS Engine", icon: FaCrosshairs },
  { id: "Inventory Pro Add-On", label: "Inventory Pro Add-On", icon: FaBoxOpen },
  { id: "Save & Load Add-On", label: "Save & Load Add-On", icon: FaSave },
  { id: "Platformer Engine", label: "Platformer Engine", icon: FaGamepad },
  { id: "Bullet Hell Engine", label: "Bullet Hell Engine", icon: FaSkull },
  { id: "Legs + IKs Add-On", label: "Legs + IKs", icon: FaRunning },
];

const TutorialsModal: React.FC<TutorialsModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("FPS Engine");
  const [searchQuery, setSearchQuery] = useState("");

  const initialQueryTutorialRef = useRef<boolean>(false);
  const skipNextSyncRef = useRef<boolean>(false);

  const getTutorialFromQuery = () => {
    const q = router.query.tutorial;
    if (!q) return null;
    const val = Array.isArray(q) ? q[0] : q;
    let out = val as string;
    try {
      const decoded = decodeURIComponent(out);
      out = decoded;
    } catch (e) { }
    return out;
  };

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
      if (q !== selectedTab && categories.some(cat => cat.id === q)) setSelectedTab(q);
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
        }
      }
    } else {
      if (currentQuery) {
        const nextQuery = { ...router.query } as any;
        delete nextQuery.tutorial;
        router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true });
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
    if (q && q !== selectedTab && categories.some(cat => cat.id === q)) setSelectedTab(q);
  }, [router.asPath]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      backdrop="blur"
      classNames={{
        base: "bg-background/80 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden",
        header: "border-b border-white/5 pb-4",
      }}
    >
      <ModalContent className="tutorials-modal h-[85vh] sm:h-[80vh] flex flex-col rounded-3xl">
        <ModalHeader className="flex flex-row items-center justify-between px-6 py-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Official Cowsins Tutorials
            </h2>
          </div>
        </ModalHeader>
        <ModalBody className="p-0 flex flex-row h-full min-h-0 divide-x divide-white/5 overflow-hidden">
          {/* Sidebar - Desktop Only */}
          <div className="hidden md:flex flex-col w-64 bg-black/20 h-full">
            <ScrollShadow className="flex-1 p-4">
              <Listbox
                aria-label="Tutorial categories"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={[selectedTab]}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as string;
                  if (key) setSelectedTab(key);
                }}
              >
                {categories.map((cat) => (
                  <ListboxItem
                    key={cat.id}
                    className={`mb-1 transition-all duration-200 ${selectedTab === cat.id
                      ? "bg-primary/20 text-primary shadow-lg scale-105"
                      : "hover:bg-white/5"
                      }`}
                  >
                    {cat.label}
                  </ListboxItem>
                ))}
              </Listbox>
            </ScrollShadow>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full min-h-0 bg-white/5 overflow-hidden">
            {/* Mobile Category Switcher */}
            <div className="md:hidden p-3 border-b border-white/5 bg-black/20">
              <ScrollShadow orientation="horizontal" className="flex flex-row gap-2 no-scrollbar" hideScrollBar>
                <div className="flex flex-row gap-2 pb-1">
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      size="sm"
                      variant={selectedTab === cat.id ? "solid" : "flat"}
                      color={selectedTab === cat.id ? "primary" : "default"}
                      className="min-w-fit px-4"
                      onPress={() => setSelectedTab(cat.id)}
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </ScrollShadow>
            </div>

            {/* Search and Stats */}
            <div className="pl-6 pr-10 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="w-full sm:max-w-md relative">
                <Input
                  aria-label="Search tutorials"
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  placeholder="Find a lesson..."
                  className="w-full"
                  startContent={<FaSearch className="text-default-400" />}
                  variant="flat"
                />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-default-400 whitespace-nowrap">
                  {selectedTab}
                </span>
                <span className="h-1 w-1 rounded-full bg-default-300 flex-shrink-0" />
                <span className="text-xs text-default-500 whitespace-nowrap">
                  {filteredVideos.length} Lesson{filteredVideos.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Video Grid */}
            <ScrollShadow className="flex-1 pl-6 pr-10 pb-6 overflow-y-auto min-h-0 custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
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
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                      <div className="p-4 rounded-full bg-white/5 mb-4">
                        <FaSearch size={32} className="text-default-300" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No tutorials found</h3>
                      <p className="text-default-400 max-w-xs">
                        {searchQuery
                          ? `We couldn't find any results for "${searchQuery}" in this category.`
                          : "This category currently has no available tutorials."}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </ScrollShadow>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TutorialsModal;
