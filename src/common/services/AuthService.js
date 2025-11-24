import ApiClients from "@src/common/api-client";
import URLS from "@src/common/urls";

const Login = async (email, password) => {
    const dataToSend = {username:email, password};
    const res = await ApiClients.CustomAxios.post(URLS.AUTH_URLS.LOGIN, dataToSend);
    return res.data;
}

const Profile = async () => {
    const res = await ApiClients.CustomAxios.get(URLS.PROFILE_URL.GENERAL)
    return res.data;
}

const AuthService = {
    Login,
    Profile
}

export default AuthService;
