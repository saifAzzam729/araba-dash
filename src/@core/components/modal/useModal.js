import { useState } from "react";

const useModal = () => {
	const [item, setItem] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (viewItem = null) => {
		setIsOpen(true);
		if (viewItem) {
			setItem(viewItem);
		}
	};

	const closeModal = () => {
		setIsOpen(false);
		setItem(null);
	};

	return { closeModal, openModal, item, isOpen };
};

export default useModal;
