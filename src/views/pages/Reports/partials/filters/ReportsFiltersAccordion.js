import FilterAccordion from "@components/filter-accordion";
import {FormProvider, useForm} from "react-hook-form";
import useQueryParams from '@hooks/useQueryParams'
import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import FromDateFilter from "./partials/FromDateFilter";
import ToDateFilter from "./partials/ToDateFilter";
import { useQuery } from "react-query";
import ReportsServices from "../../../../../common/services/ReportsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import URLS from "@src/common/urls";
import { TbFileTypeCsv, TbFileTypePdf } from "react-icons/tb";
import CircularProgress from "@mui/material/CircularProgress";  


export default function ReportsFiltersAccordion({url}) {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(true);
  const [isPdfDownloadEnabled, setIsPdfDownloadEnabled] = useState(false);
  const [isCsvDownloadEnabled, setIsCsvDownloadEnabled] = useState(false);
  const { preferredTableContentLocale } = useSettingsUiContext();

  const {
    removeArrayOfQueryParams,
    getQueryParams,
    isParamsContainAnyOf,
    toggleValueInQueryParam,
  } = useQueryParams();

  const defaultValuesEmptyObject = {
    fromDate: "",
    toDate: "",
  };

  const FILTERS_KEYS_ARRAY = Object.keys(defaultValuesEmptyObject);

  const formMethods = useForm({
    defaultValues: { ...defaultValuesEmptyObject },
  });
  const onSubmit = (data) => {
    const { fromDate, toDate } = data;
    toggleValueInQueryParam("fromDate", fromDate ?? null);
    toggleValueInQueryParam("toDate", toDate ?? null);
  };
  const onClear = () => {
    removeArrayOfQueryParams(FILTERS_KEYS_ARRAY);
    formMethods.reset({ ...defaultValuesEmptyObject });
  };

  // useQuery for downloading PDF
  const pdfQuery = useQuery(
    ["download-pdf", url, preferredTableContentLocale],
    () => ReportsServices.getReportsPdf({
        url,
        locale: preferredTableContentLocale,
      }),
    {
      enabled: isPdfDownloadEnabled,
      onSuccess: ({data}) => {
        const link = document.createElement("a");
        link.href = ParseImageUrl(data.fileUrl); 
        link.setAttribute("target", "_blank"); 
        link.setAttribute("download", data.fileName); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsPdfDownloadEnabled(false);
      },

      onError: (error) => {
        console.error("Error downloading PDF:", error);
        setIsPdfDownloadEnabled(false);
      },
    }
  );

  const CsvQuery = useQuery(
    ["download-csv", url, preferredTableContentLocale],
    () => ReportsServices.getReportsCsv({
        url,
        locale: preferredTableContentLocale,
      }),
    {
      enabled: isCsvDownloadEnabled,
      onSuccess: ({data}) => {
        const fileUrl = `${URLS.BASE_BACKEND_URL}/${data.filePath}`;
        window.open(fileUrl, "_blank");
        setIsCsvDownloadEnabled(false);
      },

      onError: (error) => {
        console.error("Error downloading CSV:", error);
        setIsCsvDownloadEnabled(false);
      },
    }
  );

  useEffect(() => {
    if (isParamsContainAnyOf(FILTERS_KEYS_ARRAY)) {
      const initalObjectFromQueryParams = FILTERS_KEYS_ARRAY.reduce(
        (acc, key) => {
          return { ...acc, [key]: getQueryParams(key) };
        },
        {}
      );
      formMethods.reset(initalObjectFromQueryParams);
      setIsFilterDropdownOpen(true);
    }
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <FilterAccordion isOpen={isFilterDropdownOpen} onClear={onClear}>
          <Row>
            <Col xs={5}>
              <FromDateFilter />
            </Col>
            <Col xs={5}>
              <ToDateFilter />
            </Col>

            <Col
              xs={2}
              className="d-flex justify-content-center align-items-end gap-2"
            >
              <LoadingButton
                size="medium"
                loadingPosition="center"
                onClick={() => setIsPdfDownloadEnabled(true)}
                disabled={pdfQuery.isFetching || pdfQuery.isLoading}
                type="button"
                className={`text-primary border-primary rounded`}
              >
                {pdfQuery.isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <TbFileTypePdf size={20} />
                )}
              </LoadingButton>

              <LoadingButton
                size="medium"
                // startIcon={}
                loadingPosition="center"
                onClick={() => setIsCsvDownloadEnabled(true)}
                disabled={CsvQuery.isFetching || CsvQuery.isLoading}
                type="button"
                className={`text-primary border-primary rounded justify-content-center align-items-center`}
              >
                {CsvQuery.isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <TbFileTypeCsv size={20} />
                )}
              </LoadingButton>
            </Col>
          </Row>
        </FilterAccordion>
      </form>
    </FormProvider>
  );
}
