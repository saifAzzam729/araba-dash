import React from 'react';
import {AsyncPaginate} from 'react-select-async-paginate';
import VendorsService from "@src/common/services/VendorsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function VendorFilterDropdown({value, onChange}) {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {translate} = useLocaleContext();

    const promiseVendorsOptions = (
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
        VendorsService.getPagination({
            page,
            search,
            limit: perPage,
            locale: preferredTableContentLocale
        }).then((res) => {
            const {pages, page: currentPage, items} = res.pagination;
            resolve({
                options: items.map((item) => ({
                    label: item.fullName,
                    value: item.vendorDetails.vendorId,
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
        <div className="w-100" style={{minWidth: '200px', maxWidth: '300px'}}>
            <AsyncPaginate
                isClearable={true}
                defaultOptions={[]}
                placeholder={translate('common.vendor') || 'Vendor'}
                loadOptions={promiseVendorsOptions}
                value={value}
                onChange={onChange}
                styles={{
                    menuList: (prev) => ({
                        ...prev,
                        height: '95px'
                    })
                }}
            />
        </div>
    );
}

