import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR, HUNDRED_PERCENT } from './constants/constants'
import { id } from './utilites/functions'
import { getTotalActivitySeconds } from '@/timeline-items'

export const activities = ref(generateActivities())

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete)
)

export const activitySelectOptions = computed(() => generateActivitySelectOptions())

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export function getActivityProgress(activity) {
  return Math.floor(
    (getTotalActivitySeconds(activity) * HUNDRED_PERCENT) / activity.secondsToComplete
  )
}

function generateActivitySelectOptions() {
  return activities.value.map((activity) => ({ value: activity.id, label: activity.name }))
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60 //hours * SECONDS_IN_HOUR
  }))
}
