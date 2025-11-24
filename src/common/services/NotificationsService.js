import ApiClients from "@src/common/api-client";
import URLS from "@src/common/urls";
import {getToken} from "firebase/messaging";
import ApiClient from "@src/common/api-client";
const authUrl = URLS.NOTIFICATIONS.AUTH;
const generalUrl = URLS.NOTIFICATIONS.GENERAL;
const APP_VAPID_KEY = import.meta.env.VITE_APP_FIREBASE_VAPID_KEY;


const NotificationSubscribe = async (messaging, topics) => {
    const currentToken = await NotificationsService.newSendReq(messaging);
    const dataToSend = {fcmToken: currentToken, topics};
    const res = await ApiClients.CustomAxios.post(authUrl, dataToSend);
    return res.data;
}

const newSendReq = (messaging)=> {
    return new Promise((resolve, reject) => {
        if(!messaging){
            reject();
        }
        getToken(messaging, { vapidKey: APP_VAPID_KEY })
            .then((currentToken) => {
                if (currentToken) {
                    resolve(currentToken)
                } else {
                    console.log('Failed to generate the registration token.');
                    reject()
                }
            })
            .catch((err) => {
                console.log('An error occurred when requesting to receive the token.', err);
                reject()
            });
    })
}


const getPagination = async ({ page = 1, limit = 10, read= undefined , locale= 'en', direction = "", sort= ""}) => {
    const res = await ApiClient.CustomAxios.get(generalUrl, {
        params: {
            page,
            limit,
            read,
            direction,
            sort
        },
        headers: {
            'x-locale': locale
        }
    });

    return res.data;
};


const MarkAllAsReadNotification = async () => {
    const res = await ApiClients.CustomAxios.put(`${generalUrl}/mark-all-as-read`);
    return res.data;
}

const MarkAsReadNotification = async (id) => {
    const res = await ApiClients.CustomAxios.put(`${generalUrl}/${id}/mark-as-read`);
    return res.data;
}




const NotificationsService = {
    newSendReq,
    NotificationSubscribe,
    getPagination,
    MarkAllAsReadNotification,
    MarkAsReadNotification
};

export default NotificationsService;