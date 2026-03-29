// utils/tag-registry.js

const REGISTRY = {
    type: {
        // Activities
        official: { label: '官方', icon: 'lucide:award', class: 'bg-blue-500/10 text-blue-400 border-blue-400/30' },
        anniversary: { label: '纪念日', icon: 'lucide:cake', class: 'bg-rose-500/10 text-rose-400 border-rose-400/30' },
        nexus: { label: '联协', icon: 'lucide:network', class: 'bg-indigo-500/10 text-indigo-400 border-indigo-400/30' },
        // Blog
        docu: { label: '文件', icon: 'lucide:file-text', class: 'bg-slate-500/10 text-slate-400 border-slate-400/30' },
        artic: { label: '推文', icon: 'lucide:hash', class: 'bg-sky-500/10 text-sky-400 border-sky-400/30' },
        rese: { label: '研究', icon: 'lucide:microscope', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30' },
        // Notice
        regula: { label: '条例', icon: 'lucide:gavel', class: 'bg-amber-500/10 text-amber-400 border-amber-400/30' },
        event: { label: '活动', icon: 'lucide:calendar', class: 'bg-blue-500/10 text-blue-400 border-blue-400/30' },
        notice: { label: '公告', icon: 'lucide:megaphone', class: 'bg-orange-500/10 text-orange-400 border-orange-400/30' },
        // Archive
        gallery: { label: '图册', icon: 'lucide:images', class: 'bg-purple-500/10 text-purple-400 border-purple-400/30' },
        tweet: { label: '推文', icon: 'lucide:twitter', class: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
        // Orgs
        fc: { label: '应援团', icon: 'lucide:heart', class: 'bg-pink-400/10 text-pink-400 border-pink-400/30' },
        dkk: { label: '同好会', icon: 'lucide:sparkles', class: 'bg-orange-400/10 text-orange-400 border-orange-400/30' }
    },
    status: {
        // Timeline
        prog: { label: '进行中', icon: 'lucide:loader', class: 'bg-blue-500/10 text-blue-400 border-blue-400/20' },
        changes: { label: '更改', icon: 'lucide:refresh-cw', class: 'bg-amber-500/10 text-amber-400 border-amber-400/30'},
        record: { label: '记录', icon: 'lucide:clipboard-list', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30'},
        // Project
        funding: { label: '众筹中', icon: 'lucide:coins', class: 'bg-pink-500/10 text-pink-400 border-pink-400/20' },
        need_creator: { label: '招募中', icon: 'lucide:brush', class: 'bg-purple-500/10 text-purple-400 border-purple-400/20' },
        finding_resonance: { label: '寻求共鸣', icon: 'lucide:heart-handshake', class: 'bg-lime-500/10 text-lime-400 border-lime-400/20' },
        others: {label: '公招', icon: 'lucide:users', class: 'bg-gray-500/10 text-gray-400 border-gray-500/20'},
        // Activities
        online: { label: 'Online', icon: 'lucide:globe', class: 'bg-green-500/10 text-green-400 border-green-400/20' },
        in_person: { label: 'In Person', icon: 'lucide:map-pin', class: 'bg-orange-500/10 text-orange-400 border-orange-400/20' },
        regional: { label: 'Regional', icon: 'lucide:map', class: 'bg-cyan-500/10 text-cyan-400 border-cyan-400/20' },
    },
    location: {
        regional: { label: '地区性', icon: 'lucide:map-pin', class: 'bg-gray-500/10 text-gray-500 border-gray-400/30' },
        global: { label: '全球性', icon: 'lucide:globe', class: 'bg-purple-500/10 text-purple-600 border-purple-400/30' }
    },
    tag: {
        branch: { label: '分支', icon: 'lucide:git-branch', class: 'bg-gray-800 text-gray-100 border-gray-700' },
        official: { label: '官方', icon: 'lucide:check-circle', class: 'bg-blue-600 text-white border-blue-700' }
    }
};

/**
 * 获取标签配置
 * @param {string} category - 分类 (type, status, location, tag)
 * @param {string} value - 具体键值 (如 'official', 'prog')
 * @returns {Object} 包含 label, icon, class 的对象
 */
export const getTagStyle = (category, value) => {
    const cat = String(category || '').toLowerCase();
    const val = String(value || '').toLowerCase().trim();

    // 检查分类是否存在
    const source = REGISTRY[cat];

    if (!source || !source[val]) {
        return {
            label: value || '未知',
            icon: 'lucide:tag',
            class: 'bg-gray-500/10 text-gray-400 border-gray-400/20'
        };
    }

    return source[val];
};

// 导出原始数据以便在选择器/下拉框中使用
export const TAG_MAPS = REGISTRY;