import {AgGridReact} from "ag-grid-react";
import React, {useCallback, useMemo, useRef} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import generateStandardActionColumn from "@components/sortable-table/generateStandardActionColumn";
import translateSortableTableColumns from "@src/utility/helpers/translateSortableTableColumns";
import "./style.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {Button, Card, Col, Row} from "reactstrap";
import CustomCan from "@components/Authorize/CustomCan";
import {PlusCircle} from "react-feather";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import 'ag-grid-enterprise';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RangeSelectionModule,
]);

export default function SortableTable({
                                          columns = [],
                                          items,
                                          rowDragManaged = true,
                                          rowHeight = 50,
                                          reorderingTable,
                                          onAdd = null,
                                          onEdit = null,
                                          onDelete = null,
                                          onView = null,
                                          onSearch = null,
                                          searchTerm = null,
                                          onGoToProfile = null,
                                          permissionObject = null,
                                          defaultActionButtons = true,
                                          onOrderChange = null
                                      }) {
    const gridRef = useRef();
    const {translate, isRtl} = useLocaleContext();

    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);


    const defaultColDef = useMemo(() => {
        return {
            resizable: false,
            flex: 1,
            minWidth: 100,
            sortable: false,
            type: isRtl ? "rightAligned" : "leftAligned",
            rowDrag: false, // should pass it for one column
            cellStyle: {
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: 'center'

            },
        };
    }, []);

    const ActionColumn = generateStandardActionColumn({
        onView,
        onEdit,
        onDelete,
        onAdd,
        onGoToProfile,
        permissionObject,
    });

    const orderingColumn = {
        field: "sort",
        rowDrag: true,
        headerName: 'sort',
        translateKey: 'common.sort',
        cellStyle: {
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: 'center'
        },
        maxWidth: 100,
    };

    const combinedColumns = useMemo(() => {
        // const translatedColumns = translateSortableTableColumns(columns, translate);
        const actionColumns = defaultActionButtons ? [ActionColumn] : [];
        return translateSortableTableColumns([orderingColumn, ...columns, ...actionColumns], translate);
    },
        [columns, defaultActionButtons, ActionColumn]);


    const sortedItems = useMemo(() => {
        return [...items]
            .filter(item => !item.base)
            .sort((a, b) => a.sortOrder - b.sortOrder);
    }, [items]);


    const pinnedBottomRowData = useMemo(() => {
        if (items.length > 0) {
            const bottomRow = items.find(item => item?.base === true) || {};
            return [bottomRow];
        }
        return [];
    }, [items]);


    const onRowDragEnd = useCallback(
        (event) => {
            const {node, overIndex} = event;
            const movedItem = node.data;
            const newItems = [...sortedItems];
            newItems.splice(newItems.indexOf(movedItem), 1);
            newItems.splice(overIndex, 0, movedItem);
            reorderingTable(newItems);
            gridRef.current.api.clearFocusedCell();
            if (onOrderChange) {
                onOrderChange(newItems)
            }
        },
        [sortedItems, reorderingTable]
    );


    return (
        <>
            <CustomHeader
                permissionName={permissionObject?.add}
                onAdd={onAdd}
                onSearch={onSearch}
                searchTerm={searchTerm}
            />
            <div className="example-wrapper">
                <div
                    style={{width: '100%', height: '100%'}}
                    className={
                        'grid-wrapper ' +
                        "ag-theme-quartz"
                    }
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={sortedItems}
                        rowHeight={rowHeight}
                        columnDefs={combinedColumns}
                        rowDragManaged={rowDragManaged}
                        onRowDragEnd={onRowDragEnd}
                        defaultColDef={defaultColDef}
                        domLayout={"autoHeight"}
                        enableRtl={isRtl}
                        pinnedBottomRowData={pinnedBottomRowData}
                        noRowsOverlayComponent={NoRowComponent}
                    />
                </div>

            </div>


        </>
    );
}


const CustomHeader = ({onAdd = null, onSearch = null, searchTerm, permissionName}) => {
    const {translate} = useLocaleContext();


    return (
        <div className="invoice-list-table-header w-100 py-2 pt-0">
            <Row>
                <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
                    {onSearch && (
                        <>
                            <input
                                type="text"
                                className="form-control w-50"
                                placeholder={translate('common.search')}
                                onKeyDown={(e) => {
                                    if (e.keyCode == 13) {
                                        onSearch(e.target.value);
                                    }
                                }}
                                defaultValue={searchTerm}
                                ref={(input) => {
                                    if (input) {
                                        input.value = searchTerm;
                                    }
                                }}
                            />
                            <button className="btn btn-light mx-1" onClick={() => {
                                onSearch('');
                            }}>
                                {translate('table.clear')}
                            </button>
                        </>
                    )}
                </Col>
                <Col
                    lg="6"
                    className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
                >
                    {onAdd && (
                        <CustomCan permissionName={permissionName}>
                            <Button
                                onClick={() => {
                                    onAdd();
                                }}
                                color="primary"
                                className=" d-flex align-items-center "
                                style={{gap: "0.5rem"}}
                            >
                                <PlusCircle size={20}/>
                                {translate('table.add-btn')}
                            </Button>
                        </CustomCan>
                    )}
                </Col>
            </Row>
        </div>
    );
};


function NoRowComponent() {
    return (
        <></>
    );
}