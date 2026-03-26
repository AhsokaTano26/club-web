<template>
  <header class="relative min-h-[180px] py-12 flex flex-col justify-center border-b border-black/5 px-4 md:px-0">

    <div
        class="absolute -left-4 top-0 w-1 h-full transition-colors duration-300"
        :style="{ backgroundColor: themeColor }"
    ></div>

    <h1 class="text-4xl font-black tracking-tighter text-gray-100 uppercase italic flex items-baseline gap-3">
      {{ title }}
      <span class="text-gray-500 not-italic">/</span>
      <span class="text-2xl not-italic opacity-40 font-mono tracking-normal">{{ count }}</span>
    </h1>

    <p class="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 truncate leading-none">
      {{ subTitle }}
    </p>

  </header>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Archive' },
  subTitle: { type: String, default: 'Logs & Announcements' },
  count: { type: [Number, String], default: 0 },
  themeColor: { type: String, default: '#60a5fa' } // 默认蓝色
})
</script>