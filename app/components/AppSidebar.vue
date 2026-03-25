<template>
  <aside class="w-full md:w-64 border-r border-gray-100 p-6 bg-white shrink-0">
    <div class="mb-10 px-6 py-8"> <NuxtLink to="/" class="block group">
      <img
          src="/logo.png"
          alt="PROJECT CLUB Logo"
          class="inline-block h-12 w-auto transition-transform duration-300 ease-out group-hover:scale-105"
      />
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
                class="group flex items-center justify-between py-2 text-sm text-gray-600 hover:text-blue-500 transition-colors"
                active-class="text-blue-600 font-bold"
            >
              <span>{{ link.name }}</span>
              <span class="text-gray-200 group-hover:text-blue-300 transition-transform group-hover:translate-x-1">→</span>
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