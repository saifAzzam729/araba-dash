import styles from "./InventoryExample.module.css";
import {AgGridReact} from 'ag-grid-react';
import React, {useCallback, useMemo, useRef, useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import translateSortableTableColumns from "@src/utility/helpers/translateSortableTableColumns";
import generateStandardActionColumn from "@components/sortable-table/generateStandardActionColumn";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {ModuleRegistry} from "@ag-grid-community/core";
import PaginationStatusBar from "@components/detailed-table/PaginationStatusBar";
import 'ag-grid-enterprise';
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {RangeSelectionModule} from "@ag-grid-enterprise/range-selection";
import {StatusBarModule} from "@ag-grid-enterprise/status-bar";
import {MasterDetailModule} from "@ag-grid-enterprise/master-detail";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {RowGroupingModule} from "@ag-grid-enterprise/row-grouping";
import {Button, Col, Row} from "reactstrap";
import {Maximize2} from "react-feather";
import useExpandCollapseAll from "@components/detailed-table/useExpandAllColumns";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RangeSelectionModule,
    StatusBarModule,
    MasterDetailModule,
    MenuModule,
    ColumnsToolPanelModule,
    RowGroupingModule,
]);


export default function DetailedTableBase({
                                              columns,
                                              items,
                                              detailedColumns = [],
                                              detailedTableData = null,
                                              rowHeight = 100,
                                              onAdd = null,
                                              onEdit = null,
                                              onDelete = null,
                                              onView = null,
                                              onGoToProfile = null,
                                              onShipment = null,
                                              onCheckValid = null,
                                              permissionObject = null,
                                              defaultActionButtons = true,
                                              page,
                                              onPaginate,
                                              total,
                                              rowSelection,
                                              handleSelectChange,
                                              isDataLoading,
                                              onSortChanged,
                                              expandButton,
                                              externalRef
                                          }) {
    const gridRef = useRef(null);
    const containerStyle = useMemo(() => ({width: "100%", height: "100%"}), []);
    const gridStyle = useMemo(() => ({height: "80vh", width: "100%", overflowY: 'auto'}), []);

    const {expandCollapseAll, isExpanded} = useExpandCollapseAll(externalRef || gridRef);


    const autoSizeAllColumns = useCallback(() => {
        const allColumnIds = [];
        gridRef.current.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current.columnApi.autoSizeColumns(allColumnIds);
    }, []);


    const limit = 100
    const {translate, isRtl} = useLocaleContext();
    const [rowsPerPage, setRowsPerPage] = useState(limit);

    const selectionColumnDef = useMemo(() => ({
        sortable: false,
        width: 120,
        maxWidth: 120,
        suppressHeaderMenuButton: false,
        pinned: "left",
    }), []);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        resizable: true,
        sortable: true,
        type: isRtl ? "rightAligned" : "leftAligned",
        cellStyle: {
            textAlign: 'center',
            justifyContent: isRtl ? 'flex-end' : 'flex-start',
            alignItems: 'center',
        }
    }), [isRtl]);

    const autoSizeStrategy = useMemo(() => ({type: "fitCellContents"}), []);


    // const expandCollapseAll = useCallback(() => {
    //     gridRef.current.api.forEachNode((node) => {
    //         node.setExpanded(true);
    //     });
    //     gridRef.current.api.onGroupExpandedOrCollapsed();
    // }, []);


    const onGridReady = useCallback((params) => {
        autoSizeAllColumns();

    }, [autoSizeAllColumns]);

    const detailCellRendererParams = useMemo(() => ({
        detailGridOptions: {
            columnDefs: translateSortableTableColumns([...detailedColumns], translate),
            defaultColDef: {flex: 1, resizable: false},
            rowHeight: 80,
            enableRtl: isRtl,
            sort: true
        },

        getDetailRowData: (params) => {
            params.successCallback(params.data.saleOrderItems);
        },
    }), [detailedColumns, translate, isRtl]);

    const ActionColumn = generateStandardActionColumn({
        onView,
        onEdit,
        onDelete,
        onAdd,
        onGoToProfile,
        permissionObject,
        onShipment,
        onCheckValid
    });

    const combinedColumns = useMemo(() => {
        const actionColumns = defaultActionButtons ? [ActionColumn] : [];
        return translateSortableTableColumns([...columns, ...actionColumns], translate);
    }, [columns, ActionColumn, translate]);

    const statusBar = useMemo(() => ({
        statusPanels: [
            {
                statusPanel: PaginationStatusBar,
                statusPanelParams: {
                    items,
                    page,
                    total,
                    rowsPerPage,
                    onPaginate,
                },
            },
        ],
    }), [page, total, rowsPerPage, onPaginate]);
    

    return (
        <div className={styles.wrapper}>
            {
                expandButton &&
                <Row>
                    <Col md={12} className={'d-flex justify-content-end'}>
                        <Button color={'link'} onClick={() => expandCollapseAll()}>
                            <Maximize2 size={15} className={'me-1'}/>
                            {isExpanded ? translate('common.collapse-all') : translate('common.expand-all')}
                        </Button>

                    </Col>
                </Row>
            }
            <div className={styles.container}>
                <div className={styles.exampleHeader}>
                    <div style={containerStyle}>
                        <div style={gridStyle} className={"ag-theme-quartz"}>
                            <AgGridReact
                                ref={externalRef || gridRef}
                                columnDefs={combinedColumns}
                                rowData={items}
                                rowSelection={rowSelection}
                                rowMultiSelectWithClick={false}
                                suppressRowClickSelection={true}
                                loading={isDataLoading}
                                rowHeight={rowHeight}
                                defaultColDef={defaultColDef}
                                selectionColumnDef={selectionColumnDef}
                                onSelectionChanged={handleSelectChange}
                                masterDetail={true}
                                detailCellRendererParams={detailCellRendererParams}
                                domLayout={"normal"}
                                autoSizeStrategy={autoSizeStrategy}
                                detailRowAutoHeight={true}
                                enableRtl={isRtl}
                                frameworkComponents={{PaginationStatusBar}}
                                onGridReady={onGridReady}
                                statusBar={statusBar}
                                noRowsOverlayComponent={NoRowComponent}
                                onSortChanged={onSortChanged}
                                enableCellTextSelection="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NoRowComponent() {
    return <></>;
}