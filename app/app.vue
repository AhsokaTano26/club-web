<template>
  <div class="min-h-screen bg-[#fdfdfd] text-[#333]">
    <div class="h-1 bg-orange-400 w-full"></div>

    <div class="flex flex-col md:flex-row">
      <AppSidebar />

      <main class="flex-1 p-4 md:p-8">
        <NuxtPage />
      </main>
    </div>

    <footer class="p-8 text-center text-gray-400 text-sm border-t border-gray-100">
      &copy; 2026 同好会项目组 - 既然你发现了这里，试试输入 "th" 触发彩蛋
    </footer>
  </div>
</template>

<script setup>
// 全局彩蛋逻辑保留在母版
if (process.client) {
  let keys = '';
  window.addEventListener('keydown', (e) => {
    keys += e.key;
    if (keys.endsWith('th')) {
      alert('🌸 欢迎来到幻想乡！检测到同好指令。');
      keys = '';
    }
    if (keys.length > 10) keys = keys.substring(5);
  });
}
</script>