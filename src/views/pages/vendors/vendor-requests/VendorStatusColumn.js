import {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import _ from "lodash";
import {useMutation} from "react-query";
import MySwal from "sweetalert2";

import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import showErrorAlert from "@components/alert/showErrorAlert";
import VendorsService from "@src/common/services/VendorsService";
import {VENDOR_STATUS_OPTIONS, VENDOR_STATUS_VALUES} from "../constants";

const schema = yup.object().shape({
    status: yup.object().required(),
});

export default function VendorStatusColumn({row: item, onEditSuccess}) {
    const {isRtl, translate} = useLocaleContext();

    const translatedOptions = useMemo(
        () => VENDOR_STATUS_OPTIONS.map((opt) => ({
            label: translate(opt.labelKey) ?? opt.labelKey,
            value: opt.value,
        })),
        [translate]
    );

    const currentOption = useMemo(
        () => translatedOptions.find((opt) => opt.value === item?.status.value) || null,
        [translatedOptions, item?.status]
    );

    const isAwaitingApproval = item?.status === VENDOR_STATUS_VALUES.ACCOUNT_AWAITING_APPROVAL;

    const {
        watch,
        control,
        setValue,
        formState: {errors},
    } = useForm({
        defaultValues: {status: currentOption},
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        setValue("status", currentOption);
    }, [currentOption, setValue]);

    const {mutateAsync} = useMutation(
        ({id, status}) => {
            if (status === VENDOR_STATUS_VALUES.ACTIVE) {
                return VendorsService.approve(id);
            }
            if (status === VENDOR_STATUS_VALUES.REJECTED) {
                return VendorsService.reject(id);
            }
            return Promise.resolve();
        },
        {
            onSuccess: onEditSuccess,
            onError: () => {
                setValue("status", currentOption);
                showErrorAlert({});
            },
        }
    );

    const changingStatusValue = watch("status");

    useEffect(() => {
        if (
            !item ||
            isAwaitingApproval ||
            _.isEqual(changingStatusValue, currentOption) ||
            !changingStatusValue
        ) {
            return;
        }

        MySwal.fire({
            title: translate("users.table.update-status"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: translate("alert-modal.confirm-button"),
            cancelButtonText: translate("alert-modal.deny-button"),
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-warning ms-1",
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.value) {
                mutateAsync({id: item.id, status: changingStatusValue.value});
                return;
            }
            setValue("status", currentOption);
        });
    }, [changingStatusValue, currentOption, isAwaitingApproval, item, mutateAsync, setValue, translate]);

    if (!item) {
        return null;
    }

    return (
        <div className="w-100 h-100 pb-2">
            <CustomControlledDropdownField
                name="status"
                control={control}
                options={translatedOptions}
                errors={errors}
                isRtL={isRtl}
                readOnly={isAwaitingApproval}
            />
        </div>
    );
}
