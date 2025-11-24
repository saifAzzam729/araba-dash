import {useEffect, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation, useQuery} from "react-query";
import CitiesService from "@src/common/services/CitiesService";
import CustomModal from "@components/modal";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import AsyncPaginatedStateField
    from "@src/views/pages/locations/partials/cities/modals/partials/AsyncPaginatedStateField";
import CountriesService from "@src/common/services/CountriesService";

export default function EditCitiesModal({closeModal, isOpen, item, onEditSuccessCb}) {
    const [backendErrors, setBackendErrors] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const {translate} = useLocaleContext();

    const schema = yup.object().shape({
        nameAr: yup.string().required(translate('forms.field-required')),
        nameEn: yup.string().required(translate('forms.field-required')),
        state: yup.object().required(translate('forms.field-required'))
    })

    const {
        control,
        handleSubmit,
        formState: {errors, isDirty},
        setValue,
        watch,
        resetField
    } = useForm({
        defaultValues:{
            ...item
        },
        resolver: yupResolver(schema),
    });

    useQuery(
        ['city', item.id],
        () => CitiesService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setSelectedCountry(data.state.country.id)
                setValue("nameEn", data.translations.en.name);
                setValue("nameAr", data.translations.ar.name);
                setValue("state", {label: data.state.name, value: data.state.id});
                setValue("publish", data.publish);
                setValue("country", {label: data.state.country.translations.en.name, value: data.state.country.id});
            }
        }
    )


    const country = watch('country');
    useEffect(() => {
        setSelectedCountry(country?.value)
        if(isDirty) {
            resetField('state')
        }
    }, [country]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => CitiesService.update(item.id , data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const promiseCountriesOptions = (
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
        CountriesService.getPagination({page: page, search: search, limit: perPage}).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
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

    const onSubmit = ({ nameAr, nameEn, state, publish }) => {
        const preparedData = {
            translations: {
                en: {
                    name: nameEn,
                },
                ar: {
                    name: nameAr,
                },
            },
            state: state.value,
            publish
        }
        mutate(preparedData)
    };

    return (
        <CustomModal translatedHeader={translate("cities.common.edit-city")} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ErrorAlert isError={isError} errors={backendErrors} />
                <div className="d-flex flex-column" style={{gap: "1rem"}}>
                    <Row>
                        <Col xs={6} className="mb-2">
                            <CustomControlledInputField
                                name="nameEn"
                                label={translate('cities.forms.nameEn')}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <CustomControlledInputField
                                name="nameAr"
                                label={translate('cities.forms.nameAr')}
                                control={control}
                                errors={errors}
                            />
                        </Col>

                        <Col xs={12} className="mb-2" key={selectedCountry}>
                            <CustomControlledAsyncSelectPaginate
                                placeholder='country'
                                name='country'
                                label={translate('cities.forms.country')}
                                control={control}
                                getOptionsPromise={promiseCountriesOptions}
                                defaultOptions={[]}
                                errors={errors}
                            />
                        </Col>

                        <Col xs={12} className="mb-2">
                            <AsyncPaginatedStateField
                                key={selectedCountry}
                                selectedCountry={selectedCountry}
                                control={control}
                                errors={errors}
                            />
                        </Col>

                        <Col xs={12} className="mb-2">
                            <CustomControlledCheckboxInput
                                name="publish"
                                label={translate('cities.forms.publish')}
                                control={control}
                            />
                        </Col>
                        <Col>
                            <SubmitLoadingBtn isLoading={isLoading} />
                        </Col>
                    </Row>
                </div>
            </form>
        </CustomModal>
    )
}