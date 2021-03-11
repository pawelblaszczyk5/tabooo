import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import del from 'rollup-plugin-delete';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'es',
		name: 'app',
		dir: 'public/build/',
	},
	plugins: [
		del({targets: ['public/build/**', '!public/build/bundle.css'], hook: 'buildEnd'}),
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: true,
			}),
			compilerOptions: {
				dev: !production,
			},
		}),
		css({output: 'bundle.css'}),
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
		}),
		!production && livereload('public'),
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
