import CreateColumn from "../../../@core/components/table/CreateColumn";
import {formatDate} from "@utils";
import GenderDisplayer from "@components/gender-displayer/GenderDisplayer";


const PetBreedColumn = CreateColumn({
	name: "Pet Breed",
	cellCustomizationFunction: (row) => <span>{row.petBreed.name}</span>,
});
const NameColumn = CreateColumn({
	name: "Name",
	cellCustomizationFunction: (row) => <span>{row.name}</span>,
});
const GenderColumn = CreateColumn({
	name: "Gender",
	cellCustomizationFunction: (row) => <span className="w-100"><GenderDisplayer gender={row.gender.value} /></span>,
	maxWidth: "200px"

});

const WeightColumn = CreateColumn({
	name: "Weight",
	cellCustomizationFunction: (row) => <span>{row.weight}</span>,
	maxWidth: "150px"
});
const BirthdateColumn = CreateColumn({
	name: "Birth Date",
	cellCustomizationFunction: (row) => <span>{formatDate(row.birthdate)}</span>,
});


const columns = [NameColumn, PetBreedColumn, GenderColumn, WeightColumn, BirthdateColumn];

export default columns;
