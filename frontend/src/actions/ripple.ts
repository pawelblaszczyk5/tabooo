interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export const ripple = (element: HTMLElement, duration = 400): {destroy: () => void} => {
	const parent = element.parentElement;

	const getRGBValues = (rgbColor: string): RGBColor => {
		const colorRGBRegEx = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
		const regexMatch = rgbColor.match(colorRGBRegEx);
		return regexMatch ? {r: Number(regexMatch[1]), g: Number(regexMatch[2]), b: Number(regexMatch[3])} : {r: 0, g: 0, b: 0};
	};

	const getProperColor = ({r, g, b}: RGBColor): string => {
		return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000' : '#fff';
	};

	const rippleShapeInitialSize = 16;

	const addRipple = (e: MouseEvent) => {
		const ripple = document.createElement('div');
		const maxScale =
			Math.max(parent?.getBoundingClientRect().width || 1, parent?.getBoundingClientRect().height || 1) / (rippleShapeInitialSize / 2);
		const rgbElementBackground = window.getComputedStyle(element).backgroundColor;

		element.blur();
		ripple.style.position = 'absolute';
		ripple.style.left = e.offsetX - rippleShapeInitialSize / 2 + 'px';
		ripple.style.top = e.offsetY - rippleShapeInitialSize / 2 + 'px';
		ripple.style.height = rippleShapeInitialSize + 'px';
		ripple.style.width = rippleShapeInitialSize + 'px';
		ripple.style.backgroundColor = getProperColor(getRGBValues(rgbElementBackground));
		ripple.style.opacity = '0.4';
		ripple.style.borderRadius = '50%';
		ripple.animate([{transform: 'scale(0)'}, {transform: `scale(${maxScale})`, opacity: 0}], {
			duration: duration,
			iterations: 1,
			fill: 'forwards',
		});
		setTimeout(() => {
			parent?.removeChild(ripple);
		}, duration);
		parent?.appendChild(ripple);
	};

	element.addEventListener('click', addRipple);

	return {
		destroy: () => {
			element.removeEventListener('click', addRipple);
		},
	};
};
