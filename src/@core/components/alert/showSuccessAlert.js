import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const showSuccessAlert = ({title = 'Success!', description = 'process was done successfully'})=>{
    return MySwal.fire({
        icon: 'success',
        title,
        text:description,
        customClass: {
            confirmButton: 'btn btn-success'
        }
    })
}

export default showSuccessAlert;
