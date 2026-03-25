<template>
  <main class="max-w-4xl mx-auto py-12 px-6">
    <div v-if="page">
      <NuxtLink to="/projects/projects" class="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors mb-12">
        <Icon name="lucide:arrow-left" class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </NuxtLink>

      <header class="flex flex-col md:flex-row gap-8 items-start mb-16">
        <div class="w-32 h-32 bg-gray-50 flex items-center justify-center border border-gray-100 rounded-sm shadow-inner">
          <Icon :name="page.logo || 'lucide:users'" class="w-16 h-16 text-blue-500" />
        </div>

        <div class="flex-1 space-y-4">
          <div class="flex items-center gap-3">
            <h1 class="text-4xl font-black tracking-tighter text-gray-900">{{ page.title }}</h1>
            <div v-if="page.github" class="px-2 py-1 bg-gray-900 text-white text-[9px] font-black rounded-sm tracking-widest uppercase">Verified Org</div>
          </div>

          <p class="text-lg text-gray-500 italic leading-relaxed border-l-4 border-blue-100 pl-6">
            {{ page.description }}
          </p>

          <div class="flex flex-wrap gap-4 pt-2">
            <div class="flex items-center gap-2 text-xs font-mono text-gray-400">
              <Icon name="lucide:calendar" class="w-3.5 h-3.5" /> EST. {{ page.founded }}
            </div>
            <div class="flex items-center gap-2 text-xs font-mono text-gray-400">
              <Icon name="lucide:user-check" class="w-3.5 h-3.5" /> LEADER: {{ page.leader }}
            </div>
          </div>
        </div>
      </header>

      <article class="prose prose-slate prose-blue max-w-none
                      prose-headings:font-black prose-headings:tracking-tighter
                      prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/20">
        <ContentRenderer :value="page" />
      </article>

      <footer class="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
        <div class="text-[10px] font-mono text-gray-300 uppercase">Archive ID: {{ page.id }}</div>
        <div class="flex gap-4">
          <a v-if="page.website" :href="page.website" target="_blank" class="px-6 py-2 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">Visit Website</a>
        </div>
      </footer>
    </div>

    <div v-else class="py-24 text-center">
      <Icon name="svg-spinners:blocks-wave" class="w-12 h-12 text-gray-200 mx-auto mb-6" />
      <h2 class="text-xl font-black uppercase">Decrypting Archive...</h2>
      <p class="text-gray-400 text-xs mt-2 font-mono">If loading persists, the record might be redacted.</p>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()

// 关键：根据当前 URL 路径从 'projects' 集合中查询数据
const { data: page } = await useAsyncData(`org-${route.path}`, () => {
  return queryCollection('projects').path(route.path).first()
})

useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} - 组织详情` : '正在解密...',
  description: () => page.value?.description
})
</script>