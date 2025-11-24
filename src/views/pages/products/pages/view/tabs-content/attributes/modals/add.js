import CustomModal from "@components/modal";
import {useForm} from "react-hook-form";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import ProductAttributesService from "@src/common/services/ProductAttributesService";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

function AddAttributeModal({
                               closeModal,
                               isOpen,
                               onAddSuccessCb,
                               excludedAttributesArray
}) {

    const {translate} = useLocaleContext();
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {
        handleSubmit,
        control,
        formState:{errors}
    } = useForm()

    const excludesAttribute = excludedAttributesArray.length > 0 ? excludedAttributesArray.join(',') : excludedAttributesArray;

    const promiseAttributesOptions = (
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
        ProductAttributesService.getPagination({
            page: page, search: search , limit: perPage, excluded_ids: excludesAttribute, locale: preferredTableContentLocale
        }).then((res) => {
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

    const prepareData = (data) => {
        const {attribute} = data
        onAddSuccessCb(attribute)
    }

    return (
        <>
            <CustomModal translatedHeader={translate('product-attribute.add-page.text-header')} isOpen={isOpen} closeModal={closeModal} size={'sm'}>
                <form onSubmit={handleSubmit(prepareData)}>
                    <CustomControlledAsyncSelectPaginate
                        label={translate('product-attribute.common.attributes')}
                        placeholder={translate('product-attribute.common.attributes')}
                        name='attribute'
                        control={control}
                        getOptionsPromise={promiseAttributesOptions}
                        defaultOptions={[]}
                        errors={errors}
                    />
                    <hr/>
                    <div className="col-auto">
                        <SubmitLoadingBtn />
                    </div>
                </form>
            </CustomModal>
        </>
    )
}

export default AddAttributeModal
