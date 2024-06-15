<template>
  <div
    v-if="timeRemaining > 0"
    class=""
  >
    <UButton
      color="white"
      size="lg"
    >
      In {{ days }} days {{ hours }} Hours {{ minutes }} Minutes and {{ seconds }} secondes
    </UButton>
  </div>
  <div v-else>
    <p>Temps écoulé!</p>
  </div>
</template>

<script setup lang="ts">
// Utilisation de defineProps pour les propriétés
const props = defineProps<{
  targetDate: string
}>()

const timeRemaining = ref(0)
let intervalId: number | null = null

const days = computed(() => {
  return Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24))
})

const hours = computed(() => {
  return Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
})

const minutes = computed(() => {
  return Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60))
})

const seconds = computed(() => {
  return Math.floor((timeRemaining.value % (1000 * 60)) / 1000)
})

const updateCountdown = () => {
  const now = new Date().getTime()
  const countdownDate = new Date(props.targetDate).getTime()
  timeRemaining.value = countdownDate - now

  if (timeRemaining.value < 0) {
    if (intervalId) {
      clearInterval(intervalId)
    }
    timeRemaining.value = 0
  }
}

onMounted(() => {
  updateCountdown()
  intervalId = window.setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
/* Ajoute ton style ici */
</style>
