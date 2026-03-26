<template>
  <div class="space-y-12">
    <header class="space-y-4">
      <div class="flex items-center gap-2 text-blue-500">
        <Icon name="lucide:folder-kanban" class="w-6 h-6" />
        <h1 class="text-2xl font-black uppercase tracking-tighter">Project Archives</h1>
      </div>
      <p class="text-sm text-gray-400 font-medium max-w-2xl">
        实时监控组织内部项目的生命周期。从概念孵化（TODO）到最终归档（COMPLETED）。
      </p>
    </header>

    <div v-for="group in projectGroups" :key="group.id" class="space-y-6">
      <div class="flex items-center gap-4">
        <div :class="['px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm text-white', group.color]">
          {{ group.label }}
        </div>
        <div class="h-px flex-grow bg-gray-100"></div>
        <span class="text-xs font-mono text-gray-300">{{ group.items.length }} UNITS</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="project in group.items" :key="project.path"
             class="group/card bg-white border border-gray-100 p-5 rounded-sm hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all relative overflow-hidden">

          <Icon :name="project.icon || 'lucide:box'" class="absolute -right-4 -bottom-4 w-24 h-24 text-gray-50 opacity-0 group-hover/card:opacity-100 transition-opacity -rotate-12" />

          <div class="relative z-10 space-y-3">
            <div class="flex justify-between items-start">
              <Icon :name="project.icon || 'lucide:box'" class="w-5 h-5 text-gray-400 group-hover/card:text-blue-500 transition-colors" />
              <time class="text-[10px] font-mono text-gray-300">{{ project.date }}</time>
            </div>

            <div>
              <h3 class="font-black text-gray-800 group-hover/card:text-blue-600 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <div class="pt-2 flex items-center justify-between">
              <NuxtLink :to="project.path" class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-500 flex items-center gap-1 transition-colors">
                View Details <Icon name="lucide:arrow-right" class="w-3 h-3" />
              </NuxtLink>
              <a v-if="project.link" :target="_blank" :href="project.link" class="text-gray-300 hover:text-gray-900 transition-colors">
                <Icon name="lucide:github" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="group.items.length === 0" class="py-8 border border-dashed border-gray-100 rounded-sm flex flex-col items-center justify-center grayscale opacity-30">
        <Icon name="lucide:ghost" class="w-8 h-8 mb-2" />
        <span class="text-[10px] font-black uppercase tracking-widest">No Active Records</span>
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