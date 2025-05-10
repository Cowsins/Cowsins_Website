import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Chip,
  Breadcrumbs,
  BreadcrumbItem,
  Image, 
  ScrollShadow,
} from "@nextui-org/react";

import assetContent from "../utils/assetsData.json";

import StarRating from "./StarRating";

type AssetDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  assetKey: string | null;
};

type AssetData = {
  title: string;
  description: string[];
  chips?: string[];
  thumbnail?: string; 
  link?: string;
};


const AssetDrawer: React.FC<AssetDrawerProps> = ({
  isOpen,
  onClose,
  assetKey,
}) => {
  const content: AssetData | undefined = assetKey
    ? (assetContent as Record<string, AssetData>)[assetKey]
    : undefined;

  return (
    <Drawer backdrop="blur" isOpen={isOpen} size="2xl" onOpenChange={onClose} hideCloseButton>
      <DrawerContent>
        {(onCloseFn) => (
          <>
            <DrawerHeader className="flex flex-col gap-2">
              <Breadcrumbs size="sm" variant="solid">
                <BreadcrumbItem onClick={onClose}>Home</BreadcrumbItem>
                <BreadcrumbItem>
                  {content?.title || "Asset Details"}
                </BreadcrumbItem>
              </Breadcrumbs>

              {content?.thumbnail && (
                <Image
                  alt="Asset Thumbnail"
                  height="auto"
                  src={content.thumbnail}
                  width="100%"
                />
              )}
              <div
                style={{
                  fontSize: "2rem",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {content?.title || "Asset Details"}
              </div>

              <StarRating rating={5} />
              {content?.chips?.filter((chip) => chip.trim() !== "").length ? (
                <div
                  className="flex gap-2 flex-wrap"
                  style={{ marginTop: "10px" }}
                >
                  {content.chips
                    .filter((chip) => chip.trim() !== "")
                    .slice(0, 3)
                    .map((chip, index) => (
                      <Chip key={index} color="default" radius="sm" size="sm">
                        {chip}
                      </Chip>
                    ))}
                </div>
              ) : null}
            </DrawerHeader>

            <DrawerBody>
              <ScrollShadow className="max-h-[420px] space-y-2">
                {content?.description?.map((line, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {line}
                  </p>
                )) || <p>No information available for this asset.</p>}
              </ScrollShadow>
            </DrawerBody>

            <DrawerFooter>
              <Button color="default" variant="solid" onPress={onCloseFn}>
                Close
              </Button>
              <a href={content?.link} rel="noopener noreferrer" target="_blank">
                <Button color="primary" variant="solid">
                  See more
                </Button>
              </a>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AssetDrawer;
