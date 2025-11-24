const Token_KEY = 'firedFireBased'
const setFirebaseSubscribe = () => {
    sessionStorage.setItem(Token_KEY, 'true');
};

const getFirebaseSubscribe = () => {
   return sessionStorage.getItem(Token_KEY);
};

const removeFirebaseSubscribe = () => {
    sessionStorage.removeItem(Token_KEY)
};


const NotificationSessionStorageManager = {
    setFirebaseSubscribe,
    getFirebaseSubscribe,
    removeFirebaseSubscribe,
};

export default NotificationSessionStorageManager;