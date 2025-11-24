// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "./core";

// ** Steps
import GeneralStep from "./steps-with-validation/GeneralStep";
import ArabicStep from "./steps-with-validation/ArabicStep";
import EnglishStep from "./steps-with-validation/EnglishStep";



const WizardHorizontal = () => {
	// ** Ref
	const ref = useRef(null);

	// ** State
	const [stepper, setStepper] = useState(null);

	const onArabicDataSubmit = ({ name, description }) => {
		console.log("onArabicDataSubmit, ", name, description);
	};

	const onEnglishDataSubmit = ({ name, description }) => {
		console.log("onEnglishDataSubmit, ", name, description);
	};

	const onGeneralDataSubmit = ({ generalField }) => {
		console.log("onGeneralDataSubmit, ", generalField);
	};

	const steps = [
		{
			id: "arabic-details",
			title: "Arabic Details",
			content: (
				<ArabicStep stepper={stepper} onSubmitData={onArabicDataSubmit} />
			),
		},
		{
			id: "english-details",
			title: "English Details",
			content: (
				<EnglishStep stepper={stepper} onSubmitData={onEnglishDataSubmit} />
			),
		},
		{
			id: "general-details",
			title: "General Details",
			content: (
				<GeneralStep stepper={stepper} onSubmitData={onGeneralDataSubmit} />
			),
		},
	];

	return (
		<div className="horizontal-wizard">
			<Wizard
				type="vertical"
				ref={ref}
				steps={steps}
				instance={(el) => setStepper(el)}
			/>
		</div>
	);
};

export default WizardHorizontal;
