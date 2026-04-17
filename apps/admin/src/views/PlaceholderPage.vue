<script setup lang="ts">
defineProps<{
  title: string
  desc: string
}>()
</script>

<template>
  <section class="admin-card">
    <h1>{{ title }}</h1>
    <p>{{ desc }}</p>
  </section>
</template>
