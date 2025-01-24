/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack:(config)=>{
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    },
    
    transpilePackages: ["@repo/ui"],
    
};

export default nextConfig;
