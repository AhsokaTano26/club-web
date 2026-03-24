<template>
  <div class="min-h-screen bg-[#fdfdfd] text-[#333] font-sans selection:bg-orange-100 selection:text-orange-900">
    <div class="fixed top-0 left-0 right-0 h-1 bg-orange-400 z-50"></div>

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
      &copy; 2026 同好会项目组
      <span class="mx-2">/</span>
      既然你发现了这里，试试输入 <span class="text-orange-300 font-mono">"th"</span> 触发彩蛋
    </footer>

    <Transition name="fade">
      <div v-if="showEgg" class="fixed inset-0 z-[100] flex items-center justify-center bg-orange-500/90 backdrop-blur-md text-white">
        <div class="text-center">
          <h2 class="text-6xl mb-4">🌸</h2>
          <p class="text-2xl font-black">欢迎来到幻想乡！</p>
          <p class="mt-2 opacity-80">检测到同好指令，系统已激活。</p>
          <button @click="showEgg = false" class="mt-8 px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-orange-500 transition-all">返回</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const showEgg = ref(false)

if (process.client) {
  let keys = '';
  window.addEventListener('keydown', (e) => {
    // 忽略非字母键
    if (e.key.length !== 1) return;

    keys += e.key.toLowerCase();

    // 检查结尾
    if (keys.endsWith('th')) {
      showEgg.value = true;
      keys = '';
      // 5秒后自动关闭（可选）
      setTimeout(() => { showEgg.value = false }, 5000);
    }

    // 防止字符串过长
    if (keys.length > 20) keys = keys.substring(10);
  });
}

// 统一配置页面切换动画
useHead({
  titleTemplate: (title) => title ? `${title} - 同好会` : '同好会项目组',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
/* 全局平滑过渡 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 页面切换动画 (Nuxt 默认支持) */
.page-enter-active, .page-leave-active {
  transition: all 0.3s;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #fb923c;
}
</style>