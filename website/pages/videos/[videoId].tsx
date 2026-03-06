import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { videos, parseVideoUrl, getThumbnailUrl, VideoProvider } from "@/utils/videos";
import DefaultLayout from "@/layouts/default";
import { BreadcrumbItem, Breadcrumbs, Button, Chip } from "@heroui/react";
import VideoCard from "@/components/VideoCard";
import { siteConfig } from "@/config/site";
import { DiscordIcon } from "@/components/icons";

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
    >
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
              data-plyr-provider={provider}
              data-plyr-embed-id={videoId}
            />
          </div>
          <h1 className="text-3xl font-bold mt-10 mb-4">
            {currentVideo.title}
          </h1>
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
              <h2 className="font-semibold text-lg mb-4">
                Related Tutorials
              </h2>
              <div className="space-y-4">
                {relatedTutorials.map((vid, i) => {
                  const p = parseVideoUrl(vid.url);
                  if (!p) return null;
                  return (
                    <VideoCard
                      key={i}
                      videoId={p.id}
                      provider={p.provider}
                      title={vid.title}
                      level={
                        vid.level as
                        | "Beginner"
                        | "Intermediate"
                        | "Advanced"
                      }
                    />
                  );
                })}
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
