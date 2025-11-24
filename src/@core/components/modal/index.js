import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";


const CustomModal = ({
                         isOpen, closeModal, children, header = '', description = '',
                         translatedHeader = null,
                         size = 'lg'
                     }) => {
    const {translate} = useLocaleContext();


    const finalTranslation = translatedHeader ?? translate(`common.${header}`);

    return (
        <Modal isOpen={isOpen} toggle={closeModal} className={`modal-dialog-centered modal-${size}`}>
            <ModalHeader className='bg-transparent' toggle={closeModal}></ModalHeader>
            <ModalBody className='px-sm-5 mx-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>{finalTranslation}</h1>
                    {description && <p>{description}</p>}
                </div>

                {children}
            </ModalBody>
        </Modal>

    )
}

export default CustomModal;
