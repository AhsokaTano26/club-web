<template>
  <aside class="w-full md:w-64 border-r border-gray-100 p-6 bg-white shrink-0">
    <div class="mb-8">
      <NuxtLink to="/" class="block">
        <h1 class="text-xl font-bold text-orange-500 tracking-tighter hover:text-orange-600 transition-colors">PROJECT CLUB</h1>
        <p class="text-[10px] text-gray-400 uppercase">Community Wiki & Schedule</p>
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
                :target="link.external ? '_blank' : '_self'"
                class="group flex items-center justify-between py-2 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                active-class="text-orange-600 font-bold"
            >
              <span>{{ link.name }}</span>
              <span class="text-gray-200 group-hover:text-orange-300 transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup>
const nav = [
  {
    title: '内容存档',
    links: [
      { name: '官方博客', path: '/blog/blog' },
      { name: '进度时间轴', path: '/timeline/timeline' }
    ]
  },
  {
    title: '官方作品',
    links: [
      { name: '游戏列表', path: '/wiki/games' },
      { name: '音乐专辑', path: '/wiki/music' },
      { name: '官方书籍', path: '/wiki/books' },
      { name: '角色百科', path: '/wiki/characters' }
    ]
  },
  {
    title: '社群动态',
    links: [
      { name: '展会导航', path: '/events' },
      { name: '同人社团', path: '/clubs' }
    ]
  },
  {
    title: '外部链接',
    links: [
      { name: '官方微博', path: 'https://weibo.com', external: true },
      { name: 'Bilibili', path: 'https://bilibili.com', external: true },
      { name: 'GitHub Repo', path: 'https://github.com', external: true }
    ]
  },
  {
    title: '致谢',
    links: [
      { name: '致谢', path: '/thanks' },
    ]
  },
];
</script>