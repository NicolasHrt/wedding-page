import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar?: Avatar
  } & Link)[]
}

// weddingData.ts
export interface ProgramItem {
  name: string
  description: string
  icon: string
}

export interface Header {
  title: string
  description: string
  image: string
  orientation: 'horizontal' | 'vertical'
}

export interface Program {
  title: string
  description: string
  list: ProgramItem[]
}

export interface Galerie {
  mod: string
  title: string
  images: string[]
}

export interface Donation {
  title: string
  description: string
  link: string
}

export interface WeddingData {
  title: string
  date: Date
  address: string
  color: string
  header: Header
  program: Program
  galerie: Galerie
  donation: Donation
}
