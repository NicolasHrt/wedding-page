<script setup lang="ts">
const weddings = [
  {
    id: 1,
    name: 'Julie & Leo'
  },
  {
    id: 2,
    name: 'Marie & Pierre'
  },
  {
    id: 3,
    name: 'Sophie & Thomas'
  }
]

const isCreating = ref(false)

definePageMeta({
  layout: 'app'
})
</script>

<template>
  <div>
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold my-4">
        My weddings
      </h1>
      <div
        v-if="weddings.length > 0"
        class="grid items-center md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="wedding in weddings"
          :key="wedding.name"
        >
          <WeddingCard :wedding="wedding" />
        </div>
        <div>
          <UButton
            label="Create a new wedding"
            color="black"
            size="xl"
            to="/app/wedding/create"
          />
        </div>
      </div>
      <div
        v-else
        class="text-center max-w-lg mx-auto"
      >
        <UButton
          label="Create a new wedding"
          block
          size="xl"
          to="/app/wedding/create"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
