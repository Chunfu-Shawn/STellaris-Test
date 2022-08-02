/** @type {import('next').NextConfig} */
import path from 'path'
export const nextConfig = {
  reactStrictMode: true,
  resolve:{
    alias:{
      'react': path.resolve('./node_modules/react'),
    }
  }
}
import withLess from "next-with-less";

export default withLess({})


