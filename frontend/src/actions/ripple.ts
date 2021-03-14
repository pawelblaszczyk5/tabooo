export const ripple = (element: HTMLElement, duration = 300): {destroy: () => void} => {
	const parent = element.parentElement;

	const addRipple = (e: MouseEvent) => {
		const ripple = document.createElement('div');
		const maxScale = Math.max(parent?.getBoundingClientRect().width || 1, parent?.getBoundingClientRect().height || 1) / 8;

		element.blur();
		ripple.style.position = 'absolute';
		ripple.style.left = e.offsetX - 8 + 'px';
		ripple.style.top = e.offsetY - 8 + 'px';
		ripple.style.height = '16px';
		ripple.style.width = '16px';
		ripple.style.backgroundColor = '#fff';
		ripple.style.opacity = '0.4';
		ripple.style.borderRadius = '50%';
		ripple.animate([{transform: 'scale(0)'}, {transform: `scale(${maxScale})`, opacity: 0}], {
			duration: duration,
			iterations: 1,
			fill: 'forwards',
		});
		setTimeout(() => {
			parent?.removeChild(ripple);
		}, duration - 50);
		parent?.appendChild(ripple);
	};

	element.addEventListener('click', addRipple);

	return {
		destroy: () => {
			element.removeEventListener('click', addRipple);
		},
	};
};
