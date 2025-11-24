import useQueryParams from "@hooks/useQueryParams";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useFormContext} from "react-hook-form";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {useEffect} from "react";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import StatesService from "@src/common/services/StatesService";

export default function StateDropdownFilter() {
    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {
        control,
        setValue,
        formState: {errors}
    } = useFormContext();

    function fetchSelectedState(stateId) {
        StatesService.getById(stateId, {
            locale: preferredTableContentLocale
        }).then(({data: state}) => setValue('state', {label: state.translations.en.name, value: state.id}))
    }

    useEffect(() => {
        if (getQueryParams('state')) {
            fetchSelectedState(getQueryParams('state'))
        }
    }, [getQueryParams]);

    const promiseStatesOptions = (
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
        StatesService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
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
        <CustomControlledAsyncSelectPaginate
            label={translate('filter.forms.state')}
            name={"state"}
            control={control}
            errors={errors}
            placeholder={translate('filter.forms.state')}
            getOptionsPromise={promiseStatesOptions}
            defaultOptions={[]}
        />
    )
}