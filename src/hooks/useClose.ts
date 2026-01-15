import { useEffect } from 'react';

type TUseClose = {
	isOpenElement: boolean;
	onClose: () => void;
	elementRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpenElement, onClose, elementRef }: TUseClose) {
	useEffect(() => {
		if (!isOpenElement) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				elementRef.current &&
				!elementRef.current.contains(target);
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpenElement, onClose, elementRef]);
}
