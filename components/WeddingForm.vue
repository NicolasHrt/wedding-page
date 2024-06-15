<script setup lang="ts">
import { z } from 'zod'
import { format } from 'date-fns'
import type { FormSubmitEvent } from '#ui/types'
import type { WeddingData } from '~/types'

const schema = z.object({
  title: z.string().min(1),
  header: z.object({
    title: z.string().min(1),
    description: z.string().min(1)
  })

})

type Schema = z.output<typeof schema>

const state = defineModel<WeddingData>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <div class="">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <h2 class="text-2xl font-bold ">
        Basic information of the weeding
      </h2>
      <UFormGroup
        label="Title"
        name="title"
      >
        <UInput v-model="state.title" />
      </UFormGroup>
      <UFormGroup
        label="Address"
        name="address"
      >
        <UInput v-model="state.address" />
      </UFormGroup>
      <div>
        <p class="block font-medium text-gray-700 dark:text-gray-200 text-sm mb-1">
          Date
        </p>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="format(state.date, 'd MMM, yyy')"
          />

          <template #panel="{ close }">
            <DatePicker
              v-model="state.date"
              is-required
              @close="close"
            />
          </template>
        </UPopover>
      </div>

      <UDivider />
      <h2 class="text-2xl font-bold">
        Header
      </h2>
      <UFormGroup
        label="Title"
        name="header.title"
      >
        <UInput
          v-model="state.header.title"
        />
      </UFormGroup>
      <UFormGroup
        label="Description"
        name="header.description"
      >
        <UTextarea
          v-model="state.header.description"
        />
      </UFormGroup>
      <UFormGroup
        label="Image"
        name="header.image"
      >
        <UInput
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          class="mb-4"
        />
        <img
          class="rounded-lg"
          :src="state.header.image"
          alt=""
        >
      </UFormGroup>
      <UFormGroup
        label="Orientation"
        name="header.orientation"
      >
        <USelect
          v-model="state.header.orientation"
          :options="[
            { label: 'Vertical', value: 'vertical' },
            { label: 'Horizontal', value: 'horizontal' }
          ]"
        />
      </UFormGroup>
      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>
