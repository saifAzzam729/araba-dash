import React from "react";
import {useDrag} from "react-dnd";


export default function ({draggedItem, children}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'ORDER',
        item: {id: draggedItem.id, refNumber: draggedItem.refNumber},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div ref={drag}>
            {children}
        </div>
    )
}