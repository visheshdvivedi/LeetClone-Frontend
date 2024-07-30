/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "selector",
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
        'node_modules/preline/dist/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("preline/plugin")
    ],
}

