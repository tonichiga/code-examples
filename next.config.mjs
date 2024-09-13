/** @type {import('next').NextConfig} */
import nextIntl from "next-intl/plugin";
const withNextIntl = nextIntl("./src/07.shared/config/i18n.ts");

/** @type {import('next').NextConfig} */
const config = () => {
  const config = {
    env: {
      NEXT_PUBLIC_EXTERNAL_API_URL: "https://jsonplaceholder.typicode.com",
      STORYBOOK_NEXT_PUBLIC_EXTERNAL_API_URL:
        "https://jsonplaceholder.typicode.com",
    },
    reactStrictMode: false,
    images: {
      unoptimized: true,
    },
  };

  return withNextIntl(config);
};

export default config;
