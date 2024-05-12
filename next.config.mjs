/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env:{
        customKey:process.env.YOUTUBE_API_KEY,
    }
};

export default nextConfig;
