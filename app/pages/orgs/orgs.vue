<template>
  <div class="space-y-12 pb-24">
    <PageHeader
        title="Organization Directory"
        :count="orgs?.length || 0"
        subTitle="核心成员与协作协议 · ACTIVE NODES"
        :themeColor="themeConfig.primaryColor"
    />

    <div class="grid grid-cols-1 gap-6 md:gap-8">
      <div v-for="org in paginatedorgs" :key="org.orgs_id"
           class="group relative bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl
           flex flex-col md:flex-row gap-4 md:gap-6 hover:border-blue-500/50 transition-all duration-500 shadow-sm">

        <div class="w-full md:w-56 h-48 md:h-auto shrink-0 border border-white/20 rounded-2xl bg-gray-900/40 overflow-hidden relative border-r border-white/10">
          <template v-if="org.theme?.logo && org.theme.logo.includes('.')">
            <img
                :src="org.theme.logo"
                :alt="org.title"
                class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                @error="(e) => (e.target.src = '/default/aimi.jpg')"
            />
          </template>
          <div v-else class="w-full h-full flex items-center justify-center">
            <Icon
                :name="org.theme?.logo || 'lucide:users'"
                class="w-12 h-12 md:w-16 md:h-16 text-white/20 group-hover:text-blue-500 transition-all duration-700"
            />
          </div>

          <div v-if="org.tag" class="absolute top-3 left-3">
            <span :class="[
              'px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter rounded-sm shadow-lg',
              org.tag === 'Official' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-100 backdrop-blur-md'
            ]">
              {{ org.tag }}
            </span>
          </div>
        </div>

        <div class="flex-1 p-4 md:p-5 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div class="max-w-[85%]">
                <div class="flex items-center gap-2 mb-1">
                  <h2 class="text-lg md:text-2xl font-black text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors truncate">
                    {{ org.title }}
                  </h2>
                  <span v-if="org.type" class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-indigo-600 text-white rounded-sm shadow-sm">
                    <Icon name="lucide:tag" class="w-2.5 h-2.5" />
                    {{ org.type }}
                  </span>
                </div>

                <div class="flex flex-wrap items-center gap-2 mt-3">
                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-sm">
                    <Icon name="f7:number" class="w-2.5 h-2.5" />
                    ID: {{ org.orgs_id }}
                  </span>

                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded-sm">
                    <Icon name="lucide:user-round" class="w-2.5 h-2.5" />
                    {{ org.leader }}
                  </span>

                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded-sm">
                    <Icon name="lucide:map-pin" class="w-2.5 h-2.5" />
                    {{ org.location }}
                  </span>

                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-sm">
                    <Icon name="lucide:calendar-days" class="w-2.5 h-2.5" />
                    {{ org.founded }}
                  </span>

                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-sm">
                    <Icon name="lucide:link" class="w-2.5 h-2.5" />
                    JOIN: {{ org.joined_at || 'N/A' }}
                  </span>

                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-sm">
                    <Icon name="lucide:users" class="w-2.5 h-2.5" />
                    {{ org.members_count }}
                  </span>
                </div>
              </div>

              <div class="flex gap-1">
                <a v-if="org.github" :href="org.github" target="_blank" class="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                  <Icon name="lucide:github" class="w-5 h-5 md:w-5 md:h-5" />
                </a>
                <a v-if="org.website" :href="org.website" target="_blank" class="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <Icon name="lucide:globe" class="w-5 h-5 md:w-5 md:h-5" />
                </a>
              </div>
            </div>

            <p class="text-xs md:text-sm text-gray-200 leading-relaxed italic line-clamp-2">
              "{{ org.description }}"
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div :class="['w-1.5 h-1.5 rounded-full animate-pulse', org.status === 'active' ? 'bg-green-500' : 'bg-gray-400']"></div>
              <span class="text-[9px] font-black text-gray-200 uppercase tracking-widest italic">
                STATUS: {{ org.status }}
              </span>
            </div>
            <NuxtLink :to="org.path" class="text-[10px] md:text-xs font-black text-gray-900 group-hover:text-blue-500 flex items-center gap-1 transition-all">
              ENTRY ARCHIVE <Icon name="lucide:chevron-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <AppPagination v-model="currentPage" :total="totalPages" />

    <div class="mt-12 p-8 border-2 border-dashed border-gray-200 rounded-xl text-center">
      <h3 class="text-sm font-black uppercase tracking-widest text-gray-500 mb-2">想要加入组织名录？</h3>
      <p class="text-xs text-gray-400 mb-6">提交你的组织档案至 Github Pull Request 以完成收录。</p>
      <NuxtLink to="/docs/join" class="inline-block px-8 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all rounded-full shadow-lg">
        了解准入规范
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// 使用 app.vue 中定义的全局主题状态
const themeConfig = useState('themeConfig')
const currentPage = ref(1)
const pageSize = 10


// 获取组织数据并增加索引编号
const { data: rawOrgs, refresh } = await useAsyncData('orgs-list-v1', async () => {
  const docs = await queryCollection('orgs').all()
  const uniqueDocs = Array.from(new Map(docs.map(item => [item.path, item])).values())
  return uniqueDocs.sort((a, b) => {
    const dateA = a.joined_at ? new Date(a.joined_at).getTime() : 0
    const dateB = b.joined_at ? new Date(b.joined_at).getTime() : 0
    return dateB - dateA
  })
})

const orgs = computed(() => {
  return rawOrgs.value?.map((item, index) => ({
    ...item,
    index: index + 1
  }))
})

// 计算总页数
const totalPages = computed(() =>
    Math.ceil((orgs.value?.length || 0) / pageSize)
)

// **核心：根据当前页码，动态切分要显示的文章**
const paginatedorgs = computed(() => {
  if (!orgs.value) return []
  const start = (currentPage.value - 1) * pageSize
  return orgs.value.slice(start, start + pageSize)
})

useHead({
  title: '联协组织'
})
</script>