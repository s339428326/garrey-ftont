/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto Sans TC', ' sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
        hind: ['Hind Siliguri', 'sans-serif'],
      },
      backgroundImage: {
        cover:
          "url('https://plus.unsplash.com/premium_photo-1679690708482-2166eeb0b3b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0JTIwZ2FsbGVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60')",
        rank: "url('https://images.unsplash.com/photo-1456086272160-b28b0645b729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80')",
      },
      // infinite
      animation: {
        ['marquee-Top-1']: 'marquee-top-1 10s linear',
        ['marquee-Top-2']: 'marquee-top-2 10s linear',
        ['marquee-Down-1']: 'marquee-down-1 10s linear',
        ['marquee-Down-2']: 'marquee-down-2 10s linear',
      },
      keyframes: {
        ['marquee-top-1']: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        ['marquee-top-2']: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        ['marquee-down-1']: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        ['marquee-down-2']: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};
