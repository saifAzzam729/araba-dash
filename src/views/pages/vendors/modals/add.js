import { Button, Col, Label, Row } from "reactstrap";
import CustomModal from "../../../../@core/components/modal";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import RoleGroupsService from "../../../../common/services/RoleGroupsService";
import frormatDateToSend from "@src/utility/helpers/formatDateForSend";
import InputPasswordToggle from "@components/input-password-toggle";

import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import CustomControlledDatePickerField from "@components/controlled-inputs/CustomControlledDatePickerField";
import CountriesService from "../../../../common/services/CountriesService";
import CustomControlledAsyncSelectField
	from "../../../../@core/components/controlled-inputs/CustomControlledAsyncSelectField";
import { useMutation, useQuery } from "react-query";
import UsersService from "../../../../common/services/UsersService";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import OptionsService from "@src/common/services/OptionsService";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import CustomControlledAsyncSelectPaginate
	from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import UserGroupsService from "@src/common/services/UserGroupsService";
import {yupResolver} from "@hookform/resolvers/yup";
import {addUserSchema} from "@src/views/pages/vendors/schemas/Add";


const AddUserModal = ({ isOpen, closeModal, onAddSuccessCb, item = null, isAdmin = false }) => {
	let defaultValues = undefined;

	const {translate} = useLocaleContext()
	const { preferredTableContentLocale } = useSettingsUiContext();


	const [roleGroups, setRoleGroups] = useState([]);

	const [backendErrors, setBackendErrors] = useState([]);

	if (item) {
		defaultValues = {
			...item,
		};
	}

	const {
		control,
		handleSubmit,
		formState: { errors },
		register
	} = useForm({
		defaultValues,
		resolver: yupResolver(addUserSchema(translate)),
	});

	const {mutate, isError, isLoading} = useMutation(
        (data) => UsersService.create(
			{...data , locale: preferredTableContentLocale} ),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
        ['role-groups'],
        () => RoleGroupsService.getPagination({})
            .then(({pagination: {items}}) => {
                setRoleGroups(
					items.map((item) => {
						return { label: item.name, value: item.id };
					})
				);
            })
    );

	const {data} = useQuery(
		['gender-options'],
		() => OptionsService.getGenderOptions({locale: preferredTableContentLocale}),
	)

	const genderOptions = data?.data ?? [];


	const prepareDataAndSubmit = (data) => {
		const {
			avatar,
			fullName,
			password,
			email,
			gender,
			country,
			dateOfBirth,
			roleGroup,
			phoneNumber,
			userGroup
		} = data;

		mutate({
			avatar,
			fullName,
			password,
			email,
			gender: gender.value,
			country: country.value,
			dateOfBirth: frormatDateToSend(dateOfBirth),
			roleGroup: roleGroup.value,
			phoneNumber,
			userGroup: userGroup && userGroup.value,
			type: isAdmin ? "ADMIN" : "USER",
		});
	};

	const promiseCountriesOptions = (searchValue) => new Promise((resolve) => {
			CountriesService.getPagination({
				search:searchValue, locale: preferredTableContentLocale
			}).then((res) => {
				console.log(res)
				resolve(res.pagination.items.map((item) => {
					return {
						label:item.name,
						value:item.id
					}
				})
			)
		})
	});

	const promiseUserGroupsOptions = (
		searchValue,
		prevOptions,
		additional,
	) => new Promise((resolve) => {
		const prevPage = additional?.prevPage ?? 0;

		const params = {
			search: searchValue,
			page: prevPage + 1,
		};
		const page = params.page;
		const perPage = 10;
		const search = params.search;
		UserGroupsService.getPagination({
			page: page,
			search: search ,
			limit: perPage,
			locale:preferredTableContentLocale}).then((res) => {
			const { pages, page: currentPage, items } = res.pagination;
			resolve({
				options: items.map((item) => ({
					label: item.name,
					value: item.id,
				})),
				hasMore: currentPage < pages,
				additional: {
					prevPage: currentPage,
					prevSearchValue: searchValue,
				},
			});
		});
	});

	return (
		<CustomModal
			translatedHeader={translate('users.common.add-user')}
			isOpen={isOpen}
			closeModal={closeModal}
			size="lg"
		>
			<form onSubmit={handleSubmit(prepareDataAndSubmit)}>
				<ErrorAlert isError={isError} errors={backendErrors} />

				<Row>
					<Col xs={6} className="mb-2">
						<CustomControlledInputField
							label={translate('users.forms.fullName')}
							name="fullName"
							control={control}
							placeholder="John Doe"
							errors={errors}
						/>
					</Col>
					<Col xs={6} className="mb-2">
						<CustomControlledInputField
							label={translate('users.forms.email')}
							name="email"
							control={control}
							placeholder="john.doe@example.com"
							errors={errors}
							type="email"
						/>
					</Col>
					<Col xs={6} className="mb-2">
						<Label className="form-label" for="company">
							{translate('users.forms.password')} <span className="text-danger">*</span>
						</Label>

						<Controller
							id="password"
							name="password"
							control={control}
							render={({ field }) => (
								<InputPasswordToggle
									className="input-group-merge"
									invalid={errors.password && true}
									{...field}
								/>
							)}
						/>
					</Col>
					<Col xs={6} className="mb-2">
						<CustomControlledInputField
							label={translate('users.forms.phoneNumber')}
							name="phoneNumber"
							control={control}
							placeholder="3972945153"
							errors={errors}
							type="tel"
						/>
					</Col>
					<Col xs={6} className="mb-2">
						<CustomControlledDropdownField
							label={translate('users.forms.gender')}
							placeholder={translate('forms.Select')}
							name={"gender"}
							control={control}
							options={genderOptions}
							errors={errors}
						/>
					</Col>
					<Col xs={6} className="mb-2">
						<CustomControlledAsyncSelectField
							label={translate('users.forms.country')}
							placeholder={translate('forms.Select')}
							name={"country"}
							control={control}
							getOptionsPromise={promiseCountriesOptions}
							errors={errors}
						/>
					</Col>

					<Col xs={6} className="mb-2">
						<CustomControlledDatePickerField
							label={translate('users.forms.dateOfBirth')}
							name="dateOfBirth"
							control={control}
							errors={errors}
						/>
					</Col>
					<Col xs={6} className="mb-2">
						<CustomControlledDropdownField
							label={translate('users.forms.roleGroup')}
							placeholder={translate('forms.Select')}
							name={"roleGroup"}
							control={control}
							options={roleGroups}
							errors={errors}
						/>
					</Col>

					<Col xs={12} className="mb-2">
						<CustomControlledAsyncSelectPaginate
							placeholder={translate("forms.Select")}
							name='userGroup'
							label={translate("discount.forms.userGroups")}
							control={control}
							getOptionsPromise={promiseUserGroupsOptions}
							defaultOptions={[]}
							isMulti={false}
							errors={errors}
						/>
					</Col>

					<Col xs={12} className="mb-2">
						<Label className="form-label" for="avatar">
							{translate('users.forms.avatar')}
						</Label>
						<input
							className="form-control form-control-lg"
							id="avatar"
							{...register("avatar")}
							type="file"
						/>
					</Col>
				</Row>
				
				<div className="d-flex align-items-center justify-content-start gap-1">
                    <SubmitLoadingBtn isLoading={isLoading} />

                    <Button
                        type="button"
                        color="secondary"
                        outline
                        onClick={closeModal}
                        className="mb-3"
                    >
						{translate('users.forms.cancel-button')}
                    </Button>
                </div>
			</form>
		</CustomModal>
	);
};

export default AddUserModal;

