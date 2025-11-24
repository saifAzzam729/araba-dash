import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import showSuccessAlert from "./showSuccessAlert";

const MySwal = withReactContent(Swal);

const handleEndListMutation = (mutation, row) => {
    return MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, End List !",
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ms-1",
        },
        buttonsStyling: false,
    }).then(function (result) {
        if (result.value) {
            mutation(row)
            showSuccessAlert({description: res.message});

        }
    });
};

export default handleEndListMutation;
