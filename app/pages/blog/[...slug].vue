<template>
  <main class="max-w-3xl mx-auto p-8 prose prose-orange">
    <ContentDoc />
  </main>
</template>

<style>
/* 简单的文章样式补丁 */
.prose h1 { @apply text-3xl font-bold mb-4; }
.prose p { @apply mb-4 leading-relaxed; }
</style>