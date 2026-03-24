<template>
  <aside class="w-full lg:w-72 p-4 md:p-8 border-l border-gray-100 bg-white/50 backdrop-blur-sm">
    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
      <span class="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
      未来预告
    </h3>

    <div class="space-y-8">
      <div v-for="post in upcomingPosts" :key="post.path" class="relative group">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="text-[10px] font-mono font-black text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
            {{ post.date.replace(/-/g, '.') }}
          </span>
          <span v-if="getDaysReady(post.date) <= 7" class="text-[9px] text-red-400 font-bold uppercase animate-bounce">
            Soon
          </span>
        </div>

        <NuxtLink :to="post.path" class="block group-hover:translate-x-1 transition-transform">
          <h4 class="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition-colors line-clamp-1">
            {{ post.title }}
          </h4>
          <p class="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
            {{ post.description }}
          </p>
        </NuxtLink>

        <div class="mt-6 h-px bg-gradient-to-r from-gray-100 to-transparent"></div>
      </div>

      <div v-if="!upcomingPosts?.length" class="py-12 text-center">
        <div class="text-2xl mb-2">📅</div>
        <p class="text-[10px] text-gray-300 uppercase tracking-widest">暂无计划行程</p>
      </div>
    </div>

    <div class="mt-12 p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200">
      <p class="text-[10px] text-gray-400 leading-relaxed text-center">
        计划内容仅供参考<br>具体以官方发布为准
      </p>
    </div>
  </aside>
</template>

<script setup>
// 获取今天日期 (2026-03-24)
const today = new Date().toISOString().split('T')[0]

// 查询 blog 集合中日期 > 今天的文章
const { data: upcomingPosts } = await useAsyncData('upcoming-blog', () =>
    queryCollection('blog')
        .where('date', '>', today)
        .order('date', 'ASC') // 升序，最近的未来排第一
        .limit(5)
        .all()
)

// 计算距离天数 (用于显示 "Soon" 标签)
const getDaysReady = (targetDate) => {
  const diffTime = new Date(targetDate) - new Date(today)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
</script>