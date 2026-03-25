<template>
  <div class="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col group/card">
    <div :class="['p-3 border-b border-gray-200 flex justify-between items-center transition-colors', headerBg]">
      <div class="flex items-center gap-2">
        <Icon :name="icon" :class="['w-4 h-4', iconColor]" />
        <span :class="['text-[10px] font-black uppercase tracking-[0.2em]', titleColor]">
          {{ title }}
        </span>
      </div>
      <i :class="['w-1.5 h-1.5 rounded-full', dotColor]"></i>
    </div>

    <div class="p-5 space-y-5 flex-grow">
      <div v-for="(item, i) in items" :key="item.name" class="group/item">
        <div class="text-[9px] font-mono text-gray-300 mb-1.5 flex justify-between items-center">
          <span>#0{{i+1}} · {{ label }}</span>
          <Icon v-if="item.link" name="lucide:link-2" class="w-2.5 h-2.5 opacity-0 group-hover/item:opacity-100 transition-opacity text-gray-400" />
        </div>

        <component
            :is="item.link ? 'a' : 'div'"
            :href="item.link"
            :target="item.link ? '_blank' : undefined"
            :class="[
            'text-sm font-bold text-gray-700 transition-all border-l-2 border-transparent pl-3 -ml-3 flex items-center gap-2.5 group-hover/item:pl-4',
            hoverColor,
            item.link ? 'cursor-pointer' : 'cursor-default'
          ]"
        >
          <Icon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4 grayscale opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300"
          />

          <span class="leading-tight">{{ item.name }}</span>

          <Icon v-if="item.link" name="lucide:arrow-up-right" class="w-3 h-3 opacity-20 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
        </component>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,        // 接收对象数组 [{ name, link, icon }]
  label: String,
  icon: String,        // 顶部大图标
  headerBg: String,
  titleColor: String,
  iconColor: String,
  dotColor: String,
  hoverColor: String
})
</script>