<template>
  <div class="space-y-12 pb-24">
    <PageHeader
        title="Milestones"
        :count="allTimelines?.length|| 0"
        subTitle="从零到一的完整开发足迹 · FOOTPRINTS"
        :themeColor="themeConfig.primaryColor"
    />

    <div class="relative ml-4 border-l-2 border-gray-100 pl-8 space-y-12">
      <div v-for="item in paginatedallTimelines" :key="item.path" class="relative">
        <div class="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-blue-400 shadow-sm"></div>

        <time class="text-xs font-mono text-gray-100">{{ item.date }}</time>
        <NuxtLink :to="item.path" class="group block mt-2">
          <h3 class="text-lg font-bold text-gray-100 group-hover:text-blue-600 transition-colors">
            {{ item.title }}
          </h3>
          <p class="text-sm text-gray-200 mt-1 leading-relaxed">
            {{ item.description }}
          </p>
        </NuxtLink>
        <AppPagination
            v-model="currentPage"
            :total="totalPages"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// 使用 app.vue 中定义的全局主题状态
const themeConfig = useState('themeConfig')
const currentPage = ref(1)
const pageSize = 10

const { data: allTimelines } = await useAsyncData('all-timelines', () =>
    queryCollection('timeline')
        .order('date', 'DESC')
        .all()
)

// 计算总页数
const totalPages = computed(() =>
    Math.ceil((allTimelines.value?.length || 0) / pageSize)
)

// **核心：根据当前页码，动态切分要显示的文章**
const paginatedallTimelines = computed(() => {
  if (!allTimelines.value) return []
  const start = (currentPage.value - 1) * pageSize
  return allTimelines.value.slice(start, start + pageSize)
})

useHead({ title: '官方进度' })
</script>