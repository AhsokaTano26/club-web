<template>
  <div class="min-h-screen bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col font-sans selection:bg-blue-100">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 py-3 px-6">
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <NuxtLink :to="backTo" class="group text-[10px] font-black text-gray-400 hover:text-blue-600 transition-all flex items-center gap-1.5 uppercase tracking-[0.2em]">
          <Icon name="lucide:arrow-left" class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          {{ backLabel }}
        </NuxtLink>
        <div class="flex items-center gap-2 opacity-30">
          <Icon :name="categoryIcon" class="w-3 h-3" />
          <span class="text-[10px] font-mono uppercase tracking-widest">{{ archiveName }}</span>
        </div>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto w-full py-16 px-6 flex-grow">
      <div v-if="page" class="space-y-12">

        <header class="flex flex-col md:flex-row gap-8 items-start mb-16">
          <div class="w-32 h-32 bg-gray-50 flex items-center justify-center border border-gray-100 rounded-sm shadow-inner overflow-hidden relative group shrink-0">
            <template v-if="page.theme?.logo && (page.theme.logo.includes('/') || page.theme.logo.includes('.'))">
              <img
                  :src="page.theme.logo"
                  :alt="page.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  @error="(e) => e.target.src = '/default/aimi.jpg'"
              />
            </template>

            <Icon
                v-else
                :name="page.icon || getAutoIcon"
                class="w-16 h-16 transition-all duration-700 group-hover:scale-110"
                :style="{ color: theme?.primaryColor || '#3b82f6' }"
            />
            <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_12px_rgba(0,0,0,0.05)]"></div>
          </div>

          <div class="flex-1 space-y-4">
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="text-4xl font-black tracking-tighter text-gray-900">{{ page.title }}</h1>

              <div v-if="page.type"
                   :class="['px-2 py-1 text-[9px] font-black rounded-sm tracking-widest uppercase text-white shadow-sm transition-colors duration-500', getTypeColor]">
                {{ formatLabel(page.type) }}
              </div>

              <div v-if="page.status"
                   class="px-2 py-0.5 text-[9px] font-bold rounded-sm tracking-widest uppercase border transition-all duration-500"
                   :style="{ borderColor: theme?.primaryColor || '#3b82f6', color: theme?.primaryColor || '#3b82f6' }">
                {{ formatLabel(page.status) }}
              </div>
            </div>

            <p v-if="page.description" class="text-lg text-gray-500 italic leading-relaxed border-l-4 pl-6 transition-all duration-700" :style="{ borderColor: theme?.primaryColor || '#3b82f6' }">
              {{ page.description }}
            </p>

            <div class="flex flex-wrap gap-4 pt-2">
              <div v-if="page.date" class="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Icon name="lucide:calendar-range" class="w-3.5 h-3.5" /> {{ page.date }}
              </div>

              <div v-if="page.author" class="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Icon name="lucide:user-pen" class="w-3.5 h-3.5" /> {{ page.author }}
              </div>

              <div v-if="page.org || page.orgs" class="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Icon name="lucide:building-2" class="w-3.5 h-3.5" />
                {{ Array.isArray(page.orgs) ? page.orgs.join(' / ') : page.org }}
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-4 pt-1">
              <div v-if="allTags && allTags.length" class="flex flex-wrap gap-2">
                <span v-for="tag in allTags" :key="tag"
                      class="text-[9px] font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-sm uppercase">
                  # {{ tag }}
                </span>
              </div>

              <div v-if="page.link || page.website" :class="{'border-l border-gray-200 pl-4': allTags && allTags.length}">
                <a :href="page.link || page.website" target="_blank"
                   class="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
                   :style="{ color: theme?.primaryColor || '#3b82f6' }">
                  <Icon name="lucide:external-link" class="w-4 h-4" />
                  Connect to Source
                </a>
              </div>
            </div>
          </div>
        </header>

        <ProseGlass :value="page" />

      </div>
    </main>

    <footer class="mt-24 pt-8 border-t border-white/5 text-[10px] font-mono text-gray-400 uppercase tracking-widest text-center pb-8">
      End of File // {{ new Date().toLocaleDateString() }}
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  collection: String, // activities, blog, notice, timeline, project, archive
  backTo: { type: String, default: '/' },
  backLabel: { type: String, default: 'Protocol: Return' },
  archiveName: { type: String, default: 'SYSTEM_ARCHIVE' }
})

const route = useRoute()
const { data: page } = await useAsyncData(`doc-${route.path}`, () => {
  return queryCollection(props.collection).path(route.path).first()
})

// 1. 格式化标签文字 (去掉下划线，美化显示)
const formatLabel = (text) => {
  if (!text) return ''
  return text.toString().replace(/_/g, ' ')
}

// 2. Type 颜色映射 (针对内容本质进行分类)
const getTypeColor = computed(() => {
  const val = page.value?.type?.toLowerCase() || ''
  const colorMap = {
    // 官方/活动/公告
    official: 'bg-blue-600',
    anniversary: 'bg-purple-600',
    nexus: 'bg-indigo-500',
    regula: 'bg-zinc-800',
    event: 'bg-rose-500',
    notice: 'bg-amber-500',
    // 博客内容
    docu: 'bg-slate-700',
    artic: 'bg-sky-500',
    rese: 'bg-emerald-600',
    // 映像
    gallery: 'bg-pink-500',
    tweet: 'bg-blue-400'
  }
  return colorMap[val] || 'bg-gray-500'
})

// 3. 标签逻辑
const allTags = computed(() => {
  if (!page.value) return []
  const t = page.value.tags || page.value.tag || []
  return Array.isArray(t) ? t : [t]
})

// 4. 左侧大图标映射 (根据 Type 细化)
const getAutoIcon = computed(() => {
  const type = page.value?.type?.toLowerCase()
  const iconMap = {
    docu: 'lucide:file-text',
    rese: 'lucide:microscope',
    gallery: 'lucide:image',
    regula: 'lucide:scroll-text',
    event: 'lucide:megaphone',
    tweet: 'lucide:message-circle'
  }
  return iconMap[type] || categoryIcon.value
})

// 5. 导航栏分类图标
const categoryIcon = computed(() => {
  const map = {
    activities: 'lucide:sparkles',
    blog: 'lucide:pen-tool',
    notice: 'lucide:megaphone',
    timeline: 'lucide:git-branch',
    project: 'lucide:briefcase',
    archive: 'lucide:clapperboard'
  }
  return map[props.collection] || 'lucide:file-text'
})

// 页面 SEO
const theme = computed(() => page.value?.theme || {})
useSeoMeta({ title: () => page.value?.title })
</script>