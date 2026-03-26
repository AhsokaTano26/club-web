<template>
  <div class="space-y-12 pb-24">
    <PageHeader
        title="Organization Directory"
        :count="orgs?.length|| 0"
        subTitle="核心成员与协作协议 · ACTIVE NODES"
        :themeColor="themeConfig.primaryColor"
    />

    <div class="grid grid-cols-1 gap-4 md:gap-6">
      <div v-for="org in orgs" :key="org.path"
           class="group relative bg-white
           /* 毛玻璃核心配置 */
           bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl
           flex flex-col md:flex-row gap-4 md:gap-6 hover:border-blue-500 transition-all duration-500 shadow-sm md:shadow-none">

        <div class="w-full md:w-48 h-40 md:h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative rounded-xl border border-gray-100/50 shadow-sm">
          <template v-if="org.theme?.logo && org.theme.logo.includes('.')">
            <img
                :src="org.theme.logo"
                :alt="org.title"
                class="w-full h-full object-cover transition-all duration-700 md:group-hover:scale-110"
                @error="(e) => (e.target.src = '/default/aimi.jpg')"
            />
          </template>

          <Icon
              v-else
              :name="org.theme?.logo || 'lucide:users'"
              class="w-12 h-12 md:w-16 md:h-16 text-gray-200 group-hover:text-blue-500 transition-all duration-700"
          />
        </div>

        <div class="flex-1 p-3 md:p-4 flex flex-col justify-between">
          <div class="space-y-3 md:space-y-4">
            <div class="flex justify-between items-start">
              <div class="max-w-[80%]">
                <h2 class="text-lg md:text-xl font-black text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors truncate">
                  {{ org.title }}
                </h2>
                <div class="flex flex-wrap items-center gap-2 mt-2">
                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-sm">
                    <Icon name="lucide:calendar-days" class="w-2.5 h-2.5" />
                    {{ org.founded }}
                  </span>

                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-sm">
                    <Icon name="lucide:user-plus" class="w-2.5 h-2.5" />
                    {{ org.joined_at || 'N/A' }}
                  </span>

                  <span class="flex items-center gap-1 text-[9px] md:text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-sm">
                    <Icon name="lucide:users" class="w-2.5 h-2.5" />
                    {{ org.members_count }}
                  </span>

                  <span class="hidden md:flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-sm">
                    <Icon name="f7:number" class="w-2.5 h-2.5" />
                    ID: {{ org.orgs_id }}
                  </span>
                </div>
              </div>

              <div class="flex gap-1 md:gap-2">
                <a v-if="org.github" :href="org.github" target="_blank" class="p-2 text-gray-200 hover:text-gray-900 transition-colors">
                  <Icon name="lucide:github" class="w-5 h-5 md:w-4 md:h-4" />
                </a>
                <a v-if="org.website" :href="org.website" target="_blank" class="p-2 text-gray-200 hover:text-blue-500 transition-colors">
                  <Icon name="lucide:globe" class="w-5 h-5 md:w-4 md:h-4" />
                </a>
              </div>
            </div>

            <p class="text-xs md:text-sm text-gray-200 leading-relaxed italic line-clamp-2 md:line-clamp-none">
              "{{ org.description }}"
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-[8px] md:text-[9px] font-black text-gray-200 uppercase tracking-widest italic truncate max-w-[80px] md:max-w-none">
                {{ org.status }}
              </span>
            </div>
            <NuxtLink :to="org.path" class="text-[10px] md:text-xs font-black text-gray-900 group-hover:text-blue-500 flex items-center gap-1 transition-all">
              ENTRY ARCHIVE <Icon name="lucide:chevron-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 md:mt-12 p-6 md:p-8 border-2 border-dashed border-gray-100 rounded-sm text-center">
      <h3 class="text-xs md:text-sm font-black uppercase tracking-widest text-gray-400 mb-2">想要加入组织名录？</h3>
      <p class="text-[10px] md:text-xs text-gray-300 mb-6">提交你的组织档案至 Github Pull Request 以完成收录。</p>
      <NuxtLink to="/projects" class="inline-block px-6 py-2.5 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
        了解规范
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// 使用 app.vue 中定义的全局主题状态
const themeConfig = useState('themeConfig')


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

useHead({
  title: '组织名录'
})
</script>