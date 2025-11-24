import CreateColumn from "@components/table/CreateColumn";
import formatDescription from "@src/utility/helpers/formatDescription";
import React from "react";

const TitleColumn = CreateColumn({
    name: "Title",
    translateKey: 'notifications.common.title',
    cellCustomizationFunction: (row) => <span>{row.title}</span>,
});

const BodyColumn = CreateColumn({
    name: "Body",
    translateKey: 'notifications.common.body',
    cellCustomizationFunction: (row) => <span dangerouslySetInnerHTML={{ __html: row.body }}/>
});

export const createColumns = () => {
    return [
        TitleColumn,
        BodyColumn
    ]
}
