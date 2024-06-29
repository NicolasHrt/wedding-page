<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import type { WeddingData } from '~/types'

const appConfig = useAppConfig()

const weddingData = defineModel<WeddingData>()

appConfig.ui.primary = weddingData.value.color

watch(() => weddingData.value.color, (newColor) => {
  appConfig.ui.primary = newColor
})
const isSharing = ref(false)

const formattedEventDate = computed(() => {
  const date = new Date(weddingData.value.date)
  return date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const formattedEventTime = computed(() => {
  const date = new Date(weddingData.value.date)
  return date.toLocaleTimeString('en-EN', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

const headerImage = ref('')
const galleryImages = ref([])
updateImages()
watch(() => weddingData.value.header.image, updateImages)
watch(() => weddingData.value.gallery.images, updateImages)

function updateImages() {
  if (typeof weddingData.value.header.image === 'string') {
    headerImage.value = weddingData.value.header.image
  } else {
    headerImage.value = URL.createObjectURL(weddingData.value.header.image)
  }

  if (weddingData.value.gallery.images.length > 0) {
    galleryImages.value = weddingData.value.gallery.images.map((image) => {
      if (typeof image === 'string') {
        return image
      }
      return URL.createObjectURL(image)
    })
  }
}

const source = ref('')
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
      :links="[{ label: 'See the program', to: '#program', icon: 'i-material-symbols-menu-book-outline', color: 'gray', size: 'lg' }, { label: `Join us on ${formattedEventDate} at ${formattedEventTime}`, icon: 'i-material-symbols-edit-calendar-outline', size: 'lg' }]"
    >
      <template #headline>
        <!--        <CountdownTimer :target-date="weddingData.date" /> -->
      </template>
      <template #default>
        <img
          :src="headerImage"
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
        {{ weddingData.gallery.title }}
      </h2>
      <UCarousel
        v-if="weddingData.gallery.mod === 'carousel'"
        v-slot="
          {
            item
          }"
        :items="weddingData.gallery.images"
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
        v-else-if="weddingData.gallery.mod === 'grid'"
        class="column-1 md:columns-2  gap-8 space-y-8"
      >
        <img
          v-for="image in galleryImages"
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
        :links="[{ label: 'Donate', to: weddingData.donation.link, target: '_blank', trailingIcon: 'i-heroicons-arrow-right-20-solid', size: 'md' }]"
      />
    </UContainer>
  </div>
</template>
