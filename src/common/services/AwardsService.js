import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.AWARDS_URLS.GENERAL;


const getPagination = async ({ page = 1, limit = 10, search = "" }) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
        }
    });

    return res.data;
}
const getById = async (id) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url);

    return res.data;
};
const create = async ({ translations, image, publish }) => {

    const dataToSend = {
        translations,
        publish,
        image: image.item(0),
    }
    console.log(dataToSend)
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend);
    return res.data;
}

const update = async (id, {image, translations, publish}) => {
    const dataToSend = {
        translations,
        publish,
    }
    
    if (image) {
        dataToSend['image'] = image.item(0)
    }


    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data;
}


const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;

}

const BrandsService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
    getById
}

export default BrandsService;
