import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {useForm} from "react-hook-form";
import {SaleOrderResolvers} from "@src/views/pages/sale-orders/data";
import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import _ from "lodash";
import showErrorAlert from "@components/alert/showErrorAlert";
import MySwal from "sweetalert2";
import {useLocaleContext} from "@src/providers/LocaleProvider";

export default function EditStatusColumn({row: item, statusOptions, onEditSuccess, className = "w-100 h-100 pb-2"}) {
    const {isRtl, translate} = useLocaleContext();
    const queryClient = useQueryClient()

    if (!item) {
        return null;
    }
    const {setValue, watch, control, formState: {errors},} = useForm({
        defaultValues: {
            ...item,
        },
        resolver: SaleOrderResolvers.editResolver,
    });


    const {mutate, isError, isLoading} = useMutation(
        (data) => SaleOrdersService.update(data.id, data),
        {
            onSuccess: ()=>{
                queryClient.invalidateQueries({ queryKey: ['order'] })
                onEditSuccess()
            },
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
            title: translate('sale-order.table.update-status'),
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
        <div className={className}>
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
