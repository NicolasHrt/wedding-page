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

}

export interface Header {
  title: string
  description: string
  image: string | File
  orientation: 'horizontal' | 'vertical'
}

export interface Program {
  title: string
  description: string
  list: ProgramItem[]
}

export interface Gallery {
  mod: string
  title: string
  images: string[] | File[]
}

export interface Donation {
  title: string
  description: string
  link: string
}

export interface WeddingData {
  title: string
  date: string
  address: string
  color: string
  header: Header
  program: Program
  gallery: Gallery
  donation: Donation
}
