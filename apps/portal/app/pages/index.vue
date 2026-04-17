<script setup lang="ts">
const links = [
  { to: '/products', title: '产品资料库', desc: '按品类、储存方式、保质期和渠道状态筛选食品资料。' },
  { to: '/compare', title: '客户选品对比', desc: '沉淀客户常用比价和导出动作。' },
  { to: '/account/login', title: '客户登录', desc: '支持客户收藏、询价、下载与资料追踪。' },
]
</script>

<template>
  <section class="page-shell grid">
    <div class="portal-card">
      <h1 class="page-title">食品产品资料与报价门户</h1>
      <p class="page-desc">面向客户提供产品浏览、资料下载、询价和对比；面向销售承接报价单、选品单和跟进动作。</p>
    </div>
    <div class="grid grid-3">
      <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="portal-card">
        <h2>{{ item.title }}</h2>
        <p class="page-desc">{{ item.desc }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
