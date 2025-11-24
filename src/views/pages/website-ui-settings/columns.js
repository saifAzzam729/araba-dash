import CreateColumn from "../../../@core/components/table/CreateColumn";
import {formatMultiTypeSettingName} from "@src/views/pages/multi-type-settings/data";
import {Link} from "react-router-dom";
import {Facebook, Info, Instagram, Link2, Mail, Phone, Youtube} from "react-feather";

const getMultiTypeSettingIcon = (key) => {
    const namesObject = {
        FACEBOOK_LINK: <Facebook size={30}/>,
        INSTAGRAM_LINK: <Instagram size={30}/>,
        YOUTUBE_LINK: <Youtube size={30}/>,
        CONTACT_EMAIL: <Mail size={30}/>,
        CONTACT_HOURS: <Info size={30}/>,
        PHONE_NUMBER: <Phone size={30}/>,
    }
    const foundName = namesObject[key];
    return foundName ?? <Link2 size={30}/>;
}
const NameColumn = CreateColumn({
    name: "Name",
    translateKey: 'multi-type-settings.table.name',
    cellCustomizationFunction: (row) => <div className="d-flex align-items-center my-2" style={{gap: '1rem'}}>
        {getMultiTypeSettingIcon(row.settingKey)}
        <span>
            {formatMultiTypeSettingName(row.settingKey)}
        </span>
    </div>,
});

const ValueColumn = CreateColumn({
    name: "Value",
    translateKey: 'multi-type-settings.table.value',
    cellCustomizationFunction: (row) => {
        if (row.type.value.toLowerCase() === 'link') {
            return (<Link
                to={row.value}
                target={"_blank"}
            >
                    <span>
                        {row.value ?? '_'}
                    </span>
            </Link>)
        }

        return (<span>{row.value ?? "_"}</span>)
    },
});

const columns = [NameColumn, ValueColumn];

export default columns;
