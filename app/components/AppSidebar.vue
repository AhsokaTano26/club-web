<template>
  <div class="relative">
    <aside
        :class="[
        /* 基础样式与移动端：保持一定的背景和阴影以便遮盖内容 */
        'fixed inset-y-0 left-0 w-72 bg-gray-900/90 backdrop-blur-lg transform transition-transform duration-300 ease-in-out p-6 z-[100]',

        /* 桌面端 (md): 背景完全透明，移除模糊，移除阴影 */
        'md:relative md:translate-x-0 md:w-64 md:bg-transparent md:backdrop-blur-none md:shadow-none',

        /* 控制显隐 */
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="hidden md:block mb-10 px-4 py-8">
        <NuxtLink to="/" class="block group">
          <img src="/logo.png" alt="Logo" class="h-auto w-48 opacity-90 group-hover:opacity-100 transition-all group-hover:scale-105" />
        </NuxtLink>
      </div>

      <nav class="space-y-6">
        <div v-for="group in nav" :key="group.title">
          <h3 class="text-[10px] font-black text-gray-100 mb-4 pb-1 border-b border-white/5 uppercase tracking-[0.2em]">
            {{ group.title }}
          </h3>
          <ul class="space-y-1">
            <li v-for="link in group.links" :key="link.path">
              <NuxtLink
                  :to="link.path"
                  :target="link.external ? '_blank' : '_self'"
                  @click="isOpen = false"
                  class="group flex items-center justify-between py-2 px-3 rounded-xl text-sm text-gray-300/80 hover:text-white hover:bg-white/5 transition-all duration-300"
                  active-class="text-blue-400 bg-blue-500/10 font-bold shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"
              >
                <span class="relative">
                  {{ link.name }}
                  <span v-if="route.path === link.path" class="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                </span>
                <span class="text-white/10 group-hover:text-white/40 transform group-hover:translate-x-1 transition-transform text-xs">→</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="isOpen"
          @click="isOpen = false"
          class="fixed inset-0 bg-transparent z-[90] md:hidden"
      ></div>
    </Transition>
  </div>
</template>

<script setup>
// AppSidebar.vue 的 script setup 中
const isOpen = useState('sidebar-open') // 自动同步 app.vue 中的值

const route = useRoute()
// 移除这里的 watch，因为 app.vue 已经监听了，避免重复逻辑

const nav = [
  {
    title: '内容存档',
    links: [
      {
        name: '主页面',
        path: '/'
      },
      {
        name: '官方公告',
        path: '/notice/notice'
      },
      {
        name: '官方博客',
        path: '/blog/blog'
      },
      {
        name: '官方进度',
        path: '/timeline/timeline'
      },
    ]
  },
  {
    title: '联协印象',
    links: [
      {
        name: '关于联协',
        path: '/about'
      },
      {
        name: '联协组织',
        path: '/orgs/orgs'
      },
      {
        name: '项目公招',
        path: '/projects/projects'
      },
      {
        name: '联协映像',
        path: '/archive/archive'
      },
      {
        name: '联协活动',
        path: '/activities/activities'
      }
    ]
  },
  {
    title: '致谢',
    links: [
      {
        name: '致谢',
        path: '/thanks'
      },
    ]
  },
];
</script>

<style scoped>
aside {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>