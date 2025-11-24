import {Button, CardHeader, Label} from "reactstrap";
import {Edit, Trash} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import React from "react";
import {Link} from "react-router-dom";
import CustomCan from "@components/Authorize/CustomCan";

export default function FormHeader({onDelete = () => null, iconFileUrl, editPermissionName, deletePermissionName}) {
    const {translate} = useLocaleContext();
    return (<CardHeader className='pb-2 justify-content-between gap-25 gap-sm-0'>
        <div className='d-flex align-items-center mb-lg-0 m-auto m-sm-0 '>

            <Link
                to={ParseImageUrl(iconFileUrl) ?? "#"}
                target={iconFileUrl ? "_blank" : undefined}
            >
                <Avatar
                    className='me-75'
                    src={ParseImageUrl(iconFileUrl)}
                    sx={{width: 50, height:50}}
                />
            </Link>
            <h3 className='card-title text-primary font-large-1'>
                {translate('product-attribute.forms.main-details')}
            </h3>
        </div>


        <div className="d-flex align-items-center justify-content-between m-auto m-sm-0 gap-2">
            <CustomCan permissionName={deletePermissionName}>
            <Button className='btn-icon' color='danger'
                    onClick={onDelete} outline>
                <Trash size={14}/>
                <span className='d-none d-sm-inline ms-25'>{translate('common.delete')}</span>
            </Button>
            </CustomCan>

            <CustomCan permissionName={editPermissionName}>
                <Button className='btn-icon' color='warning' outline type={"submit"}>
                    <Edit size={14}/>
                    <span className='d-none d-sm-inline ms-25'>{translate('common.update')}</span>
                </Button>
            </CustomCan>
        </div>
        </CardHeader>)
}
