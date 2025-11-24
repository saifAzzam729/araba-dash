import {Button, Card, CardBody, CardHeader, CardText, TabPane} from "reactstrap";
import {Repeat} from "react-feather";
import {FormProvider} from "react-hook-form";
import ErrorAlert from "@components/ErrorAlert/ErrorAlert";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import useAddDataManager from "@src/views/pages/products-attributes/add/useAddDataManager";
import AddFormHeader from "@src/views/pages/products-attributes/add/partials/AddFormHeader";
import AttributeFieldsGroup from "@src/views/pages/products-attributes/add/partials/AttributeFieldsGroup";
import OptionFieldsGroup from "@src/views/pages/products-attributes/add/partials/OptionFieldsGroup";


function AddForm({onAddSuccessCb, onBackClickedCb}) {

    const {translate} = useLocaleContext();
    const {
        backendErrors,

        isErrorWithUpdateMutation: isError, FormMethods,

        fields, addOptionFormItem: append,

        handleDelete, prepareDataAndSubmit,

        handleAddOptionsClick,
    } = useAddDataManager({onAddSuccessCb});


    return (
        <FormProvider {...FormMethods}>
            <Card className='p-2 px-2 px-lg-4 pb-4 bg-white'>

                <form
                    onSubmit={FormMethods.handleSubmit(prepareDataAndSubmit)}
                >

                    <AddFormHeader onBackClickedCb={onBackClickedCb}/>

                    <hr/>

                    <Card className='bg-white mb-0 border-3 border-light mt-3 p-0 p-md-2'>
                        <CardHeader className='pb-2'>
                            <h3 className='card-title text-primary font-large-1'>
                                {translate('product-attribute.forms.main-details')}
                            </h3>
                        </CardHeader>

                        <ErrorAlert isError={isError} errors={backendErrors}/>
                        <CardBody>
                            <AttributeFieldsGroup/>

                            <h3 className='card-title text-primary font-large-1 mt-lg-1'>
                                {translate('product-attribute.forms.option-details')}
                            </h3>

                            <div className={"p-1 p-md-3 py-2 bg-light rounded-4"}>

                                {fields.map((field, index) => (<OptionFieldsGroup
                                    field={field}
                                    index={index}
                                    handleDeleteOption={() => handleDelete(index)}
                                />))}


                                <div className={"d-flex justify-content-center"}>
                                    <Button className='btn-icon mt-1 d-flex gap-1' color='primary'
                                            onClick={() => handleAddOptionsClick({})}>
                                        <span className=' ms-25'>
                                            {translate('product-attribute.common.add-option')}
                                        </span>
                                        <Repeat size={14}/>
                                    </Button>
                                </div>
                            </div>


                        </CardBody>
                    </Card>
                </form>
            </Card>
        </FormProvider>
    )
}

export default AddForm
