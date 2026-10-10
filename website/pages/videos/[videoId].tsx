import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import "plyr/dist/plyr.css";
import { videos, parseVideoUrl, getThumbnailUrl, VideoProvider } from "@/utils/videos";
import DefaultLayout from "@/layouts/default";
import { BreadcrumbItem, Breadcrumbs, Button, Chip, ScrollShadow } from "@heroui/react";
import VideoCard from "@/components/VideoCard";
import { siteConfig } from "@/config/site";
import { DiscordIcon, YoutubeIcon } from "@/components/icons";

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
  provider?: VideoProvider;
  siteUrl?: string;
}

const VideoPage: React.FC<Props> = ({
  currentVideo: ssrVideo,
  videoId: ssrVideoId,
  provider: ssrProvider = "vimeo",
  siteUrl,
}) => {
  const router = useRouter();

  const rawVideoId = router.query.videoId as string | undefined;

  const clientParsed = rawVideoId ? (() => {
    for (const v of videos) {
      const p = parseVideoUrl(v.url);
      if (p && p.id === rawVideoId) return p;
    }
    return { provider: "vimeo" as VideoProvider, id: rawVideoId };
  })() : undefined;

  const videoId = ssrVideoId || clientParsed?.id;
  const provider = ssrProvider || clientParsed?.provider || "vimeo";

  const currentVideo =
    ssrVideo ||
    (videoId
      ? videos.find((v) => {
        const p = parseVideoUrl(v.url);
        return p && p.id === videoId;
      })
      : undefined);

  const relatedTutorials = currentVideo
    ? videos.filter((v) => {
      const p = parseVideoUrl(v.url);
      return v.category === currentVideo.category && p && p.id !== videoId;
    })
    : [];

  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoId || !playerRef.current) return;

    playerRef.current.innerHTML = "";

    const iframe = document.createElement("iframe");

    if (provider === "youtube") {
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${videoId}?autoplay=1`
      );
    } else {
      iframe.setAttribute(
        "src",
        `https://player.vimeo.com/video/${videoId}?autoplay=1`
      );
    }

    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "allow",
      "autoplay; fullscreen; picture-in-picture"
    );
    iframe.className = "w-full h-full";

    playerRef.current.appendChild(iframe);

    const plyrProvider = provider === "youtube" ? "youtube" : "vimeo";

    let player: any;
    let isCancelled = false;

    import("plyr").then((mod) => {
      if (isCancelled) return;
      const Plyr = mod.default || mod;
      player = new (Plyr as any)(iframe, {
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
    });

    return () => {
      isCancelled = true;
      if (player) {
        player.destroy();
      }
    };
  }, [videoId, provider]);

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
  const ogTitle = currentVideo.title;
  const ogDesc = `Level: ${currentVideo.level}`;
  const ogImage = getThumbnailUrl(provider, videoId!);
  const ogUrl = `${SITE_URL}/videos/${videoId}`;

  return (
    <DefaultLayout
      meta={{
        title: ogTitle,
        description: ogDesc,
        image: ogImage,
        url: ogUrl,
      }}
      maxWidth=" !max-w-[1800px] w-full mx-auto"
    >
      <main className="w-full px-0 sm:px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_450px] gap-10 items-start">
        <section className="flex flex-col gap-6">
          <Breadcrumbs size="sm" className="mb-2">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/">Tutorials</BreadcrumbItem>
            <BreadcrumbItem href="/">{currentVideo.category}</BreadcrumbItem>
            <BreadcrumbItem className="text-white/50">{currentVideo.title}</BreadcrumbItem>
          </Breadcrumbs>

          <div className="rounded-[32px] overflow-hidden shadow-2xl border border-white/10 bg-black/50">
            <div
              className="aspect-video w-full"
              ref={playerRef}
              data-plyr-provider={provider}
              data-plyr-embed-id={videoId}
            />
          </div>
          
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-wrap items-center gap-3">
              <Chip
                color={getLevelColor(currentVideo.level)}
                size="sm"
                variant="flat"
                radius="full"
                className="font-medium tracking-wide px-2"
              >
                {currentVideo.level}
              </Chip>
              <Chip size="sm" variant="faded" radius="full" className="border-white/10 text-white/70 px-2 bg-white/5">
                {currentVideo.category}
              </Chip>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              {currentVideo.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mt-4 pt-6 border-t border-white/10">
              <Button
                as="a"
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5865F2] text-white font-medium shadow-lg shadow-[#5865F2]/20"
                startContent={<DiscordIcon />}
                radius="full"
              >
                Need help? Join Discord
              </Button>
              <Button
                as="a"
                href={siteConfig.links.youtube_subscribe}
                target="_blank"
                rel="noopener noreferrer"
                color="danger"
                variant="flat"
                className="font-medium"
                startContent={<YoutubeIcon className="text-danger" />}
                radius="full"
              >
                Subscribe on YouTube
              </Button>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white/90 tracking-tight">Related Tutorials</h2>
            <span className="text-xs font-medium text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {relatedTutorials.length} Videos
            </span>
          </div>
          
          <ScrollShadow className="flex flex-col gap-5 lg:max-h-[calc(100vh-14rem)] pb-10 pr-4 custom-scrollbar">
            {relatedTutorials.length > 0 ? (
              relatedTutorials.map((vid, i) => {
                const p = parseVideoUrl(vid.url);
                if (!p) return null;
                return (
                  <VideoCard
                    key={i}
                    videoId={p.id}
                    provider={p.provider}
                    title={vid.title}
                    level={vid.level as "Beginner" | "Intermediate" | "Advanced"}
                  />
                );
              })
            ) : (
              <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                <p className="text-white/40 text-sm font-medium">No related tutorials found.</p>
              </div>
            )}
          </ScrollShadow>
        </aside>
      </main>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const raw = params?.videoId as string | undefined;
  if (!raw) return { notFound: true };

  const currentVideo = videos.find((v) => {
    const p = parseVideoUrl(v.url);
    return p && p.id === raw;
  });

  if (!currentVideo) return { notFound: true };

  const parsed = parseVideoUrl(currentVideo.url);

  const forwardedProto =
    (req.headers["x-forwarded-proto"] as string) || "http";
  const host = req.headers.host || "localhost:3000";
  const siteUrl = `${forwardedProto}://${host}`;

  return {
    props: {
      currentVideo,
      videoId: parsed!.id,
      provider: parsed!.provider,
      siteUrl,
    },
  };
};

export default VideoPage;
