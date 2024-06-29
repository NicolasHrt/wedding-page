<script setup lang="ts">
const appConfig = useAppConfig()
appConfig.ui.primary = 'violet'
</script>

<template>
  <div>
    <Header />
    <slot />
  </div>
</template>

<style scoped>

</style>
