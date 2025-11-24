import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useMutation, useQuery} from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useParams} from "react-router-dom";
import EbayListingProductsService from "@src/common/services/EbayListingProductsService";
import ProductsService from "@src/common/services/ProductsService";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import EbayListingsService from "@src/common/services/EbayListingsService";
import EbayCategoriesService from "@src/common/services/EbayCategoriesService";

const AddEBayListingProductModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {

    const {translate, locale, preferredTableContentLocale} = useLocaleContext()

    const {listId} = useParams()
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        // TODO:: REPLACE THE VALIDATION RESOLVER
        // resolver: BrandResolvers.addResolver,
    });

    const [backendErrors, setBackendErrors] = useState([]);


    const {mutate, isError} = useMutation(
        (data) => EbayListingProductsService.create(data, locale),
        {
            onSuccess: onAddSuccessCb,

            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const {
        data,
        refetch,
        isLoading
    } = useQuery(['ebay-listing-one', listId], () => EbayListingsService.getById(listId, {
        locale: preferredTableContentLocale
    }))

    const marketPlace = data?.data?.marketplaceId


    const prepareData = (data) => {
        const {productVariant, ebayCategoryId} = data;
        const objectToSend = {
            ebayListing: listId,
            productVariant: productVariant?.value,
            ebayCategory: ebayCategoryId?.value,
        }
        mutate(objectToSend);

    };

    const promiseProductsOptions = (
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
        ProductsService.getPagination({page: page, search: search, limit: perPage}).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: item.name,
                    value: item.productVariantId,
                })),
                hasMore: currentPage < pages,
                additional: {
                    prevPage: currentPage,
                    prevSearchValue: searchValue,
                },
            });
        });
    });
    const promiseCategoriesOptions = (searchValue, prevOptions, additional) => new Promise((resolve) => {
        const prevPage = additional?.prevPage ?? 0;

        const params = {
            search: searchValue,
            page: prevPage + 1,
        };

        if (!marketPlace) {
            return resolve({options: [], hasMore: false});
        }

        const page = params.page;
        const perPage = 10;
        const search = params.search;
        EbayCategoriesService.getPagination({
            page: page,
            search: search,
            limit: perPage,
            marketPlaceId: marketPlace
        }).then((res) => {
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
    return (
        <CustomModal translatedHeader={translate("ebay-listing.products.common.add-product")} isOpen={isOpen}
                     closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <div className="d-flex flex-column" style={{gap: "1rem"}}>

                    <div className="row justify-content-center align-items-center">

                        <div className="col-6 ">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate('ebay-listing.products.forms.products')}
                                name={'productVariant'}
                                label={translate('ebay-listing.products.forms.products')}
                                control={control}
                                getOptionsPromise={promiseProductsOptions}
                                defaultOptions={[]}
                                isMulti={false}
                                errors={errors}
                            />
                        </div>
                        <div className="col-6 ">
                            <CustomControlledAsyncSelectPaginate
                                placeholder={translate('ebay-listing.products.forms.categories')}
                                name={'ebayCategoryId'}
                                label={translate('ebay-listing.products.forms.categories')}
                                control={control}
                                getOptionsPromise={promiseCategoriesOptions}
                                defaultOptions={[]}
                                isMulti={false}
                                errors={errors}
                            />
                        </div>


                        <hr/>
                    </div>
                    <div className="col-auto">
                        <SubmitLoadingBtn isLoading={isLoading}/>
                    </div>
                </div>
            </form>
        </CustomModal>
    );
};

export default AddEBayListingProductModal;
