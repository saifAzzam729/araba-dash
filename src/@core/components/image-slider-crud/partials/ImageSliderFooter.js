import React from "react";
import {UncontrolledTooltip} from "reactstrap";
import {Edit, Eye, Trash, X} from "react-feather";
import formatDescription from "@src/utility/helpers/formatDescription";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomCan from "@components/Authorize/CustomCan";


const SliderActionBtns = ({onDelete, openEditPage, openViewPage, slider, permissionObject={}}) => {
    const {translate} = useLocaleContext()

    return (
        <>
            <CustomCan permissionName={permissionObject?.delete}>
                <UncontrolledTooltip target={`item-trash-${slider.id}`}>
                    {translate('action-buttons.delete')}
                </UncontrolledTooltip>
                <a>
                    <div className='avatar avatar-stats p-50 m-0 bg-light-danger'>
                        <div className="avatar-content">
                            <Trash
                            onClick={() => onDelete(slider)}
                            id={`item-trash-${slider.id}`}
                            className="text-danger"
                        />
                        </div>
                    </div>
                </a>
            </CustomCan>

            <CustomCan permissionName={permissionObject?.edit}>
                <UncontrolledTooltip target={`item-edit-${slider.id}`}>
                    {translate('action-buttons.edit')}
                </UncontrolledTooltip>
                <a>
                    <div className='avatar avatar-stats p-50 m-0 bg-light-warning'>
                        <div className="avatar-content">
                            <Edit
                                onClick={() => { openEditPage(slider) }}
                                id={`item-edit-${slider.id}`}
                                className="text-warning"
                            />
                        </div>
                    </div>
                </a>
            </CustomCan>

            <CustomCan permissionName={permissionObject?.view}>
                <UncontrolledTooltip target={`item-view-${slider.id}`}>
                    {translate('action-buttons.view')}
                </UncontrolledTooltip>
                <a>
                    <div className='avatar avatar-stats p-50 m-0 bg-light-info'>
                        <div className="avatar-content">
                            <Eye
                                onClick={() => { openViewPage(slider) }}
                                id={`item-view-${slider.id}`}
                                className="text-info"
                            />
                        </div>
                    </div>
                </a>
            </CustomCan>
        </>
    )
}

const SliderInfo = ({slider}) => {
    const {translate} = useLocaleContext();
    return (
        <>
            <div className='d-flex justify-content-around flex-column'>
                <p className="fs-5 text-body mb-1 m-0">{translate('sliders.list.title')}: <span className="fs-4 text-black d-inline-block" dangerouslySetInnerHTML={{ __html: formatDescription(slider?.title) }}/></p>
                <p className="fs-5 text-body mb-1 m-0">{translate('sliders.list.link')}: <a href={slider?.link} className="fs-4 text-primary">{slider?.link}</a></p>
            </div>
        </>
    )
}
const ImageSliderFooter = ({slider, onDelete, openEditPage, openViewPage, permissionObject}) => {
  return (
      <div className="d-flex justify-content-around align-items-center m-auto mt-2 flex-col-m h-100">
          <div className="d-flex flex-column flex-grow-1 w-100">
              <SliderInfo slider={slider}/>
          </div>
          <div className="d-flex gap-1 w-100 justify-content-center">
              <SliderActionBtns slider={slider} onDelete={onDelete} openEditPage={openEditPage} openViewPage={openViewPage} permissionObject={permissionObject}/>
          </div>
      </div>
  )
}

export default ImageSliderFooter;
