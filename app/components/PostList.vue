<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold border-l-4 border-blue-400 pl-2">最新日志</h3>

    <ContentList path="/blog" v-slot="{ list }">
      <div v-for="post in list" :key="post._path"
           class="group border-b border-gray-100 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
        <NuxtLink :to="post._path">
          <span class="text-xs text-gray-400 font-mono">{{ post.date }}</span>
          <h4 class="text-md font-bold group-hover:text-blue-500">{{ post.title }}</h4>
          <p class="text-sm text-gray-500 line-clamp-2">{{ post.description }}</p>
        </NuxtLink>
      </div>
    </ContentList>
  </div>
</template>