import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
    theme: {
        extend: {
            // 你可以在这里自定义你的主题颜色
            colors: {
                primary: '#f97316', // 橙色主题
            }
        }
    },
    plugins: [
        typography, // 核心：开启 Markdown 排版支持
    ],
}