import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				neon: {
					cyan: 'hsl(var(--neon-cyan))',
					'cyan-bright': 'hsl(var(--neon-cyan-bright))',
					'cyan-dim': 'hsl(var(--neon-cyan-dim))',
					purple: 'hsl(var(--neon-purple))',
					'purple-bright': 'hsl(var(--neon-purple-bright))',
					'purple-dim': 'hsl(var(--neon-purple-dim))',
					green: 'hsl(var(--neon-green))',
					'green-bright': 'hsl(var(--neon-green-bright))',
					'green-dim': 'hsl(var(--neon-green-dim))',
					pink: 'hsl(var(--neon-pink))',
					'pink-bright': 'hsl(var(--neon-pink-bright))',
					'pink-dim': 'hsl(var(--neon-pink-dim))',
					orange: 'hsl(var(--neon-orange))',
					'orange-bright': 'hsl(var(--neon-orange-bright))',
					'orange-dim': 'hsl(var(--neon-orange-dim))'
				},
				game: {
					bg: 'hsl(var(--game-bg))',
					border: 'hsl(var(--game-border))',
					snake: 'hsl(var(--snake-body))',
					'snake-head': 'hsl(var(--snake-head))',
					food: 'hsl(var(--food))',
					grid: 'hsl(var(--grid-line))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
