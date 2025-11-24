import CustomModal from "../../../../@core/components/modal";
import {useForm} from "react-hook-form";
import {Col, Row} from "reactstrap";
import MultiTypeSettingsService from "../../../../common/services/MultiTypeSettingsService";
import {useState} from "react";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useMutation} from "react-query";
import {MultiTypeSettingsResolvers} from "@src/views/pages/multi-type-settings/data";
import CustomControlledColorPicker from "@components/controlled-inputs/CustomControlledColorPicker";
import {useLocaleContext} from "@src/providers/LocaleProvider";


const EditWebsiteThemesModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
	const {translate} = useLocaleContext();

	if (!item) {
		return null;
	}
	console.log('item from themes', item)
	const {register, handleSubmit, control, formState: {errors}} = useForm({
		defaultValues: {
			...item,
		},
		resolver: MultiTypeSettingsResolvers.editResolver,
	});

	const [backendErrors, setBackendErrors] = useState({});

	const {mutate, isError, isLoading} = useMutation(
		(data) => MultiTypeSettingsService.update(item.id, data),
		{
			onSuccess: onEditSuccessCb,
			onError: (error) => {
				setBackendErrors(error.response.data.formErrors);
			},
		}
	);

	const prepareData = (data) => {
		const {value} = data;
		mutate({value});
	};

	return (
		<CustomModal header={`edit-theme-value`} isOpen={isOpen} closeModal={closeModal} size={'md'}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{gap: "1rem"}}>
					<Row>
						<Col xs={12} className="mb-2">
							<CustomControlledColorPicker
								label={translate('common.editValue')}
								name={"value"}
								control={control}
								colorValueRGBA={item.value}
							/>
						</Col>
					</Row>
					<div className="col-auto m-auto">
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default EditWebsiteThemesModal;
