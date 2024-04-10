<script setup>
import { ref, computed, provide } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants/constants'
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities
} from '@/utilites/functions'

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)

const currentPage = ref(normalizePageHash())

const activities = ref(generateActivities())

const timelineIRef = ref()

const timelineItems = ref(generateTimelineItems(activities.value))

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

function goTo(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineIRef.value.scrollToHour()
  }
  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

function deleteactivity(activity) {
  timelineItems.value.forEach((element) => {
    if (element.activityId === activity.id) {
      element.activityId = null
      element.activitySeconds = null
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem, activity) {
  timelineItem.activityId = activity.id
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
      :activities="activities"
      :current-page="currentPage"
      @set-timeline-item-activity="setTimelineItemActivity"
      ref="timelineIRef"
    />
    <TheActivities
      @create-activity="createActivity"
      @delete-activity="deleteactivity"
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
      :timeline-items="timelineItems"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
@/utilites/functions
