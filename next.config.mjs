import withPlaiceholder from '@plaiceholder/next'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    formats: ['image/webp']
  },
  experimental: {
    // ppr: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
}

export default withPlaiceholder(nextConfig)
