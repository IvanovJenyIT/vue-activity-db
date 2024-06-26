<script setup>
import { ref, watch } from 'vue'
import { formatSeconds, currentHour } from '@/utilites/functions'
import { isTimelineItemValid } from '@/utilites/validators'
import BaseButton from '@/components/BaseButton.vue'
import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  MILLISECONDS_IN_SECOND
} from '@/constants/constants'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/utilites/icons'

import { updateTimelineItem } from '@/timeline-items'
import BaseIcon from '@/components/BaseIcon.vue'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)
const temp = 120

const isStartButtonDisabled = props.timelineItem.hour !== currentHour()

watch(
  () => props.timelineItem.activityId,
  () => updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value * temp })
)

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItem(props.timelineItem, {
      activitySeconds: props.timelineItem.activitySeconds + temp
    })
    seconds.value++
  }, MILLISECONDS_IN_SECOND)
}

function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}

function reset() {
  stop()
  updateTimelineItem(props.timelineItem, {
    activitySeconds: props.timelineItem.activitySeconds - seconds.value * temp
  })

  seconds.value = 0
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :disabled="!seconds" :type="BUTTON_TYPE_DANGER" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start" :disabled="isStartButtonDisabled">
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
../utilites/keys
