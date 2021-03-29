import {wrap} from 'svelte-spa-router/wrap';

export const routes = {
	'/': wrap({
		asyncComponent: () => import('./components/Home/Home.svelte'),
	}),
	'/lobbyCreator': wrap({
		asyncComponent: () => import('./components/LobbyCreator/LobbyCreator.svelte'),
	}),
	'/lobbyList': wrap({
		asyncComponent: () => import('./components/LobbyList/LobbyList.svelte'),
	}),
	'/lobby/:lobbyId': wrap({
		asyncComponent: () => import('./components/Lobby/Lobby.svelte'),
	}),
	'*': wrap({
		asyncComponent: () => import('./components/Home/Home.svelte'),
	}),
};
