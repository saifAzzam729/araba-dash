import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import MultiTypeSettingsService from "@src/common/services/MultiTypeSettingsService";
import VisualSettingsService from "@src/common/services/VisualSettingsService";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
	const [storeName, setStoreName] = useState("");
	const [storeLogo, setStoreLogo] = useState("");

	useQuery(
		["store-name"],
		() => MultiTypeSettingsService.getById("STORE_NAME"),
		{
			onSuccess: (res) => {
				setStoreName(res.data);
			},
		}
	);

	useQuery(["store-logo"], () => VisualSettingsService.getByKey("LOGO"), {
		onSuccess: (res) => {
			setStoreLogo(res.data);
		},
	});

	return (
		<GlobalContext.Provider value={{ storeName, storeLogo }}>
			{children}
		</GlobalContext.Provider>
	);
};
