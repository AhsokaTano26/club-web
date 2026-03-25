<template>
  <div class="max-w-3xl mx-auto py-10">
    <header class="mb-12">
      <h2 class="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-3">
        <span class="w-2 h-8 bg-blue-400 rounded-full"></span>
        所有博文 <span class="text-sm font-normal text-gray-400">({{ allBlogs?.length || 0 }})</span>
      </h2>
      <p class="text-gray-400 mt-2">记录同好会的点滴与未来计划</p>
    </header>

    <div class="space-y-8">
      <NuxtLink
          v-for="post in allBlogs"
          :key="post.path"
          :to="post.path"
          class="group block p-6 rounded-2xl border border-gray-50 bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
      >
        <div class="flex justify-between items-start mb-2">
          <time class="text-xs font-mono text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">
            {{ post.date }}
          </time>
          <span v-if="new Date(post.date) > new Date()" class="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-bold uppercase">Upcoming</span>
        </div>

        <h3 class="text-xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
          {{ post.title }}
        </h3>
        <p class="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-2">
          {{ post.description }}
        </p>

        <div class="mt-4 flex items-center text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          阅读全文 <span class="ml-1">→</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { data: allBlogs } = await useAsyncData('all-blogs', () =>
    queryCollection('blog')
        .order('date', 'DESC') // 按时间倒序
        .all()
)

useHead({ title: '博客存档' })
</script>