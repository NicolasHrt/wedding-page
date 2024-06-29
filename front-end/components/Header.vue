<script setup lang="ts">
const links = [{
  label: 'Dashboard',
  to: '/app'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <h1>Wedding page</h1>
    </template>

    <template #right />
  </UHeader>
</template>
