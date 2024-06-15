<script setup lang="ts">
const colors = ref(['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'pink'])

const currentColor = defineModel()
</script>

<template>
  <UPopover>
    <UButton
      :color="currentColor"
      label="Main color"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
    <template #panel>
      <div class="p-4 flex gap-4">
        <UButton
          v-for="color in colors"
          :key="color"
          square
          size="md"
          :color="color"
          @click="currentColor = color"
        />
      </div>
    </template>
  </UPopover>
</template>

<style scoped>

</style>
