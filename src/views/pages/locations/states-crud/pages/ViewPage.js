import BreadCrumbs from "@components/breadcrumbs";
import {useMutation, useQuery} from "react-query";
import StatesService from "@src/common/services/StatesService";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Row} from "reactstrap";
import {useLocaleContext} from "@src/providers/LocaleProvider";
import React, {useState} from "react";
import useModal from "@components/modal/useModal";
import EditCitiesModal from "@src/views/pages/locations/partials/cities/modals/edit";
import showSuccessAlert from "@components/alert/showSuccessAlert";
import ViewCitiesModal from "@src/views/pages/locations/partials/cities/modals/view";
import handleDeleteMutation from "@components/alert/handleDeleteMutation";
import CitiesService from "@src/common/services/CitiesService";
import showErrorAlert from "@components/alert/showErrorAlert";
import CitiesTableComponent from "@src/views/pages/locations/states-crud/pages/partials/CitiesTableComponent";
import StateDetailsView from "@src/views/pages/locations/states-crud/pages/partials/StateDetailsView";

export default function ViewStatesPage() {
    const {translate, makeLocaleUrl} = useLocaleContext()
    const {id} = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null)

    const {
        isOpen: isEditModalOpen,
        closeModal: closeEditModal,
        openModal: openEditModal,
        item: editItem,
    } = useModal();

    const {
        isOpen: isViewModalOpen,
        item: viewItem,
        closeModal: closeViewModal,
        openModal: openViewModal,
    } = useModal();

    const {data, isLoading, refetch} = useQuery(
        ['state', id],
        () => StatesService.getById(id)
    )

    const state = data?.data ?? null;

    const cities = state?.cities ?? [];

    const {mutate: deleteMutation} = useMutation(
        (data) => CitiesService.deleteById(data.id),
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

    const goBack = () => {
        navigate(makeLocaleUrl("/states"));
    };

    const onEditSuccess = () => {
        refetch();
        closeEditModal();
        showSuccessAlert({});
    }

    const onDelete = (row) => {
        handleDeleteMutation(deleteMutation, row)
    };

    return (
        <>
            <BreadCrumbs title={"states-details-page"} data={[{title: translate('common.states'), link: "/states"}]}/>
            <Card className="p-2 p-lg-5 bg-white">
            <div>
                <h2>{translate('states.view.header')}</h2>
                <p>{translate('states.view.sub-header')}</p>
                <hr/>

                <StateDetailsView state={state}/>

                <CitiesTableComponent
                    cities={cities}
                    setItem={setItem}
                    onDelete={onDelete}
                    openEditModal={openEditModal}
                    openViewModal={openViewModal}
                />

                <div className="d-flex justify-content-between">
                    <Button type="button" color="secondary" outline onClick={goBack}>
                        {translate('common.back')}
                    </Button>
                </div>
            </div>
        </Card>

        {isEditModalOpen && (
            <EditCitiesModal
                closeModal={closeEditModal}
                isOpen={isEditModalOpen}
                item={item}
                onEditSuccessCb={onEditSuccess}
            />
        )}

        {isViewModalOpen && (
            <ViewCitiesModal
                closeModal={closeViewModal}
                isOpen={isViewModalOpen}
                item={item}
            />
        )}
        </>
    )
}