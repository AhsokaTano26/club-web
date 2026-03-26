<template>
  <div class="min-h-screen bg-gray-50/20 flex flex-col font-sans selection:bg-blue-100">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 py-3 px-6">
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <NuxtLink :to="backTo" class="group text-[10px] font-black text-gray-400 hover:text-blue-600 transition-all flex items-center gap-1.5 uppercase tracking-[0.2em]">
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          {{ backLabel }}
        </NuxtLink>
        <div class="flex items-center gap-2 opacity-30">
          <Icon name="lucide:fingerprint" class="w-3 h-3" />
          <span class="text-[10px] font-mono uppercase tracking-widest">{{ archiveName }}</span>
        </div>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto w-full py-16 px-6 flex-grow">
      <div v-if="page" class="space-y-12">

        <header class="relative space-y-8">
          <div class="flex flex-wrap items-center gap-3">
            <div v-if="page.type || page.status"
                 :class="['px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white rounded-sm shadow-sm', getTypeColor(page.type || page.status)]">
              {{ page.type || page.status }}
            </div>

            <div v-if="page.date" class="flex items-center gap-1.5 text-gray-400 font-mono text-xs">
              <Icon name="lucide:calendar-range" class="w-3.5 h-3.5" />
              {{ page.date }}
            </div>

            <div v-if="page.author" class="flex items-center gap-1.5 text-gray-400 font-mono text-xs border-l border-gray-200 pl-3">
              <Icon name="lucide:user" class="w-3.5 h-3.5" />
              {{ page.author }}
            </div>
          </div>

          <h1 class="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight flex items-start gap-4">
            <Icon v-if="page.icon" :name="page.icon" class="w-10 h-10 text-blue-500 mt-2 flex-shrink-0" />
            {{ page.title }}
          </h1>

          <div v-if="page.description" class="relative pl-6 py-1">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/20 rounded-full"></div>
            <p class="text-xl text-gray-500 leading-relaxed font-medium italic italic-font">
              {{ page.description }}
            </p>
          </div>

          <div v-if="page.tags && page.tags.length" class="flex flex-wrap gap-2">
            <span v-for="tag in page.tags" :key="tag"
                  class="text-[9px] font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full uppercase">
              # {{ tag }}
            </span>
          </div>

          <div class="h-px w-full bg-gradient-to-r from-gray-100 via-transparent to-transparent"></div>
        </header>

        <article class="prose prose-slate prose-blue max-w-none
                        prose-headings:font-black prose-headings:tracking-tighter
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/30 prose-blockquote:py-1
                        prose-img:rounded-lg prose-img:shadow-2xl">
          <ContentRenderer :value="page" />

          <div v-if="page.link" class="mt-12">
            <a :href="page.link" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-black rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Icon name="lucide:external-link" class="w-4 h-4" />
              访问项目仓库 / 链接
            </a>
          </div>
        </article>

      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  collection: String,
  backTo: { type: String, default: '/' },
  backLabel: { type: String, default: 'Protocol: Return' },
  archiveName: { type: String, default: 'SYSTEM_ARCHIVE' }
})

const route = useRoute()
const { data: page } = await useAsyncData(`doc-${route.path}`, () => {
  return queryCollection(props.collection).path(route.path).first()
})

// 统一颜色逻辑：兼容 type 和 status
const getTypeColor = (val) => {
  const map = {
    anniversary: 'bg-purple-500',
    official: 'bg-blue-600',
    update: 'bg-orange-500',
    todo: 'bg-gray-400',
    doing: 'bg-blue-400',
    done: 'bg-green-500'
  }
  return map[val?.toLowerCase()] || 'bg-gray-500'
}

useSeoMeta({ title: () => page.value?.title })
</script>