import {Button, Card, Col, Row, Input} from "reactstrap";
import React, {useState} from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {PlusCircle} from "react-feather";
import generateStandardActionColumn from "./partials/generateStandardActionColumn";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {useLocaleContext} from "@src/providers/LocaleProvider";
import translateColumns from "@src/utility/helpers/translateColumns";
import CustomCan from "@components/Authorize/CustomCan";
import useWindowSize from "@hooks/useWindowSize";

const CustomHeader = ({onAdd = null, onSearch = null, searchTerm, permissionName}) => {
    const {translate} = useLocaleContext();


    return (
        <div className="invoice-list-table-header w-100 py-2">
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

export default function ({
                             columns,
                             onPaginate,
                             data,
                             total,
                             page,
                             defaultActionButtons = true,
                             onAdd = null,
                             onEdit = null,
                             onDelete = null,
                             onView = null,
                             onSearch = null,
                             onGoToProfile = null,
                             isLoading = false,
                             searchTerm = null,
                             headCellJustification = 'center',
                             bodyCellJustification = 'center',
                             permissionObject = null, // if not passed => no authorization applied
                             noDataComponent,
                             customLimit
                         }) {
    // ** Store vars
    const limit = customLimit ?? 10
    // ** States
    const [currentPage, setCurrentPage] = useState(page);
    const [rowsPerPage, setRowsPerPage] = useState(limit);

    const handlePagination = (page) => {
        const newPage = page.selected + 1;
        setCurrentPage(newPage);
        onPaginate(newPage);
    };

    const ActionColumn = generateStandardActionColumn({
        onView,
        onEdit,
        onDelete,
        onAdd,
        onGoToProfile,
        permissionObject
    });

    const CustomPagination = () => {
        // const count = Number((total / rowsPerPage).toFixed(0))
        const count = Math.ceil(Number(total / rowsPerPage));
        const {translate} = useLocaleContext();
        return (
            <div className="d-flex justify-content-between align-items-center">
                <div className="mx-2 text-primary">
                    {data.length} {translate('table.paginate')} {total} {translate('table.total')}
                </div>
                <ReactPaginate
                    nextLabel=""
                    breakLabel="..."
                    previousLabel=""
                    pageCount={count || 1}
                    activeClassName="active"
                    breakClassName="page-item"
                    pageClassName={"page-item"}
                    breakLinkClassName="page-link"
                    nextLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                    nextClassName={"page-item next"}
                    previousLinkClassName={"page-link"}
                    previousClassName={"page-item prev"}
                    onPageChange={(page) => handlePagination(page)}
                    forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                    containerClassName={
                        "pagination react-paginate justify-content-end p-1"
                    }
                />
            </div>
        );
    };


    if (isLoading) {
        return (
            <Stack className="d-flex align-items-center justify-content-center mt-5"
                   sx={{color: 'grey.500', margin: 'auto'}} direction="row">
                <CircularProgress color="secondary"/>
            </Stack>
        );
    }
    const customStyles = {
        headCells: {
            style: {
                justifyContent: headCellJustification
            },
        },
        cells: {
            style: {
                justifyContent: bodyCellJustification

            },
        },
    };

    const {translate} = useLocaleContext();

    const {width} = useWindowSize();

    return (
        <div className="invoice-list-wrapper">
            <Card>
                <div className="invoice-list-dataTable react-dataTable">
                    <DataTable
                        noHeader
                        pagination
                        sortServer
                        // onSort={(row)=>{
                        // 	alert(JSON.stringify(row))
                        // }}

                        paginationServer
                        subHeader={true}
                        columns={
                            defaultActionButtons ? translateColumns([...columns, ActionColumn], translate) : translateColumns(columns, translate)
                        }
                        data={data}
                        className={`react-dataTable ${data.length === 1 ? 'mb-3-one-item' : ''}`}
                        paginationDefaultPage={currentPage}
                        paginationComponent={CustomPagination}
                        subHeaderComponent={
                            <CustomHeader permissionName={permissionObject?.add} onAdd={onAdd} onSearch={onSearch}
                                          searchTerm={searchTerm}/>
                        }
                        customStyles={customStyles}
                        noDataComponent={noDataComponent}
                    />
                </div>
            </Card>
        </div>
    );

}
