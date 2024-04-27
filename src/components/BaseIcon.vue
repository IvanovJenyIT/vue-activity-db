<script setup>
import { ICONS } from '@/utilites/icons'
import { isIconValid } from '@/utilites/validators'

defineProps({
  name: {
    required: true,
    type: String,
    validator: isIconValid
  }
})
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
