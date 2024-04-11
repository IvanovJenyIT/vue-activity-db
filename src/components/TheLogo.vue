<script setup>
import { PAGE_TIMELINE } from '@/constants/constants'
import { navigate } from '@/router/router'
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
    <img src="../assets/img/logo.svg" alt="Logo" class="h-9" />
  </a>
</template>
