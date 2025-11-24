// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const defaultValues = {
	generalField: "",
};

const PersonalInfo = ({ stepper, onSubmitData }) => {
	// ** Hooks
	const {
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	const onSubmit = (data) => {
		const { generalField } = data;
		if (Object.values(data).every((field) => field.length > 0)) {
			stepper.next();
			onSubmitData({ generalField });
		}
	};

	return (
		<Fragment>
			<div className="content-header">
				<h5 className="mb-0">Personal Info</h5>
				<small>Enter Your Personal Info.</small>
			</div>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col md="6" className="mb-1">
						<Label className="form-label" for="firstName">
							General Field
						</Label>
						<Controller
							id="generalField"
							name="generalField"
							control={control}
							render={({ field }) => (
								<Input
									placeholder="John"
									invalid={errors.generalField && true}
									{...field}
								/>
							)}
						/>
						{errors.generalField && (
							<FormFeedback>{errors.generalField.message}</FormFeedback>
						)}
					</Col>
				</Row>
				<div className="d-flex justify-content-between">
					<Button
						type="button"
						color="primary"
						className="btn-prev"
						onClick={() => stepper.previous()}
					>
						<ArrowLeft
							size={14}
							className="align-middle me-sm-25 me-0"
						></ArrowLeft>
						<span className="align-middle d-sm-inline-block d-none">
							Previous
						</span>
					</Button>
					<Button type="submit" color="primary" className="btn-next">
						<span className="align-middle d-sm-inline-block d-none">Next</span>
						<ArrowRight
							size={14}
							className="align-middle ms-sm-25 ms-0"
						></ArrowRight>
					</Button>
				</div>
			</Form>
		</Fragment>
	);
};

export default PersonalInfo;
