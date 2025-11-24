import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {useMutation} from "react-query";
import _ from "lodash";
import showErrorAlert from "@components/alert/showErrorAlert";
import MySwal from "sweetalert2";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import UsersService from "@src/common/services/UsersService";

export default function EditStatusColumn({row: item, statusOptions, onEditSuccess}) {
    const {isRtl, translate} = useLocaleContext();

    if (!item) {
        return null;
    }
    const schema = yup.object().shape({
        status: yup.object().required(),
    });

    const {
        setValue,
        watch,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: {
            ...item,
        },
        resolver: yupResolver(schema),
    });

    const {mutate, isError, isLoading} = useMutation(
        (data) => UsersService.update(data.id, data),
        {
            onSuccess: onEditSuccess,
            onError: () => {
                setValue('status', item.status);
                showErrorAlert({});
            }
        }
    );

    const changingStatusValue = watch('status');
    useEffect(() => {
        if (_.isEqual(changingStatusValue, item.status)) {
            return;
        }

        MySwal.fire({
            title: translate('users.table.update-status'),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: translate('alert-modal.confirm-button'),
            cancelButtonText: translate('alert-modal.deny-button'),
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-warning ms-1",
            },
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                mutate({id: item.id, status: changingStatusValue.value})
            }
        });

    }, [changingStatusValue]);


    return (
        <div className={"w-100 h-100 pb-2"}>
            <CustomControlledDropdownField
                name={"status"}
                control={control}
                options={statusOptions.map((opt) => {
                    return {label: opt.label, value: opt.value};
                })}
                errors={errors}
                isRtL={isRtl}
            />
        </div>
    )
}
