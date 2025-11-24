import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import {Link} from "react-router-dom";
import React from "react";

const ImageSliderImageDisplayer = ({slider}) => {
    return (
        <Link
            to={slider.mediaFileUrl ? ParseImageUrl(slider.mediaFileUrl) : "#"}
            target={slider.mediaFileUrl ? "_blank" : undefined}
            className="my-2 position-relative"
        >
            <img src={ParseImageUrl(slider.mediaFileUrl)} style={{ width: '100%', height: '300px', objectFit: 'cover' }}/>
        </Link>
    )
}
export default ImageSliderImageDisplayer;