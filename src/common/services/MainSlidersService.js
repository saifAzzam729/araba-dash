import URLS from "../urls";
import CustomAxios from "../api-client";
import ApiClient from "../api-client";
// import ObjectToFormData from "../helpers/ObjcetToFormData";
const generalUrl = URLS.MAIN_SLIDERS_URL.GENERAL;

const getPagination = async ({page = 1, pageSize = 10}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            'page[size]': pageSize,
            'page[number]': page,
        }
    });

    return res.data;
}

const create = async ({image}) => {
    const formData = new FormData();
    formData.append("image", image[0]);

    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, formData);
    return res.data;
}

const update = async (id, {image}) => {
    const formData = new FormData();
    formData.append("image", image[0]);

    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomMultiPartAxios.post(url, formData);
    return res.data;
}

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;

}

const MainSliderService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
}

export default MainSliderService;
