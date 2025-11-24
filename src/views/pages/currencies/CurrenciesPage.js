import BreadCrumbs from "../../../@core/components/breadcrumbs";
import useModal from "../../../@core/components/modal/useModal";
import AddCurrencyModal from "./modals/add";
import EditCurrencyModal from "./modals/edit";
import { useState } from "react";
import showSuccessAlert from "../../../@core/components/alert/showSuccessAlert";
import CurrenciesService from "@src/common/services/CurrenciesService";
import CurrencyViewCard from "@src/views/pages/currencies/custom-components/CurrencyViewCard";
import CurrencyAddCard from "@src/views/pages/currencies/custom-components/CurrencyAddCard";
import handleDeleteMutation from "../../../@core/components/alert/handleDeleteMutation";
import { useMutation, useQuery } from "react-query";
import showErrorAlert from "@components/alert/showErrorAlert";
import ErrorPage from "../../../@core/components/ErrorPage/ErrorPage";
import { useLocaleContext } from "@src/providers/LocaleProvider";
import createPermissionObjectForUi from "@src/utility/context/PermissionProvider/createPermissionObjectForUi";
import { PERMISSIONS_NAMES } from "@src/utility/context/PermissionProvider/PERMISSIONS_NAMES";
import CustomCan from "@components/Authorize/CustomCan";
import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {Col, Row} from "reactstrap";

export default function () {
	const { preferredTableContentLocale } = useSettingsUiContext();

	// add modal
	const {
		isOpen: isAddModalOpen,
		closeModal: closeAddModal,
		openModal: openAddModal,
		item: addItem,
	} = useModal();

	// edit modal
	const {
		item: editItem,
		isOpen: isEditModalOpen,
		closeModal: closeEditModal,
		openModal: openEditModal,
	} = useModal();

	const { translate } = useLocaleContext();

	const [items, setItems] = useState([]);

	const { isError, refetch } = useQuery(
		["currencies", preferredTableContentLocale],
		() =>
			CurrenciesService.getPagination({ locale: preferredTableContentLocale }),
		{
			onSuccess: ({ pagination: { items, } }) => {
				setItems(items);
			},
		}
	);

	const { mutate: deleteMutation } = useMutation(
		(data) => CurrenciesService.deleteObject(data.id),
		{
			onSuccess: () => {
				refetch();
				showSuccessAlert({});
			},
			onError: () => {
				showErrorAlert({});
			},
		}
	);

	const onAddSuccess = () => {
		refetch();
		closeAddModal();
		showSuccessAlert({});
	};

	const onEditSuccess = () => {
		refetch();
		closeEditModal();
		showSuccessAlert({});
	};

	const onDelete = (row) => {
		handleDeleteMutation(deleteMutation, row);
	};

	if (isError) {
		return <ErrorPage title={"Currencies"} />;
	}

	const permissionObject = createPermissionObjectForUi(
		PERMISSIONS_NAMES.ROLE_CURRENCY_ADD,
		PERMISSIONS_NAMES.ROLE_CURRENCY_UPDATE,
		PERMISSIONS_NAMES.ROLE_CURRENCY_DELETE,
		PERMISSIONS_NAMES.ROLE_CURRENCY_SHOW,
		PERMISSIONS_NAMES.ROLE_CURRENCY_LIST
	);


	const {data} = useQuery(
		['default'],
		()=> CurrenciesService.getDefaultCurrency(),
	)

	const defaultCurrencyCode = data?.data?.currencyCode

	return (
		<>
			<BreadCrumbs title={"Currencies"} data={[]} />
			<p className="mb-2">{translate("currencies.sub-header")}</p>
			<Box sx={{ flexGrow: 1, paddingBottom: "15px" }}>
				<Grid container spacing={2}>
					<Row className="w-100">
						{items.map((item) => {
							return (
								<Grid xs={12} md={6} lg={4} key={item.id}>
									<CurrencyViewCard
										item={item}
										onEdit={openEditModal}
										onDelete={onDelete}
										onDuplicate={openAddModal}
										permissionObject={permissionObject}
										defaultCurrencyCode={defaultCurrencyCode}
									/>
								</Grid>
							);
						})}

						<CustomCan permissionName={permissionObject?.add}>
							<Grid xs={12} md={6} lg={4}>
								<CurrencyAddCard onAdd={openAddModal} />
							</Grid>
						</CustomCan>
					</Row>
				</Grid>
			</Box>

			{isAddModalOpen && (
				<AddCurrencyModal
					closeModal={closeAddModal}
					isOpen={isAddModalOpen}
					item={addItem}
					onAddSuccessCb={onAddSuccess}
				/>
			)}
			{isEditModalOpen && (
				<EditCurrencyModal
					closeModal={closeEditModal}
					isOpen={isEditModalOpen}
					item={editItem}
					onEditSuccessCb={onEditSuccess}
				/>
			)}
		</>
	);
}
