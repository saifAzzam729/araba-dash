import React from 'react';
import {useDrop} from 'react-dnd';

const DragItemContainer = ({item, addItemToContainer, children}) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'ORDER',
        drop: (dragItem) => addItemToContainer(dragItem, item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                backgroundColor: isOver ? '#003C47' : 'white',
                opacity: isOver ? '70%' : '100%',
                padding: '15px',
                border: '1px solid lightgray',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '200px',
                height: '250px',
                transition: 'background-color 0.3s, opacity 0.3s',
                overflowY: "auto"
            }}
        >
            {children}
        </div>
    );
};

export default DragItemContainer;
