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
      <meta key="og:title" content={title} property="og:title" />
      <meta key="description" name="description" content={description} />
      <meta key="og:description" property="og:description" content={description} />
      {url && <meta key="og:url" property="og:url" content={url} />}
      {image && <meta key="og:image" property="og:image" content={image} />}
      <meta key="og:type" property="og:type" content="video.other" />
      <meta key="og:site_name" property="og:site_name" content={siteConfig.name} />
      <meta key="og:image:width" property="og:image:width" content="1280" />
      <meta key="og:image:height" property="og:image:height" content="720" />

      {/* Twitter Cards */}
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      {image && <meta key="twitter:image" name="twitter:image" content={image} />}
      {url && <meta key="twitter:url" name="twitter:url" content={url} />}

      <meta
        name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <link href="/favicon.png" rel="icon" />
    </NextHead>

  );
};
