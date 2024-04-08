<script setup>
import TheLogo from './TheLogo.vue'
import TheHeaderProgress from './TheHeaderProgress.vue'
import { isPageValid } from '@/utilites/validators'
import { PAGE_TIMELINE, PAGE_PROGRESS } from '@/constants/constants'

// const emit = defineEmits(['goToTimeline', 'goToProgress'])
const emit = defineEmits({
  navigate: isPageValid
})
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="emit('navigate', PAGE_TIMELINE)" />
    <TheHeaderProgress @click="emit('goToProgress', PAGE_PROGRESS)" />
  </header>
</template>
