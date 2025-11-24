import React, {useState} from "react";
import * as yup from "yup";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, Row} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import InputPasswordToggle from "@components/input-password-toggle";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import UsersService from "@src/common/services/UsersService";
import SubmitLoadingBtn from "@components/form-ui/SubmitLoadingBtn";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";

export default function ChangePasswordTab () {
    const [backendErrors, setBackendErrors] = useState({});

    const showErrors = (field, valueLen, min) => {
        if (valueLen === 0) {
            return `${field} field is required`
        } else if (valueLen > 0 && valueLen < min) {
            return `${field} must be at least ${min} characters`
        } else {
            return ''
        }
    }
    const defaultValues = {
        newPassword: '',
        currentPassword: '',
        confirmPassword: ''
    }
    const SignupSchema = yup.object().shape({
        currentPassword: yup.string().min(6, obj => showErrors('Current Password', obj.value.length, obj.min)).required(),
        newPassword: yup.string().min(8, obj => showErrors('New Password', obj.value.length, obj.min)).required(),
        confirmPassword: yup.string().min(8, obj => showErrors('confirmPassword', obj.value.length, obj.min)).required().oneOf([yup.ref(`newPassword`), null], 'Passwords must match')
    })
    // ** Hooks
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(SignupSchema)
    })
    const {mutate, isError, isLoading} = useMutation(
        (data) => UsersService.changePassword(data),
        {
            onSuccess: () => {
                window.location.reload()
            },
            onError: (error) => {
                setBackendErrors(error.response.data.formErrors);
            },
        }
    );

    console.log(errors)
    const prepareDataAndSubmit = (data) => {
        const {
            currentPassword,
            newPassword,
            confirmPassword
        } = data;
        mutate({
            currentPassword,
            newPassword,
            confirmPassword
        });
    };

    return (
        <Card>
            <CardHeader className='border-bottom'>
                <CardTitle tag='h4'>Change Password</CardTitle>
            </CardHeader>
            <CardBody className='pt-1'>
                <form onSubmit={handleSubmit(prepareDataAndSubmit)}>
                    <ErrorAlert isError={isError} errors={backendErrors} />
                    <Row>
                        <Col sm='12' className='mb-1'>
                            <Controller
                                control={control}
                                id='currentPassword'
                                name='currentPassword'
                                render={({ field }) => (
                                    <InputPasswordToggle
                                        label='Current Password'
                                        htmlFor='currentPassword'
                                        className='input-group-merge'
                                        invalid={errors.currentPassword && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.currentPassword && (
                                <FormFeedback className='d-block'>{errors.currentPassword.message}</FormFeedback>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='6' className='mb-1'>
                            <Controller
                                control={control}
                                id='newPassword'
                                name='newPassword'
                                render={({ field }) => (
                                    <InputPasswordToggle
                                        label='New Password'
                                        htmlFor='newPassword'
                                        className='input-group-merge'
                                        invalid={errors.newPassword && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.newPassword && <FormFeedback className='d-block'>{errors.newPassword.message}</FormFeedback>}
                        </Col>
                        <Col sm='6' className='mb-1'>
                            <Controller
                                control={control}
                                id='confirmPassword'
                                name='confirmPassword'
                                render={({ field }) => (
                                    <InputPasswordToggle
                                        label='Confirm Password'
                                        htmlFor='confirmPassword'
                                        className='input-group-merge'
                                        invalid={errors.newPassword && true}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.confirmPassword && (
                                <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                            )}
                        </Col>
                        <Col className='mt-1' sm='12'>
                            <SubmitLoadingBtn isLoading={isLoading} />
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </Card>

    )
}
