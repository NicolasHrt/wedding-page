<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

useSeoMeta({
  title: 'Login'
})
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <UContainer>
    <div
      class="flex flex-col lg:grid lg:grid-cols-2 lg:items-center gap-16 sm:gap-y-24 sm:p-6 py-24 sm:py-32 px-6 lg:px-8"
    >
      <div class="lg:order-last">
        <h2
          class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
        >
          <span class="text-primary">Sign in</span> or <span class="text-primary">Sign up</span>
          to continue
        </h2><!-- v-if -->
        <div class="mt-10 flex items-center gap-x-6" />
        <UButton
          icon="logos:google-icon"
          color="gray"
          label="with Google"
          size="xl"
          to="http://localhost:3333/google/redirect"
        />
      </div>
      <img
        src="https://picsum.photos/640/360"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </div>
  </UContainer>
</template>
