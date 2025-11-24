import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const PaginationStatusBar = ({ items ,page, total, rowsPerPage, onPaginate}) => {
    const {translate} = useLocaleContext();
    const [currentPage, setCurrentPage] = useState(page);
    const count = Math.ceil(Number(total / rowsPerPage));

    const handlePagination = (page) => {
        const newPage = page.selected + 1;
        setCurrentPage(newPage);
        onPaginate(newPage);
    };

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="mx-2 text-primary">
                {items?.length} {translate('table.paginate')} {total} {translate('table.total')}
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

export default PaginationStatusBar;
