<template>
  <div class="min-h-screen py-12 px-4 relative overflow-hidden  text-gray-200 antialiased">
    <div class="absolute md:fixed inset-0 -z-10 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/15 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/15 blur-[120px] rounded-full"></div>
    </div>

    <div class="max-w-3xl mx-auto space-y-6">
      <div class="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl flex flex-wrap gap-4 items-center justify-between">
        <div class="space-y-1">
          <span class="text-[10px] font-black uppercase tracking-widest text-blue-400">Document Meta</span>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5 text-xs font-mono text-gray-300">
              <Icon name="lucide:calendar" class="w-3.5 h-3.5" /> {{ doc.date }}
            </div>
            <div class="flex items-center gap-1.5 text-xs font-mono text-gray-300">
              <Icon name="lucide:user" class="w-3.5 h-3.5" /> {{ doc.author }}
            </div>
            <div class="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold uppercase rounded-md shadow-sm">
              {{ doc.type }}
            </div>
          </div>
        </div>
        <Icon name="lucide:shield-check" class="w-10 h-10 text-white/10" />
      </div>

      <article class="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

        <header class="relative z-10 mb-10 border-b border-white/10 pb-8">
          <h1 class="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight text-center">
            {{ doc.title }}
          </h1>
        </header>

        <section class="relative z-10 prose prose-blue prose-invert prose-sm md:prose-base max-w-none
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-p:leading-relaxed">

          <div class="text-center">
            <h1 class="text-3xl font-bold tracking-tight text-sky-500 dark:text-gray-100 sm:text-4xl">
                内容修订中 凸^-^凸
            </h1>
          </div>

          <div class="mt-12 p-6 bg-blue-950/30 border border-blue-500/20 rounded-2xl italic space-y-4 shadow-inner text-center">

            <div class="pt-4 not-italic flex flex-col items-end">
              <span class="text-white font-black text-lg">WTW团现任团长 星天耀Star</span>
              <span class="text-[10px] font-mono text-gray-200 mt-1">Written on 2026.03.20</span>
            </div>
          </div>
        </section>
      </article>

      <div class="flex justify-center pt-8 mb-12">
        <NuxtLink to="/" class="group flex items-center gap-2 px-6 py-2 bg-gray-800/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-gray-300 hover:text-white hover:bg-gray-700/60 transition-all shadow-md">
          <Icon name="lucide:chevron-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-400" />
          返回归档中心
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const doc = {
  title: "『联协体系暂行条例 1.0』",
  date: "2026-03-20",
  type: "official",
  author: "Star",
  description: "联协体系（联协关系）正式建立与运行规范文档"
}

useSeoMeta({
  title: doc.title,
  description: doc.description
})
</script>

<style scoped>
/* 针对深色毛玻璃环境下的微调 */
:deep(.prose h5) {
  /* 标题颜色改为亮蓝色 */
  @apply text-blue-400 mt-8 mb-4 flex items-center gap-2;
}
:deep(.prose strong) {
  /* strong 标签会被 prose-invert 自动加白，这里微调下划线 */
  @apply text-red-600 underline decoration-blue-400/30 underline-offset-4;
}
:deep(.prose ol > li::marker),
:deep(.prose ul > li::marker) {
  /* 列表标号颜色改为亮灰 */
  @apply text-gray-300;
}
</style>
