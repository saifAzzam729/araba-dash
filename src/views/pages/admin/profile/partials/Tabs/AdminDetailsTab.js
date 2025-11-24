import React, {useState} from "react";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "react-query";
import UsersService from "@src/common/services/UsersService";
import RoleGroupsService from "@src/common/services/RoleGroupsService";
import CountriesService from "@src/common/services/CountriesService";
import frormatDateToSend from "@src/utility/helpers/formatDateForSend";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import CustomControlledAsyncSelectField from "@components/controlled-inputs/CustomControlledAsyncSelectField";
import CustomControlledDatePickerField from "@components/controlled-inputs/CustomControlledDatePickerField";
import ParseImageUrl from "@src/common/helpers/ParseImageUrl";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import OptionsService from "@src/common/services/OptionsService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";

export default function AdminDetailsTab ({user}) {
    const {preferredTableContentLocale} = useSettingsUiContext();
    let defaultValues = undefined;

    if (user) {
        defaultValues = {
            ...user,
        };
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        register
    } = useForm({
        defaultValues,
    });

    const [roleGroups, setRoleGroups] = useState([]);

    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => UsersService.update(user.id, data),
        {
            onSuccess: () => {
                window.location.reload();
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    useQuery(
        ['user', user.id],
        () => UsersService.getById(user.id, {locale: preferredTableContentLocale}),
        {
            onSuccess: (res) => {
                const {data} = res;
                setValue('roleGroup', {label: data.rolesGroups[0].name, value: data.rolesGroups[0].id})
                setValue('dateOfBirth', data.dateOfBirth)
                setValue('country', {label: data.country.name, value: data.country.id})
                setValue('gender', {label: data.gender.label, value: data.gender.value})

            }
        }
    )

    useQuery(
        ['role-groups'],
        () => RoleGroupsService.getPagination({})
            .then(({pagination: {items}}) => {
                setRoleGroups(
                    items.map((item) => {
                        return { label: item.name, value: item.id };
                    })
                );
            })
    );

    const {data} = useQuery(
        ['gender-options'],
        () => OptionsService.getGenderOptions()
    )

    const genderOptions = data?.data ?? [];

    const promiseCountriesOptions = (searchValue) => new Promise((resolve) => {
        CountriesService.getPagination({search:searchValue}).then((res) => {
            resolve(res.pagination.items.map((item) => {
                    return {
                        label:item.name,
                        value:item.id
                    }
                })
            )
        })
    });

    const prepareDataAndSubmit = (data) => {
        const {
            avatar,
            fullName,
            email,
            gender,
            country,
            dateOfBirth,
            roleGroup,
            phoneNumber,
        } = data;
        mutate({
            id: user.id,
            avatar,
            fullName,
            email,
            gender: gender.value,
            country: country.value,
            dateOfBirth: frormatDateToSend(dateOfBirth),
            roleGroup: roleGroup.value,
            phoneNumber,
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit Details</CardTitle>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(prepareDataAndSubmit)}>
                    <ErrorAlert isError={isError} errors={backendErrors} />
                    <Row>
                        <Col xs={6} className="mb-2">
                            <CustomControlledInputField
                                label="Full Name"
                                name="fullName"
                                control={control}
                                placeholder="John Doe"
                                errors={errors}
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <CustomControlledInputField
                                label="Email"
                                name="email"
                                control={control}
                                placeholder="john.doe@example.com"
                                errors={errors}
                                type="email"
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <CustomControlledInputField
                                label="Phone Number"
                                name="phoneNumber"
                                control={control}
                                placeholder="3972945153"
                                errors={errors}
                                type="tel"
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <CustomControlledDropdownField
                                label={"Gender"}
                                name={"gender"}
                                control={control}
                                options={genderOptions}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <CustomControlledAsyncSelectField
                                label={"Country"}
                                name={"country"}
                                control={control}
                                getOptionsPromise={promiseCountriesOptions}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <CustomControlledDatePickerField
                                label="Date Of Birth"
                                name="dateOfBirth"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <CustomControlledDropdownField
                                label={"Role Group"}
                                name={"roleGroup"}
                                control={control}
                                options={roleGroups}
                                errors={errors}
                            />
                        </Col>
                        <Col xs={6} className="mb-2">
                            <Label className="form-label" for="avatar">
                                Avatar
                            </Label>
                            <input
                                className="form-control form-control-lg"
                                id="avatar"
                                {...register("avatar")}
                                type="file"
                            />
                        </Col>

                    </Row>
                    <div className="d-flex align-items-center justify-content-start gap-1">
                        <SubmitLoadingBtn isLoading={isLoading} />

                    </div>

                </form>
            </CardBody>
        </Card>
    )
}
