import Swal from 'sweetalert2'

const showBottomAlert = ({description = 'process was done successfully'})=>{
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    return Toast.fire({
        icon: "success",
        title: description
    });
}

export default showBottomAlert;
