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
				background: 'var(--color-background)',
				'background-dark': 'var(--color-background-dark)',
				primary: colors("primary", 500),
				secondary: colors("secondary", 500),
				accent: colors("accent", 500),
				neutrals: colors("neutrals", 500),
				category: {
					'1': 'var(--category-1)',
					'2': 'var(--category-2)',
					'3': 'var(--category-3)',
					'4': 'var(--category-4)',
					'5': 'var(--category-5)',
					'6': 'var(--category-6)',
					'7': 'var(--category-7)',
					'8': 'var(--category-8)',
					'9': 'var(--category-9)',
					'10': 'var(--category-10)',
					'11': 'var(--category-11)',
				}
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