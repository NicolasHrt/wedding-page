<script setup lang="ts">
import AccountDropdown from '~/components/AccountDropdown.vue'

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

    <template #right>
      <AccountDropdown />
    </template>
  </UHeader>
</template>
