<script setup>
import { computed } from 'vue'
import { currentPage, navigate } from '@/router/router'
import { isNavItemValid } from '@/utilites/validators'

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid
  }
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'bg-gray-200 pointer-events-none': currentPage.value === props.navItem.page }
])
</script>

<template>
  <li class="flex-1">
    <a @click="navigate(navItem.page)" :href="`#${navItem.page}`" :class="classes">
      <component :is="navItem.icon" class="h-6 w-6" />{{ navItem.page }}
    </a>
  </li>
</template>
