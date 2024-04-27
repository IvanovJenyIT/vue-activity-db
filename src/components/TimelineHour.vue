<script setup>
import { isHourValid } from '@/utilites/validators'
import { currentHour } from '@/utilites/functions'
import { scrollToHour } from '@/timeline-items'

const props = defineProps({
  hour: {
    required: true,
    type: Number,
    validator: isHourValid
  }
})

const formattedHour = `${props.hour.toString().padStart(2, '0')}:00`

const classes = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.hour === currentHour() ? 'bg-purple-900 text-white font-black' : 'bg-gray-100 text-gray-500'
]
</script>

<template>
  <a href="#" :class="classes" @click.prevent="scrollToHour(hour)">{{ formattedHour }}</a>
</template>
