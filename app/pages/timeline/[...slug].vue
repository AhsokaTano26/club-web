<template>
  <div class="min-h-screen bg-white">
    <nav class="border-b border-gray-100 py-4 px-6 mb-8">
      <div class="max-w-3xl mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2">
          ← 返回日历
        </NuxtLink>
        <span class="text-[10px] font-black text-gray-200 uppercase tracking-[0.2em]">Project Club Archive</span>
      </div>
    </nav>

    <main class="max-w-3xl mx-auto py-8 px-6">
      <div v-if="page">
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <span :class="['px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-white', typeColors[page.type] || 'bg-gray-400']">
              {{ page.type }}
            </span>
            <time class="text-sm font-mono text-gray-400">{{ page.date }}</time>
          </div>

          <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            {{ page.title }}
          </h1>

          <p v-if="page.description" class="text-lg text-gray-500 leading-relaxed italic border-l-4 border-gray-100 pl-4">
            {{ page.description }}
          </p>
        </header>

        <article class="prose prose-slate prose-orange max-w-none
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-a:text-orange-500 prose-img:rounded-sm prose-img:shadow-md">
          <ContentRenderer :value="page" />
        </article>

        <footer class="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center gap-6">
          <div class="text-center">
            <p class="text-xs text-gray-300 font-bold uppercase tracking-widest mb-4">End of Document</p>
            <NuxtLink to="/" class="inline-block px-8 py-3 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-orange-500 transition-colors shadow-lg shadow-gray-200">
              回到日历视图
            </NuxtLink>
          </div>
        </footer>
      </div>

      <div v-else class="py-24 text-center">
        <div class="inline-block p-6 bg-red-50 rounded-full mb-6">
          <span class="text-4xl">🛰️</span>
        </div>
        <h2 class="text-2xl font-black text-gray-800 mb-2">内容未找到</h2>
        <p class="text-gray-400 mb-8 font-medium">路径：<code class="bg-gray-100 px-1 rounded">{{ $route.path }}</code></p>
        <NuxtLink to="/" class="text-sm font-bold text-orange-500 underline decoration-2 underline-offset-4">
          返回基地
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()

// 类型颜色映射（与日历保持一致）
const typeColors = {
  anniversary: 'bg-purple-400',
  exhibition: 'bg-green-400',
  official: 'bg-blue-400'
}

// 核心：使用 useAsyncData 抓取当前路由对应的 Content 数据
// key 加上 route.path 确保路由切换时数据刷新
const { data: page } = await useAsyncData(`content-${route.path}`, () => {
  return queryCollection('timeline').path(route.path).first()
})

// 设置页面 SEO 信息
useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} - 社团日历` : '正在加载...',
  description: () => page.value?.description || '查看社团活动详情'
})
</script>

<style>
/* 可以在这里添加针对 Markdown 内容的微调 */
.prose pre {
  @apply bg-gray-900 text-gray-100 rounded-sm border border-gray-800;
}
.prose blockquote {
  @apply border-orange-500 bg-orange-50/30 py-1 font-medium;
}
</style>