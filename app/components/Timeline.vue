<template>
  <div class="py-8">
    <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
      <span class="w-8 h-px bg-gray-200"></span> 进度时间轴
    </h3>
    <div class="ml-4 border-l-2 border-orange-100 space-y-10">
      <div v-for="p in progress" :key="p.title" class="relative pl-8 group">
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white bg-orange-400 ring-4 ring-orange-50 transition-transform group-hover:scale-125"></div>
        <span class="text-[10px] font-mono text-orange-400 font-bold uppercase">{{ p.date }}</span>
        <h4 class="text-base font-bold text-gray-700 mt-1">{{ p.title }}</h4>
        <p class="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">{{ p.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const progress = [
  { date: '2026-03-24', title: '网站架构初始化', desc: '基于 Nuxt 3 完成了日历、侧边栏和时间轴组件的搭建。' },
  { date: '2026-04-15', title: '图库系统上线', desc: '计划引入瀑布流图片展示，优化高清同人图浏览体验。' }
];
</script>