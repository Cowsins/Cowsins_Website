import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { videos, VideoItem } from "@/utils/videos";
import DefaultLayout from "@/layouts/default";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
} from "@heroui/react";
import VideoCard from "@/components/VideoCard";
import { siteConfig } from "@/config/site";
import { DiscordIcon } from "@/components/icons";

interface VideoPageProps {
  video: VideoItem;
  videoId: string;
  relatedTutorials: VideoItem[];
}

const extractVimeoId = (url: string): string => {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : "";
};

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

const VideoPage: React.FC<VideoPageProps> = ({
  video,
  videoId,
  relatedTutorials,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoId && playerRef.current) {
      playerRef.current.innerHTML = "";

      const iframe = document.createElement("iframe");
      iframe.setAttribute(
        "src",
        `https://player.vimeo.com/video/${videoId}?autoplay=1`
      );
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
      iframe.className = "w-full h-full";

      playerRef.current.appendChild(iframe);

      const player = new Plyr(iframe, {
        controls: [
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
      });

      return () => {
        player.destroy();
      };
    }
  }, [videoId]);

  return (
    <DefaultLayout>
      <Head>
        <title>{video.title}</title>
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={`Level: ${video.level}`} />
        <meta
          property="og:image"
          content={`https://i.vimeocdn.com/video/${videoId}_640.jpg`}
        />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:url"
          content={`https://cowsins.com/videos/${videoId}`}
        />
      </Head>

      <main className="max-w-[1100px] mx-auto pl-4 pr-4 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
        <section>
          <Breadcrumbs className="pb-3">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/">Tutorials</BreadcrumbItem>
            <BreadcrumbItem href="/">{video.category}</BreadcrumbItem>
            <BreadcrumbItem>{video.title}</BreadcrumbItem>
          </Breadcrumbs>

          <div className="rounded-2xl overflow-hidden mb-6">
            <div
              className="aspect-video"
              ref={playerRef}
              data-plyr-provider="vimeo"
              data-plyr-embed-id={videoId}
            />
          </div>

          <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
          <Chip
            color={getLevelColor(video.level)}
            size="sm"
            variant="flat"
            radius="sm"
          >
            {video.level} Difficulty
          </Chip>

          <div className="mt-4">
            <a href={siteConfig.links.discord}>
              <Button>
                Do you need help? Join us on
                <DiscordIcon className="text-default-500 ml-2" />
                Discord
              </Button>
            </a>
          </div>
        </section>

        <aside>
          {relatedTutorials.length ? (
            <>
              <h2 className="font-semibold text-lg mb-4">Related Tutorials</h2>
              <div className="space-y-4 max-h-[80vh] overflow-auto">
                {relatedTutorials.map((vid, i) => (
                  <VideoCard
                    key={i}
                    videoId={extractVimeoId(vid.url)}
                    title={vid.title}
                    level={vid.level}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 italic">
              No related tutorials available.
            </p>
          )}
        </aside>
      </main>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = context.params?.videoId as string;

  const extractVimeoId = (url: string): string => {
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : "";
  };

  const currentVideo = videos.find(
    (v) =>
      extractVimeoId(v.url) === videoId || v.url.includes(videoId)
  );

  if (!currentVideo) {
    return {
      notFound: true,
    };
  }

  const relatedTutorials = videos.filter(
    (v) =>
      v.category === currentVideo.category &&
      extractVimeoId(v.url) !== extractVimeoId(currentVideo.url)
  );

  return {
    props: {
      video: currentVideo,
      videoId: extractVimeoId(currentVideo.url),
      relatedTutorials,
    },
  };
};

export default VideoPage;
