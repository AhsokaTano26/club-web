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
              <div v-if="project.statusStyle"
                   :class="['text-[10px] font-mono px-2 py-0.5 rounded-sm border transition-colors', project.statusStyle.class]">
                <Icon :name="project.statusStyle.icon" class="w-3 h-3 inline-block mr-1" />
                {{ project.statusStyle.label }}
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
                   class="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded transition-all">
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
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">No Projects in this category</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';

const themeConfig = useState('themeConfig')
const pageSize = 8

// 获取所有项目数据
const { data: projects } = await useAsyncData('projects-list', () => {
  return queryCollection('projects').all()
})

/**
 * 核心：Status 映射配置（全小写处理）
 */
const getStatusConfig = (status) => {
  const safeStatus = String(status || '').toLowerCase().trim();

  const map = {
    'funding': {
      label: '众筹中',
      icon: 'lucide:coins',
      class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    'need_creator': {
      label: '寻找创作者',
      icon: 'lucide:brush',
      class: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    'finding_resonance': {
      label: '寻求共鸣',
      icon: 'lucide:heart-handshake',
      class: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    'others': {
      label: '公招',
      icon: 'lucide:users',
      class: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  };

  return map[safeStatus] || map['others'];
}

// 分页状态
const groupPages = reactive({
  'funding': 1,
  'need_creator': 1,
  'finding_resonance': 1,
  'others': 1
})

/**
 * 计算分组数据
 * 1. 统一将原始数据中的 status 转为小写
 * 2. 根据归一化后的 status 进行过滤和分组
 */
const projectGroups = computed(() => {
  const all = projects.value || []

  const categories = [
    { id: 'funding', label: 'Funding / 众筹中', color: 'bg-emerald-600' },
    { id: 'need_creator', label: 'Need Creator / 需要创作者', color: 'bg-blue-600' },
    { id: 'finding_resonance', label: 'Finding resonance / 寻求共鸣', color: 'bg-purple-600' },
    { id: 'others', label: 'Others / 其他公招', color: 'bg-zinc-700' }
  ]

  return categories.map(cat => {
    // 过滤：将 p.status 转小写后与 cat.id (也是小写) 对比
    const categoryItems = all.filter(p => {
      const pStatus = String(p.status || 'others').toLowerCase().trim();
      return pStatus === cat.id;
    }).map(p => ({
      ...p,
      // 预先计算好样式对象，供模板使用
      statusStyle: getStatusConfig(p.status)
    }));

    const total = Math.ceil(categoryItems.length / pageSize)
    const currentPage = groupPages[cat.id] || 1
    const start = (currentPage - 1) * pageSize

    return {
      ...cat,
      allCount: categoryItems.length,
      total: total,
      items: categoryItems.slice(start, start + pageSize)
    }
  })
})

useHead({ title: '联协公招' })
</script>