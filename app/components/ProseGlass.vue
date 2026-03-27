<template>
  <div
      class="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl
           border border-white/20
           p-6 md:p-10"
  >
    <article :class="proseClass">
      <ContentRenderer :value="value" />

      <!-- 可选：外链按钮 -->
      <div v-if="value?.link" class="mt-12">
        <a
            :href="value.link"
            target="_blank"
            class="inline-flex items-center gap-2 px-6 py-3
                 bg-blue-600 text-white text-sm font-black
                 rounded-lg hover:bg-blue-700 transition-all
                 shadow-lg shadow-blue-200"
        >
          <Icon name="lucide:external-link" class="w-4 h-4" />
          访问项目仓库 / 链接
        </a>
      </div>
    </article>
  </div>
</template>

<script setup>
const props = defineProps({
  value: Object
})

const proseClass = `
         prose max-w-none
         text-gray-800

         /* 标题 */
         prose-headings:text-gray-900
         prose-headings:font-black
         prose-headings:tracking-tight

         /* 段落 */
         prose-p:text-gray-800

         /* 链接 */
         prose-a:text-blue-500
         prose-a:no-underline
         hover:prose-a:text-blue-400
         hover:prose-a:underline

         /* 引用块（玻璃卡片感） */
         prose-blockquote:border-l-4
         prose-blockquote:border-blue-400/60
         prose-blockquote:bg-white/40
         prose-blockquote:backdrop-blur-md
         prose-blockquote:px-4
         prose-blockquote:py-2
         prose-blockquote:rounded-r-xl
         prose-blockquote:text-gray-700

         /* 图片 */
         prose-img:rounded-xl
         prose-img:shadow-2xl
         prose-img:ring-1
         prose-img:ring-white/20

         /* 代码块 */
         prose-pre:bg-white/30
         prose-pre:text-gray-100
         prose-pre:backdrop-blur-md
         prose-pre:rounded-xl

         /* 行内代码 */
         prose-code:bg-black/60
         prose-code:text-blue-300
         prose-code:px-1.5
         prose-code:py-0.5
         prose-code:rounded

         /* 表格 */
         prose-th:text-gray-800
         prose-td:text-gray-700
`
</script>