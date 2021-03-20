import {wrap} from 'svelte-spa-router/wrap';

export const routes = {
	'/': wrap({
		asyncComponent: () => import('./components/Home/Home.svelte'),
	}),
	'/lobby': wrap({
		asyncComponent: () => import('./components/Lobby/Lobby.svelte'),
	}),
	'*': wrap({
		asyncComponent: () => import('./components/Home/Home.svelte'),
	}),
};
