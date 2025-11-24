import CustomViewCard from "@components/crud-card/CustomViewCard";
import { Badge, UncontrolledTooltip } from "reactstrap";
import { CheckCircle, Circle } from "react-feather";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const CustomChildren = ({ item }) => {
	const {translate} = useLocaleContext()
	return (
		<>
			<UncontrolledTooltip target={`item-${item.id}`}>
				{item.active ? translate('action-buttons.active') : translate('action-buttons.in-active')}
			</UncontrolledTooltip>
			{item.active ? (
				<CheckCircle id={`item-${item.id}`} className={"text-success"} />
			) : (
				<Circle id={`item-${item.id}`} className={"text-warning"} />
			)}
		</>
	);
};

function CountriesBadges({ countries }) {
	return (
		<>
			<span
				className="d-flex flex-wrap align-items-center my-1"
				style={{ gap: "10px" }}
			>
				{countries.map((country) => {
					return (
						<Badge color="light-primary" style={{ paddingTop: "6px" }} pill>
							{country.name}
						</Badge>
					);
				})}
			</span>
		</>
	);
}

export default function CurrencyViewCard({
	item,
	onEdit = null,
	onDelete = null,
	onDuplicate = null,
	permissionObject = {},
											 defaultCurrencyCode = ""
}) {
	const {translate} = useLocaleContext()
	const isDefaultCurrency = item.code === defaultCurrencyCode

	return (
		<CustomViewCard
			item={item}
			headingText={`$1 ${translate('currencies.common.equals')} ${Number(item.defaultExchangeRate).toFixed(2)} ${
				item.code
			}`}
			onEdit={onEdit}
			onDelete={onDelete}
			onDuplicate={onDuplicate}
			editBtnText={translate('action-buttons.edit-currency')}
			deleteBtnText={translate('action-buttons.delete-currency')}
			duplicateTooltipText={translate('action-buttons.duplicate-currency')}
			topRightChildren={<CustomChildren item={item} />}
			permissionObject={permissionObject}
			children={<CountriesBadges countries={item.countries} />}
			className={`h-100 ${isDefaultCurrency && ''}`}
			style={{
				...(isDefaultCurrency ? { boxShadow: "0px 0px 10px 4px #014957b5" } : {}),
			}}

		/>
	);
}
