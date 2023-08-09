/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {

			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			colors: {
				text: colors("text", 900),
				background: colors("secondary", 700),
				primary: colors("primary", 500),
				secondary: colors("secondary", 500),
				accent: colors("accent", 500),
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}

function colors(name, DEFAULT) {
	let result = { DEFAULT: `var(--color-${name}-${DEFAULT})` };
	for (let i = 1; i <= 9; i++) {
		result[i * 100] = `var(--color-${name}-${i}00)`;
	}
	return result
}