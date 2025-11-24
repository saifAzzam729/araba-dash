import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const showNotification = ({title = 'Success!', description = 'process was done successfully'})=>{
    return MySwal.fire({
        position: "top-end",
        title,
        text:title,
        html: description,
        showConfirmButton: false,
        timer: 1500
    })
}

export default showNotification;
