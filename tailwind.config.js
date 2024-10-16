/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#161f5f',
      },
      backgroundColor: {
        'primary': '#161f5f',
        'laundry-benefit': '#EFF3FF',
        'download': '#F7F8FD',
        'history': '#EFF3FF',
      },
      backgroundImage: {
        'pricelist-component': "url('/priceList.png')",
      }
    },
  },
  plugins: [],
}

