import {useState} from "react";
import CustomModal from "../../../../@core/components/modal";
import {Controller, useForm} from "react-hook-form";
import RoleGroupsService from "../../../../common/services/RoleGroupsService";
import {Button, Col, Input, Label, Row, Table} from "reactstrap";
import {RoleResolvers} from "../data";
import UncontrolledTextInput from "@components/form-ui/uncontrolled-inputs/UncontrolledTextInput";
import {useMutation, useQuery} from "react-query";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SelectAllInRow from "@src/views/pages/roles/custom-components/SelectAllInRow";
import SelectAllInMatrix from "@src/views/pages/roles/custom-components/SelectAllInMatrix";
import {useLocaleContext} from "@src/providers/LocaleProvider";

const extractName = (roleName) => {
    const slices = roleName.toLowerCase().split(' ');
    if (slices.includes("show")) return "Show";
    if (slices.includes("add")) return "Add";
    if (slices.includes("update")) return "Update";
    if (slices.includes("delete")) return "Delete";
    if (slices.includes("list")) return "List";
    if (slices.includes("dashboard")) return "Full";
    return roleName.charAt(0).toUpperCase() + roleName.slice(1);
};

const AddRoleModal = ({isOpen, closeModal, onAddSuccessCb, item = null}) => {
    let defaultValues = undefined;
    const {translate} = useLocaleContext()

    if (item) {
        defaultValues = {
            ...item,
            permissions: item.roles.reduce((permissions, role) => {
                permissions[role] = true;
                return permissions;
            }, {}),
        };
    }

    const [roles, setRoles] = useState([]);

    useQuery(
        'role-groups',
        () => RoleGroupsService.getRolesBySection(),
        {
            onSuccess: (res) => {
                const {data} = res;
                setRoles(data);
            }
        }
    )

    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        watch,
    } = useForm({
        defaultValues,
        resolver: RoleResolvers.addResolver
    });

    const [backendErrors, setBackendErrors] = useState([]);

    const {mutate, isError, isLoading} = useMutation(
        (data) => RoleGroupsService.create(data),
        {
            onSuccess: onAddSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    const prepareData = (data) => {
        const {permissions, name} = data;

        const preparedData = {
            name,
            roles: Object.keys(permissions).filter(
                (key) => permissions[key] === true
            ),
        };
        mutate(preparedData);
    };
    return (
        <CustomModal
            translatedHeader={translate('roles.common.add-role')}
            isOpen={isOpen}
            closeModal={closeModal}
            size="lg"
        >
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <Col xs={12}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <UncontrolledTextInput
                                name="name"
                                label={translate('roles.forms.role-name')}
                                register={register}
                                errorMessage={errors && errors.name?.message}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <div className={"d-flex justify-content-between flex-row"}>

                        <h4>{translate('roles.common.role-permissions')}</h4>

                        <SelectAllInMatrix
                            roles={roles}
                            setValue={setValue}
                            getValues={getValues}
                            watch={watch}
                        />
                    </div>
                    <Table className="table-flush-spacing" responsive>
                        <tbody>
                        {roles.map(({section, roles: permissions}, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-nowrap fw-bolder">{section}</td>
                                    <td>
                                        <div className="d-flex justify-content-between">
                                            {permissions.map((permission) => (
                                                <div className="form-check">
                                                    <Controller
                                                        name={`permissions.${permission.role}`}
                                                        control={control}
                                                        render={({field}) => (
                                                            <>
                                                                <Input
                                                                    id={`role-${permission.role}`}
                                                                    type="checkbox"
                                                                    checked={field.value}
                                                                    {...field}
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    for={`role-${permission.role}`}
                                                                >
                                                                    {extractName(permission.name)}
                                                                </Label>
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className={"p-0"} style={{width: '150px'}}>

                                        <SelectAllInRow
                                            permissions={permissions}
                                            sectionName={section}
                                            getValues={getValues}
                                            setValue={setValue}
                                            watch={watch}
                                        />

                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </Col>
                <div className="d-flex align-items-center justify-content-start gap-1">
                    <SubmitLoadingBtn isLoading={isLoading}/>
                    <Button
                        type="button"
                        color="secondary"
                        outline
                        onClick={closeModal}
                        className="mb-3"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </CustomModal>
    );
};

export default AddRoleModal;
