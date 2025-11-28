import {useState, useEffect} from "react";
import {Input} from "reactstrap";
import MySwal from "sweetalert2";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import showErrorAlert from "@components/alert/showErrorAlert";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import VendorsService from "@src/common/services/VendorsService";
import {useMutation} from "react-query";

const VendorProductBanToggle = ({item, vendorId, onToggleSuccess}) => {
    const {translate} = useLocaleContext();
    const [isActive, setIsActive] = useState(!item?.banned);
    const [isToggling, setIsToggling] = useState(false);

    useEffect(() => {
        setIsActive(!item?.banned);
    }, [item?.banned]);

    const {mutateAsync: toggleBanStatus, isLoading} = useMutation(
        ({vendorId, productId, banned}) => {
            if (banned) {
                return VendorsService.banProduct(vendorId, productId);
            } else {
                return VendorsService.unbanProduct(vendorId, productId);
            }
        },
        {
            onSuccess: () => {
                if (onToggleSuccess) {
                    onToggleSuccess();
                }
                showSuccessAlert({});
            },
            onError: () => {
                // Revert on error - set back to original value
                setIsActive(!item?.banned);
                showErrorAlert({});
            },
        }
    );

    const handleToggle = (e) => {
        const newActiveValue = e.target.checked;
        const willBeBanned = !newActiveValue;

        setIsToggling(true);
        setIsActive(newActiveValue); // Optimistically update UI

        const title = translate("users.table.update-status") || "Are you sure you want to update the status?";

        MySwal.fire({
            title,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: translate("alert-modal.confirm-button") || "Yes",
            cancelButtonText: translate("alert-modal.deny-button") || "Cancel",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-warning ms-1",
            },
            buttonsStyling: false,
        }).then((result) => {
            setIsToggling(false);
            if (result.value) {
                toggleBanStatus({
                    vendorId,
                    productId: item.id,
                    banned: willBeBanned,
                });
            } else {
                // Revert on cancel
                setIsActive(!newActiveValue);
            }
        });
    };

    return (
        <div className='d-flex flex-column cursor-pointer'>
            <div className='form-switch form-check-primary cursor-pointer'>
                <Input
                    type='switch'
                    id={`switch-active-${item?.id}`}
                    name={`active-${item?.id}`}
                    checked={isActive}
                    className="cursor-pointer"
                    onChange={handleToggle}
                    disabled={isLoading || isToggling}
                />
            </div>
        </div>
    );
};

export default VendorProductBanToggle;

