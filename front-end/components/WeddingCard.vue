<script setup lang="ts">
// eslint-disable-next-line vue/require-prop-types
defineProps(['wedding'])

const isDeleting = ref(false)
</script>

<template>
  <div class="flex justify-between bg-white border dark:bg-gray-800 rounded-lg shadow-lg p-4">
    <div class="">
      <h2 class="text-xl font-bold">
        {{ wedding.name }}
      </h2>
      <p class="text-gray-500 dark:text-gray-400">
        2 mai 2025
      </p>
    </div>
    <div class="flex gap-2 items-center">
      <UButton
        label="Edit"
        color="gray"
        size="sm"
        icon="i-heroicons-pencil"
        :to="`/app/wedding/${wedding.id}`"
      />
      <UButton
        color="red"
        icon="i-heroicons-trash"
        size="sm"
        @click="isDeleting = true"
      />
    </div>
    <UDashboardModal
      v-model="isDeleting"
      title="Delete wedding"
      description="Are you sure you want to delete this wedding?"
      icon="i-heroicons-exclamation-circle"
      :ui="{
        icon: { base: 'text-red-500 dark:text-red-400' } as any,
        footer: { base: 'ml-16' } as any
      }"
    >
      <template #footer>
        <UButton
          color="red"
          label="Delete"
        />
        <UButton
          color="white"
          label="Cancel"
          @click="isDeleting = false"
        />
      </template>
    </UDashboardModal>
  </div>
</template>

<style scoped>

</style>
