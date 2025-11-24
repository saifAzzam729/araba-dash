import BreadCrumbs from "@components/breadcrumbs";
import {Button, Card} from "reactstrap";
import React, {useState} from "react";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import CountriesService from "@src/common/services/CountriesService";
import {useSettingsUiContext} from "@src/providers/SettingsUi/SettingsUiProvider";
import CountryDetailsView from "@src/views/pages/locations/countries/pages/partials/CountryDetailsView";
import StatesTableComponent from "@src/views/pages/locations/countries/pages/partials/StatesTableComponent";
import useModal from "@components/modal/useModal";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import StatesService from "@src/common/services/StatesService";
import showErrorAlert from "@components/alert/showErrorAlert";
import EditStatesModal from "@src/views/pages/locations/partials/states/modals/edit";

export default function ViewCountriesPage() {
    const {preferredTableContentLocale} = useSettingsUiContext();
    const {translate, makeLocaleUrl} = useLocaleContext()
    const {id} = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null)

    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
    } = useModal();

    const {data, refetch} = useQuery(
        ['country', id],
        () => CountriesService.getById(id, {locale: preferredTableContentLocale})
    )

    const country = data?.data ?? null;
    const states = country?.states ?? [];

    const {mutate: deleteMutation} = useMutation(
        (data) => StatesService.deleteById(data.id),
        {
            onSuccess: () => {
                refetch();
                showSuccessAlert({});
            },
            onError: () => {
                showErrorAlert({})
            }
        }
    );

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row)
    };

    const goBack = () => {
        navigate(makeLocaleUrl("/countries"));
    };

    const openViewPage = (id) => {
        navigate(makeLocaleUrl(`states/view/${id}`));
    }

    return(
        <>
            <BreadCrumbs title={"countries-details-page"} data={[{title: translate('common.countries'), link: "/countries"}]}/>
            <Card className="p-2 p-lg-5 bg-white">
                <div>
                    <h2>{translate('countries.view.header')}</h2>
                    <p>{translate('countries.view.sub-header')}</p>
                    <hr/>

                    <CountryDetailsView country={country} />

                    <StatesTableComponent
                        states={states}
                        setItem={setItem}
                        openViewPage={openViewPage}
                        openEditModal={openEditModal}
                        onDelete={onDelete}
                    />

                    <div className="d-flex justify-content-between">
                        <Button type="button" color="secondary" outline onClick={goBack}>
                            {translate('common.back')}
                        </Button>
                    </div>
                </div>
            </Card>

            {isEditModalOpen && (
                <EditStatesModal
                    closeModal={closeEditModal}
                    isOpen={isEditModalOpen}
                    item={item}
                    onEditSuccessCb={onEditSuccess}
                />
            )}
        </>
    )
}