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
        }),
        projects: defineCollection({
            type: 'page',
            source: {
                repository: 'https://github.com/AhsokaTano26/club-web-content',
                include: 'projects/**',
            },
            schema: z.object({
                title: z.string(),
                description: z.string(),
                status: z.string(),
                date: z.string(),
                icon: z.string(),
                link: z.string(),
            })
        }),
        orgs: defineCollection({
            type: 'page',
            source: {
                repository: 'https://github.com/AhsokaTano26/club-web-content',
                include: 'orgs/**',
            },
            schema: z.object({
                ID: z.string(),
                status: z.string(),
                date: z.string(),
                title: z.string(),
                description: z.string(),
                founded: z.string(),
                leader: z.string(),
                members_count: z.string(),
                website: z.string(),
                github: z.string(),
                theme: z.object({
                    logo: z.string(),
                    primaryColor: z.string().optional(),
                    bgImage: z.string().optional(),
                    bgOverlayOpacity: z.number().optional(),
                    sidebarOpacity: z.number().optional(),
                    mainOpacity: z.number().optional(),
                    rightTickOpacity: z.number().optional()
                })
            }).optional()
        }),
    }
})