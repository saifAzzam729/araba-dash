import React from 'react'
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";

export default function RawVideoSliderDisplay({
                                                  slider,
                                                  isOnScreen,
                                              }) {

    if (!isOnScreen) {
        return null;
    }

    return (
        <video width="100%"
               height={"300px"}
               controls
               preload="auto"
               muted
               autoPlay
               playsInline
               loop
            // className="object-cover w-full min-h-[420px] md:h-[500px] lg:min-h-[500px] xl:min-h-[550px]"
               className={"object-cover"}
        >
            <source src={ParseImageUrl(slider.mediaFileUrl)} type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>
    )
}
