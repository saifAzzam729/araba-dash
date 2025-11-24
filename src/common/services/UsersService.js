import URLS from "../urls";
import ApiClient from "../api-client";

const generalUrl = URLS.USERS_URL.GENERAL;
const AdminUrl = URLS.ADMIN_URL.GENERAL;

const getPagination = async ({
                                 page = 1,
                                 limit = 10,
                                 search = '',
                                 locale = 'en',
                                 type = undefined,
                                 status = undefined,
                                 excluded_status = undefined,
                             }) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            search,
            type,
            status,
            excluded_status,
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};

const create = async ({
                          avatar,
                          fullName,
                          password,
                          phoneNumber,
                          email,
                          gender,
                          country,
                          type,
                          dateOfBirth,
                          roleGroup,
                          userGroup,
                            locale,
                      }) => {
    const dataToSend = {
        avatar,
        fullName,
        phoneNumber,
        email,
        gender,
        country,
        type,
        dateOfBirth,
        'rolesGroups[]': roleGroup,
        password,
        userGroup
    }
    if (avatar) {
        dataToSend["avatar"] = avatar.item(0);
    }
    const res = await ApiClient.CustomMultiPartAxios.post(generalUrl, dataToSend, {
        headers: {
            'x-locale': locale
        }
    });
    return res.data;
};

const getById = async (id, {locale = 'en'}) => {
    const url = `${generalUrl}/${id}`;

    const res = await ApiClient.CustomAxios.get(url, {
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};


const update = async (id, {
    avatar,
    fullName,
    phoneNumber,
    email,
    gender,
    country,
    type,
    dateOfBirth,
    roleGroup,
    password,
    blocked,
    status,
    userGroup
}) => {
    const dataToSend = {
        avatar,
        fullName,
        phoneNumber,
        email,
        gender,
        country,
        type,
        dateOfBirth,
        password,
        blocked,
        status,
        userGroup
    }

    if (roleGroup) {
        dataToSend['rolesGroups[]'] = roleGroup;
    }

    if (avatar) {
        dataToSend["avatar"] = avatar.item(0);
    }
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomMultiPartAxios.post(url, dataToSend);
    return res.data.data;
};

const deleteById = async (id) => {
    const url = `${generalUrl}/${id}`;
    const res = await ApiClient.CustomAxios.delete(url);
    return res.data;
};
const changePassword = async ({currentPassword, newPassword, confirmPassword}) => {
    const url = `${AdminUrl}/change-password`
    const res = await ApiClient.CustomAxios.put(url, {
        currentPassword,
        newPassword,
        confirmPassword
    })
    return res.data
}

const UsersService = {
    getPagination,
    create,
    update,
    getById,
    deleteObject: deleteById,
    changePassword
};

export default UsersService;
