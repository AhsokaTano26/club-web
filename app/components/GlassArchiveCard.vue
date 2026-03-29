<template>
  <NuxtLink
      :to="props.post.path"
      class="group block p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/20 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
  >
    <div class="flex flex-wrap justify-between items-start gap-2 mb-4">
      <div class="flex flex-wrap gap-2">
        <span v-if="props.post.type" :class="['flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider transition-colors', getTypeStyle(props.post.type).class]">
          <Icon :name="getTypeStyle(props.post.type).icon" class="w-3 h-3" />
          {{ getTypeStyle(props.post.type).label }}
        </span>

        <span v-if="props.post.status" :class="['flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border transition-colors', getStatusStyle(props.post.status).class]">
          <Icon :name="getStatusStyle(props.post.status).icon" class="w-3 h-3" />
          {{ getStatusStyle(props.post.status).label }}
        </span>
      </div>

      <time class="text-[10px] font-mono text-blue-400 font-bold bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
        {{ props.post.date }}
      </time>
    </div>

    <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
      {{ props.post.title }}
    </h3>
    <p class="text-gray-300 mt-2 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
      {{ props.post.description }}
    </p>

    <div class="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
      <div class="flex gap-3 flex-wrap">
        <div v-if="props.post.org || props.post.orgs" class="flex flex-wrap gap-2">
          <span v-for="o in formatOrgs(props.post)" :key="o" class="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 bg-white/5 text-gray-300 rounded-sm border border-white/10">
            <Icon name="lucide:building-2" class="w-2.5 h-2.5 text-blue-400" />
            {{ o }}
          </span>
        </div>
        <span v-if="props.post.author" class="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 bg-white/5 text-gray-300 rounded-sm border border-white/10">
          <Icon name="lucide:user-pen" class="w-2.5 h-2.5 text-blue-400" />
          {{ props.post.author }}
        </span>
      </div>

      <div class="flex items-center text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
        {{ props.post.link ? 'Visit Link' : 'Details' }} <Icon name="lucide:arrow-right" class="ml-1 w-3 h-3" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
/**
 * @component PostCard
 * @description 文章/动态卡片组件。采用玻璃拟态设计，支持多种业务状态（Type/Status）的标签化展示。
 * @property {Object} props.post - 内容数据对象，包含 path, title, description, date, type, status, org/orgs, author 等。
 * @features
 * 1. 样式交互：基于 Tailwind CSS 的 Hover 悬浮提亮与阴影特效。
 * 2. 动态映射：通过 getTypeStyle 和 getStatusStyle 自动匹配对应的图标、颜色与标签文案。
 * 3. 数据归一：自动处理单组织(org)或多组织(orgs)的显示逻辑。
 * 4. 文本截断：标题与描述支持响应式行数限制（Line-clamp）。
 * 适用于activities、archive、blog、notice
 */

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// 组织信息归一化处理
const formatOrgs = (post) => {
  const raw = post.orgs || post.org || []
  const arr = Array.isArray(raw) ? raw : [raw]
  return arr.map(id => String(id).toLowerCase()).filter(Boolean)
}

// 类型(Type) 映射配置
const getTypeStyle = (type) => {
  const safeType = String(type || '').toLowerCase()
  const map = {
    'official': { label: '官方', icon: 'lucide:award', class: 'bg-blue-500/20 text-blue-200 border-blue-400/30' },
    'anniversary': { label: '纪念日', icon: 'lucide:cake', class: 'bg-rose-500/20 text-rose-200 border-rose-400/30' },
    'nexus': { label: '联协', icon: 'lucide:network', class: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30' },
    'docu': { label: '文件', icon: 'lucide:file-text', class: 'bg-slate-500/20 text-slate-200 border-slate-400/30' },
    'artic': { label: '推文', icon: 'lucide:hash', class: 'bg-sky-500/20 text-sky-200 border-sky-400/30' },
    'rese': { label: '研究成果', icon: 'lucide:microscope', class: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' },
    'regula': { label: '条例', icon: 'lucide:gavel', class: 'bg-amber-500/20 text-amber-200 border-amber-400/30' },
    'event': { label: '官方活动', icon: 'lucide:calendar', class: 'bg-blue-500/20 text-blue-200 border-blue-400/30' },
    'notice': { label: '公告', icon: 'lucide:megaphone', class: 'bg-orange-500/20 text-orange-200 border-orange-400/30' },
    'gallery': { label: '图册', icon: 'lucide:images', class: 'bg-purple-500/20 text-purple-200 border-purple-400/30' },
    'tweet': { label: '推文', icon: 'lucide:twitter', class: 'bg-sky-400/20 text-sky-200 border-sky-300/30' }
  }
  return map[safeType] || { label: type, icon: 'lucide:tag', class: 'bg-gray-500/20 text-gray-200 border-gray-400/30' }
}

// 状态(Status) 映射配置
const getStatusStyle = (status) => {
  const safeStatus = String(status || '').toLowerCase()

  const map = {
    'online': { label: 'Online', icon: 'lucide:globe', class: 'bg-green-500/20 text-green-200 border-green-400/30' },
    'in_person': { label: 'In Person', icon: 'lucide:map-pin', class: 'bg-orange-500/20 text-orange-200 border-orange-400/30' },
    'regional': { label: 'Regional', icon: 'lucide:map', class: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30' },
    'prog': { label: '进行中', icon: 'lucide:loader', class: 'bg-blue-500/20 text-blue-200 border-blue-400/30' },
    'funding': { label: '众筹中', icon: 'lucide:coins', class: 'bg-pink-500/20 text-pink-200 border-pink-400/30' },
    'need_creator': { label: '招募中', icon: 'lucide:brush', class: 'bg-purple-500/20 text-purple-200 border-purple-400/30' },
    'finding_resonance': { label: '寻求共鸣', icon: 'lucide:heart-handshake', class: 'bg-lime-500/20 text-lime-200 border-lime-400/30' },
    'others': { label: '公招', icon: 'lucide:users', class: 'bg-gray-500/20 text-gray-200 border-gray-400/30' }
  }
  return map[safeStatus] || { label: status, icon: 'lucide:info', class: 'bg-gray-500/20 text-gray-200 border-gray-400/30' }
}
</script>