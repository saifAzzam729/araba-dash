import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import React from "react";
import {Film} from "react-feather";

const MediaSliderThumbnailDisplayer = ({sliders, sliderIndex}) => {
    const isVideo = sliders[sliderIndex]?.type === "VIDEO";

    if (isVideo) {
        return <Film />
    }

    return (
        <img
            alt={sliders[sliderIndex]?.id}
            src={ParseImageUrl(sliders[sliderIndex]?.mediaFileUrl)}
            style={{width: '100%'}}
        />
    )
}

export default MediaSliderThumbnailDisplayer;