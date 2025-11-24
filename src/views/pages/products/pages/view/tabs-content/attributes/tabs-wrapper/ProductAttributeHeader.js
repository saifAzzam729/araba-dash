import LoadingButton from "@mui/lab/LoadingButton";
import {Edit, Plus} from "react-feather";
import {Button} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomCan from "@components/Authorize/CustomCan";

function ProductAttributeHeader({openAddModal, isLoading, permissionName}) {
    const {translate, isRtl} = useLocaleContext()
    return (
        <div className='d-flex justify-content-center justify-content-sm-end gap-1 mb-1'>
            <CustomCan permissionName={permissionName}>
                <Button className='btn-icon' color='success'
                        onClick={openAddModal} outline>
                    <Plus size={14}/>
                    <span className=' ms-25'>{translate('product.common.add-attribute')}</span>
                </Button>
            </CustomCan>

            <CustomCan permissionName={permissionName}>
                <LoadingButton
                    size="medium"
                    type="submit"
                    className={`text-warning border-warning rounded fw-bold gap-${isRtl ? 1 : 0}`}
                    startIcon={<Edit size={14}/>}
                    loadingPosition="start"
                    loading={isLoading}
                    variant="outlined"
                >
                    {translate('forms.update')}
                </LoadingButton>
            </CustomCan>
        </div>
    )
}

export default ProductAttributeHeader
