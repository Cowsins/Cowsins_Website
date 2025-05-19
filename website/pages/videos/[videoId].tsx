import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { videos, VideoItem } from "@/utils/videos";
import DefaultLayout from "@/layouts/default";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, Chip } from "@heroui/react";
import VideoCard from "@/components/VideoCard";
import { siteConfig } from "@/config/site";
import { DiscordIcon } from "@/components/icons";

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

const VideoPage: React.FC = () => {
  const router = useRouter();

  const rawVideoId = router.query.videoId as string | undefined;
  if (!rawVideoId) return <p>Loading...</p>;

  const videoId = extractVimeoId(`https://player.vimeo.com/video/${rawVideoId}`) || rawVideoId;

  const currentVideo = videos.find((v) => extractVimeoId(v.url) === videoId);

  if (!currentVideo) return <p>Video not found.</p>;

  const relatedTutorials = videos.filter(
    (v) =>
      v.category === currentVideo.category &&
      extractVimeoId(v.url) !== videoId
  );

  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (playerRef.current) {
    playerRef.current.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", `https://player.vimeo.com/video/${videoId}?autoplay=1`);
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
        <title>{currentVideo.title}</title>
        <meta property="og:title" content={currentVideo.title} />
        <meta property="og:description" content={`Level: ${currentVideo.level}`} />
        <meta
          property="og:image"
          content={`https://i.vimeocdn.com/video/${videoId}_640.jpg`}
        />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={`https://yourdomain.com/videos/${videoId}`} />
      </Head>

      <main className="max-w-[1100px] mx-auto pl-4 pr-4 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">

      <section>
      <Breadcrumbs className="pb-3">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/">Tutorials</BreadcrumbItem>
            <BreadcrumbItem href="/">{currentVideo.category}</BreadcrumbItem>
            <BreadcrumbItem>{currentVideo.title}</BreadcrumbItem>
      </Breadcrumbs>

        <div className="rounded-2xl overflow-hidden mb-6">
          <div
            className="aspect-video"
            ref={playerRef}
            data-plyr-provider="vimeo"
            data-plyr-embed-id={videoId}
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">{currentVideo.title}</h1>
        <Chip
          color={getLevelColor(currentVideo.level)}
          size="sm"
          variant="flat"
          radius="sm"
        >
          {currentVideo.level} Difficulty
        </Chip>
        <div className="mt-4">
           <a href={siteConfig.links.discord}>
                <Button>
                  Do you need help? Join us on
                  <DiscordIcon className="text-default-500" />
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
          <p className="text-gray-500 italic">No related tutorials available.</p>
        )}
      </aside>
    </main>
    </DefaultLayout>
  );
};

export default VideoPage;
