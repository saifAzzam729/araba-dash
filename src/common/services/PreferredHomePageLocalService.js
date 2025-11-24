import NavItems from "@src/navigation/NavItems";

export const KEY = 'preferred-home';

const setValue = (val)=>{
    localStorage.setItem(KEY, val);
}

const extractValue = ()=>{
    const storedVal = localStorage.getItem(KEY);
    if(storedVal){
        return storedVal;
    }
    setValue('home')
    return 'home'
}

const PreferredHomePageLocalService = {
    setValue,
    extractValue,
}

export default PreferredHomePageLocalService;