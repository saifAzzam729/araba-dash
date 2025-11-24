import CustomAddCard from "@components/crud-card/CustomAddCard";

export default function CurrencyAddCard({onAdd}) {
    return (
        <CustomAddCard
            onAdd={onAdd}
            addBtnText={"common.add-currency"}
            addSubText={"common.currency-subtext"}
            cardClassName={"h-100"}
        />
    )
}
