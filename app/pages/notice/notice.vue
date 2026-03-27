<template>
  <div class="space-y-12 pb-24">
    <PageHeader
        title="Notices"
        :count="notices?.length|| 0"
        subTitle="Official synchronization logs & announcements"
        :themeColor="themeConfig.primaryColor"
    />

    <div class="grid gap-8">
      <NuxtLink
          v-for="item in paginatednotices"
          :key="item.path"
          :to="item.path"
          class="group block relative p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-xl"
      >
        <div class="flex flex-wrap items-center gap-4 mb-6">
          <span
              class="px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white rounded-sm"
              :style="{ backgroundColor: themeConfig.primaryColor }"
          >
            {{ item.type }}
          </span>
          <span class="font-mono text-[11px] text-gray-200 tracking-tighter">{{ item.date }}</span>
          <div class="h-px flex-1 bg-gray-100 opacity-50"></div>
          <span class="text-[10px] font-black uppercase text-gray-200 tracking-widest">By {{ item.author }}</span>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-3">
          {{ item.title }}
        </h2>
        <p class="text-sm text-gray-700 line-clamp-2 leading-relaxed italic">
          {{ item.description }}
        </p>

        <div class="mt-6 flex justify-end">
          <Icon name="lucide:arrow-right-circle" class="w-5 h-5 text-gray-200 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
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

// 抓取公告集合
const { data: notices } = await useAsyncData('notices-blogs', () =>
    queryCollection('notice')
        .order('date', 'DESC') // 按时间倒序
        .all()
)

// 计算总页数
const totalPages = computed(() =>
    Math.ceil((notices.value?.length || 0) / pageSize)
)

// **核心：根据当前页码，动态切分要显示的文章**
const paginatednotices = computed(() => {
  if (!notices.value) return []
  const start = (currentPage.value - 1) * pageSize
  return notices.value.slice(start, start + pageSize)
})

useHead({ title: '官方公告' })
</script>

<style scoped>
article {
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.05);
}
</style>