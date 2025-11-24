import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import showSuccessAlert from "./showSuccessAlert";
import showErrorAlert from "@components/alert/showErrorAlert";

const MySwal = withReactContent(Swal);

const handleToggle = (itemId, newValue, setValueCb, toggleItemCb) => {
    const isTogglingOn = !!newValue;

    const title = isTogglingOn ? "Are you sure you want to toggle on ?" : "Are you sure you want to toggle off ?"
    return MySwal.fire({
        title,
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-warning ms-1",
        },
        buttonsStyling: false,
    }).then(function (result) {
        if (result.value) {
            toggleItemCb(itemId, newValue).then(() => {
                setValueCb(newValue)
                showSuccessAlert({});
            })
                .catch((e) => {
                    showErrorAlert({})
                })
        }
    });
};

export default handleToggle;
