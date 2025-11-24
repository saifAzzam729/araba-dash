import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.PETS_URL.USER_PETS;

const getPagination = async ({page = 1, limit = 10, search = ""}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
        },
    });

    return res.data;
};

const create = async ({name, weight, petBreed, birthdate, gender, user}) => {
    const dataToSend = {
        name, weight, petBreed, birthdate, gender, user
    };
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
    return res.data;
};

const getById = async (id) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url);

    return res.data;
};

const update = async (id, {
    name, weight, petBreed, birthdate, gender, user
}) => {
    const url = `${generalUrl}/${id}`;
    const dataToSend = {
        name, weight, petBreed, birthdate, gender, user
    };
    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};

const PetTypesService = {
    getPagination,
    create,
    getById,
    update,
    deleteObject: deleteById,
};

export default PetTypesService;
