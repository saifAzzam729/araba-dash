import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.NUTRITION_FACTS_URLS.GENERAL;

const getPagination = async ({page = 1, pageSize = 10}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            'page[size]': pageSize,
            'page[number]': page,
        }
    });

    return res.data;
}

const create = async ({image, title, description}) => {

    const formData = new FormData();
    if (image) {
        formData.append("image", image[0]);
    }
    formData.append("title[en]", title.en);
    formData.append("title[ar]", title.ar);
    formData.append("description[en]", description.en);
    formData.append("description[ar]", description.ar);

    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, formData);
    return res.data;
}

const update = async (id, {image, title, description}) => {
    const formData = new FormData();
    if (image) {
        formData.append("image", image[0]);
    }
    formData.append("title[en]", title.en);
    formData.append("title[ar]", title.ar);
    formData.append("description[en]", description.en);
    formData.append("description[ar]", description.ar);


    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomMultiPartAxios.post(url, formData);
    return res.data;
}


const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;

}

const NutritionFactsService = {
    getPagination,
    create,
    update,
    deleteObject: deleteById,
}

export default NutritionFactsService;
