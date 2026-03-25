import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: {
                repository: 'https://github.com/AhsokaTano26/club-web-content',
                include: 'blog/**',
            },
            schema: z.object({
                date: z.string(),
                type: z.enum(['anniversary', 'exhibition', 'official']),
                title: z.string()
            })
        }),
        timeline: defineCollection({
            type: 'page',
            source: {
                repository: 'https://github.com/AhsokaTano26/club-web-content',
                include: 'timeline/**',
            },
            schema: z.object({
                date: z.string(),
                title: z.string(),
                description: z.string()
            })
        })
    }
})