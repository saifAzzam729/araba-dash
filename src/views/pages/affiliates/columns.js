import CreateColumn from "../../../@core/components/table/CreateColumn";
import {Badge} from "reactstrap";
import CopyableSlugBadge from "@src/views/pages/affiliates/partials/CopyableSlugBadge";
import CopyableStatsLinkBadge from "@src/views/pages/affiliates/partials/CopyableStatsLinkBadge";

const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'affiliates.table.name',
    cellCustomizationFunction: (row) => <span>{row.name}</span>,
});

const EmailColumn = CreateColumn({
    name: "email",
    translateKey: 'affiliates.table.email',
    cellCustomizationFunction: (row) => <span>{row.email}</span>,
});

const SlugColumn = CreateColumn({
    name: "slug",
    translateKey: 'affiliates.table.slug',
    cellCustomizationFunction: (row) => <CopyableSlugBadge slug={row.slug} />
});

const StatisticsLinkColumn = CreateColumn({
    name: "statistics-link",
    translateKey: 'affiliates.table.statistics-link',
    cellCustomizationFunction: (row) => <CopyableStatsLinkBadge affiliate={row.slug} />
});

const CouponsColumn = CreateColumn({
    name: "coupons",
    translateKey: 'affiliates.table.coupons',
    cellCustomizationFunction: (row) => (
        row.coupons.length > 0 ?
            row.coupons.map((co) => <Badge color='light-info me-1' key={co.id}>{co.couponCode}</Badge>)
            : <span> _ </span>
    ),
});

const columns = [
    NameColumn,
    EmailColumn,
    SlugColumn,
    StatisticsLinkColumn,
    CouponsColumn,
];

export default columns;
