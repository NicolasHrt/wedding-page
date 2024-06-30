<script setup lang="ts">
import { useUserStore } from '~/store/user'

const appConfig = useAppConfig()
appConfig.ui.primary = 'violet'

const user = useUserStore()
user.refresh()
</script>

<template>
  <div>
    <Header />
    <slot />
  </div>
</template>

<style scoped>

</style>
