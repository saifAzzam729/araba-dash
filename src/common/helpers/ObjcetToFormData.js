function ObjectToFormData(obj){

    const formData = new FormData();

    Object.keys(obj).forEach((key) => {

        const value = obj[key];

        if (Array.isArray(value)) {

            value.forEach((item) => formData.append(key, item));

        } else {

            formData.append(key, value);

        }

    });

    return formData;

}

export default ObjectToFormData;
