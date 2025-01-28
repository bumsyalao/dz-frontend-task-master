/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
              pathname: '**',
            },
          ],
      dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
