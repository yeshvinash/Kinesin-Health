import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: '4uds7v16',
  dataset: 'production',
  apiVersion: '2023-10-27', // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: false, // set to `false` to bypass the edge cache
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}