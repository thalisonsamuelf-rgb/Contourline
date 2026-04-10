import "server-only"

/**
 * Dropbox API client for generating temporary download links.
 *
 * Uses refresh token flow to get fresh access tokens automatically.
 * Env vars required:
 *   - DROPBOX_APP_KEY
 *   - DROPBOX_APP_SECRET
 *   - DROPBOX_REFRESH_TOKEN
 */

interface TokenCache {
  access_token: string
  expires_at: number
}

let tokenCache: TokenCache | null = null

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid (refresh 60s before expiry)
  if (tokenCache && tokenCache.expires_at > Date.now() + 60_000) {
    return tokenCache.access_token
  }

  const appKey = process.env.DROPBOX_APP_KEY
  const appSecret = process.env.DROPBOX_APP_SECRET
  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN

  if (!appKey || !appSecret || !refreshToken) {
    throw new Error("Dropbox credentials not configured")
  }

  const basicAuth = Buffer.from(`${appKey}:${appSecret}`).toString("base64")

  const response = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Dropbox auth failed: ${response.status} ${errorText}`)
  }

  const data = (await response.json()) as {
    access_token: string
    expires_in: number
  }

  tokenCache = {
    access_token: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
  }

  return data.access_token
}

/**
 * Normalizes a stored file path to the Dropbox API expected format.
 * Stored path format: "dropbox:/drive clientes/hipro/..."
 * Dropbox API format: "/drive clientes/hipro/..."
 */
function normalizePath(filePath: string): string {
  if (filePath.startsWith("dropbox:")) {
    return filePath.slice("dropbox:".length)
  }
  return filePath.startsWith("/") ? filePath : `/${filePath}`
}

/**
 * Generates a temporary download link for a file.
 * The link is valid for approximately 4 hours.
 */
export async function getTemporaryLink(filePath: string): Promise<string> {
  const accessToken = await getAccessToken()
  const path = normalizePath(filePath)

  const response = await fetch(
    "https://api.dropboxapi.com/2/files/get_temporary_link",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Dropbox temporary link failed: ${response.status} ${errorText}`)
  }

  const data = (await response.json()) as { link: string }
  return data.link
}

/**
 * Generates a thumbnail preview URL for images and PDFs.
 * Returns null if the file type doesn't support thumbnails.
 */
export async function getThumbnailLink(filePath: string): Promise<string | null> {
  const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp"]
  const hasExt = supportedExtensions.some((ext) => filePath.toLowerCase().endsWith(ext))
  if (!hasExt) return null

  try {
    const accessToken = await getAccessToken()
    const path = normalizePath(filePath)

    const response = await fetch(
      "https://content.dropboxapi.com/2/files/get_thumbnail_v2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Dropbox-API-Arg": JSON.stringify({
            resource: { ".tag": "path", path },
            format: { ".tag": "jpeg" },
            size: { ".tag": "w640h480" },
            mode: { ".tag": "strict" },
          }),
        },
      }
    )

    if (!response.ok) return null

    // Thumbnails are returned as binary — we'd need to either:
    // 1. Proxy through our API (more bandwidth)
    // 2. Use get_temporary_link for images instead
    // For now, use temporary link for images
    return await getTemporaryLink(filePath)
  } catch {
    return null
  }
}

export function isDropboxPath(filePath: string | null | undefined): boolean {
  return typeof filePath === "string" && filePath.startsWith("dropbox:")
}
