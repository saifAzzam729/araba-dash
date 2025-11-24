import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import {Col, UncontrolledTooltip} from "reactstrap";
import {Edit, Trash} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomCan from "@components/Authorize/CustomCan";

function ProductImageViewer({image, openEditModal, onDelete, permissionObject}) {
    const {translate} = useLocaleContext();
    return (
        <Col className="d-flex flex-column gap-2 mt-1 p-3" xs={4}>
            <div className="flex-grow-1 d-flex align-items-center">
                <img src={ParseImageUrl(image.imageFileUrl)} width={"100%"}/>
            </div>
            <div className="d-flex justify-content-around m-auto w-50">
                <CustomCan permissionName={permissionObject?.delete}>
                    <UncontrolledTooltip target={`role-delete-${image.id}`}>
                        {translate('common.delete')}
                    </UncontrolledTooltip>
                    <Trash
                        onClick={() => onDelete(image)}
                        id={`role-delete-${image.id}`}
                        className="text-danger"
                    />
                </CustomCan>

                <CustomCan permissionName={permissionObject?.edit}>
                    <UncontrolledTooltip target={`role-edit-${image.id}`}>
                        {translate('common.update')}

                    </UncontrolledTooltip>
                    <Edit
                        onClick={() => {
                            openEditModal(image)
                        }}
                        id={`role-edit-${image.id}`}
                        className="text-warning"
                    />
                </CustomCan>

            </div>
        </Col>
    )
}

export default ProductImageViewer
