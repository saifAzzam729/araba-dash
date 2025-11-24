import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {Button, Col, Label, Row} from "reactstrap";
import CustomControlledAsyncSelectField
    from "../../../../@core/components/controlled-inputs/CustomControlledAsyncSelectField";
import CustomControlledInputField from "../../../../@core/components/controlled-inputs/CustomControlledInputField";
import {useState} from "react";
import RoleGroupsService from "../../../../common/services/RoleGroupsService";
import CountriesService from "../../../../common/services/CountriesService";
import CustomControlledDropdownField
    from "../../../../@core/components/controlled-inputs/CustomControlledDropdownField";
import CustomControlledDatePickerField
    from "../../../../@core/components/controlled-inputs/CustomControlledDatePickerField";
import frormatDateToSend from "@src/utility/helpers/formatDateForSend";
import ParseImageUrl from "../../../../common/helpers/ParseImageUrl";
import UsersService from "../../../../common/services/UsersService";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {AuthProvider, useAuth} from "@src/utility/context/AuthProvider";
import OptionsService from "@src/common/services/OptionsService";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import UserGroupsService from "@src/common/services/UserGroupsService";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {editUserSchema} from "@src/views/pages/users/schemas/Edit";

const EditUserModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    const {refetchUser} = useAuth()
    const {translate} = useLocaleContext()
    const { preferredTableContentLocale } = useSettingsUiContext();


    if (!item) {
        return null;
    }

    let defaultValues = undefined;

    if (item) {
        defaultValues = {
            ...item,
        };
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        register
    } = useForm({
        defaultValues,
        resolver: yupResolver(editUserSchema(translate)),

    });

    const [roleGroups, setRoleGroups] = useState([]);

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => UsersService.update(item.id, data),
        {
            onSuccess: () => {
                refetchUser()
                onEditSuccessCb()
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
		['user', item.id],
		() => UsersService.getById(item.id, {locale: preferredTableContentLocale}),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue('roleGroup', {label: data.rolesGroups[0].name, value: data.rolesGroups[0].id})
                setValue('dateOfBirth', data.dateOfBirth)
                setValue('country', {label: data.country.name, value: data.id})
                setValue('gender', {label: data.gender.label, value: data.gender.value})
                setValue('userGroup', {label: data.userGroup.name, value: data.userGroup.id})
            }
        }
	)

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
        ['gender-options', preferredTableContentLocale],
        () => OptionsService.getGenderOptions({
            locale: preferredTableContentLocale
        }),
    )

    const genderOptions = data?.data ?? [];

    const promiseCountriesOptions = (searchValue) => new Promise((resolve) => {
        CountriesService.getPagination({
            search:searchValue,
            locale: preferredTableContentLocale
        }).then((res) => {
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

    const prepareDataAndSubmit = (data) => {
        const {
            avatar,
            fullName,
            email,
            gender,
            country,
            dateOfBirth,
            roleGroup,
            phoneNumber,
            userGroup
        } = data;
        mutate({
            id: item.id,
            avatar,
            fullName,
            email,
            gender: gender.value,
            country: country.value,
            dateOfBirth: frormatDateToSend(dateOfBirth),
            roleGroup: roleGroup.value,
            phoneNumber,
            userGroup: userGroup && userGroup.value
        });
    };

    return (

        <CustomModal
            translatedHeader={translate('users.common.edit-user')}
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

                    <Col xs={6} className="mb-2">
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

                    <Col xs={6} className="mb-2">
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
                    <Col xs={6} className="mb-2">
                        <label htmlFor="avatar" className="form-label">
                            {translate('users.common.current-avatar')}
                        </label>
                        <div>
                            <img src={ParseImageUrl(item.avatarFileUrl)} width={"200px"} />
                        </div>
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
    )
}

export default EditUserModal;
