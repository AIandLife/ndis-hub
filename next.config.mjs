/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // 知识库/全流程/课程已合并进「行业情报 Insights」
      { source: "/journey", destination: "/insights", permanent: true },
      { source: "/resources", destination: "/insights", permanent: true },
      { source: "/courses", destination: "/insights", permanent: true },
    ];
  },
};

export default nextConfig;
