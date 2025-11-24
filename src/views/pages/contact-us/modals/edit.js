import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import ContactUsApplicationsService from "../../../../common/services/ContactUsApplicationsService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const EditSaleOrderModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}

	const { handleSubmit, control, setValue, formState: { errors }, } = useForm({
		defaultValues: {
			...item,
		},
	});

	const {translate} = useLocaleContext()

	const statusOptions = [
		{ label: translate('contact-us.common.status-read'), value: "READ" },
		{ label: translate('contact-us.common.status-unread'), value: "UNREAD" },
	];

	const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => ContactUsApplicationsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
		['contact', item.id], 
		() => ContactUsApplicationsService.getById(item.id),
        {
            onSuccess: (res) => {
                const {data} = res;
				console.log('onSuccess data', data)
				setValue("status", {
					value: data.status,
					label: data.status,
				});
            }
        }
	)

	const prepareData = (data) => {
		const { status } = data;
		mutate({ id: item.id, status: status.value });
	};

	return (
		<CustomModal translatedHeader={translate('contact-us.common.edit-status')} isOpen={isOpen} closeModal={closeModal} size={"sm"}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" >
							<CustomControlledDropdownField
								label={"Status"}
								name={"status"}
								control={control}
								options={statusOptions}
								errors={errors}
							/>

					<hr />
					<div className="col-auto">
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default EditSaleOrderModal;
