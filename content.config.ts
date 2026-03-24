// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            source: 'blog/*.md',
            type: 'page',
            // 定义 Schema 确保类型安全
            schema: z.object({
                date: z.string(), // 格式如 2026-03-24
                type: z.enum(['anniversary', 'exhibition', 'official']), // 限制类型
                title: z.string()
            })
        })
    }
})