import {wrap} from 'svelte-spa-router/wrap';

export const routes = {
	'/': wrap({
		asyncComponent: () => import('./components/Home/Home.svelte'),
	}),
	'*': wrap({
		asyncComponent: () => import('./components/Home/Home.svelte'),
	}),
};
