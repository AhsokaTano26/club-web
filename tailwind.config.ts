import type { Config } from 'tailwindcss'
// @ts-ignore
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: '#5b92e5',
            }
        }
    },
    plugins: [
        typography,
    ],
}