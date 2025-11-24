// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalNavMenuGroupV2 from "./VerticalNavMenuGroupV2";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";

// ** Utils
import {
	resolveVerticalNavMenuItemComponent as resolveNavItemComponent,
} from "@layouts/utils";


import { AbilityContext } from "@src/utility/context/PermissionProvider";
import {useContext} from "react";

function checkIfAnyChildHasPermission(obj, abilityChecker) {
	return obj.children.some(child => {
		if (child.children) {
			return child.children.some(item => abilityChecker.can(item.permission));
		} else {
			return abilityChecker.can(child.permission);
		}
	});
}

const VerticalMenuNavItems = (props) => {
	// ** Components Object
	const Components = {
		VerticalNavMenuLink,
		VerticalNavMenuGroupV2,
		VerticalNavMenuSectionHeader,
	};

	// ** Render Nav Menu Items
	const RenderNavItems = props.items.map((item, index) => {
		const TagName = Components[resolveNavItemComponent(item)];
		const ability = useContext(AbilityContext);
		const { menuCollapsed, menuHover } = props;

		const showText = !menuCollapsed || menuHover;

		if (item.children) {
			return (
				// <TagName item={item} index={index} key={`${item.id}-${index}`} {...props} />

				checkIfAnyChildHasPermission(item, ability) && <TagName item={item} index={index} key={`item-${item.id}`} {...props} showText={showText} />

				// canViewMenuGroup(item) && (
				// <TagName item={item} index={index} key={item.id} {...props} />
				// )
			);
		}
		return <TagName key={item.id || item.header} item={item} {...props}  showText={showText}/>;
	});
	return RenderNavItems;
};

export default VerticalMenuNavItems;
