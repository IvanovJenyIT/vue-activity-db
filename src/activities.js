import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR } from './constants/constants'
import { id } from './utilites/functions'

export const activities = ref(generateActivities())

export const activitySelectOptions = computed(() => generateActivitySelectOptions())

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete || 0
}

function generateActivitySelectOptions() {
  return activities.value.map((activity) => ({ value: activity.id, label: activity.name }))
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }))
}
