import type { Config } from 'tailwindcss'
// @ts-ignore
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: '#f97316', // 橙色主题
            }
        }
    },
    plugins: [
        typography,
    ],
}