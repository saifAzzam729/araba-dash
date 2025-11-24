import {Badge, Card, CardBody, CardText, CardTitle, UncontrolledTooltip} from "reactstrap";
import {Edit, Eye, Layout, Trash} from "react-feather";
import {Link} from "react-router-dom";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomCan from "@components/Authorize/CustomCan";

function ProductGroupViewCard({
                                  item ,
                                  onEdit = null ,
                                  onDuplicate = null ,
                                  onDelete = null,
                                  editBtnText= "edit-item",
                                  deleteBtnText = "delete-item",
                                  permissionObject = {}
}) {
    const {translate} = useLocaleContext();


    function getName(){
        try{
            return `${item.translations.en.name} - ${item.translations.ar.name}`
        }catch (e) {
            return item.name
        }
    }

    return (
        <Card className='card-app-design bg-white card-developer-meetup h-100'>
            <CardBody className='pb-0'>
                <div className='d-flex justify-content-end align-items-center gap-1 mb-1'>
                    {onEdit && <CustomCan permissionName={permissionObject?.edit}>
                        <Link
                        to="#"
                        className="role-edit-modal"
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit(item);
                        }}
                    >
                        <UncontrolledTooltip target={`item-cpy-icn-${item.id}`}>
                            {translate(`action-buttons.${editBtnText}`)}
                        </UncontrolledTooltip>
                        <Badge color='light-warning'><Edit className="font-medium-1 text-warning" id={`item-cpy-icn-${item.id}`} size={10}/></Badge>
                    </Link>
                    </CustomCan>
                    }

                    {onDelete &&
                        <CustomCan permissionName={permissionObject?.delete}>
                            <Link
                            to="#"
                            className="role-edit-modal"
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete(item);
                            }}
                        >
                            <UncontrolledTooltip target={`item-delete-icn-${item.id}`}>
                                {translate(`action-buttons.${deleteBtnText}`)}
                            </UncontrolledTooltip>
                            <Badge color='light-danger'><Trash className="font-medium-1 text-danger" id={`item-delete-icn-${item.id}`} size={10}/></Badge>
                            </Link>
                        </CustomCan>
                    }
                </div>

                <div className='meetup-header d-flex align-items-center'>
                    <div className='meetup-day'>
                        <Layout size={50} />
                    </div>
                    <div className='my-auto'>
                        <CardTitle tag='h4' className='mb-25'>
                            {getName()}
                        </CardTitle>
                        <CardText className='mb-0'>publish</CardText>
                    </div>
                </div>

                <div className='design-group mb-0 pt-50'>
                    <h6 className='section-label mb-1'>{translate('product-group.common.product-attributes')}</h6>
                    <div className='d-flex gap-1 flex-wrap'>
                        {item.attributes.map((it) => {
                            return (
                                <Badge className='' color='light-primary' key={it.id}>{it.name}</Badge>
                            )
                        })}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}


export default ProductGroupViewCard;
