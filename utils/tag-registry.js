// utils/tag-registry.js

const TYPES = {
    official: { label: '官方', icon: 'lucide:award', class: 'bg-blue-500/10 text-blue-400 border-blue-400/30' },
    anniversary: { label: '纪念日', icon: 'lucide:cake', class: 'bg-rose-500/10 text-rose-400 border-rose-400/30' },
    nexus: { label: '联协', icon: 'lucide:network', class: 'bg-indigo-500/10 text-indigo-400 border-indigo-400/30' },
    docu: { label: '文件', icon: 'lucide:file-text', class: 'bg-slate-500/10 text-slate-400 border-slate-400/30' },
    artic: { label: '推文', icon: 'lucide:hash', class: 'bg-sky-500/10 text-sky-400 border-sky-400/30' },
    rese: { label: '研究', icon: 'lucide:microscope', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30' },
    regula: { label: '条例', icon: 'lucide:gavel', class: 'bg-amber-500/10 text-amber-400 border-amber-400/30' },
    event: { label: '活动', icon: 'lucide:calendar', class: 'bg-blue-500/10 text-blue-400 border-blue-400/30' },
    notice: { label: '公告', icon: 'lucide:megaphone', class: 'bg-orange-500/10 text-orange-400 border-orange-400/30' },
    gallery: { label: '图册', icon: 'lucide:images', class: 'bg-purple-500/10 text-purple-400 border-purple-400/30' },
    tweet: { label: '推文', icon: 'lucide:twitter', class: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
    fc: { label: '应援团', icon: 'lucide:heart', class: 'bg-pink-400/10 text-pink-400 border-pink-400/30' },
    dkk: { label: '同好会', icon: 'lucide:sparkles', class: 'bg-orange-400/10 text-orange-400 border-orange-400/30' }
}

const STATUSES = {
    prog: { label: '进行中', icon: 'lucide:loader', class: 'bg-blue-500/10 text-blue-400 border-blue-400/20' },
    funding: { label: '众筹中', icon: 'lucide:coins', class: 'bg-pink-500/10 text-pink-400 border-pink-400/20' },
    need_creator: { label: '招募中', icon: 'lucide:brush', class: 'bg-purple-500/10 text-purple-400 border-purple-400/20' },
    finding_resonance: { label: '寻求共鸣', icon: 'lucide:heart-handshake', class: 'bg-lime-500/10 text-lime-400 border-lime-400/20' },
    online: { label: 'Online', icon: 'lucide:globe', class: 'bg-green-500/10 text-green-400 border-green-400/20' },
    in_person: { label: 'In Person', icon: 'lucide:map-pin', class: 'bg-orange-500/10 text-orange-400 border-orange-400/20' },
    regional: { label: 'Regional', icon: 'lucide:map', class: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/20' },
    global: { label: '全球性', icon: 'lucide:globe', class: 'bg-purple-500/10 text-purple-400 border-purple-400/20' },
    branch: { label: '分支', icon: 'lucide:git-branch', class: 'bg-zinc-500/10 text-zinc-400 border-zinc-400/20' },
    official: { label: '官方', icon: 'lucide:shield-check', class: 'bg-blue-600/10 text-blue-400 border-blue-400/30' }
}

export const getTagStyle = (category, value) => {
    const safeValue = String(value || '').toLowerCase().trim();
    const source = category === 'type' ? TYPES : STATUSES;

    return source[safeValue] || {
        label: value || 'UNKNOWN',
        icon: 'lucide:tag',
        class: 'bg-gray-500/10 text-gray-400 border-gray-400/20'
    };
}