import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {Col, Row} from "reactstrap";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import UsersService from "@src/common/services/UsersService";
import {useMutation} from "react-query";
import UserGroupsService from "@src/common/services/UserGroupsService";
import {useState} from "react";

export default function AddUserGroupModal({isOpen, closeModal, onAddSuccessCb, item = null}) {
    const {translate} = useLocaleContext();
    const [backendErrors, setBackendErrors] = useState({});

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm();


    const {mutate, isError, isLoading} = useMutation(
        (data) => UserGroupsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const promiseUsersOptions = (
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
        UsersService.getPagination({page: page, search: search, limit: perPage}).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: item.fullName,
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

    const prepareData = (data) => {
        const {nameEn, nameAr, descriptionEn, descriptionAr, users} = data;
        mutate({
            translations: {
                en: {
                    name: nameEn,
                    description: descriptionEn
                },
                ar: {
                    name: nameAr,
                    description: descriptionAr
                },
            },
            users: users.map((user) => user.value)
        })

    }
    return (
        <CustomModal translatedHeader={translate('user-groups.common.add-user-group')} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                name="nameEn"
                                label={translate('user-groups.forms.nameEn')}
                                placeholder={translate('user-groups.forms.nameEn')}
                                errors={errors}
                                control={control}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                name="nameAr"
                                label={translate('user-groups.forms.nameAr')}
                                placeholder={translate('user-groups.forms.nameAr')}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                name="descriptionEn"
                                label={translate('user-groups.forms.descriptionEn')}
                                placeholder={translate('user-groups.forms.descriptionEn')}
                                errors={errors}
                                control={control}
                            />
                        </Col>
                        <Col xs={12} md={6} className="mb-2">
                            <CustomControlledInputField
                                name="descriptionAr"
                                label={translate('user-groups.forms.descriptionAr')}
                                placeholder={translate('user-groups.forms.descriptionAr')}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={12} className="mb-2">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate('user-groups.forms.users')}
                                label={translate('user-groups.forms.users')}
                                name={'users'}
                                control={control}
                                getOptionsPromise={promiseUsersOptions}
                                defaultOptions={[]}
                                isMulti={true}
                                errors={errors}
                            />
                        </Col>
                    </Row>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}