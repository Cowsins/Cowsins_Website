import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { videos } from "@/utils/videos";
import DefaultLayout from "@/layouts/default";
import { BreadcrumbItem, Breadcrumbs, Button, Chip } from "@heroui/react";
import VideoCard from "@/components/VideoCard";
import { siteConfig } from "@/config/site";
import { DiscordIcon } from "@/components/icons";

// Helper extract Vimeo ID from full URL
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

interface Props {
  currentVideo?: (typeof videos)[number];
  videoId?: string;
  siteUrl?: string;
}

const VideoPage: React.FC<Props> = ({ currentVideo: ssrVideo, videoId: ssrVideoId, siteUrl }) => {
  const router = useRouter();

  // Extract raw ID from router
  const rawVideoId = router.query.videoId as string | undefined;

  const clientVideoId = rawVideoId
    ? extractVimeoId(`https://player.vimeo.com/video/${rawVideoId}`) || rawVideoId
    : undefined;

  const videoId = ssrVideoId || clientVideoId;

  const currentVideo = ssrVideo || (videoId ? videos.find((v) => extractVimeoId(v.url) === videoId) : undefined);

  // Filter related tutorials in the same category, excluding current video
  const relatedTutorials = currentVideo
    ? videos.filter((v) => v.category === currentVideo.category && extractVimeoId(v.url) !== videoId)
    : [];

  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoId || !playerRef.current) return;

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
  }, [videoId]);

  if (!rawVideoId) {
    return (
      <DefaultLayout>
        <p>Loading...</p>
      </DefaultLayout>
    );
  }

  if (!currentVideo) {
    return (
      <DefaultLayout>
        <p>Video not found.</p>
      </DefaultLayout>
    );
  }

  const SITE_URL = siteUrl || "https://www.cowsins.com";

  const ogId = ssrVideoId ?? (currentVideo ? extractVimeoId(currentVideo.url) : undefined);
  const ogTitle = ssrVideo?.title ?? currentVideo?.title ?? "Cowsins Tutorial";
  const ogDesc = ssrVideo?.level ? `Level: ${ssrVideo.level}` : currentVideo?.level ? `Level: ${currentVideo.level}` : "";
  const ogImage = ogId ? `https://i.vimeocdn.com/video/${ogId}_640.jpg` : undefined;

  return (
    <DefaultLayout>
      <Head>
        <title>{ogTitle}</title>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:type" content="video.other" />
        {ogId && <meta property="og:url" content={`${SITE_URL}/videos/${ogId}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Head>

      <main className="max-w-[1100px] mx-auto pl-4 pr-4 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 items-start h-full overflow-hidden">

      <section>
      <Breadcrumbs className="pb-3">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/">Tutorials</BreadcrumbItem>
            <BreadcrumbItem href="/">{currentVideo.category}</BreadcrumbItem>
            <BreadcrumbItem>{currentVideo.title}</BreadcrumbItem>
      </Breadcrumbs>

        <div className="rounded-2xl overflow-hidden mb-10 md:sticky md:top-16 md:max-h-[calc(100vh-4rem)] md:overflow-hidden">
          <div
            className="aspect-video h-full"
            ref={playerRef}
            data-plyr-provider="vimeo"
            data-plyr-embed-id={videoId}
          />
        </div>
        <h1 className="text-3xl font-bold mt-10 mb-4">{currentVideo.title}</h1>
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


      <aside className="md:max-h-[calc(100vh-4rem)] md:overflow-y-auto md:pr-2">
        {relatedTutorials.length ? (
          <>
            <h2 className="font-semibold text-lg mb-4">Related Tutorials</h2>
            <div className="space-y-4">
              {relatedTutorials.map((vid, i) => (
                <VideoCard
                  key={i}
                  videoId={extractVimeoId(vid.url)}
                  title={vid.title}
                  level={vid.level as "Beginner" | "Intermediate" | "Advanced"}
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

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const raw = params?.videoId as string | undefined;
  const videoId = raw ? extractVimeoId(`https://player.vimeo.com/video/${raw}`) || raw : undefined;
  const currentVideo = videoId ? videos.find((v) => extractVimeoId(v.url) === videoId) : undefined;

  if (!currentVideo) {
    return { notFound: true };
  }

  const forwardedProto = (req.headers["x-forwarded-proto"] as string) || "http";
  const host = req.headers.host || "localhost:3000";
  const siteUrl = `${forwardedProto}://${host}`;

  return {
    props: {
      currentVideo,
      videoId,
      siteUrl,
    },
  };
};

export default VideoPage;
