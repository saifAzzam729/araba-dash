// ** Custom Components
import Sidebar from '@components/sidebar'
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import {Col, Row, Button} from "reactstrap";
import CustomControlledDropdownField from "@components/controlled-inputs/CustomControlledDropdownField";
import {useForm} from "react-hook-form";
import DataSourceManager from "@src/common/services/DataSourceManager";
import {useEffect} from "react";
import NavItems from "@src/navigation/NavItems";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import CustomControlledInputField from "@components/controlled-inputs/CustomControlledInputField";

const SettingsSidebar = () => {
    const {
        isOpen,
        closeModal,
        openModal,
        preferredTableContentLocale,
        isMatching,
        updatePreferredLocale,
        updatePreferredHomePage,
        preferredHomePage,
        storeNameObject,
        monthlyOrdersGoalObject,
        updateDashMultiSettings
    } = useSettingsUiContext();
    const toggleSidebarCb = () => {
        isOpen ? closeModal() : openModal()
    }

    const {translate} = useLocaleContext()

    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        defaultValues: {
            preferredTableLocale: '',
            preferredHomePage: '',
            storeName: storeNameObject?.value
        }
    });

    useEffect(() => {
        if (isMatching) {
            setValue('preferredTableLocale',
                {label: 'Matching With System', value: DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE}
            );
        } else {
            setValue('preferredTableLocale', {
                label: preferredTableContentLocale === 'en' ? 'English' : 'Arabic',
                value: preferredTableContentLocale,
            });
        }

    }, [preferredTableContentLocale]);


    useEffect(() => {
        setValue('preferredHomePage', {label: translate(`sidebar.${preferredHomePage}`) , value: preferredHomePage} )
    }, [updatePreferredHomePage, preferredHomePage]);

    useEffect(() => {
        setValue('storeName' , storeNameObject?.value )
        setValue('monthOrdersGoal' , monthlyOrdersGoalObject?.value )
    }, [storeNameObject, monthlyOrdersGoalObject]);


    const OPTIONS = [
        {label: 'English', value: 'en'},
        {label: 'Arabic', value: 'ar'},
        {label: 'Matching With System', value: DataSourceManager.TABLE_CONTENT_VALUES.MATCHING_THE_LOCALE},
    ]

    const storeCategoryOPTIONS = [
        {label: 'Clothes', value: 'CLOTHES'},
    ]

    const navOptions = NavItems.map(item => {
        if (item.children) {
            return item.children.map(childItem => ({
                id: childItem.id,
                navLink: childItem.navLink,
            }));
        }
        return {
            id: item.id,
            navLink: item.navLink,
        };
    }).flat();

    const onSubmit = ({
                          preferredTableLocale,
                          preferredHomePage,
                          storeName,
                          storeCategory,
                          monthOrdersGoal,
                      }) => {
        const val = preferredTableLocale.value;
        updatePreferredLocale(val);
        updatePreferredHomePage(preferredHomePage)
        const storeNameObjectToSend = {
            settingKey: storeNameObject.settingKey,
            description: storeNameObject.description,
            value: storeName,
        }

        const monthlyOrdersGoalObjectToSend = {
            settingKey: monthlyOrdersGoalObject.settingKey,
            description: monthlyOrdersGoalObject.description,
            value: monthOrdersGoal,
        }

        const dataToSend = {
            multiTypeSettings: [
                storeNameObjectToSend,
                monthlyOrdersGoalObjectToSend
            ]
        };
        updateDashMultiSettings(dataToSend)
        closeModal();
    }

    return (
        <Sidebar
            size='lg'
            open={isOpen}
            title={translate('dashboard-settings.title')}
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebarCb}
        >
            <form className={"my-4"} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col xs={12} className={'mb-2'}>
                        <CustomControlledDropdownField
                            label={translate('dashboard-settings.preferredTableLocale')}
                            name={"preferredTableLocale"}
                            control={control}
                            options={OPTIONS}
                            errors={errors}
                        />
                    </Col>

                    <Col xs={12} className={'mb-2'}>
                        <CustomControlledDropdownField
                            label={translate('dashboard-settings.preferredHomePage')}
                            name={"preferredHomePage"}
                            control={control}
                            options={navOptions.map((nav) => {
                                return {
                                    label: translate(`sidebar.${nav.id}`),
                                    value: nav.navLink,
                                    navLink: nav.navLink,
                                    id: nav.id
                                };
                            })}
                            errors={errors}
                        />
                    </Col>

                    <Col xs={12} className={'mb-2'}>
                        <CustomControlledInputField
                            label={translate('dashboard-settings.storeName')}
                            name={'storeName'}
                            control={control}
                            errors={errors}
                        />

                    </Col>
                    <Col xs={12} className={'mb-2'}>
                        <CustomControlledInputField
                            label={translate('dashboard-settings.monthOrdersGoal')}
                            name={'monthOrdersGoal'}
                            control={control}
                            errors={errors}
                            type={'number'}
                        />
                    </Col>

                    <Col xs={12} className={"mt-4"}>
                        <Button type={"submit"}>
                            {translate('dashboard-settings.button-update')}
                        </Button>
                    </Col>
                </Row>

            </form>

        </Sidebar>
    )
}

export default SettingsSidebar
