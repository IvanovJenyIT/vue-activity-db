<script setup>
import { inject } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isTimelineItemValid, isHourValid } from '@/utilites/validators'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const activitySelectOptions = inject('activitySelectOptions')
const setTimelineItemActivity = inject('setTimelineItemActivity')

const emit = defineEmits({
  scrollToHour: isHourValid
})
</script>
<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />

    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopwatch :timelineItem="timelineItem" />
  </li>
</template>
