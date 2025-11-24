import useTable from "@components/table/useTable";
import BreadCrumbs from "@components/breadcrumbs";
import TableBase from "@components/table/TableBase";
import {createColumns} from "@src/views/pages/Reports/user-detail-report/columns";
import {useQuery} from "react-query";
import ReportsServices from "@src/common/services/ReportsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import ReportsFiltersAccordion from "../partials/filters/ReportsFiltersAccordion";
import { Col, Row } from "reactstrap";
import useReportsFilterQueryParamsListener from "../partials/filters/hooks/useReportsFilterQueryParamsListener";
import formatDateToISO from "@src/utility/helpers/formatDateToISO";


export default function UserDetailsReportsPage() {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const REPORTS_KEY = 'user-details'

    const {
      items,
      totalItemsCount,
      currentPage,
      searchTerm,
      filters,
      updateItems,
      updateTotalItemsCount,
      updateCurrentPage,
      updateSearch,
      updateFilters,
    } = useTable();    

    useReportsFilterQueryParamsListener({
      updateParamsObject: updateFilters,
    });

    const { isError, isLoading } = useQuery(
      [
        "user-details-report",
        currentPage,
        searchTerm,
        filters,
        preferredTableContentLocale,
      ],
      () => ReportsServices.getPaginatedReportData({
          url: REPORTS_KEY,
          page: currentPage,
          search: searchTerm,
          locale: preferredTableContentLocale,
          fromDate: filters.fromDate && formatDateToISO(filters.fromDate),
          toDate: filters.toDate && formatDateToISO(filters.toDate),
        }),
      {
        onSuccess: ({ pagination: { items, page, pages, totalItems } }) => {
          updateItems(items);
          updateTotalItemsCount(totalItems);
          updateCurrentPage(page);
        },
      }
    );


    const COLUMNS = createColumns()

    if (isError) {
      return <Error />;
    }


    return (
      <>
        <BreadCrumbs title={"user-details"} data={[]} />
        <Row>
          <Col md={12}>
            <ReportsFiltersAccordion url={REPORTS_KEY} />
          </Col>
        </Row>

        <TableBase
          columns={COLUMNS}
          data={items}
          onPaginate={(page) => {
            updateCurrentPage(page);
          }}
          page={currentPage}
          total={totalItemsCount}
          searchTerm={searchTerm}
          onSearch={updateSearch}
          isLoading={isLoading}
          defaultActionButtons={false}
          // permissionObject={permissionObject}
        />
      </>
    );
}