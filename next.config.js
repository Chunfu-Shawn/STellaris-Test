/** @type {import('next').NextConfig} */
export const nextConfig = {
  reactStrictMode: true,
}
import withLess from "next-with-less";

export default withLess({})
/*withAntdLess({
    lessVarsFilePath: 'frontend/styles/antd.less',
    cssLoaderOptions: {
        esModule: false,
        sourceMap: false,
        modules: {
          mode: 'local',
        },
        exportLocalsConvention: "camelCase",
        exportOnlyLocals: false,
        // ...
        getLocalIdent: (context, localIdentName, localName, options) => {
            return "whatever_random_class_name";
        },
      },
    // for Next.js ONLY
    nextjs: {
        localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
    },
    // Other NextConfig Here...
    webpack(config) {
    return config;
    },
    }
);*/

