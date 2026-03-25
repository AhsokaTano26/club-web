<template>
  <div class="space-y-12">
    <header class="relative border-l-4 border-blue-500 pl-6 py-2">
      <h1 class="text-3xl font-black uppercase tracking-tighter text-gray-900">
        Organization Directory
      </h1>
      <p class="text-xs font-mono text-gray-400 mt-2 uppercase tracking-widest">
        已连接的组织节点数据库 / Total: {{ orgs?.length || 0 }}
      </p>
    </header>

    <div class="grid grid-cols-1 gap-6">
      <div v-for="org in orgs" :key="org.path"
           class="group relative bg-white border border-gray-100 p-1 flex flex-col md:flex-row gap-6 hover:border-blue-500 transition-all duration-500">

        <div class="w-full md:w-48 h-48 bg-gray-50 flex items-center justify-center overflow-hidden relative">
          <Icon :name="org.meta.theme.logo || 'lucide:users'"
                class="w-16 h-16 text-gray-200 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-700" />
          <span class="absolute top-2 left-2 font-mono text-[10px] text-gray-300">ORG_DATA_0{{ org.index }}</span>
        </div>

        <div class="flex-1 p-4 flex flex-col justify-between">
          <div class="space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-black text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
                  {{ org.title }}
                </h2>
                <div class="flex items-center gap-3 mt-1">
                  <span class="text-[10px] font-mono px-1.5 py-0.5 bg-gray-100 text-gray-500">EST. {{ org.meta.founded }}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 text-blue-600">MEMBERS: {{ org.meta.members_count }}</span>
                </div>
              </div>

              <div class="flex gap-2">
                <a v-if="org.meta.github" :href="org.meta.github" target="_blank" class="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                  <Icon name="lucide:github" class="w-4 h-4" />
                </a>
                <a v-if="org.meta.website" :href="org.meta.website" target="_blank" class="p-2 text-gray-300 hover:text-blue-500 transition-colors">
                  <Icon name="lucide:globe" class="w-4 h-4" />
                </a>
              </div>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed max-w-2xl italic">
              "{{ org.description }}"
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Status: {{ org.meta.status }}</span>
            </div>
            <NuxtLink :to="org.path" class="text-xs font-black text-gray-900 group-hover:text-blue-500 flex items-center gap-1 transition-all">
              ENTRY ARCHIVE <Icon name="lucide:chevron-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 p-8 border-2 border-dashed border-gray-100 rounded-sm text-center">
      <h3 class="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">想要加入组织名录？</h3>
      <p class="text-xs text-gray-300 mb-6">提交你的组织档案至 Github Pull Request 以完成收录。</p>
      <NuxtLink to="/projects" class="px-6 py-2 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
        了解规范
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// 获取组织数据并增加索引编号
const { data: rawOrgs } = await useAsyncData('orgs-list', () => {
  return queryCollection('orgs').all()
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