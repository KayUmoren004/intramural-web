// TODO: Update site config

export const siteConfig = {
  name: "Intramural Admin",
  //   url: "https://admin.intramural.com",
  url: "http://localhost:3000",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Intramural is a platform for creating and managing intramural sports leagues.",
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
  },
};

export type SiteConfig = typeof siteConfig;
