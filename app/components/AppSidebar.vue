<template>
  <div class="relative">
    <div class="md:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-100">
      <NuxtLink to="/">
        <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
      </NuxtLink>
      <button @click="isOpen = !isOpen" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
        <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
      </button>
    </div>

    <aside
        :class="[
        'fixed inset-y-0 left-0 w-72 bg-white !opacity-100 shadow-2xl transform transition-transform duration-300 ease-in-out p-6 shrink-0',
        'md:relative md:translate-x-0 md:w-64 md:border-r border-gray-100',
        isOpen ? 'translate-x-0 shadow-2xl z-[100]' : '-translate-x-full z-100'
      ]"
        style="background-color: #FFFFFF !important;"
    >
      <div class="hidden md:block mb-10 px-6 py-8">
        <NuxtLink to="/" class="block group">
          <img src="/logo.png" alt="Logo" class="h-12 w-auto transition-transform group-hover:scale-105" />
        </NuxtLink>
      </div>

      <nav class="space-y-6">
        <div v-for="group in nav" :key="group.title">
          <h3 class="text-xs font-bold text-gray-400 mb-3 pb-1 border-b border-gray-50 uppercase tracking-widest">
            {{ group.title }}
          </h3>
          <ul class="space-y-1">
            <li v-for="link in group.links" :key="link.path">
              <NuxtLink
                  :to="link.path"
                  @click="isOpen = false"
                  class="group flex items-center justify-between py-2 px-3 rounded-lg text-sm text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all"
                  active-class="text-blue-600 bg-blue-50 font-bold"
              >
                <span>{{ link.name }}</span>
                <span class="text-gray-300 group-hover:text-blue-300 transform group-hover:translate-x-1 transition-transform">→</span>
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
const isOpen = ref(false)
// 监听路由变化自动关闭菜单
const route = useRoute()
watch(() => route.path, () => { isOpen.value = false })

const nav = [
  {
    title: '内容存档',
    links: [
      {
        name: '主页面',
        path: '/'
      },
      {
        name: '官方博客',
        path: '/blog/blog'
      },
      {
        name: '进度时间轴',
        path: '/timeline/timeline'
      },
      {
        name: '项目进度',
        path: '/projects/projects'
      }
    ]
  },
  {
    title: '社群动态',
    links: [
      {
        name: '联协组织',
        path: '/orgs/orgs'
      }
    ]
  },
  {
    title: '外部链接',
    links: [
      {
        name: '官方微博',
        path: 'https://weibo.com',
        external: true
      },
      {
        name: 'Bilibili',
        path: 'https://bilibili.com',
        external: true
      },
      {
        name: 'GitHub Repo',
        path: 'https://github.com/AhsokaTano26/club-web',
        external: true
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
.router-link-active {
  @apply text-blue-600 font-bold bg-blue-50;
}
</style>