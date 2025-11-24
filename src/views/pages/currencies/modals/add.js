import CustomModal from "../../../../@core/components/modal";
import { useForm } from "react-hook-form";
import {useState} from "react";
import { useMutation } from "react-query";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import CurrenciesService from "@src/common/services/CurrenciesService";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SubmitLoadingBtn from "../../../../@core/components/form-ui/SubmitLoadingBtn";
import CountriesService from "@src/common/services/CountriesService";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import CustomControlledAsyncSelectPaginate
	from "@components/controlled-inputs/CustomControlledAsyncSelectPaginateField";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const AddCurrencyModal = ({ isOpen, closeModal, onAddSuccessCb, item = null }) => {
	let defaultValues = undefined;
	const {translate} = useLocaleContext()
	if (item) {
		defaultValues = {
			"translations.en.name": item.name,
		};
	}

	const addSchema = yup.object().shape({
		translations: yup.object().shape({
			en: yup.object().shape({
				name: yup.string().required(translate('forms.field-required')),
			}),
			ar: yup.object().shape({
				name: yup.string().required(translate('forms.field-required')),
			}),
		}),
		code: yup.string().required(translate('forms.field-required')),
		symbol: yup.string().required(translate('forms.field-required')),
		defaultExchangeRate: yup.string().required(translate('forms.field-required')),
	});

	const {
		register,
		handleSubmit,
		formState:{errors},
		control
	} = useForm({
		defaultValues, resolver: yupResolver(addSchema)
	});

	const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => CurrenciesService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

	const promiseCountriesOptions = (
		searchValue,
		prevOptions,
		additional,
	) => new Promise((resolve) => {
		const prevPage = additional?.prevPage ?? 0;

		const params = {
			search: searchValue,
			page: prevPage + 1,
		};
		const page = params.page;
		const perPage = 10;
		const search = params.search;
		CountriesService.getPagination({page: page, search: search , limit: perPage}).then((res) => {
			const { pages, page: currentPage, items } = res.pagination;
			resolve({
				options: items.map((item) => ({
					label: item.name,
					value: item.id,
				})),
				hasMore: currentPage < pages,
				additional: {
					prevPage: currentPage,
					prevSearchValue: searchValue,
				},
			});
		});
	});

	const prepareData = (data) => {
		const { translations, active, code, symbol, defaultExchangeRate, countries } = data;
		mutate({
			translations,
			active,
			code,
			symbol,
			defaultExchangeRate,
			countries: countries.map((country) => country.value)});
	};

	return (
		<CustomModal translatedHeader={translate('currencies.common.add-currency')} isOpen={isOpen} closeModal={closeModal}>
			<form onSubmit={handleSubmit(prepareData)}>
				<ErrorAlert isError={isError} errors={backendErrors} />
				<div className="d-flex flex-column" style={{ gap: "1rem" }}>
					<div className="row">
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.en.name"
								label={translate('currencies.forms.nameEn')}
								register={register}
								errorMessage={errors && errors.translations?.en?.name?.message}
                            />
						</div>
						<div className="col-6">
							<UncontrolledTextInput
								name="translations.ar.name"
								label={translate('currencies.forms.nameAr')}
								register={register}
								errorMessage={errors && errors.translations?.ar?.name?.message}
                            />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<CustomControlledAsyncSelectPaginate
								placeholder={translate('currencies.forms.countries')}
								name={'countries'}
								label={translate('currencies.forms.countries')}
								control={control}
								getOptionsPromise={promiseCountriesOptions}
								defaultOptions={[]}
								isMulti={true}
								errors={errors}
							/>
							<p className='text-primary mb-0' style={{marginTop: '5px'}}>{translate('currencies.common.countries-sublabel')}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-sm-6 col-md-4 col-lg-4">
							<UncontrolledTextInput
								name="code"
								label={translate('currencies.forms.code')}
								register={register}
								errorMessage={errors && errors.code?.message}
                            />
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-4">
							<UncontrolledTextInput
								name="symbol"
								label={translate('currencies.forms.symbol')}
								register={register}
								errorMessage={errors && errors.symbol?.message}
                            />
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-4">
							<UncontrolledTextInput
								name="defaultExchangeRate"
								label={translate('currencies.forms.defaultExchangeRate')}
								register={register}
								errorMessage={errors && errors.defaultExchangeRate?.message}
							/>
						</div>
					</div>
					<div className="col-auto">
						<CustomControlledCheckboxInput
							name="active"
							label={translate('currencies.forms.active')}
							control={control}
						/>
					</div>
					<hr/>
					<div className="col-auto">
						<SubmitLoadingBtn isLoading={isLoading} />
					</div>
				</div>
			</form>
		</CustomModal>
	);
};

export default AddCurrencyModal;
