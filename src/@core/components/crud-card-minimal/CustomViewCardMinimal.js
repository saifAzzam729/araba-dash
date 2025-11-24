import {Card, CardBody, UncontrolledTooltip} from "reactstrap";
import {Link} from "react-router-dom";
import {Trello, FileText, Shield, Layers, Trash, Layout, Edit, Eye, Copy} from "react-feather";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import Avatar from "@mui/material/Avatar";
import CustomCan from "@components/Authorize/CustomCan";

export default function CustomViewCardMinimal({
                                                  item,
                                                  onEdit = null,
                                                  onDuplicate = null,
                                                  onDelete = null,
                                                  onView = null,
                                                  editBtnText = 'Edit Item',
                                                  duplicateTooltipText = 'Duplicate Item',
                                                  deleteBtnText = 'Delete Item',
                                                  viewBtnText = 'View Item',
                                                  topRightChildren = null,
                                                  withIconChild = true,
                                                  iconChild = <Layout size={50} />,
                                                    itemSubText = false,
    permissionObject={}
                                              }) {
    const SETTINGS_OBJECTS = {
        PRIVACY_POLICY: {
            title:"Privacy Policy",
            icon:"shield"
        },
        TERMS_AND_CONDITIONS:{
            title: "Terms and Conditions",
            icon: "file-text"
        },
        OUR_STORY:{
            title:"Our Story",
            icon:"trello",
        },
        CATEGORY_SECTION:{
            title:"Category Section",
            icon:"layers"
        },
        SUB_HERO_SECTION:{
            title:"Sub Hero Section",
            icon:"layout"
        }
    }
    const keys = Object.keys(SETTINGS_OBJECTS)
    let setting = null

    for (let i = 0; i <= Object.keys(SETTINGS_OBJECTS).length; i++) {
        if (keys[i] === item.settingKey) {
            setting = SETTINGS_OBJECTS[item.settingKey]
        }
    }
    return (
        <Card className="text-center">
            <CardBody>
                <div className="d-flex justify-content-between">
                    <div>
                        {topRightChildren}
                        {onView &&
                            <CustomCan permissionName={permissionObject?.view}>
                                <Link
                                to="#"
                                className="role-edit-modal"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onView(item);
                                }}
                                >
                                    <UncontrolledTooltip target={`item-cpy-icn-${item.id}`}>
                                        {viewBtnText}
                                    </UncontrolledTooltip>
                                    <Eye className="font-medium-5 text-primary" size={17} />
                                </Link>
                            </CustomCan>
                            }
                    </div>
                    <div>
                        {onEdit &&
                            <CustomCan permissionName={permissionObject?.edit}>
                                <Link
                                to="#"
                                className="role-edit-modal"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onEdit(item);
                                }}
                                >
                                    <UncontrolledTooltip target={`item-cpy-icn-${item.id}`}>
                                        {editBtnText}
                                    </UncontrolledTooltip>
                                    <Edit className="font-medium-5 text-warning" id={`item-cpy-icn-${item.id}`} size={17}/>
                                </Link>
                            </CustomCan>
                        }
                    </div>
                </div>
                {withIconChild ? (
                    <div className={`avatar p-50 m-0 mb-1  bg-light-primary`}>
                        <div className="avatar-content">
                            {iconChild}
                        </div>
                    </div>
                ) : (
                    <Link
                        to={item.imageFileUrl ? ParseImageUrl(item.imageFileUrl) : "#"}
                        target={item.imageFileUrl ? "_blank" : undefined}
                        className="my-2 d-inline-block"
                    >
                        <img alt={item.imageFileName} src={ParseImageUrl(item.imageFileUrl)} height={'40px'}/>
                    </Link>
                )

                }

                <h2 className="fw-bolder">{setting ? setting.title : item.name}</h2>
                {itemSubText &&
                    <p>{item.description} description</p>
                }
                <div className="card-text line-ellipsis">
                    <div className="d-flex justify-content-between align-items-center mt-1 pt-25">
                        <div>
                            {onDuplicate &&
                                <CustomCan permissionName={permissionObject?.add}>
                                    <Link
                                    to=""
                                    className="text-success me-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDuplicate(item);
                                    }}
                                    >
                                        <UncontrolledTooltip target={`item-cpy-icn-${item.id}`}>
                                            {duplicateTooltipText}
                                        </UncontrolledTooltip>
                                        <Copy className="font-medium-5 text-success" id={`item-cpy-icn-${item.id}`}/>
                                    </Link>
                                </CustomCan>
                            }
                        </div>

                        <div>
                            {onDelete &&
                                <CustomCan permissionName={permissionObject?.delete}>
                                    <Link
                                    to=""
                                    className="text-danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete(item);
                                    }}
                                    >
                                        <UncontrolledTooltip target={`item-trash-icn-${item.id}`}>
                                            {deleteBtnText}
                                        </UncontrolledTooltip>
                                        <Trash
                                            className="font-medium-5 text-danger"
                                            id={`item-trash-icn-${item.id}`}
                                        />
                                    </Link>
                                </CustomCan>
                            }
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>

    );
}
