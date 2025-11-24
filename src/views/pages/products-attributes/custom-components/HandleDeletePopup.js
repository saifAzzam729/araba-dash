import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import showSuccessAlert from "@components/alert/showSuccessAlert";

const MySwal = withReactContent(Swal);

const handleDeletePopup = (mutation, row, successCb = ()=>{}) => {
    return MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ms-1",
        },
        buttonsStyling: false,
    }).then(function (result) {
        if (result.value) {
            mutation(row)
            successCb();
            showSuccessAlert({ description: result.message });

        }
    });
};

export default handleDeletePopup;
