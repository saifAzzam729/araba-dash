import {Button, Col, Input, Label, Row, Table} from "reactstrap";
import CustomModal from "../../../../@core/components/modal";
import {Controller, useForm} from "react-hook-form";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";
import {useState} from "react";
import RoleGroupsService from "../../../../common/services/RoleGroupsService";
import {RoleResolvers} from "../data";
import {useMutation, useQuery} from "react-query";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import SelectAllInMatrix from "@src/views/pages/roles/custom-components/SelectAllInMatrix";
import SelectAllInRow from "@src/views/pages/roles/custom-components/SelectAllInRow";
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

const EditRoleModal = ({isOpen, closeModal, item, onEditSuccessCb}) => {
    if (!item) {
        return null;
    }
    const {translate} = useLocaleContext()

    const defaultValues = {
        ...item,
        permissions: item.roles.reduce((permissions, role) => {
            permissions[role] = true;
            return permissions;
        }, {}),
    };

    const {
        handleSubmit,
        control,
        formState: {errors},
        watch,
        getValues,
        setValue,
    } = useForm({
        defaultValues,
        resolver: RoleResolvers.editResolver
    });

    const [roles, setRoles] = useState([]);
    const [backendErrors, setBackendErrors] = useState({});

    const {mutate, isError, isLoading} = useMutation(
        (data) => RoleGroupsService.update(item.id, data),
        {
            onSuccess: onEditSuccessCb,
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

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

    const prepareData = (data) => {
        const {permissions, name} = data;

        const preparedData = {
            name,
            roles: Object.keys(permissions).filter(
                (key) => permissions[key] === true
            ),
            id: item.id,
        };
        mutate(preparedData);
    };

    return (
        <CustomModal translatedHeader={translate('roles.common.edit-role')} isOpen={isOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmit(prepareData)}>
                <ErrorAlert isError={isError} errors={backendErrors}/>
                <Col xs={12}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <CustomControlledInputField
                                label={translate('roles.forms.role-name')}
                                name="name"
                                control={control}
                                placeholder="Role Name"
                                errors={errors}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12}>
                    <div className={"d-flex justify-content-between align-items-center"}>

                        <h4 className="mt-2 pt-50 p-0">{translate('roles.common.role-permissions')}</h4>
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
                                                <div className="form-check" key={permission.role}>
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

export default EditRoleModal;
