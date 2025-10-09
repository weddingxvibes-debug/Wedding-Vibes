// Instagram API integration utilities
// Note: You'll need to set up Instagram Basic Display API or Instagram Graph API

interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  caption?: string
  permalink: string
  timestamp: string
}

interface InstagramResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

class InstagramService {
  private accessToken: string
  private baseUrl = 'https://graph.instagram.com'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  /**
   * Fetch Instagram posts
   * @param limit Number of posts to fetch (max 25)
   * @returns Promise<InstagramPost[]>
   */
  async getPosts(limit: number = 12): Promise<InstagramPost[]> {
    try {
      const fields = 'id,media_type,media_url,thumbnail_url,caption,permalink,timestamp'
      const url = `${this.baseUrl}/me/media?fields=${fields}&limit=${limit}&access_token=${this.accessToken}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status}`)
      }
      
      const data: InstagramResponse = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching Instagram posts:', error)
      return []
    }
  }

  /**
   * Fetch Instagram reels (videos)
   * @param limit Number of reels to fetch
   * @returns Promise<InstagramPost[]>
   */
  async getReels(limit: number = 6): Promise<InstagramPost[]> {
    try {
      const posts = await this.getPosts(25) // Fetch more to filter videos
      return posts
        .filter(post => post.media_type === 'VIDEO')
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching Instagram reels:', error)
      return []
    }
  }

  /**
   * Refresh access token (for long-lived tokens)
   * @returns Promise<string>
   */
  async refreshToken(): Promise<string> {
    try {
      const url = `${this.baseUrl}/refresh_access_token?grant_type=ig_refresh_token&access_token=${this.accessToken}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.access_token) {
        this.accessToken = data.access_token
        return data.access_token
      }
      
      throw new Error('Failed to refresh token')
    } catch (error) {
      console.error('Error refreshing Instagram token:', error)
      throw error
    }
  }
}

// Mock data for development/demo purposes
export const mockInstagramData: InstagramPost[] = [
  {
    id: '1',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    caption: 'Beautiful Indian wedding ceremony captured in all its glory ✨ #IndianWedding #WeddingPhotography',
    permalink: 'https://instagram.com/p/example1',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    media_type: 'VIDEO',
    media_url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    caption: 'Wedding highlights reel - capturing every precious moment 💕 #WeddingVideo #LoveStory',
    permalink: 'https://instagram.com/p/example2',
    timestamp: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
    caption: 'Ganpati Bappa Morya! 🙏 Capturing the devotion and celebration #GanpatiFestival',
    permalink: 'https://instagram.com/p/example3',
    timestamp: '2024-01-13T09:20:00Z'
  }
]

// Export the service class
export default InstagramService

// Utility function to categorize posts
export const categorizeInstagramPosts = (posts: InstagramPost[]) => {
  return {
    images: posts.filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'),
    videos: posts.filter(post => post.media_type === 'VIDEO'),
    all: posts
  }
}

// Utility function to format Instagram date
export const formatInstagramDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}