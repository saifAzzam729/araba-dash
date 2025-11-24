// ** Third Party Components
import { MoreHorizontal } from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const VerticalNavMenuSectionHeader = ({ item }) => {
    const {translate} = useLocaleContext();

    return (
    <li className="navigation-header">
      <span>{translate(`sidebar.${item.header}`)}</span>
      <MoreHorizontal className="feather-more-horizontal" />
    </li>
  );
};

export default VerticalNavMenuSectionHeader;
