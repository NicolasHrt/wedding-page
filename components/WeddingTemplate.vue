<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import type { WeddingData } from '~/types'

const appConfig = useAppConfig()
const weddingData = defineModel<WeddingData>()

appConfig.ui.primary = weddingData.value.color

const isSharing = ref(false)
const source = ref('')
const eventTitle = 'Mariage'
const eventDescription = 'Nous avons le plaisir de te convier à notre mariage le 2 mai 2025'

const calendarUrl = computed(() => {
  const startDate = new Date(weddingData.value.date)
  const endDate = new Date(startDate.getTime())
  endDate.setHours(startDate.getHours() + 2)

  const format = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '')

  return `webcal://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${format(startDate)}/${format(endDate)}&details=${encodeURIComponent(eventDescription)}`
})

const formattedEventDate = computed(() => {
  const date = new Date(weddingData.value.date)
  return date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const { copy } = useClipboard({ source })
const toast = useToast()

onMounted(() => {
  source.value = window.location.href
})

function copyUrl() {
  copy(source.value)
  toast.add({
    title: 'Copied to clipboard',
    icon: 'i-material-symbols-check-circle-outline',
    timeout: 3000

  })
}
</script>

<template>
  <div class="relative">
    <UHeader>
      <template #logo>
        <h1 class="text-3xl">
          {{ weddingData.title }}
        </h1>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          target="_blank"
          icon="i-material-symbols-ios-share"
          color="gray"
          variant="ghost"

          @click="isSharing = true"
        />
        <UModal v-model="isSharing">
          <div class="p-4 flex gap-2 items-end w-full">
            <UFormGroup
              class="w-full"
              label="Share it with your friends"
            >
              <UInput
                v-model="source"
                disabled
              />
            </UFormGroup>
            <UButton
              icon="i-material-symbols-content-copy-outline"
              @click="copyUrl"
            />
          </div>
        </UModal>
      </template>
    </UHeader>
    <ULandingHero
      v-bind="weddingData.header"
      :links="[{ label: 'See the program', to: '#program', icon: 'i-material-symbols-menu-book-outline', color: 'gray', size: 'lg' }, { label: `Join us on ${formattedEventDate}`, icon: 'i-material-symbols-edit-calendar-outline', to: calendarUrl, size: 'lg' }]"
    >
      <template #headline>
        <CountdownTimer :target-date="weddingData.date" />
      </template>
      <template #default>
        <img
          :src="weddingData.header.image"
          class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
        >
      </template>
    </ULandingHero>
    <ULandingSection
      id="program"
      :title="weddingData.program.title"
      :description="weddingData.program.description"

      align="left"
      :features="weddingData.program.list"
    >
      <iframe
        class="relative w-full h-96 rounded-lg"

        :src="`https://maps.google.com/maps?q=${weddingData.address}&hl=en&amp;output=embed`"
      />
    </ULandingSection>
    <UContainer class="py-24 sm:py-32">
      <h2
        class="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-8 sm:mb-14 lg:mb-20"
      >
        {{ weddingData.galerie.title }}
      </h2>
      <UCarousel
        v-if="weddingData.galerie.mod === 'carousel'"
        v-slot="
          {
            item
          }"
        :items="weddingData.galerie.images"
        :ui="{ item: 'basis-full' }"

        arrows
        class="aspect-[16/9] rounded-lg overflow-hidden"
      >
        <img
          :src="item"
          class="w-full h-full object-cover"
        >
      </UCarousel>
      <div
        v-else-if="weddingData.galerie.mod === 'grid'"
        class="column-1 md:columns-2  gap-8 space-y-8"
      >
        <img
          v-for="image in weddingData.galerie.images"
          :key="image"
          class="rounded-lg"
          :src="image"
          alt=""
        >
      </div>
    </UContainer>

    <UContainer />
    <UContainer>
      <ULandingCTA
        :title="weddingData.donation.title"
        :description="weddingData.donation.description"
        :card="false"
        :links="[{ label: 'Donate', to: weddingData.donation.link, icon: 'i-material-symbols-euro', size: 'md' }]"
      />
    </UContainer>
    <div class="sticky bottom-4 left-4 hidden">
      <UButton
        to="/"
        color="black"
        label="Made w/ WeddingPage"
        trailing-icon="i-heroicons-heart"
      />
    </div>
  </div>
</template>
