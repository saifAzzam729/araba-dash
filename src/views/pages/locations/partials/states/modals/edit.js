import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {Col, Row} from "reactstrap";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import CustomModal from "@components/modal";
import {useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQuery} from "react-query";
import StatesService from "@src/common/services/StatesService";
import CountriesService from "@src/common/services/CountriesService";

function EditStatesModal({closeModal, isOpen, item, onEditSuccessCb}) {

    if (!item) {
        return null;
    }

    const [backendErrors, setBackendErrors] = useState([]);
    const {translate} = useLocaleContext()

    const schema = yup.object().shape({
        nameAr: yup.string().required(translate('forms.field-required')),
        nameEn: yup.string().required(translate('forms.field-required')),
        country: yup.object().required(translate('forms.field-required'))
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        defaultValues: {
            ...item
        },
        resolver: yupResolver(schema),
    });

    useQuery(
        ['state', item.id],
        () => StatesService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue("nameEn", data.translations.en.name);
                setValue("nameAr", data.translations.ar.name);
                setValue("country", {label: data.country.name || data.country.translations.en.name, value: data.country.id});
                setValue("publish", data.publish);
            }
        }
    )

    const {mutate, isError, isLoading} = useMutation(
        (data) => StatesService.update(item.id , data),
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
        CountriesService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
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

    const onSubmit = ({ nameAr, nameEn, country, publish }) => {
        const preparedData = {
            translations: {
                en: {
                    name: nameEn,
                },
                ar: {
                    name: nameAr,
                },
            },
            country: country.value,
            publish
        }
        mutate(preparedData)
    };

   return (
       <CustomModal translatedHeader={translate("states.common.edit-state")} isOpen={isOpen} closeModal={closeModal}>
           <form onSubmit={handleSubmit(onSubmit)}>
               <ErrorAlert isError={isError} errors={backendErrors} />
               <div className="d-flex flex-column" style={{gap: "1rem"}}>
                   <Row>
                       <Col xs={6} className="mb-2">
                           <CustomControlledInputField
                               name="nameEn"
                               label={translate('states.forms.nameEn')}
                               control={control}
                               errors={errors}
                           />
                       </Col>
                       <Col xs={6} className="mb-2">
                           <CustomControlledInputField
                               name="nameAr"
                               label={translate('states.forms.nameAr')}
                               control={control}
                               errors={errors}
                           />
                       </Col>
                       <Col xs={12} className="mb-2">
                           <CustomControlledAsyncSelectPaginate
                               placeholder='country'
                               name='country'
                               label={translate('states.forms.country')}
                               control={control}
                               getOptionsPromise={promiseCountriesOptions}
                               defaultOptions={[]}
                               errors={errors}
                           />
                       </Col>
                       <Col xs={12} className="mb-2">
                           <CustomControlledCheckboxInput
                               name="publish"
                               label={translate('states.forms.publish')}
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

export default EditStatesModal