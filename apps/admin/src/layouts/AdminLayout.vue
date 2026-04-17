<script setup lang="ts">
const menu = [
  { to: '/dashboard', label: '工作台' },
  { to: '/product/spu', label: '商品资料' },
  { to: '/asset/list', label: '素材中心' },
  { to: '/customer/inquiry', label: '客户询价' },
  { to: '/sales/quotation', label: '报价管理' },
  { to: '/ai/records', label: 'AI 文案' },
]
</script>

<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <div class="admin-logo">企业资料中台</div>
      <nav class="admin-menu">
        <RouterLink v-for="item in menu" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
      </nav>
    </aside>
    <main class="admin-main">
      <header class="admin-header">基于 art-design-pro 的接入占位骨架</header>
      <RouterView />
    </main>
  </div>
</template>
