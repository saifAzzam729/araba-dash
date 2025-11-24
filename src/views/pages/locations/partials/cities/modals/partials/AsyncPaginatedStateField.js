import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import StatesService from "@src/common/services/StatesService";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function AsyncPaginatedStateField({selectedCountry, control, errors}) {
    const {translate} = useLocaleContext()

    if(!selectedCountry){
        return ;
    }
    const promiseStateOptions = (
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
        StatesService.getPagination({
            page: page, search: search , limit: perPage,
            country: selectedCountry
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

    return(
        <CustomControlledAsyncSelectPaginate
            placeholder='state'
            name='state'
            label={translate('cities.forms.state')}
            control={control}
            getOptionsPromise={promiseStateOptions}
            defaultOptions={[]}
            errors={errors}
        />
    )
}