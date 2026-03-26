<template>
  <div class="space-y-8 md:space-y-12 px-4 md:px-0">
    <header class="space-y-3 md:space-y-4">
      <div class="flex items-center gap-2 text-blue-500">
        <Icon name="lucide:folder-kanban" class="w-5 h-5 md:w-6 md:h-6" />
        <h1 class="text-xl md:text-2xl font-black uppercase tracking-tighter">Project Archives</h1>
      </div>
      <p class="text-xs md:text-sm text-gray-400 font-medium max-w-2xl leading-relaxed">
        实时监控组织内部项目的生命周期。从概念孵化（TODO）到最终归档（COMPLETED）。
      </p>
    </header>

    <div v-for="group in projectGroups" :key="group.id" class="space-y-4 md:space-y-6">
      <div class="flex items-center gap-3 md:gap-4">
        <div :class="['px-2.5 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] rounded-sm shadow-sm text-white shrink-0', group.color]">
          {{ group.label }}
        </div>
        <div class="h-px flex-grow bg-gray-100"></div>
        <span class="text-[10px] font-mono text-gray-300 whitespace-nowrap">{{ group.items.length }} UNITS</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div v-for="project in group.items" :key="project.path"
             class="group/card bg-white border border-gray-100 p-4 md:p-5 rounded-sm active:scale-[0.98] md:active:scale-100 hover:border-blue-500/50 hover:shadow-lg transition-all relative overflow-hidden">

          <Icon :name="project.icon || 'lucide:box'"
                class="absolute -right-2 -bottom-2 w-16 h-16 md:w-24 md:h-24 text-gray-50 opacity-10 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity -rotate-12" />

          <div class="relative z-10 space-y-3">
            <div class="flex justify-between items-start">
              <Icon :name="project.icon || 'lucide:box'" class="w-5 h-5 text-gray-300 group-hover/card:text-blue-500 transition-colors" />
              <time class="text-[9px] md:text-[10px] font-mono text-gray-300">{{ project.date }}</time>
            </div>

            <div>
              <h3 class="font-black text-gray-800 text-sm md:text-base group-hover/card:text-blue-600 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-[11px] md:text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed italic">
                {{ project.description }}
              </p>
            </div>

            <div class="pt-2 flex items-center justify-between">
              <NuxtLink :to="project.path" class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-500 flex items-center gap-1 transition-colors py-1">
                View Details <Icon name="lucide:arrow-right" class="w-3 h-3" />
              </NuxtLink>
              <a v-if="project.link" :target="_blank" :href="project.link" class="p-2 -mr-2 text-gray-300 hover:text-gray-900 transition-colors">
                <Icon name="lucide:github" class="w-4.5 h-4.5 md:w-4 md:h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="group.items.length === 0" class="py-6 md:py-8 border border-dashed border-gray-100 rounded-sm flex flex-col items-center justify-center grayscale opacity-40 scale-90 md:scale-100">
        <Icon name="lucide:ghost" class="w-6 h-6 md:w-8 md:h-8 mb-2 text-gray-300" />
        <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">No Active Records</span>
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