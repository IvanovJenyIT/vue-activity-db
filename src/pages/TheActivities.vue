<script setup>
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import { validateActivities, isActivityValid } from '@/utilites/validators'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid
})

defineProps({
  activities: {
    required: true,
    type: Array,
    validator: validateActivities
  }
})
</script>

<template>
  <div class="flex grow flex-col">
    <ul v-if="activities.length" class="grow divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />

    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
