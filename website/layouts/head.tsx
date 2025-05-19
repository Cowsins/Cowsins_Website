// head.tsx

import React from "react";
import NextHead from "next/head";
import { siteConfig } from "@/config/site";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const Head = ({
  title = siteConfig.name,
  description = siteConfig.description,
  image,
  url,
}: HeadProps) => {
  return (
   <NextHead>
  <title>{title}</title>

  {/* Open Graph */}
  <meta key="title" content={title} property="og:title" />
  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  {url && <meta property="og:url" content={url} />}
  {image && <meta property="og:image" content={image} />}
  <meta property="og:type" content="video.other" />
  <meta property="og:site_name" content={siteConfig.name} />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="720" />

  {/* Twitter Cards */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {image && <meta name="twitter:image" content={image} />}
  {url && <meta name="twitter:url" content={url} />}

  <meta
    name="viewport"
    content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  />
  <link href="/favicon.png" rel="icon" />
</NextHead>

  );
};
