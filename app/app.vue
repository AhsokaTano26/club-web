<template>
  <div
      class="min-h-screen text-[#333] font-sans selection:bg-blue-100 selection:text-blue-900 bg-cover bg-center bg-fixed transition-all duration-700"
      :style="containerStyle"
  >
    <div
        class="fixed top-0 left-0 right-0 h-1 z-[70] transition-colors duration-700"
        :style="{ backgroundColor: themeConfig.primaryColor }"
    ></div>

    <Transition name="loading-fade">
      <div v-if="isLoading" class="fixed inset-0 z-[60] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
        <Icon name="svg-spinners:blocks-wave" class="w-12 h-12" :style="{ color: themeConfig.primaryColor }" />
        <p class="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse">
          Synchronizing Archive...
        </p>
      </div>
    </Transition>

    <div class="flex flex-col lg:flex-row min-h-screen">
      <AppSidebar
          class="w-full lg:w-64 lg:fixed lg:h-screen border-r border-gray-100 z-40 transition-all duration-700"
          :class="{ '!bg-white !opacity-100': isOpen }"
          :style="!isOpen ? { backgroundColor: `rgba(255, 255, 255, ${themeConfig.sidebarOpacity})` } : { backgroundColor: '#ffffff' }"
      />

      <div class="flex-1 flex flex-col lg:flex-row lg:ml-64">
        <main
            class="flex-1 p-4 md:p-8 lg:p-12 backdrop-blur-sm transition-all duration-700"
            :style="{ backgroundColor: `rgba(255, 255, 255, ${themeConfig.mainOpacity})` }"
        >
          <div class="max-w-4xl mx-auto">
            <NuxtPage />
          </div>
        </main>

        <AppRightTick
            class="w-full lg:w-80 border-l border-gray-50 backdrop-blur-md transition-all duration-700"
            :style="{ backgroundColor: `rgba(255, 255, 255, ${themeConfig.rightTickOpacity})` }"
        />
      </div>
    </div>

    <footer
        class="relative z-10 w-full p-8 text-center text-gray-500 text-[11px] border-t border-gray-100/50 backdrop-blur-md tracking-widest uppercase transition-all duration-700"
        :style="{ backgroundColor: `rgba(255, 255, 255, ${themeConfig.sidebarOpacity})` }"
    >
      <div class="lg:pl-64 flex flex-col items-center gap-2">
        <div class="flex flex-wrap justify-center items-center gap-2">
          <span>&copy; 2026 跨世界同好会项目组</span>
          <span class="hidden sm:inline mx-1">/</span>
          <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              class="flex items-center gap-1 transition-colors"
              :style="{ color: themeConfig.primaryColor }"
          >
            <Icon name="lucide:scale" class="w-3 h-3" />
            Licensed under MIT
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// --- 1. 定义默认配置常量 ---
const DEFAULT_THEME = {
  primaryColor: '#5b92e5',
  bgImage: '/2043253.jpg',
  bgOverlayOpacity: 0.5,
  sidebarOpacity: 0.95,
  mainOpacity: 0.9,
  rightTickOpacity: 0.85
}
// --- 2. 使用 useState 创建全局响应式主题状态 ---
// 这允许子页面直接修改此状态，无需 inject
const themeConfig = useState('themeConfig', () => ({ ...DEFAULT_THEME }))

// --- 3. 计算动态样式 ---
const containerStyle = computed(() => {
  return {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, ${themeConfig.value.bgOverlayOpacity}), rgba(255, 255, 255, ${themeConfig.value.bgOverlayOpacity})), url('${themeConfig.value.bgImage}')`,
    '--theme-primary': themeConfig.value.primaryColor
  }
})

const nuxtApp = useNuxtApp()
const isLoading = ref(false)

// --- 4. 页面加载钩子 ---
nuxtApp.hook('page:start', () => { isLoading.value = true })
nuxtApp.hook('page:finish', () => {
  setTimeout(() => { isLoading.value = false }, 400)
})

// --- 5. SEO 配置 ---
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

/* 页面切换动画 */
.page-enter-active, .page-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from { opacity: 0; transform: translateY(8px); }
.page-leave-to { opacity: 0; transform: translateY(-8px); }

/* 加载动画淡入淡出 */
.loading-fade-enter-active, .loading-fade-leave-active { transition: opacity 0.4s ease; }
.loading-fade-enter-from, .loading-fade-leave-to { opacity: 0; }

/* 滚动条美化：跟随变量 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--theme-primary);
  border-radius: 10px;
}

.font-mono { font-family: 'JetBrains Mono', monospace !important; }

/* 定义 CSS 变量方便在其他组件调用 */
:root {
  --brand-primary: var(--theme-primary);
}
</style>