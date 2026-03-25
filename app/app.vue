<template>
  <div class="min-h-screen bg-[#fdfdfd] text-[#333] font-sans selection:bg-orange-100 selection:text-orange-900">
    <div class="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-[70]"></div>

    <Transition name="loading-fade">
      <div v-if="isLoading" class="fixed inset-0 z-[60] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
        <Icon name="svg-spinners:blocks-wave" class="w-12 h-12 text-orange-500" />
        <p class="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse">
          Synchronizing Archive...
        </p>
      </div>
    </Transition>

    <div class="flex flex-col lg:flex-row min-h-screen">
      <AppSidebar class="w-full lg:w-64 lg:fixed lg:h-screen border-r border-gray-100 bg-white z-40" />

      <div class="flex-1 flex flex-col lg:flex-row lg:ml-64">
        <main class="flex-1 p-4 md:p-8 lg:p-12">
          <div class="max-w-4xl mx-auto">
            <NuxtPage />
          </div>
        </main>

        <AppRightTick class="w-full lg:w-80 border-l border-gray-50 bg-[#fafafa]/50" />
      </div>
    </div>

    <footer class="lg:ml-64 p-8 text-center text-gray-400 text-[11px] border-t border-gray-50 tracking-widest uppercase">
      <div class="flex flex-col items-center gap-2">
        <div class="flex items-center gap-2">
          &copy; 2026 跨世界同好会项目组
          <span class="mx-1">/</span>
          <a href="https://opensource.org/licenses/MIT" target="_blank" class="flex items-center gap-1 hover:text-orange-400 transition-colors">
            <Icon name="lucide:scale" class="w-3 h-3" />
            Licensed under MIT
          </a>
        </div>
        <p>
          既然你发现了这里，试试输入 <span class="text-orange-300 font-mono tracking-normal">"th"</span> 激活彩蛋
        </p>
      </div>
    </footer>

    <Transition name="egg-fade">
      <div v-if="showEgg" class="fixed inset-0 z-[100] flex items-center justify-center bg-orange-600/95 backdrop-blur-xl text-white p-6">
        <div class="text-center max-w-sm">
          <div class="text-6xl mb-6 drop-shadow-lg">🌸</div>
          <h2 class="text-3xl font-black tracking-tighter uppercase mb-4">Secret Protocol</h2>
          <p class="text-lg opacity-90 font-medium leading-relaxed">检测到同好指令，欢迎来到幻想乡。</p>
          <button @click="showEgg = false" class="mt-10 px-10 py-3 bg-white text-orange-600 font-black rounded-sm hover:scale-105 transition-transform shadow-xl">
            返回系统
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp()
const isLoading = ref(false)
const showEgg = ref(false)

// 页面加载逻辑：使用 Nuxt Hooks
nuxtApp.hook('page:start', () => { isLoading.value = true })
nuxtApp.hook('page:finish', () => {
  // 稍微延迟关闭，防止加载太快闪烁，保持方块动画的完整性
  setTimeout(() => { isLoading.value = false }, 400)
})

// 彩蛋逻辑
if (process.client) {
  let keys = '';
  const handler = (e) => {
    if (e.key.length !== 1) return;
    keys += e.key.toLowerCase();
    if (keys.endsWith('th')) {
      showEgg.value = true;
      keys = '';
      setTimeout(() => { showEgg.value = false }, 8000);
    }
    if (keys.length > 20) keys = keys.substring(10);
  };
  window.addEventListener('keydown', handler);
  onUnmounted(() => window.removeEventListener('keydown', handler));
}

// 统一 SEO 配置
useHead({
  titleTemplate: (title) => title ? `${title} - Club Archive` : 'Project Club Archive',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono&display=swap' }
  ]
})
</script>

<style>
html {
  font-family: 'Inter', -apple-system, sans-serif;
  scroll-behavior: smooth;
}

.page-enter-active, .page-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.loading-fade-enter-active, .loading-fade-leave-active {
  transition: opacity 0.4s ease;
}
.loading-fade-enter-from, .loading-fade-leave-to {
  opacity: 0;
}

.egg-fade-enter-active, .egg-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.egg-fade-enter-from, .egg-fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #f1f1f1;
  border-radius: 0;
}
::-webkit-scrollbar-thumb:hover {
  background: #fb923c;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}
</style>