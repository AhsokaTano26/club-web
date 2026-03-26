<template>
  <div class="min-h-screen py-12 px-4 relative overflow-hidden  text-gray-200 antialiased">
    <div class="fixed inset-0 -z-10 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/15 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/15 blur-[120px] rounded-full"></div>
    </div>

    <div class="max-w-3xl mx-auto space-y-6">
      <div class="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl flex flex-wrap gap-4 items-center justify-between">
        <div class="space-y-1">
          <span class="text-[10px] font-black uppercase tracking-widest text-blue-400">Document Meta</span>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5 text-xs font-mono text-gray-300">
              <Icon name="lucide:calendar" class="w-3.5 h-3.5" /> {{ doc.date }}
            </div>
            <div class="flex items-center gap-1.5 text-xs font-mono text-gray-300">
              <Icon name="lucide:user" class="w-3.5 h-3.5" /> {{ doc.author }}
            </div>
            <div class="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold uppercase rounded-md shadow-sm">
              {{ doc.type }}
            </div>
          </div>
        </div>
        <Icon name="lucide:shield-check" class="w-10 h-10 text-white/10" />
      </div>

      <article class="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

        <header class="relative z-10 mb-10 border-b border-white/10 pb-8">
          <h1 class="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight">
            {{ doc.title }}
          </h1>
        </header>

        <section class="relative z-10 prose prose-blue prose-invert prose-sm md:prose-base max-w-none
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-p:leading-relaxed">

          <h5 id="section-0">● 零、简言：</h5>
          <p class="text-gray-200">
            跨世界同好会（以下简称同好会）会长及主干成员，诚挚致函贵组织，期望在现有基础上进一步深化交流，正式建立联动协助关系（以下简称联协关系）。<br>
            为便于双方沟通磋商，同好会就合作事项阐明具体内容与立场。<br>
            <strong>在贵组织代表同意本邀请后，即代表跨世界同好会与贵组织建立联协关系，该邀请也可作为公开证明。</strong>
          </p>

          <h5 id="section-1">● 一、联协关系：</h5>
          <ol class="text-gray-200">
            <li>双方建立协联关系后，可根据实际情况对外公示合作关系，并开放双方成员的正常交流与流动。</li>
            <li>联协关系的存续以双方成员氛围及管理层常态化沟通为基础。双方成员须相互尊重对方组织及成员，明令严禁发表针对对方组织或成员的不良言论。如出现涉及双方的争议或问题，双方管理人员应尽可能第一时间对接沟通，共同妥善处置。</li>
          </ol>

          <h5 id="section-2">● 二、创作者交流与资源共享：</h5>
          <ul class="text-gray-200">
            <li>双方建立联协关系后，将根据贵组织实际情况，搭建创作者多方流动与合作机制。合作创作者覆盖小说家、画师、动画师、剪辑师等相关领域。在充分保障创作者正常工作量、合法权益及创作意愿的前提下，双方共享创作者资源与项目需求信息。</li>
            <li>建立联协关系的贵组织可以选择是否加入联协体系。联协体系是由同好会与多方合作组织共同构建的协同服务体系。体系内各组织地位平等，遵循互助互利的原则开展合作。</li>
            <li>双方联合开展的项目（简称「联协项目」），由双方项目负责人共同协商制定方案。</li>
            <li>在收益分配上，同好会愿在保障每位创作者应有回报的基础上，根据项目实际情况，给予贵组织更高的收益倾斜。</li>
            <li>同好会对任何形式的盗用、侮辱、歧视等侵犯创作者权益的行为坚持<strong>零容忍</strong>原则，将坚决予以抵制。</li>
          </ul>

          <h5 id="section-3">● 三、联动活动：</h5>
          <ol class="text-gray-200">
            <li>双方共同举办或参与的线上/线下活动，均视为联协项目，适用上述第二条款中的所有规定。</li>
            <li>联动活动期间，所有参与线下活动人员须在参与前，必须标明其所属组织。</li>
            <li>联动活动的最终解释权归跨世界同好会主干成员与贵组织对接的最高层人员所有。</li>
          </ol>

          <div class="mt-12 p-6 bg-blue-950/30 border border-blue-500/20 rounded-2xl italic space-y-4 shadow-inner">
            <h5 class="text-blue-400 not-italic">● 四、结语——来自跨世界同好会会长的信息：</h5>
            <p class="text-gray-200">「在读这份邀请的组织负责人你好呀~！」</p>
            <p class="text-gray-200">「我一直坚信，为成员们创造更好的环境和氛围，才是每一个组织存在的根本意义。」</p>
            <p class="text-gray-200">「而我也始终相信，汇聚更多志同道合的人，能让我们共同为彼此搭建出更璀璨，更多元的舞台。」</p>
            <p class="text-gray-100 text-sm">「那么，请和我还有同好会的大家一同——尽情享受，尽力前进吧！」</p>

            <div class="pt-4 not-italic flex flex-col items-end">
              <span class="text-white font-black text-lg">跨世界同好会会长 秦</span>
              <span class="text-[10px] font-mono text-gray-200 mt-1">Written on 2026.03.20</span>
            </div>
          </div>
        </section>
      </article>

      <div class="flex justify-center pt-8 mb-12">
        <NuxtLink to="/" class="group flex items-center gap-2 px-6 py-2 bg-gray-800/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-gray-300 hover:text-white hover:bg-gray-700/60 transition-all shadow-md">
          <Icon name="lucide:chevron-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-400" />
          返回归档中心
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const doc = {
  title: "▲跨世界同好会▼『联协邀请F』文档",
  date: "2026-03-24",
  type: "official",
  author: "star",
  description: "联动协助关系（联协关系）正式建立邀请函"
}

useSeoMeta({
  title: doc.title,
  description: doc.description
})
</script>

<style scoped>
/* 针对深色毛玻璃环境下的微调 */
:deep(.prose h5) {
  /* 标题颜色改为亮蓝色 */
  @apply text-blue-400 mt-8 mb-4 flex items-center gap-2;
}
:deep(.prose strong) {
  /* strong 标签会被 prose-invert 自动加白，这里微调下划线 */
  @apply text-red-600 underline decoration-blue-400/30 underline-offset-4;
}
:deep(.prose ol > li::marker),
:deep(.prose ul > li::marker) {
  /* 列表标号颜色改为亮灰 */
  @apply text-gray-300;
}
</style>