<script setup lang="ts">
import { z } from 'zod'
import VueDatePicker from '@vuepic/vue-datepicker'
import type { FormSubmitEvent } from '#ui/types'
import type { WeddingData } from '~/types'
import '@vuepic/vue-datepicker/dist/main.css'

const schema = z.object({
  title: z.string().min(1),
  header: z.object({
    title: z.string().min(1),
    description: z.string().min(1)
  })

})

type Schema = z.output<typeof schema>
const props = defineProps({
  isEditing: Boolean
})

const state = defineModel<WeddingData>()
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)
  toast.add({
    icon: 'i-heroicons-check',
    title: 'Document Saved'
  })
}

const headerImage = ref(state.value.header.image)

function previewHeaderImage(event: any) {
  state.value.header.image = event[0]
  // @ts-ignore
  headerImage.value = URL.createObjectURL(state.value.header.image)
}

const isPaying = ref(false)
</script>

<template>
  <div>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <div class="grid gap-4">
        <h2 class="text-2xl font-bold ">
          Basic information of the weeding
        </h2>
        <UFormGroup
          required
          label="Title"
          name="title"
        >
          <UInput
            v-model="state.title"
            placeholder="John & Jane's"
          />
        </UFormGroup>
        <UFormGroup
          label="Address"
          name="address"
        >
          <UInput v-model="state.address" />
        </UFormGroup>
        <div>
          <UFormGroup
            label="Date"
            name="date"
            required
          >
            <VueDatePicker v-model="state.date" />
          </UFormGroup>
        </div>
      </div>
      <UDivider />
      <div class="grid gap-4">
        <h2 class="text-2xl font-bold ">
          Styling
        </h2>
        <ColorsPicker v-model="state.color" />
      </div>
      <UDivider />
      <div class="grid gap-4">
        <h2 class="text-2xl font-bold">
          Header
        </h2>
        <UFormGroup
          label="Title"
          name="header.title"
          required
        >
          <UInput
            v-model="state.header.title"
          />
        </UFormGroup>
        <UFormGroup
          label="Description"
          name="header.description"
          required
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
            @change="previewHeaderImage"
          />
          <img
            v-if="headerImage"
            class="rounded-lg"
            :src="headerImage"
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
      </div>
      <UDivider />
      <div class="grid gap-4">
        <h2 class="text-2xl font-bold ">
          Program
        </h2>

        <UFormGroup label="Title">
          <UInput v-model="state.program.title" />
        </UFormGroup>
        <UFormGroup label="Description">
          <UTextarea v-model="state.program.description" />
        </UFormGroup>
        <p class="font-medium">
          List of program :
        </p>
        <ul
          v-auto-animate
          class="ml-4"
        >
          <li
            v-for="(element, index) in state.program.list"
            :key="index"
            class="grid gap-3 mb-4 last:mb-0"
          >
            <UFormGroup label="Title">
              <UInput v-model="element.name" />
            </UFormGroup>
            <UFormGroup label="Description">
              <UTextarea v-model="element.description" />
            </UFormGroup>
            <UButton
              label="Remove program"
              color="red"
              block
              icon="i-heroicons-trash-20-solid"
              @click="state.program.list.splice(index, 1)"
            />
            <UDivider />
          </li>
        </ul>
        <UButton
          label="Add program"
          color="black"
          block
          icon="i-heroicons-plus-20-solid"
          @click="state.program.list.push({ name: '', description: '' })"
        />
      </div>
      <UDivider />
      <div class="grid gap-4">
        <h2 class="text-2xl font-bold ">
          Photo Galery
        </h2>
        <UFormGroup label="Title">
          <UInput v-model="state.gallery.title" />
        </UFormGroup>
        <UFormGroup label="Display mod">
          <USelect
            v-model="state.gallery.mod"
            :options="[
              { label: 'Carousel', value: 'carousel' },
              { label: 'Grid', value: 'grid' }
            ]"
          />
        </UFormGroup>
      </div>
      <UDivider />
      <div class="grid gap-4">
        <h2 class="text-2xl font-bold ">
          Donation
        </h2>
        <UFormGroup label="Title">
          <UInput
            v-model="state.donation.title"
            label="Title"
          />
        </UFormGroup>
        <UFormGroup label="Description">
          <UTextarea
            v-model="state.donation.description"
          />
        </UFormGroup>
        <UFormGroup label="Link to the donation">
          <UInput
            v-model="state.donation.link"
          />
        </UFormGroup>
      </div>
      <div class="gap-2 flex">
        <UButton
          type="submit"
          size="lg"
          color="black"
          trailing-icon="i-material-symbols-file-save"
        >
          Save
        </UButton>
        <UButton
          type="submit"
          size="lg"
          trailing-icon="i-material-symbols-publish"
          @click="isPaying = true"
        >
          Publish
        </UButton>
      </div>
    </UForm>
    <UModal v-model="isPaying">
      <div class="p-4">
        <Paying />
      </div>
    </UModal>
  </div>
</template>
