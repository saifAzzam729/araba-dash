import CreateColumn from "../../../@core/components/table/CreateColumn";
import Avatar from "@mui/material/Avatar";
import ParseImageUrl from "../../../common/helpers/ParseImageUrl";
import { Link } from "react-router-dom";
import formatDescription from "@src/utility/helpers/formatDescription";
import ToggleBtnWithMutation from "@components/table/ToggleBtnWithMutation";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

const QuestionColumn = CreateColumn({
	name: "Question",
	translateKey: 'faq.table.question',
	cellCustomizationFunction: (row) => <span>{row.question}</span>,
});

const AnswerColumn = CreateColumn({
	name: "Description",
	translateKey: 'faq.table.description',
	cellCustomizationFunction: (row) => <span>{formatDescription(row.answer)} </span>,
});

const columns = [QuestionColumn, AnswerColumn];

export const createColumns = (width) => {
	if (width <= WindowBreakpoint.md) {
		return [QuestionColumn,]

	} else {
		return columns
	}
}

export default columns;
