<template>
  <div class="min-h-screen bg-gray-50/20 flex flex-col font-sans">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-6">
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="group text-[10px] font-black text-gray-400 hover:text-blue-500 transition-all flex items-center gap-1.5 uppercase tracking-widest">
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Calendar
        </NuxtLink>
        <div class="flex items-center gap-2">
          <Icon name="lucide:archive" class="w-3 h-3 text-gray-200" />
          <span class="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Project Club Archive</span>
        </div>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto w-full py-12 px-6 flex-grow">
      <div v-if="page" class="space-y-12">
        <header class="relative space-y-6">
          <div class="flex flex-wrap items-center gap-4">
            <div :class="['flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest text-white shadow-sm', typeColors[page.type] || 'bg-gray-400']">
              <Icon :name="typeIcons[page.type] || 'lucide:tag'" class="w-3 h-3" />
              {{ page.type }}
            </div>
            <div class="flex items-center gap-1.5 text-gray-400 font-mono text-xs border-l border-gray-200 pl-4">
              <Icon name="lucide:calendar-days" class="w-3.5 h-3.5" />
              {{ page.date }}
            </div>
          </div>

          <h1 class="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[1.1]">
            {{ page.title }}
          </h1>

          <div v-if="page.description" class="relative group">
            <div class="absolute -left-4 top-0 bottom-0 w-1 bg-blue-500 rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <p class="text-lg text-gray-500 leading-relaxed font-medium italic">
              {{ page.description }}
            </p>
          </div>

          <div class="flex items-center gap-4 pt-4">
            <div class="h-px flex-grow bg-gray-100"></div>
            <Icon name="lucide:fingerprint" class="w-4 h-4 text-gray-100" />
            <div class="h-px flex-grow bg-gray-100"></div>
          </div>
        </header>

        <article class="prose prose-slate prose-blue max-w-none
                        prose-headings:font-black prose-headings:tracking-tighter
                        prose-p:text-gray-600 prose-p:leading-extra-relaxed
                        prose-strong:text-gray-900 prose-strong:font-black
                        prose-a:no-underline prose-a:border-b-2 prose-a:border-blue-100 hover:prose-a:border-blue-500 prose-a:transition-all
                        prose-img:rounded-sm prose-img:border prose-img:border-gray-100 prose-img:shadow-xl">
          <ContentRenderer :value="page" />
        </article>

        <footer class="mt-24 py-16 border-t border-gray-100 text-center space-y-8">
          <div class="inline-flex flex-col items-center gap-2">
            <Icon name="lucide:shield-check" class="w-8 h-8 text-gray-100" />
            <p class="text-[10px] text-gray-300 font-black uppercase tracking-[0.4em]">End of Document</p>
          </div>
          <br>

          <NuxtLink to="/" class="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-xs font-black rounded-sm hover:bg-blue-500 transition-all shadow-md active:scale-95">
            <Icon name="lucide:layout-grid" class="w-4 h-4" />
            返回日历视图
          </NuxtLink>
        </footer>
      </div>

      <div v-else class="py-32 text-center space-y-6">
        <Icon name="lucide:search-x" class="w-20 h-20 text-gray-100 mx-auto" />
        <h2 class="text-2xl font-black text-gray-800 uppercase tracking-tighter">404: Archive Not Found</h2>
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm font-black text-blue-500 group">
          <Icon name="lucide:home" class="w-4 h-4" />
          <span class="border-b-2 border-blue-100 group-hover:border-blue-500 transition-all">返回基地</span>
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute()

// 统一的视觉变量定义
const typeColors = {
  anniversary: 'bg-purple-500',
  exhibition: 'bg-green-500',
  official: 'bg-blue-500'
}

const typeIcons = {
  anniversary: 'lucide:cake-slice',
  exhibition: 'lucide:map-pin',
  official: 'lucide:check-circle-2'
}

// 数据抓取
const { data: page } = await useAsyncData(`content-${route.path}`, () => {
  return queryCollection('blog').path(route.path).first()
})

// SEO 配置
useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} - Archive` : 'Loading...',
  description: () => page.value?.description || 'View activity details'
})
</script>

<style>
/* 全站 Markdown 内容微调：确保“文档感” */
.prose h2 {
  @apply flex items-center gap-3 pb-2 border-b-2 border-gray-50 mb-8 mt-12;
}
.prose h2::before {
  content: "#";
  @apply text-blue-500 font-mono text-xl;
}
.prose pre {
  @apply bg-[#1a1b26] p-6 rounded-sm border border-gray-800 shadow-inner my-8 !important;
}
.prose blockquote {
  @apply border-l-4 border-blue-400 bg-blue-50/20 px-6 py-1 font-medium rounded-r-sm not-italic;
}
.prose ul li {
  @apply flex items-start gap-2;
}
.prose ul li::before {
  content: "→";
  @apply text-blue-400 font-black mr-2;
}
</style>