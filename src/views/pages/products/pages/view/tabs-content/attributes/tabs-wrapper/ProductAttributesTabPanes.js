import {Button, Card, CardBody, CardHeader, TabContent, TabPane, UncontrolledTooltip} from "reactstrap";
import {CheckSquare, Eye, Square, Trash} from "react-feather";
import {useFormContext} from "react-hook-form";
import {createTabIndex} from "@src/views/pages/products/pages/view/data";
import AttributeOptionsFormDisplayer
    from "@src/views/pages/products/pages/view/tabs-content/attributes/form/AttributeOptionsFormDisplayer";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledCheckboxInput from "@components/controlled-inputs/CustomControlledCheckboxInput";
import {useEffect} from "react";
import CustomCan from "@components/Authorize/CustomCan";
import useWindowSize from "@hooks/useWindowSize";
import {WindowBreakpoint} from "@src/utility/context/WindowBreakpoints";

function ProductAttributesTabPanes({attributesList, handleDeleteAttribute, activeTabIndex, permissionObject}) {
    const FormMethods = useFormContext();
    const {translate} = useLocaleContext()
    const {width} = useWindowSize()

    const handleDelete = (id) => {
        handleDeleteAttribute(id);
        FormMethods.setValue(`${id}.options`, null)
        FormMethods.setValue(`${id}`, undefined)
    }

    return (
        <TabContent activeTab={activeTabIndex}>
        {attributesList.map((attributeItem) => {
            return (
                <TabPane
                style={{ height: width > WindowBreakpoint.lg ? '450px' : 'auto' }}
                tabId={createTabIndex(attributeItem.attribute)}
                >
                <Card className='bg-white px-lg-1 py-2 mb-0 border-3 border-light'>
                    <CardHeader className='pt-0 mb-2 border-bottom'>
                        <div className={`
                        order-0 order-sm-0 ${width > WindowBreakpoint.lg && 'w-auto'}
                        `}>
                            <CustomControlledCheckboxInput
                                label={translate('product-attribute.forms.required')}
                                control={FormMethods.control}
                                name={`${attributeItem.attribute}.required`}
                                checkIcon={<CheckSquare color={'#00b602'} className='text-primary' size={30} />}
                                unCheckIcon={<Square size={30} strokeWidth={0.5} />}
                                defaultValue={attributeItem.required}
                            />
                        </div>

                        <h3 className={`card-title text-primary text-center mt-1 mt-sm-0 order-2 order-sm-1 font-large-1
                            ${width >= WindowBreakpoint.sm ? 'w-auto' : 'w-100'}
                    
                        `}>
                            {translate('product-attribute.forms.main-details')}
                        </h3>
                        <div className="d-flex align-items-center justify-content-between order-1 flex-shrink-1 order-sm-1">
                            <CustomCan permissionName={permissionObject?.delete}>
                                <Button className='btn-icon' color='danger'
                                        onClick={() => handleDelete(attributeItem.attribute)} outline>
                                    <Trash size={14}/>
                                    <span className='d-none d-sm-inline ms-25'>{translate('common.delete')}</span>
                                </Button>
                            </CustomCan>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <AttributeOptionsFormDisplayer attributeItem={attributeItem} permissionObject={permissionObject}/>
                    </CardBody>
                </Card>
            </TabPane>)
        })}
    </TabContent>)
}

export default ProductAttributesTabPanes;
