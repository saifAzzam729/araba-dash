import {
    Badge,
    Card,
    CardBody,
    CardText,
    UncontrolledTooltip
} from "reactstrap";
import {Check, Edit} from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomCan from "@components/Authorize/CustomCan";
import useCopy from "@hooks/useCopy";

function WebsiteThemeCard({theme, openEditModal, permissionObject={}}) {
    const {translate} = useLocaleContext();

    const {isCopied, onCopyClicked} = useCopy(theme.value);

    const colorDescription = theme?.description.split(",").map(description => description.trim());

    return(
        <Card className='flex-row bg-white position-relative' style={{height: '100%'}}>
            <div className='item-options text-center px-2'>
                <div className='item-wrapper d-flex flex-column align-items-center justify-content-center h-100'>
                    {isCopied &&
                        <Badge className={'position-absolute'} style={{top: "5%",paddingTop: '6px', lineHeight:'1.1'}} color='light-warning' pill>
                            <Check size={12} className='align-middle me-25' />
                            <span className='align-middle'>{translate('common.copied')}</span>
                        </Badge>
                    }

                    <div className={'rounded border cursor-pointer' } onClick={onCopyClicked} style={{width: '30px', height: '30px', backgroundColor: `${theme.value}` }}></div>
                    <CardText className='shipping mt-1'>
                        <Badge color='light-success cursor-pointer' style={{paddingTop: '6px'}} pill onClick={onCopyClicked}>
                            {theme.value}
                        </Badge>
                    </CardText>

                </div>
            </div>

            <CustomCan permissionName={permissionObject?.edit}>
                <span
                    className={`cursor-pointer mx-1 text-warning position-absolute end-0`}
                    style={{top: '10%'}}
                    onClick={() => openEditModal(theme)}
                    id={`edit-theme-tooltip`}
                >
                     <Edit size={17} />

                </span>

                <UncontrolledTooltip
                    placement="top"
                    target={`edit-theme-tooltip`}
                >
                    {translate(`common.Edit`)}
                </UncontrolledTooltip>
            </CustomCan>

            <CardBody className="d-flex flex-column justify-content-center">
                <div className='item-name mb-1'>
                    <span>
                        {theme.settingKey}
                    </span>
                </div>
                <span className='d-flex flex-wrap align-items-center' style={{gap: '10px'}}>
                    {colorDescription.map((desc) => {
                        return (
                            <Badge color='light-primary' style={{paddingTop: '6px'}} pill>
                                {desc}
                            </Badge>
                        )
                    })}
                </span>
            </CardBody>
        </Card>
    )
}

export default WebsiteThemeCard
