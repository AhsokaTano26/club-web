<template>
  <aside class="w-full md:w-64 border-r border-gray-100 p-6 bg-white shrink-0">
    <div class="mb-8">
      <h1 class="text-xl font-bold text-orange-500 tracking-tighter">PROJECT CLUB</h1>
      <p class="text-[10px] text-gray-400 uppercase">Community Wiki & Schedule</p>
    </div>

    <nav class="space-y-6">
      <div v-for="group in nav" :key="group.title">
        <h3 class="text-xs font-bold text-gray-400 mb-3 pb-1 border-b border-gray-50 uppercase tracking-widest">
          {{ group.title }}
        </h3>
        <ul class="space-y-2">
          <li v-for="link in group.links" :key="link" class="group flex items-center justify-between text-sm hover:text-orange-500 cursor-pointer transition-colors">
            <span>{{ link }}</span>
            <span class="text-gray-200 group-hover:text-orange-300 transition-transform group-hover:translate-x-1">→</span>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup>
const nav = [
  { title: '官方作品', links: ['游戏列表', '音乐专辑', '官方书籍', '角色百科'] },
  { title: '社群动态', links: ['展会导航', '同人社团', '进度时间轴'] },
  { title: '外部链接', links: ['官方微博', 'Bilibili', 'GitHub Repo'] }
];
</script>