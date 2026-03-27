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
                title: z.string(),
                author: z.string(),
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
                orgs_id: z.string(),
                status: z.string(),
                date: z.string(),
                title: z.string(),
                joined_at: z.string(),
                description: z.string(),
                founded: z.string(),
                leader: z.string(),
                members_count: z.string(),
                website: z.string(),
                github: z.string(),
                theme: z.object({
                    logo: z.string().optional(),
                    primaryColor: z.string().optional(),
                    bgImage: z.string().optional(),
                    bgOverlayOpacity: z.number().optional(),
                    sidebarOpacity: z.number().optional(),
                    mainOpacity: z.number().optional(),
                    rightTickOpacity: z.number().optional()
                })
            })
        }),
        notice: defineCollection({
            type: 'page',
            source: {
                repository: 'https://github.com/AhsokaTano26/club-web-content',
                include: 'notice/**',
            },
            schema: z.object({
                title: z.string(),
                description: z.string(),
                type: z.string(),
                date: z.string(),
                author: z.string(),
            })
        }),
        activities: defineCollection({
            type: 'page',
            source: {
                repository: 'https://github.com/AhsokaTano26/club-web-content',
                include: 'activities/**',
            },
            schema: z.object({
                date: z.string(),
                type: z.enum(['anniversary', 'exhibition', 'official']),
                title: z.string(),
                author: z.string(),
            })
        }),
        archive: defineCollection({
            type: 'page',
            source: {
                repository: 'https://github.com/AhsokaTano26/club-web-content',
                include: 'archive/**',
            },
            schema: z.object({
                date: z.string(),
                type: z.string(),
                title: z.string(),
                author: z.string(),
            })
        }),
    }
})