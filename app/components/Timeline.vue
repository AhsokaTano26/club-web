<template>
  <div class="py-8 px-4">
    <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10 flex items-center gap-2">
      <span class="w-8 h-px bg-gray-200"></span> 进度时间轴
    </h3>

    <div class="ml-4 border-l-2 border-orange-100 space-y-12">
      <NuxtLink
          v-for="p in timelineData"
          :key="p.path"
          :to="p.path"
          class="relative pl-8 group block transition-all hover:translate-x-1"
      >
        <div
            :class="[
            'absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white transition-all ring-4',
            p.isToday
              ? 'bg-orange-600 ring-orange-200 animate-pulse scale-110 shadow-[0_0_15px_rgba(234,88,12,0.4)]'
              : 'bg-orange-400 ring-orange-50 group-hover:bg-orange-500 group-hover:ring-orange-200'
          ]"
        ></div>

        <time :class="[
          'text-[10px] font-mono font-bold uppercase tracking-wider',
          p.isToday ? 'text-orange-600' : 'text-orange-400'
        ]">
          {{ p.date }} <span v-if="p.isToday" class="ml-2 italic text-[8px]">TODAY</span>
        </time>

        <h4 :class="[
          'text-base font-black mt-1 transition-colors flex items-center gap-2 group-hover:text-orange-600',
          p.isToday ? 'text-gray-900' : 'text-gray-700'
        ]">
          {{ p.title }}
          <span class="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-orange-300">→</span>
        </h4>

        <p class="text-sm text-gray-500 mt-1 max-w-md leading-relaxed group-hover:text-gray-600">
          {{ p.description }}
        </p>
      </NuxtLink>
    </div>

    <div v-if="!timelineData?.length" class="text-center py-10 text-gray-300 text-xs tracking-widest uppercase">
      暂无进度记录
    </div>
  </div>
</template>

<script setup>
const { data: rawData } = await useAsyncData('timeline-content', () =>
    queryCollection('timeline').all()
)

const timelineData = computed(() => {
  if (!rawData.value) return []

  // 获取今天的标准格式日期：2026-03-24
  const todayStr = new Date().toISOString().split('T')[0]

  return [...rawData.value].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  }).map(item => ({
    ...item,
    isToday: item.date === todayStr // 标记匹配项
  }))
})
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
/* 自定义呼吸灯阴影动画*/
@keyframes pulse-shadow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(234, 88, 12, 0); }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>