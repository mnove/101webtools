export const siteConfig = {
  name: "101webtools.com",
  creator: "@mnove",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://101webtools.com",
  ogImage: "https://101webtools.com/opengraph-image.png",
  description:
    "A collection of 101+ free online tools to help you with your web development projects.",
  keywords: [
    "web development",
    "tools",
    "online tools",
    "free tools",
    "javascript",
    "css",
    "html",
    "code generators",
    "id generators",
  ],
  links: {
    portfolio: "https://marcellonovelli.com",
    github: "https://github.com/mnove",
  },
  feedbackUrls: {
    giveFeedbackFormUrl: "https://tally.so/r/3jzXlx",
    reportBugFormUrl: "https://tally.so/r/3xzEN9",
  },
};

export type SiteConfig = typeof siteConfig;
