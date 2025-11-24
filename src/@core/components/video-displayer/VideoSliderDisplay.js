import React from 'react'
import ReactPlayer from 'react-player/lazy'
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";

export default function VideoSliderDisplay({
                                               slider,
                                               isOnScreen,
                                             }) {

    if(!isOnScreen){
        return null;
    }

    return (<ReactPlayer
            url={ParseImageUrl(slider.mediaFileUrl)}
            className="react-player"
            playing={!!isOnScreen}
            muted={!!isOnScreen}
            controls={true}
            width="100%"
            height="300px"
        />)
}