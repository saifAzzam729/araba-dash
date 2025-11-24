import CustomAddCard from "@components/crud-card/CustomAddCard";

export default function RoleAddCard({onAdd}) {
    return (
        <CustomAddCard
            onAdd={onAdd}
            addBtnText={"common.add-role"}
            addSubText={"common.role-subtext"}
        />
    )
}