import { get } from "@vercel/blob"
import { imagePrefix, storageConfigured } from "@/lib/catalog-store"

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!storageConfigured() || !/^[a-f0-9-]{36}\.jpg$/.test(file)) {
    return new Response(null, { status: 404 })
  }

  const image = await get(imagePrefix + file, { access: "private" })
  if (!image || image.statusCode !== 200) return new Response(null, { status: 404 })
  return new Response(image.stream, {
    headers: {
      "Content-Type": "image/jpeg",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
