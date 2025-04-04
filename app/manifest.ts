import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "101webtools",
    short_name: "101tools",
    description: "A collection of awesome web tools",
    start_url: "/",
    display: "standalone",
    background_color: "#3b3b3b",
    theme_color: "#000000",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
