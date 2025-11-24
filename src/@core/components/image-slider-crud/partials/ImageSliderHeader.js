import {Button, Col} from "reactstrap";
import {PlusCircle} from "react-feather";
import React from "react";
import {FormattedMessage} from "react-intl";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const SliderAddBtn = ({openAddModal}) => {
    const {translate} = useLocaleContext();

    return (
        <Button
            onClick={openAddModal}
            color="primary"
            className=" d-flex align-items-center "
            style={{gap: "0.5rem"}}
        >
            <PlusCircle size={20}/>
            {translate('table.add-slider')}
        </Button>
    )
}

const ImageSliderHeader = ({openAddModal}) => {
    return (
        <div
            className="actions-right d-flex align-items-center justify-content-end flex-lg-nowrap flex-wrap mt-lg-0 p-0"
        >
            <SliderAddBtn openAddModal={openAddModal}/>
        </div>
    )
}

export default ImageSliderHeader;
