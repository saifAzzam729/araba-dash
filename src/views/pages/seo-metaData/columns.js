import CreateColumn from "../../../@core/components/table/CreateColumn";
import {formatMultiTypeSettingName} from "@src/views/pages/multi-type-settings/data";
import {Link} from "react-router-dom";
import {Facebook, Link2, Map, Type,} from "react-feather";

const getMultiTypeSettingIcon = (key) => {
    const namesObject = {
        OPENGRAPH_FACEBOOKPAGEID: <Facebook size={25}/>,
        OPENGRAPH_COUNTRY: <Map size={25}/>,
    }
    const foundName = namesObject[key];
    return foundName ?? <Link2 size={25}/>;
}
const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'seo.table.name',
    cellCustomizationFunction: (row) => <div className="d-flex align-items-center my-2" style={{gap: '1rem'}}>
        {getMultiTypeSettingIcon(row.settingKey)}
        <span>
            {formatMultiTypeSettingName(row.settingKey)}
        </span>
    </div>,
});

const ValueColumn = CreateColumn({
    name: "Value",
    translateKey: 'seo.table.value',
    cellCustomizationFunction: (row) => {
        if (row.type.value.toLowerCase() === 'link') {
            return (<Link
                to={row.value}
                target={"_blank"}
            >
                    <span>
                        {row.value}
                    </span>
            </Link>)
        }

        return (<span>{row.value}</span>)
    },
});

const columns = [NameColumn, ValueColumn];

export default columns;
