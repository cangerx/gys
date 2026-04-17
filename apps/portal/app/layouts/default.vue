<template>
  <div class="portal-layout">
    <header class="portal-header">
      <strong>企业客户选品门户</strong>
      <nav class="portal-nav">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/products">产品库</NuxtLink>
        <NuxtLink to="/compare">对比清单</NuxtLink>
        <NuxtLink to="/about">关于我们</NuxtLink>
      </nav>
    </header>
    <main class="portal-main">
      <slot />
    </main>
  </div>
</template>
