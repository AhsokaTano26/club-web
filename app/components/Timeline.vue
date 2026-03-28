<template>
  <div class="py-8 px-4">
    <h3 class="text-sm font-bold text-gray-50 uppercase tracking-widest mb-10 flex items-center gap-2">
      <Icon
          :name="'line-md:cog-loop'"
          class="w-4 h-4
                       opacity-100
                       group-hover/item:grayscale-0 group-hover/item:opacity-100
                       transition-all duration-300 ease-in-out text-blue-500"
      />
      <span class="w-8 h-px bg-gray-50 "></span> 进度时间轴
    </h3>

    <div class="ml-4 border-l-2 border-blue-100 space-y-12">
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
              ? 'bg-blue-600 ring-blue-200 animate-pulse scale-110 shadow-[0_0_15px_rgba(234,88,12,0.4)]'
              : 'bg-blue-400 ring-blue-50 group-hover:bg-blue-500 group-hover:ring-blue-200'
          ]"
        ></div>

        <time :class="[
          'text-[10px] font-mono font-bold uppercase tracking-wider',
          p.isToday ? 'text-blue-600' : 'text-blue-400'
        ]">
          {{ p.date }} <span v-if="p.isToday" class="ml-2 italic text-[8px]">TODAY</span>
        </time>

        <h4 :class="[
          'text-base font-black mt-1 transition-colors flex items-center gap-2 group-hover:text-blue-600',
          p.isToday ? 'text-gray-100' : 'text-gray-300'
        ]">
          {{ p.title }}
          <span class="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-blue-300">→</span>
        </h4>

        <p class="text-sm text-gray-100 mt-1 max-w-md leading-relaxed group-hover:text-gray-200">
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
/**
 * @component ProjectTimeline
 * @description 项目进度时间轴组件。通过 Nuxt Content 自动抓取并按时间倒序排列项目里程碑，支持自动识别并高亮“今日”状态。
 * * @features
 * 1. **动态数据驱动**：自动检索 `timeline` 集合，无需手动维护列表。
 * 2. **智能状态识别**：逻辑层自动对比 `item.date` 与系统当前日期，匹配项将获得 `isToday` 标记。
 * 3. **视觉焦点系统**：针对“今日”节点，应用 `animate-pulse` 缩放动画与自定义投影，增强仪式感。
 * 4. **排版设计**：采用左侧 `border-l-2` 贯穿线，节点使用绝对定位对齐，悬停时触发 `translate-x-1` 的平滑位移。
 * 5. **健壮性**：内置空状态（Empty State）处理，确保无记录时界面不突兀。
 * * @requires @nuxt/content - 用于 queryCollection 数据检索。
 * @requires Icon - 用于渲染进度图标。
 */

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