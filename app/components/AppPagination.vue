<template>
  <div v-if="total > 1" class="mt-8 flex justify-center items-center gap-2 select-none">
    <button
        @click="changePage(modelValue - 1)"
        :disabled="modelValue === 1"
        class="p-2 px-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
    >
      <Icon name="lucide:chevron-left" class="w-4 h-4" />
    </button>

    <button
        v-for="page in total"
        :key="page"
        @click="changePage(page)"
        :class="[
        'w-9 h-9 rounded-lg border transition-all font-mono text-xs font-bold',
        modelValue === page
          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
      ]"
    >
      {{ page }}
    </button>

    <button
        @click="changePage(modelValue + 1)"
        :disabled="modelValue === total"
        class="p-2 px-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
    >
      <Icon name="lucide:chevron-right" class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true }, // 当前页
  total: { type: Number, required: true },      // 总页数
  scrollToTop: { type: Boolean, default: true } // 是否翻页后滚动到顶部
})

const emit = defineEmits(['update:modelValue'])

const changePage = (page) => {
  if (page >= 1 && page <= props.total) {
    emit('update:modelValue', page)

    // 只有在 scrollToTop 为 true 时才执行滚动
    if (props.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>