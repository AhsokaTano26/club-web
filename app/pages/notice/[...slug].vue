<template>
  <div v-if="page" class="space-y-16">
    <header class="space-y-8 relative">
      <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">
        <div class="flex items-center gap-4">
          <span :style="{ color: themeConfig.primaryColor }">Classification: {{ page.type }}</span>
          <span class="opacity-30">|</span>
          <span>Ref: {{ page.date.replace(/-/g, '') }}</span>
        </div>
        <div class="flex items-center gap-2 italic">
          Authored by {{ page.author }}
        </div>
      </div>

      <h1 class="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] text-gray-900 uppercase italic">
        {{ page.title }}
      </h1>

      <div class="p-6 bg-blue-50/30 border-l-2 border-blue-500/50 rounded-r-xl">
        <p class="text-lg text-gray-500 font-medium leading-relaxed italic">
          {{ page.description }}
        </p>
      </div>
    </header>

    <article class="prose prose-slate prose-blue max-w-none
                    prose-p:text-gray-600 prose-p:leading-extra-relaxed
                    prose-headings:italic prose-headings:tracking-tighter">
      <ContentRenderer :value="page" />
    </article>

    <footer class="pt-20 flex flex-col items-center gap-6">
      <div class="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center">
        <Icon name="lucide:check" class="w-5 h-5 text-gray-200" />
      </div>
      <p class="text-[9px] font-black uppercase tracking-[0.6em] text-gray-300">Synchronized via GitHub Registry</p>
    </footer>
  </div>
</template>

<script setup>
const route = useRoute()
const themeConfig = useState('themeConfig')

// 获取数据
const { data: page } = await useAsyncData(`notice-data-${route.path}`, () => {
  return queryCollection('notice').path(route.path).first()
})

// 动态修改页面 Title
useHead({
  title: () => page.value?.title ? `${page.value.title} - Official Notice` : 'Loading Notice...'
})
</script>