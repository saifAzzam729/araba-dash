import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const showErrorAlert = ({title = 'Error!', description = 'something went wrong'})=>{
    return MySwal.fire({
        icon: 'danger',
        title,
        text:description,
        customClass: {
            confirmButton: 'btn btn-danger'
        }
    })
}

export default showErrorAlert;
