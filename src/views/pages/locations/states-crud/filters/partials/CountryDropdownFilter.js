import useQueryParams from "@hooks/useQueryParams";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useFormContext} from "react-hook-form";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import CountriesService from "@src/common/services/CountriesService";
import {useEffect} from "react";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

export default function CountryDropdownFilter() {
    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {
        control,
        setValue,
        formState: {errors}
    } = useFormContext();

    function fetchSelectedCountry(countryId) {
        CountriesService.getById(countryId, {
            locale: preferredTableContentLocale
        }).then(({data: country}) => setValue('country', {label: country.translations.en.name, value: country.id}))
    }

    useEffect(() => {
        if (getQueryParams('country')) {
            fetchSelectedCountry(getQueryParams('country'))
        }
    }, [getQueryParams]);

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

    return (
        <CustomControlledAsyncSelectPaginate
            label={translate('filter.forms.country')}
            name={"country"}
            control={control}
            errors={errors}
            options={promiseCountriesOptions}
            placeholder={translate('filter.forms.country')}
            getOptionsPromise={promiseCountriesOptions}
            defaultOptions={[]}
        />
    )
}