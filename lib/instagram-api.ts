interface InstagramMedia {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  caption?: string
  permalink: string
  timestamp: string
}

export async function fetchInstagramMedia(): Promise<InstagramMedia[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  
  if (!accessToken) {
    console.warn('Instagram access token not found')
    return []
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink,timestamp&access_token=${accessToken}&limit=50`
    )
    
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching Instagram media:', error)
    return []
  }
}

export function categorizeMedia(media: InstagramMedia[]) {
  return {
    photography: media.filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'),
    videography: media.filter(item => item.media_type === 'VIDEO'),
    all: media
  }
}