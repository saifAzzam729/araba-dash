import {Button, Card, Col, Row, Input} from "reactstrap";
import DataTable from "react-data-table-component";
import {PlusCircle} from "react-feather";
import generateStandardActionColumn from "./partials/generateStandardActionColumn";
import translateColumns from "@src/utility/helpers/translateColumns";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const CustomHeader = ({onAdd = null}) => {

    return (
        <div className="invoice-list-table-header w-100 py-2">
            <Row>
                <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
                </Col>
                <Col
                    lg="6"
                    className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
                >
                    {onAdd && (
                        <Button
                            onClick={() => {
                                onAdd();
                            }}
                            color="primary"
                            className=" d-flex align-items-center "
                            style={{gap: "0.5rem"}}
                        >
                            <PlusCircle size={20}/>
                            <span>Add Record</span>
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};


export default function ({
                             columns,
                             data,
                             defaultActionButtons = true,
                             onAdd = null,
                             onEdit = null,
                             onDelete = null,
                             onView = null,
                             onGoToProfile = null,
                             headCellJustification = '',
                             bodyCellJustification = '',
                             noDataComponent

                         }) {

    const ActionColumn = generateStandardActionColumn({
        onView,
        onEdit,
        onDelete,
        onAdd,
        onGoToProfile,
    });

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
    return (
        <div className="invoice-list-wrapper">
            <Card>
                <div className="invoice-list-dataTable react-dataTable">
                    <DataTable
                        noHeader
                        sortServer
                        subHeader={false}
                        columns={
                            defaultActionButtons ? translateColumns([...columns, ActionColumn], translate) : translateColumns(columns, translate)
                        }
                        data={data}
                        className="react-dataTable"
                        subHeaderComponent={
                            <CustomHeader onAdd={onAdd}/>
                        }
                        customStyles={customStyles}
                        noDataComponent={noDataComponent}
                    />
                </div>
            </Card>
        </div>
    );
}
