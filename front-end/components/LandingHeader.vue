<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import { useUserStore } from '~/store/user'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'Blog',
  to: '/blog'
}]

const user = useUserStore()
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <h1 class="text-2xl">
        Wedding Page
      </h1>
    </template>

    <template #right>
      <UButton
        v-if="user.isLogged"
        label="Dashboard"
        to="/app"
      />
      <UButton
        v-else
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/login"
        class="hidden lg:flex"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>
