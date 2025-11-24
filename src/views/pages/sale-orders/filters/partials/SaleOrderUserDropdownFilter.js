import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import UsersService from "@src/common/services/UsersService";
import {useEffect} from "react";
import useQueryParams from "@hooks/useQueryParams";
import {useFormContext} from "react-hook-form";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function SaleOrderUserDropdownFilter() {

    const {control, setValue, formState: {errors}} = useFormContext();
    const {getQueryParams} = useQueryParams();
    const {translate} = useLocaleContext()


    const promiseBrandsOptions = (searchValue) => new Promise((resolve) => {
        UsersService.getPagination({search: searchValue}).then((res) => {
            resolve(res.pagination.items.map((item) => {
                    return {
                        label:  item.username ? item.fullName +' (' + item.username + ')':item.fullName,
                        value: item.id
                    }
                })
            )
        })
    });

    function fetchSelectedUser(userId) {
        UsersService.getById(userId).then(({data: user}) => setValue('user', {label: user.fullName, value: user.id}))
    }

    useEffect(() => {

        if (getQueryParams('user')) {
            fetchSelectedUser(getQueryParams('user'));
        }

    }, []);


    return (
        <CustomControlledAsyncSelectField
            label={translate('filter.forms.user')}
            placeholder={translate('filter.forms.user')}
            name={"user"}
            control={control}
            getOptionsPromise={promiseBrandsOptions}
            errors={errors}
        />
    )
}
