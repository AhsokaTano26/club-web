<template>
  <div class="space-y-12 pb-24">
    <PageHeader
        title="Project Recruitment"
        :count="projects?.length || 0"
        subTitle="联协公招：连接创作者与组织，共同孵化卓越项目。"
        :themeColor="themeConfig.primaryColor"
    />

    <div v-for="group in projectGroups" :key="group.id" class="space-y-4 md:space-y-6">
      <div class="flex items-center gap-3 md:gap-4">
        <div :class="['px-3 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm text-white shrink-0', group.color]">
          {{ group.label }}
        </div>
        <div class="h-px flex-grow bg-gray-200/50"></div>
        <span class="text-[10px] font-mono text-gray-400 whitespace-nowrap">
          {{ group.allCount }} PROJECTS
        </span>
      </div>

      <div v-if="group.items.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div v-for="project in group.items" :key="project.path"
             class="group/card relative overflow-hidden transition-all duration-500
                    bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl
                    hover:bg-white/20 hover:border-blue-500/30 hover:-translate-y-1 p-5 md:p-6 shadow-sm">

          <Icon :name="project.icon || 'lucide:component'"
                class="absolute -right-6 -bottom-6 w-28 h-28 text-blue-500/10 opacity-[0.15]
                       group-hover/card:scale-110 group-hover/card:-rotate-12 transition-all duration-700" />

          <div class="relative z-10 space-y-4">
            <div class="flex justify-between items-center">
              <div v-if="project.status"
                   :class="[
                     'text-[10px] font-mono px-2 py-0.5 rounded-sm border transition-colors',
                     project.status === 'funding' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                     project.status === 'need_creator' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                     project.status === 'finding_resonance' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                     'bg-gray-500/10 text-gray-400 border-gray-500/20'
                   ]">
                {{
                  project.status === 'funding' ? '众筹中' :
                      project.status === 'need_creator' ? '寻找创作者' :
                          project.status === 'finding_resonance' ? '寻求共鸣' : '其他公招'
                }}
              </div>
              <time class="text-[10px] font-mono text-blue-400 font-bold bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
                {{ project.date }}
              </time>
            </div>

            <div class="space-y-2">
              <h3 class="font-bold text-gray-100 text-lg group-hover/card:text-blue-400 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-[13px] text-gray-400 line-clamp-2 leading-relaxed font-light">
                {{ project.description }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-if="project.orgs" class="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 bg-white/5 text-blue-300 rounded-sm border border-white/10">
                <Icon name="lucide:building-2" class="w-2.5 h-2.5 text-blue-400" />
                {{ project.orgs }}
              </span>
              <span v-if="project.author" class="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 bg-white/5 text-gray-300 rounded-sm border border-white/10">
                <Icon name="lucide:user-pen" class="w-2.5 h-2.5 text-blue-400" />
                {{ project.author }}
              </span>
            </div>

            <div class="pt-4 flex items-center justify-between border-t border-white/5">
              <NuxtLink :to="project.path"
                        class="text-[10px] font-black uppercase tracking-widest text-blue-400/80 hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                VIEW DETAILS <Icon name="lucide:chevron-right" class="w-3.5 h-3.5" />
              </NuxtLink>

              <div class="flex gap-2">
                <a v-if="project.link" :target="'_blank'" :href="project.link"
                   class="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded transition-all"
                   title="组织链接">
                  <Icon name="lucide:external-link" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="group.allCount === 0"
           class="py-12 border border-dashed border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center opacity-60">
        <Icon name="lucide:box-select" class="w-8 h-8 mb-3 text-gray-500" />
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">No Projects Found</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const themeConfig = useState('themeConfig')
const pageSize = 8

// 获取所有项目数据
const { data: projects, error } = await useAsyncData('projects-list', () => {
  return queryCollection('projects').all()
})

// 响应式对象：存储每个分组对应的当前页码
const groupPages = reactive({
  'need help': 1,
  'ongoing': 1,
  'todo': 1,
  'completed': 1
})

// 计算分组数据（包含分页逻辑）
const projectGroups = computed(() => {
  const all = projects.value || []

  // 统一定义分组元数据
  const categories = [
    {
      id: 'Funding',
      label: 'Funding / 众筹中',
      color: 'bg-red-800',
      status:'funding'
    },
    {
      id: 'Need Creator',
      label: 'Need Creator / 需要创作者',
      color: 'bg-orange-500',
      status: 'need_creator'
    },
    {
      id: 'Finding Resonance',
      label: 'Finding resonance / 寻求共鸣',
      color: 'bg-blue-500',
      status: 'finding_resonance' },
    {
      id: 'others',
      label: 'others / 其他',
      color: 'bg-gray-800',
      status: 'others'
    }
  ]

  return categories.map(cat => {
    // 1. 过滤出属于该分类的所有项目
    const categoryItems = all.filter(p => p.status === cat.status)

    // 2. 计算该分类的总页数
    const total = Math.ceil(categoryItems.length / pageSize)

    // 3. 对该分类的数据进行切片
    const currentPage = groupPages[cat.id] || 1
    const start = (currentPage - 1) * pageSize
    const paginatedItems = categoryItems.slice(start, start + pageSize)

    return {
      ...cat,
      allCount: categoryItems.length,
      total: total,
      items: paginatedItems
    }
  })
})

useHead({ title: '联协公招' })
</script>