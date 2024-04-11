<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { isActivityValid } from '@/utilites/validators'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constants/constants'
import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue'
import { setActivitySecondsToComplete, deleteActivity } from '@/activities'
import { resrtTimelineItemActivities } from '@/timeline-items'

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

function deleteAndResetActivity(acttivity) {
  resrtTimelineItemActivities(acttivity), deleteActivity(acttivity)
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        :options="PERIOD_SELECT_OPTIONS"
        @select="setActivitySecondsToComplete(activity, $event)"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
@/utilites/keys
