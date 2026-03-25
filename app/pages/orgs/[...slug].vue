<template>
  <main class="max-w-4xl mx-auto py-12 px-6">
    <div v-if="page">
      <NuxtLink to="/orgs/orgs" class="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors mb-12">
        <Icon name="lucide:arrow-left" class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        <span class="group-hover:text-[var(--theme-primary)] transition-colors">Back to Directory</span>
      </NuxtLink>

      <header class="flex flex-col md:flex-row gap-8 items-start mb-16">
        <div class="w-32 h-32 bg-gray-50 flex items-center justify-center border border-gray-100 rounded-sm shadow-inner overflow-hidden">
          <Icon :name="page.logo || 'lucide:users'" class="w-16 h-16 transition-colors duration-700" :style="{ color: theme.primaryColor }" />
        </div>

        <div class="flex-1 space-y-4">
          <div class="flex items-center gap-3">
            <h1 class="text-4xl font-black tracking-tighter text-gray-900">{{ page.title }}</h1>
            <div v-if="page.github" class="px-2 py-1 bg-gray-900 text-white text-[9px] font-black rounded-sm tracking-widest uppercase">Verified Org</div>
          </div>

          <p class="text-lg text-gray-500 italic leading-relaxed border-l-4 pl-6 transition-all duration-700" :style="{ borderColor: theme.primaryColor }">
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

      <article class="prose prose-slate max-w-none
                      prose-headings:font-black prose-headings:tracking-tighter
                      custom-article-theme">
        <ContentRenderer :value="page" />
      </article>

      <footer class="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
        <div class="text-[10px] font-mono text-gray-300 uppercase">Archive ID: {{ page.id || 'N/A' }}</div>
        <div class="flex gap-4">
          <a v-if="page.website"
             :href="page.website"
             target="_blank"
             class="px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 text-white shadow-lg hover:scale-105 active:scale-95"
             :style="{ backgroundColor: theme.primaryColor }"
          >
            Visit Website
          </a>
        </div>
      </footer>
    </div>

    <div v-else class="py-24 text-center">
      <Icon name="svg-spinners:blocks-wave" class="w-12 h-12 text-gray-200 mx-auto mb-6" />
      <h2 class="text-xl font-black uppercase tracking-tighter">Decrypting Archive...</h2>
      <p class="text-gray-400 text-xs mt-2 font-mono">If loading persists, the record might be redacted or path is incorrect.</p>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const theme = useState('themeConfig')

const DEFAULT_THEME = {
  primaryColor: '#5b92e5',
  bgImage: '/2043253.jpg',
  bgOverlayOpacity: 0.5,
  sidebarOpacity: 0.95,
  mainOpacity: 0.9,
  rightTickOpacity: 0.85
}

// 1. 获取数据
const { data: page } = await useAsyncData(`org-detail-${route.path.replace(/\/$/, '')}`, () => {
  const cleanPath = route.path.replace(/\/$/, '')
  return queryCollection('orgs').path(cleanPath).first()
})

// 2. 修正后的主题应用逻辑
const applyTheme = (data) => {
  if (data?.meta?.theme) {
    theme.value = { ...DEFAULT_THEME, ...data.meta.theme }
  } else {
    theme.value = { ...DEFAULT_THEME }
  }
}

// 3. 响应式监听
watch(page, (val) => applyTheme(val), { immediate: true })

onUnmounted(() => {
  theme.value = { ...DEFAULT_THEME }
})

useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} - Archive` : 'Archive Decrypting...',
  description: () => page.value?.description
})
</script>

<style scoped>
/* 将 primaryColor 映射到 CSS 变量，方便 template 和 prose 使用 */
main {
  --theme-primary: v-bind('theme.primaryColor');
}

.custom-article-theme :deep(a) {
  color: var(--theme-primary);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.custom-article-theme :deep(blockquote) {
  border-left-color: var(--theme-primary);
  /* 使用 color-mix 实现透明背景，需要现代浏览器支持 */
  background-color: color-mix(in srgb, var(--theme-primary), transparent 95%);
}

.custom-article-theme :deep(strong) {
  color: var(--theme-primary);
}
</style>