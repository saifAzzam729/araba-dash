import Avatar from "@mui/material/Avatar";
import CreateColumn from "@components/table/CreateColumn";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";

const StoreInfoColumn = CreateColumn({
    name: "Store",
    translateKey: "vendor-requests.table.store-info",
    minWidth: "200px",
    cellCustomizationFunction: (row) => {
        const storeName = row?.vendorDetails?.storeName ?? "-";
        const storeLogo = row?.vendorDetails?.storeLogo;

        return (
            <div className="d-flex align-items-center gap-75">
                <Avatar
                    alt={`${storeName} logo`}
                    sx={{width: 40, height: 40}}
                    src={ParseImageUrl(storeLogo)}
                />
                <span className="fw-bold">{storeName}</span>
            </div>
        );
    },
});

const FullNameColumn = CreateColumn({
    name: "Full Name",
    translateKey: "users.table.full-name",
    minWidth: "160px",
    cellCustomizationFunction: (row) => <span>{row.fullName}</span>,
});

const EmailColumn = CreateColumn({
    name: "Email",
    translateKey: "affiliates.table.email",
    minWidth: "180px",
    cellCustomizationFunction: (row) => <span>{row.email}</span>,
});

export const createColumns = () => {
    return [
        StoreInfoColumn,
        FullNameColumn,
        EmailColumn,
    ];
};

