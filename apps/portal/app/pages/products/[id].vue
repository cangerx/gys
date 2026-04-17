<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <section class="portal-card">
    <h1 class="page-title">产品详情</h1>
    <p class="page-desc">当前产品 ID：{{ route.params.id }}</p>
    <p class="page-desc">后续展示主图、详情文案、配料表、营养成分、保质期与报价资料下载。</p>
  </section>
</template>
