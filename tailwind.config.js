// /** @type {import('tailwindcss').Config} */
// export default {
//     content: [
//         "./index.html",
//         "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//     theme: {
//         extend: {
//             animation: {
//                 slideIn: 'slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                 popIn: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                 scaleIn: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                 glow: 'glow 2s ease-in-out infinite',
//                 'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
//             },
//             keyframes: {
//                 slideIn: {
//                     '0%': { transform: 'translateY(20px) scale(0.95)', opacity: '0' },
//                     '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
//                 },
//                 popIn: {
//                     '0%': { transform: 'scale(0) rotate(-180deg)', opacity: '0' },
//                     '50%': { transform: 'scale(1.1) rotate(10deg)' },
//                     '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
//                 },
//                 scaleIn: {
//                     '0%': { transform: 'scale(0.3)', opacity: '0' },
//                     '50%': { transform: 'scale(1.1)' },
//                     '100%': { transform: 'scale(1)', opacity: '1' },
//                 },
//                 glow: {
//                     '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))' },
//                     '50%': { opacity: '0.95', filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.5))' },
//                 },
//                 pulseSoft: {
//                     '0%, 100%': { opacity: '1' },
//                     '50%': { opacity: '0.85' },
//                 },
//             },
//             colors: {
//                 'stone': {
//                     '50': '#fafaf9',
//                     '100': '#f5f5f4',
//                     '900': '#1c1917',
//                 }
//             }
//         },
//     },
//     plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                // Matches the 'animate-scaleIn' class causing the error
                scaleIn: 'scaleIn 0.2s ease-out',
            },
        },
    },
    plugins: [],
}
