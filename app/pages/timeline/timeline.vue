<template>
  <div class="max-w-3xl mx-auto py-10">
    <header class="mb-12">
      <h2 class="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-3">
        <span class="w-2 h-8 bg-blue-400 rounded-full"></span>
        项目里程碑 <span class="text-sm font-normal text-gray-400">({{ allTimelines?.length || 0 }})</span>
      </h2>
      <p class="text-gray-400 mt-2">从零到一的完整开发足迹</p>
    </header>

    <div class="relative ml-4 border-l-2 border-gray-100 pl-8 space-y-12">
      <div v-for="item in allTimelines" :key="item.path" class="relative">
        <div class="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-blue-400 shadow-sm"></div>

        <time class="text-xs font-mono text-gray-400">{{ item.date }}</time>
        <NuxtLink :to="item.path" class="group block mt-2">
          <h3 class="text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
            {{ item.title }}
          </h3>
          <p class="text-sm text-gray-500 mt-1 leading-relaxed">
            {{ item.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: allTimelines } = await useAsyncData('all-timelines', () =>
    queryCollection('timeline')
        .order('date', 'DESC')
        .all()
)

useHead({ title: '进度存档' })
</script>