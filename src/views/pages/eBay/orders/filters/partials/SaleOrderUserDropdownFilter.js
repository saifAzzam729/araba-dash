import UsersService from "@src/common/services/UsersService";
import {useEffect} from "react";
import useQueryParams from "@hooks/useQueryParams";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledAsyncSelectPaginate
    from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

export default function SaleOrderUserDropdownFilter() {
    const {preferredTableContentLocale} = useSettingsUiContext();

    const {control, setValue, formState: {errors}} = useFormContext();
    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()


    const promiseUsersOptions = (searchValue) => new Promise((resolve) => {
        UsersService.getPagination({ search: searchValue }).then((res) => {
            resolve({
                options: res.pagination.items.map((item) => ({
                    label: item.username
                        ? `${item.fullName} - (${item.username})`
                        : item.fullName,
                    value: item.id
                }))
            });
        });
    });


    function fetchSelectedUser(userId) {
        UsersService.getById(userId, {locale: preferredTableContentLocale}).then(({data: user}) => setValue('user', {label: user.fullName, value: user.id}))
    }

    useEffect(() => {

        if (getQueryParams('user')) {
            fetchSelectedUser(getQueryParams('user'));
        }

    }, []);


    return (
        <CustomControlledAsyncSelectPaginate
            name={"user"}
            label={translate('filter.forms.user')}
            control={control}
            getOptionsPromise={promiseUsersOptions}
            defaultOptions={[]}
            errors={errors}
        />
    )
}
