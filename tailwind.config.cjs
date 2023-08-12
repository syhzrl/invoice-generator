/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                secondary: '#5E6470',
                light: '#D7DAE0',
            },
        },
        fontFamily: {
            bold: ['Inter-Bold'],
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
