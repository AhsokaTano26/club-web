<template>
  <div class="min-h-screen bg-gray-50/30 py-12 px-4">
    <div class="max-w-4xl mx-auto space-y-8 pb-20">

      <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <div class="bg-gray-50 border-b border-gray-200 p-8 flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5 bg-blue-500 text-white px-2 py-0.5 rounded-sm">
              <Icon name="lucide:award" class="w-3 h-3" />
              <span class="text-[10px] font-black tracking-[0.2em] uppercase">Credits</span>
            </div>
            <div class="flex items-center gap-1 text-gray-400">
              <Icon name="lucide:git-branch" class="w-3 h-3" />
              <span class="text-xs font-mono">V1.0.4-STABLE</span>
            </div>
          </div>
          <h1 class="text-4xl font-bold text-gray-800 tracking-tighter flex items-center gap-3">
            致谢与鸣谢
          </h1>
          <p class="text-sm text-gray-400 font-medium leading-relaxed max-w-2xl">
            本站 <span class="text-gray-700 font-bold underline decoration-gray-200">club-web</span>
            采用 Nuxt 4 架构开发。感激每一位在代码、内容与基础设施上提供支持的伙伴。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 border-l border-t border-gray-50">
          <div v-for="(blue, index) in contributors" :key="index"
               class="border-r border-b border-gray-100 p-6 hover:bg-gray-50/20 transition-colors group">

            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <Icon :name="blue.icon || 'lucide:component'"
                      class="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-300 group-hover:text-blue-400 transition-colors">
                  {{ blue.type }}
                </span>
              </div>
              <span class="font-mono text-[10px] text-gray-200">REF_{{ index + 1 }}</span>
            </div>

            <h3 class="text-lg font-bold text-gray-700 mb-4">{{ blue.title }}</h3>

            <ul class="space-y-4">
              <li v-for="item in blue.items" :key="item.name" class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <Icon
                      :name="item.icon || 'lucide:box'"
                      class="w-4 h-4
                       opacity-100
                       group-hover/item:grayscale-0 group-hover/item:opacity-100
                       transition-all duration-300 ease-in-out text-blue-500"
                  />

                  <span class="font-bold text-gray-800 text-sm">{{ item.name }}</span>

                  <a v-if="item.link" :href="item.link" target="_blank"
                     class="flex items-center gap-0.5 text-[9px] text-blue-400 hover:text-blue-600 font-mono">
                    LINK <Icon name="lucide:external-link" class="w-2.5 h-2.5" />
                  </a>
                </div>
                <p class="text-[11px] text-gray-400 pl-5 leading-snug">{{ item.desc }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CreditGroup
            title="Organizer"
            label="EST"
            icon="lucide:building-2"
            :items="organizers"
            header-bg="bg-blue-50/50"
            title-color="text-blue-600"
            icon-color="text-blue-500"
            dot-color="bg-blue-400"
            hover-color="group-hover/item:text-blue-500"
        />

        <CreditGroup
            title="Sponsors"
            label="FUND"
            icon="line-md:person"
            :items="sponsors"
            header-bg="bg-purple-50/50"
            title-color="text-purple-600"
            icon-color="text-purple-500"
            dot-color="bg-purple-400"
            hover-color="group-hover/item:text-purple-500"
        />

        <CreditGroup
            title="Special Thanks"
            label="CREDIT"
            icon="line-md:star"
            :items="specialThanks"
            header-bg="bg-orange-50/50"
            title-color="text-orange-600"
            icon-color="text-orange-500"
            dot-color="bg-orange-400"
            hover-color="group-hover/item:text-orange-500"
        />
      </div>
        <div class="mt-8 bg-gray-900 rounded-sm p-6 text-white group overflow-hidden relative">
          <Icon name="lucide:scale" class="absolute -right-0 -bottom-5 w-24 h-24 opacity-5 -rotate-12 text-white" />

          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <Icon name="line-md:hazard-lights-loop" class="w-4 h-4 text-orange-400" />
                <span class="text-xs font-black uppercase tracking-[0.2em]">Open Source Notice</span>
              </div>
              <h4 class="text-lg font-bold tracking-tight">基于 MIT 协议开放</h4>
              <p class="text-[11px] text-gray-400 leading-relaxed max-w-xl">
                本站源代码采用 MIT 许可证授权。这意味着你可以自由地使用、复制、修改和分发本站的代码，
                唯请保留原作者版权声明及许可声明。
              </p>
            </div>

            <a href="https://github.com/AhsokaTano26/club-web/blob/main/LICENSE" target="_blank"
               class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95">
              View Source
              <Icon name="line-md:github" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
    </div>
</template>

<script setup>
/*
* 底层架构致谢
*/
const contributors = [
  {
    type: 'Core Frameworks',
    title: '底层驱动',
    icon: 'lucide:cpu',
    items: [
      {
        name: 'Nuxt 4',
        desc: '极其优雅的 Vue 框架，支撑了本站的同构渲染与路由体系。',
        icon: 'lineicons:nuxt',
        link: 'https://nuxt.com'
      },
      {
        name: 'Cloudflare Pages',
        desc: '全线托管与 D1 数据库绑定，提供了极其稳定的边缘计算能力。',
        icon: 'devicon-plain:cloudflare',
        link: 'https://pages.cloudflare.com'
      }
    ]
  },
  {
    type: 'Data & Content',
    title: '数据源支持',
    icon: 'lucide:database',
    items: [
      {
        name: 'Nuxt Content v3',
        desc: '基于 Git 的远程内容驱动，实现了代码与内容的完美分离。',
        icon: 'line-md:folder',
        link: 'https://content.nuxt.com'
      },
      {
        name: 'GitHub Action',
        desc: '驱动了自动化的构建流水线与内容同步逻辑。',
        icon: 'line-md:github',
        link: 'https://docs.github.com/en/actions'
      },
    ]
  },
  {
    type: 'Analysis & Quality',
    title: '质量守卫',
    icon: 'lucide:shield-check',
    items: [
      {
        name: 'SonarCloud',
        desc: '深度的代码质量分析与逻辑审计助手。',
        icon: 'simple-icons:sonarcloud',
        link: 'https://sonarcloud.io'
      },
      {
        name: 'Super-Linter',
        desc: '严苛的代码格式规范检查工具。',
        icon: 'game-icons:striking-splinter',
        link: 'https://github.com/super-linter/super-linter'
      }
    ]
  },
  {
    type: 'Design Resources',
    title: '设计资产',
    icon: 'lucide:palette',
    items: [
      {
        name: 'Tailwind CSS',
        desc: '实用主义优先的 CSS 框架，构建了本站的视觉系统。',
        icon: 'mdi:tailwind',
        link: 'https://tailwindcss.com'
      },
      {
        name: 'Lunar JavaScript',
        desc: '提供了精准的农历与节气数据支持。',
        icon: 'arcticons:lunarsettings',
        link: 'https://www.npmjs.com/package/lunar-javascript'
      }
    ]
  }
];

/*
* 组织致谢
* */
const organizers = [
  {
    name: "Tano",
    link: "https://www.tano.asia/"
  },
  {
    name: "跨世界同好会网站管理委员会",
    link: "https://example.com"
  }
];

const sponsors = [
  {
    name: "Cloudflare",
    link: "https://pages.cloudflare.com",
    icon: "logos:cloudflare-icon"
  }
];

const specialThanks = [
  {
    name: "Tano",
    link: "https://gravatar.com/alpacagrand629cf54028"
  }
];


useHead({
  title: '致谢 - Club Web',
  meta: [
    { name: 'description', content: '感谢所有为本站做出贡献的项目与个人。' }
  ]
})
</script>

<style scoped>
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.max-w-4xl {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>