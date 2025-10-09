export interface MediaItem {
  id: string
  type: 'IMAGE' | 'VIDEO'
  url: string
  thumbnail?: string
  caption: string
}

export const mockInstagramData: MediaItem[] = [
  // Photography
  {
    id: '1',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    caption: 'Beautiful Indian wedding ceremony ✨ #IndianWedding #WeddingPhotography @wedding_vibes_rp'
  },
  {
    id: '2',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    caption: 'Traditional rituals captured with love 💕 #WeddingMoments #Photography'
  },
  {
    id: '3',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
    caption: 'Ganpati Bappa Morya! 🙏 Festival photography by Priyanshu #GanpatiFestival'
  },
  {
    id: '4',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    caption: 'Couple portrait session 📸 Love in every frame #CoupleGoals #WeddingVibes'
  },
  {
    id: '5',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    caption: 'Corporate event coverage 🎯 Professional photography services #CorporateEvents'
  },
  {
    id: '6',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    caption: 'Birthday celebration memories 🎂 Capturing joy and laughter #BirthdayPhotography'
  },
  {
    id: '7',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800',
    caption: 'Bridal portrait perfection 👰 Every bride deserves to feel beautiful #BridalPhotography'
  },
  {
    id: '8',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800',
    caption: 'Pre-wedding shoot magic ✨ Love story begins here #PreWedding #Romance'
  },
  // Videography
  {
    id: '9',
    type: 'VIDEO',
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    caption: 'Wedding highlights reel 🎬 Cinematic storytelling by @wedding_vibes_rp #WeddingVideo'
  },
  {
    id: '10',
    type: 'VIDEO',
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    caption: 'Traditional ceremony moments 🎥 Capturing emotions in motion #WeddingCinematography'
  },
  {
    id: '11',
    type: 'VIDEO',
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    caption: 'Couple story reel 💕 Love in motion #CoupleVideo #LoveStory'
  },
  {
    id: '12',
    type: 'VIDEO',
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
    caption: 'Festival celebration video 🎊 Capturing the energy and devotion #FestivalVideo'
  }
]