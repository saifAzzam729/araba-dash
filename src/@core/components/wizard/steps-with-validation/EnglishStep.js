// ** React Imports
import { Fragment } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const defaultValues = {
	name: "",
	description: "",
};

const SignupSchema = yup.object().shape({
	name: yup.string().required(),
	description: yup.string().required(),
});

const EnglishStep = ({ stepper, onSubmitData }) => {
	// ** Hooks

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(SignupSchema),
	});

	const onSubmit = (data) => {
		const { name, description } = data;
		if (isObjEmpty(errors)) {
			stepper.next();
			onSubmitData({ name, description });
		}
	};

	return (
		<Fragment>
			<div className="content-header">
				<h5 className="mb-0">English Details</h5>
				<small className="text-muted">Enter Your English Details.</small>
			</div>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col md="6" className="mb-1">
						<Label className="form-label" for="name">
							Name
						</Label>
						<Controller
							id="username"
							name="name"
							control={control}
							render={({ field }) => (
								<Input
									placeholder="johndoe"
									invalid={errors.name && true}
									{...field}
								/>
							)}
						/>
						{errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
					</Col>
					<Col md="6" className="mb-1">
						<Label className="form-label" for="description">
							Description
						</Label>
						<Controller
							id="description"
							name="description"
							control={control}
							render={({ field }) => (
								<Input
									placeholder="johndoe"
									invalid={errors.description && true}
									{...field}
								/>
							)}
						/>
						{errors.description && (
							<FormFeedback>{errors.description.message}</FormFeedback>
						)}
					</Col>
				</Row>

				<div className="d-flex justify-content-between">
					<Button color="secondary" className="btn-prev" outline disabled>
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

export default EnglishStep;
