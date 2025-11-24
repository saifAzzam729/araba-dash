import URLS from "../urls";
import PersonPlaceholder from '@src/assets/images/placeholder-image.png'

const ParseImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return PersonPlaceholder;
    }
    return URLS.BASE_BACKEND_URL + imageUrl;
}

export default ParseImageUrl;
