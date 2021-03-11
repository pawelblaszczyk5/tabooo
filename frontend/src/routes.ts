import {wrap} from 'svelte-spa-router/wrap';

export const routes = {
	'/testA': wrap({
		asyncComponent: () => import('./components/TestRouteA.svelte'),
	}),
	'/testB': wrap({
		asyncComponent: () => import('./components/TestRouteB.svelte'),
	}),
	'/testC': wrap({
		asyncComponent: () => import('./components/TestRouteC.svelte'),
	}),
	'*': wrap({
		asyncComponent: () => import('./components/TestRouteA.svelte'),
	}),
};
