import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";

import {useState} from "react";
import { SaleOrderResolvers } from "../data";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import SaleOrdersService from "@src/common/services/SaleOrdersService";
import OptionsService from "../../../../common/services/OptionsService";
import { useMutation, useQuery } from "react-query";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";

const EditSaleOrderModal = ({ isOpen, closeModal, item, onEditSuccessCb }) => {
	if (!item) {
		return null;
	}
	const { handleSubmit,  control, formState: { errors }, } = useForm({
		defaultValues: {
			...item,
		},
		resolver: SaleOrderResolvers.editResolver,
	});

	const [statusOptions, setStatusOptions] = useState([]);

	const [backendErrors, setBackendErrors] = useState({});

	const {mutate, isError, isLoading} = useMutation(
        (data) => SaleOrdersService.update(data.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	useQuery(
		['option-service'], 
		() => OptionsService.getSaleOrdersStatus(),
        {
            onSuccess: (res) => {
                const {data} = res;
                setStatusOptions(data);
            }
        }
	)

	const prepareData = (data) => {
		const { status } = data;
		mutate({ id: item.id, status: status.value });
	};

	return (
		<CustomModal header={"Edit Sale Orders"} isOpen={isOpen} closeModal={closeModal} size={"sm"}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" >
							<CustomControlledDropdownField
								label={"Status"}
								name={"status"}
								control={control}
								options={statusOptions.map((opt) => {
									return { label: opt.label, value: opt.value };
								})}
								errors={errors}
							/>

					<hr />
					<div class="col-auto">
						<SubmitLoadingBtn isLoading={isLoading}/>
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default EditSaleOrderModal;
