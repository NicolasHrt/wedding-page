<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { useUserStore } from '~/store/user'

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)

const appConfig = useAppConfig()
appConfig.ui.primary = 'violet'

const user = useUserStore()
user.refresh()
</script>

<template>
  <div>
    <LandingHeader />
    <UMain>
      <slot />
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </div>
</template>
