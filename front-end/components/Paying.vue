<script setup lang="ts">
import { useUserStore } from '~/store/user'

const user = useUserStore()

const urlValidate = ref(false)
const url = ref('')
const urlError = ref('')

watch(url, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    url.value = newVal.toLowerCase()
  }
})

function validateUrl() {
  if (!url.value) {
    urlError.value = 'Please enter a name for the URL'
    return
  }

  urlValidate.value = true
}
</script>

<template>
  <div>
    <div v-if="!urlValidate">
      <UFormGroup
        required
        class="mb-2"
        label="Name for the Url"
        :error="urlError"
      >
        <UInput
          v-model="url"
          placeholder="julie-leo"
        />
      </UFormGroup>
      <UButton
        label="Validate"
        color="black"
        size="lg"
        block
        @click="validateUrl"
      />
    </div>
    <div v-else>
      <div class="mb-4">
        <p class="text-2xl font-bold">
          Your sharing URL will be : <br> <span class="text-violet-500">http://localhost:3000/{{ url }}</span>
        </p>
      </div>
      <UPricingCard
        title="One wedding page"
        description="Publish your wedding page on the internet"
        price="
        49.99€"
        :button="{ label: 'Pay to publish', to: `https://nicolasharter.lemonsqueezy.com/buy/706d460b-56f8-495a-8e65-5529161312f3?checkout[custom][user_id]=${user.data.id}&checkout[custom][url_slug]=${url}` }"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
