import { ref } from 'vue'
import { isPageValid } from '@/utilites/validators'
import { PAGE_TIMELINE } from '@/constants/constants'

function normalizePageHash() {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export const currentPage = ref(normalizePageHash())

export const timelineRef = ref()

export function navigate(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineRef.value.scrollToHour()
  } else if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}
