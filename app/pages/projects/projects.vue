<template>

  <div class="space-y-8 md:space-y-12 px-4 md:px-0 py-8 max-w-6xl mx-auto">
    <header class="space-y-3 md:space-y-4">
      <div class="flex items-center gap-3 text-blue-600">
        <div class="p-2 bg-blue-600/10 rounded-lg">
          <Icon name="lucide:folder-kanban" class="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <h1 class="text-xl md:text-3xl font-black uppercase tracking-tighter">Project Archives</h1>
      </div>
      <p class="text-xs md:text-sm text-gray-500 font-medium max-w-2xl leading-relaxed">
        实时监控组织内部项目的生命周期。从概念孵化（TODO）到最终归档（COMPLETED）。
      </p>
    </header>

    <div v-for="group in projectGroups" :key="group.id" class="space-y-4 md:space-y-6">
      <div class="flex items-center gap-3 md:gap-4">
        <div :class="['px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm text-white shrink-0', group.color]">
          {{ group.label }}
        </div>
        <div class="h-px flex-grow bg-gray-200/50"></div>
        <span class="text-[10px] font-mono text-gray-200 whitespace-nowrap">{{ group.items.length }} UNITS</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div v-for="project in group.items" :key="project.path"
             class="group/card relative overflow-hidden transition-all duration-500
                    /* 毛玻璃核心配置 */
                    bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl
                    /* 交互效果 */
                    hover:bg-white/60 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1
                    active:scale-[0.98] p-5 md:p-6 shadow-sm">

          <Icon :name="project.icon || 'lucide:box'"
                class="absolute -right-6 -bottom-6 w-28 h-28 text-blue-500/20 opacity-[0.2]
                       group-hover/card:opacity-10 group-hover/card:scale-110 group-hover/card:-rotate-12 transition-all duration-700" />

          <div class="relative z-10 space-y-4">
            <div class="flex justify-between items-start">
              <div class="p-2.5 bg-white rounded-xl shadow-sm border border-white/50 group-hover/card:bg-blue-600 group-hover/card:text-white transition-all duration-300">
                <Icon :name="project.icon || 'lucide:box'" class="w-5 h-5 text-gray-400 group-hover/card:text-white" />
              </div>
              <time class="text-[10px] font-mono text-black-400 bg-white/50 px-2 py-1 rounded-md border border-white/60">
                {{ project.date }}
              </time>
            </div>

            <div class="space-y-2">
              <h3 class="font-bold text-gray-100 text-base md:text-lg group-hover/card:text-blue-800 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-[11px]  text-gray-200 md:text-lg group-hover/card:text-blue-400 line-clamp-2 leading-relaxed font-light italic opacity-80">
                {{ project.description }}
              </p>
            </div>

            <div class="pt-4 flex items-center justify-between border-t border-gray-200/30">
              <NuxtLink :to="project.path"
                        class="text-[10px] font-black uppercase tracking-widest text-blue-600/70 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                Explore Details <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
              </NuxtLink>

              <a v-if="project.link" :target="_blank" :href="project.link"
                 class="p-2 text-black-400 hover:text-blue-600 hover:bg-white/80 rounded-full transition-all shadow-none hover:shadow-sm">
                <Icon name="lucide:github" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="group.items.length === 0"
           class="py-12 border border-dashed border-gray-200/50 bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center grayscale opacity-60">
        <Icon name="lucide:ghost" class="w-8 h-8 mb-3 text-gray-300" />
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">No Active Records</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: projects, error } = await useAsyncData('projects-list', () => {
  return queryCollection('projects').all()
})

// 调试用：如果页面空白，按 F12 看看控制台输出
if (error.value) {
  console.error('加载项目失败:', error.value)
}

const projectGroups = computed(() => {
  const all = projects.value || []
  return [
    {
      id: 'need help',
      label: 'Need Help / 需要帮助',
      color: 'bg-red-800',
      items: all.filter(p => p.status === 'need_help')
    },
    {
      id: 'ongoing',
      label: 'Executing / 正在进行',
      color: 'bg-orange-500',
      items: all.filter(p => p.status === 'ongoing')
    },
    {
      id: 'todo',
      label: 'Planned / 待开发',
      color: 'bg-blue-500',
      items: all.filter(p => p.status === 'todo')
    },
    {
      id: 'completed',
      label: 'Archived / 已结束',
      color: 'bg-gray-800',
      items: all.filter(p => p.status === 'completed')
    }
  ]
})
</script>