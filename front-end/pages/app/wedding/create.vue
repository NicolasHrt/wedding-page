<script setup lang="ts">
import WeddingTemplate from '~/components/WeddingTemplate.vue'
import type { WeddingData } from '~/types'

definePageMeta({
  middleware: ['auth']
})

const weddingData = ref<WeddingData>({
  title: 'Julie & Leo',
  date: new Date().toISOString(),
  address: '3 rue des perdrix, Eckbolsheim',
  color: 'violet',
  header: {
    title: 'Nous t\'invitons à notre mariage !',
    description: 'Nous avons le plaisir de te convier à notre mariage le 2 mai 2025',
    image: 'https://picsum.photos/640/360',
    orientation: 'vertical'
  },
  program: {
    title: 'Programme de la journée',
    description: 'Ensuite RDV au domaine Imodis à partir de 17h pour la fête',
    list: [
      {
        name: '17h - Apéro Time',
        description: 'Like Nuxt UI, change the style of any component from your App Config or customize them specifically through the ui prop.'
      },
      {
        name: '17h30 - Cérémonie',
        description: 'Nuxt UI Pro is built with Tailwind CSS, a utility-first CSS framework that allows you to build complex designs with ease.'
      },
      {
        name: '18h - Photos de groupe',
        description: 'Nuxt UI Pro is built with Tailwind CSS, a utility-first CSS framework that allows you to build complex designs with ease.'
      }
    ]
  },
  gallery: {
    mod: 'grid',
    title: 'Quelques photos du lieux de la cérémonie',
    images: [
      'https://picsum.photos/1000/1080?random=1',
      'https://picsum.photos/1000/1080?random=2',
      'https://picsum.photos/1920/1080?random=3',
      'https://picsum.photos/1000/1080?random=4',
      'https://picsum.photos/1920/1080?random=5',
      'https://picsum.photos/1920/1080?random=6'
    ]
  },
  donation: {
    title: 'Donation',
    description: 'We are not asking for gifts, but if you want to make a donation, we will give it to the association "Les Restos du Coeur"',
    link: ''
  }
})

const preview = ref(false)
</script>

<template>
  <div class="flex">
    <div
      class="basis-1/3 border-r border-gray-200 dark:border-gray-800 p-4 overflow-auto max-h-screen"
      :class="{ hidden: preview }"
    >
      <div class="flex justify-end">
        <UButton
          label="Go back to home"
          to="/app"
          color="gray"
          icon="i-heroicons-arrow-left-20-solid"
          class="mb-4"
        />
      </div>
      <WeddingForm
        v-model="weddingData"
      />
    </div>
    <div class="relative flex-1 overflow-auto max-h-screen">
      <UButton
        label="Preview"
        color="gray"
        icon="i-heroicons-eye-20-solid"
        class="fixed top-4 left-4 z-[9999]"
        @click="preview = !preview"
      />
      <WeddingTemplate
        v-model="weddingData"
      />
    </div>
  </div>
</template>
