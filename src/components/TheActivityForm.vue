<script setup>
import { nextTick, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { id } from '@/utilites/functions'
import { createActivity } from '@/activities'
import BaseIcon from '@/components/BaseIcon.vue'
import { ICON_PLUS } from '@/utilites/icons'

let name = ref('')

async function submit() {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0
  })
  name.value = ''

  await nextTick()

  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      v-model="name"
      type="text"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="name.trim() === ''">
      <BaseIcon :name="ICON_PLUS" />
    </BaseButton>
  </form>
</template>
@/utilites/keys
