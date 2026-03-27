<template>
  <div class="space-y-12 pb-24">
    <PageHeader
        title="Archive"
        :count="allBlogs?.length|| 0"
        subTitle="记录同好会的点滴与未来计划 · SYNC LOGS"
        :themeColor="themeConfig.primaryColor"
    />

    <div class="space-y-8">
      <NuxtLink
          v-for="post in paginatedBlogs"
          :key="post.path"
          :to="post.path"
          class="group block p-6
          /* 毛玻璃核心配置 */
         bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl
           bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
      >
        <div class="flex justify-between items-start mb-2">
          <time class="text-xs font-mono text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded">
            {{ post.date }}
          </time>
          <span v-if="new Date(post.date) > new Date()" class="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-bold uppercase">Upcoming</span>
        </div>

        <h3 class="text-xl font-bold text-gray-100 group-hover:text-blue-600 transition-colors">
          {{ post.title }}
        </h3>
        <p class="text-gray-200 mt-2 text-sm leading-relaxed line-clamp-2">
          {{ post.description }}
        </p>

        <div class="mt-4 flex items-center text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          阅读全文 <span class="ml-1">→</span>
        </div>
      </NuxtLink>
      <AppPagination
          v-model="currentPage"
          :total="totalPages"
      />
    </div>
  </div>
</template>

<script setup>
// 使用 app.vue 中定义的全局主题状态
const themeConfig = useState('themeConfig')

const currentPage = ref(1)
const pageSize = 10

// 获取所有数据
const { data: allBlogs } = await useAsyncData('all-activities', () =>
    queryCollection('activities').order('date', 'DESC').all()
)

// 计算总页数
const totalPages = computed(() =>
    Math.ceil((allBlogs.value?.length || 0) / pageSize)
)

// **核心：根据当前页码，动态切分要显示的文章**
const paginatedBlogs = computed(() => {
  if (!allBlogs.value) return []
  const start = (currentPage.value - 1) * pageSize
  return allBlogs.value.slice(start, start + pageSize)
})

useHead({ title: '联协映像' })
</script>