export const formatMultiTypeSettingName = (key) => {
    const namesObject = {
        META_KEYWORDS: 'Meta Keywords',
        META_DESCRIPTION: 'Meta Description',
        META_SUBJECT: 'Meta Subject',
        META_CLASSIFICATION: 'Classification',
        OPENGRAPH_TITLES: 'Opengraph Titles',
        OPENGRAPH_TYPE: 'Opengraph Type',
        OPENGRAPH_DESCRIPTION: 'Opengraph Description',
        OPENGRAPhH_LOCALITY: 'Opengraph Locality',
        OPENGRAPH_COUNTRY: 'Opengraph Country',
        OPENGRAPH_FACEBOOKPAGEID: 'Opengraph Facebook PageId',
    }
    const foundName = namesObject[key];
    return foundName ?? key;
}