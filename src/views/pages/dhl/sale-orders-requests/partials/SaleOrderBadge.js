import {Badge} from "reactstrap";
import React from "react";
import DropItemContainer from "@components/drag-and-drop/DropItemContainer";


export default function ({order}) {
    return (
        <DropItemContainer draggedItem={order}
        >
            <Badge
                color={'primary'}
                className={`m-1`}
                style={{
                    cursor: 'grab',
                    borderRadius: '20px',
                    padding: '10px 20px',
                }}

            >
                {order.refNumber}
            </Badge>
        </DropItemContainer>
    )
}