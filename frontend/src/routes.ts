import {wrap} from 'svelte-spa-router/wrap';

export const routes = {
	'/': wrap({
		asyncComponent: () => import('./components/Main/Main.svelte'),
	}),
	'*': wrap({
		asyncComponent: () => import('./components/Main/Main.svelte'),
	}),
};
