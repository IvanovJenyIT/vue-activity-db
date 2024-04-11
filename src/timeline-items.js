import { ref } from 'vue'
import { activities } from '@/activities'
import { HOURS_IN_DAY } from './constants/constants'

export const timelineItems = ref(generateTimelineItems())

export function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

export function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

export function resrtTimelineItemActivities(activity) {
  timelineItems.value.forEach((element) => {
    if (element.activityId === activity.id) {
      element.activityId = null
      element.activitySeconds = null
    }
  })
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
  }))
}

export function getTotalActivitySeconds(acvity) {
  return timelineItems.value
    .filter((timelineItem) => timelineItem.activityId === acvity.id)
    .reduce((acc, item) => Math.round(acc + item.activitySeconds), 0)
}
