<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
      <div class="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span class="text-lg font-bold text-gray-700">{{ year }}年{{ month + 1 }}月</span>
          <span class="text-xs bg-white px-2 py-0.5 border border-gray-200 rounded text-gray-400 tracking-wider uppercase">
            {{ monthNamesEn[month] }} {{ year }}
          </span>
        </div>
        <div class="flex gap-1">
          <button @click="prevMonth" class="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded transition-all">◀</button>
          <button @click="resetDate" class="px-4 py-1 text-xs font-bold hover:bg-white border border-transparent hover:border-gray-200 rounded uppercase tracking-tighter">今天</button>
          <button @click="nextMonth" class="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded transition-all">▶</button>
        </div>
      </div>

      <div class="grid grid-cols-7 bg-white border-b border-gray-100">
        <div v-for="d in ['一', '二', '三', '四', '五', '六', '日']" :key="d" class="py-2 text-[11px] font-bold text-gray-400 text-center">
          {{ d }}
        </div>
      </div>

      <div class="grid grid-cols-7 border-l border-t border-gray-50">
        <div v-for="(day, i) in days" :key="i"
             @click="handleDateClick(day)"
             class="h-24 border-r border-b border-gray-50 p-2 hover:bg-orange-50/30 transition-colors group relative cursor-pointer"
             :class="[
               day.isCurrent ? 'bg-white' : 'bg-gray-50/50',
               selectedDate?.dateStr === day.dateStr ? 'ring-2 ring-orange-500 ring-inset z-10' : ''
             ]">

          <div class="flex justify-between items-start">
            <span class="text-lg font-mono leading-none" :class="day.isToday ? 'text-orange-500 font-bold' : 'text-gray-700'">
              {{ day.d }}
            </span>
            <span class="text-[10px] text-gray-300">{{ day.lunar }}</span>
          </div>

          <div class="mt-2 flex flex-wrap gap-1">
            <div v-for="ev in day.events" :key="ev.id"
                 :class="['w-1.5 h-1.5 rounded-full', colors[ev.type] || colors.default]"
                 :title="ev.title">
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-gray-50/50 flex justify-between items-center border-t border-gray-100">
        <div class="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span class="flex items-center gap-1.5"><i class="w-2 h-2 rounded-full bg-purple-400"></i> 纪念日</span>
          <span class="flex items-center gap-1.5"><i class="w-2 h-2 rounded-full bg-green-400"></i> 展会活动</span>
          <span class="flex items-center gap-1.5"><i class="w-2 h-2 rounded-full bg-blue-400"></i> 官方发布</span>
        </div>
      </div>
    </div>

    <transition name="slide-up">
      <div v-if="selectedDate && selectedDate.events.length > 0" class="bg-white p-6 border border-gray-200 rounded-sm shadow-sm">
        <div class="flex items-center justify-between mb-6">
          <h4 class="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
            {{ selectedDate.dateStr }} · Timeline
          </h4>
          <span class="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">
            {{ selectedDate.events.length }} 条记录
          </span>
        </div>

        <div class="relative border-l-2 border-gray-100 ml-2 pl-6 space-y-8">
          <div v-for="ev in selectedDate.events" :key="ev.id"
               @click="navigateTo(ev.id)"
               class="relative group cursor-pointer">
            <div :class="['absolute -left-[31px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-transform group-hover:scale-125', colors[ev.type] || colors.default]"></div>

            <div class="space-y-1">
              <div class="text-[10px] font-black uppercase tracking-tighter" :class="textColors[ev.type]">
                {{ ev.type }}
              </div>
              <div class="text-gray-800 font-bold group-hover:text-orange-500 transition-colors">
                {{ ev.title }}
              </div>
              <div class="text-xs text-gray-400 line-clamp-1">点击查看详情回顾 →</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="selectedDate" class="text-center py-12 bg-gray-50/30 border border-dashed border-gray-200 rounded-sm">
        <p class="text-gray-300 text-sm font-medium tracking-widest">NO RECORDED EVENTS FOR THIS DAY</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { Solar, Lunar } from 'lunar-javascript';

// 状态管理
const year = ref(2026);
const month = ref(2); // 0 = 1月，因此 2 = 3月
const selectedDate = ref(null);

// 配置项
const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const colors = {
  anniversary: 'bg-purple-400',
  exhibition: 'bg-green-400',
  official: 'bg-blue-400',
  default: 'bg-gray-300'
};
const textColors = {
  anniversary: 'text-purple-400',
  exhibition: 'text-green-400',
  official: 'text-blue-400'
};

// 1. 从 Nuxt Content v3 抓取数据
// 注意：'blog' 必须对应你 content.config.ts 里的 collection 名称
const { data: posts } = await useAsyncData('calendar-posts', () =>
    queryCollection('blog').all()
);

// 2. 生成日历阵列 (6行7列)
const days = computed(() => {
  const res = [];
  const firstDay = new Date(year.value, month.value, 1).getDay(); // 0是周日
  const shift = firstDay === 0 ? 6 : firstDay - 1; // 调整为周一开头

  // 生成 42 个格子
  for (let i = 0; i < 42; i++) {
    const date = new Date(year.value, month.value, i - shift + 1);
    const isCurrent = date.getMonth() === month.value;
    res.push(formatDay(date, isCurrent));
  }
  return res;
});

// 3. 格式化单日数据与事件匹配
function formatDay(date, isCurrent) {
  const lunar = Lunar.fromDate(date);
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  // 匹配文章
  const dayEvents = (posts.value || [])
      .filter(post => post.date === dateStr)
      .map(post => ({
        id: post.path,
        title: post.title,
        type: post.type || 'official'
      }));

  return {
    dateStr,
    d: date.getDate(),
    isCurrent,
    isToday: new Date().toDateString() === date.toDateString(),
    lunar: lunar.getJieQi() || lunar.getDayInChinese(),
    events: dayEvents
  };
}

// 4. 交互逻辑
const handleDateClick = (day) => {
  selectedDate.value = day;
};

const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
};

const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
};

const resetDate = () => {
  const now = new Date();
  year.value = now.getFullYear();
  month.value = now.getMonth();
  selectedDate.value = null;
};
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 自定义滚动条风格（如果需要） */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>