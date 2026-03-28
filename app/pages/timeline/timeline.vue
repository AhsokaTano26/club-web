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
        <NuxtLink :to="item.path" class="group block mt-2 p-3 rounded-lg hover:bg-white/5 transition-all">
          <div class="flex items-center gap-2 mb-1.5">
            <span
                v-if="item.status"
                :class="[
                'text-[10px] font-mono px-1.5 py-0.5 rounded-sm border transition-colors',
                item.status === 'Prog' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' :
                item.status === 'Changes' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
                'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
              ]"
            >
              {{ item.status.toUpperCase() }}
            </span>
            <h3 class="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-1">
              {{ item.title }}
            </h3>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-2">
            {{ item.description }}
          </p>
          <div class="flex items-center gap-3">
            <span v-if="item.author" class="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 bg-white/5 text-gray-300 rounded-sm border border-white/10">
              <Icon name="lucide:user-pen" class="w-2.5 h-2.5 text-blue-400" />
              {{ item.author }}
            </span>
            <time class="text-[10px] font-mono text-blue-400 font-bold bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
              {{ item.date }}
            </time>
          </div>
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