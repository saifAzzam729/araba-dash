export const FOOTER_FLAG_VALUES = {
    0: 'hide',
    1: 'show',
};


// Function to extract the value when given the key
export const getFooterFlagValueByKey = (key) => {
    return FOOTER_FLAG_VALUES[key];
};

// Function to get the key when given the value
export const getFooterFlagKeyByValue = (value) => {
    return Object.keys(FOOTER_FLAG_VALUES).find((key) => FOOTER_FLAG_VALUES[key] === value);
};



// GUEST_CHECKOUT_VALUES
export const GUEST_CHECKOUT_VALUES = {
    EMAIL: "EMAIL",
    PHONE_NUMBER: 'PHONE_NUMBER',
    BOTH: 'BOTH'
};

export const getGuestCheckOutValueByKey = (key) => {
    return GUEST_CHECKOUT_VALUES[key];
};

export const getGuestCheckOutByValue = (value) => {
    return Object.keys(GUEST_CHECKOUT_VALUES).find((key) => GUEST_CHECKOUT_VALUES[key] === value);
};


// USER_CRUD_ADDRESSES_VALUES
export const USER_CRUD_ADDRESSES_VALUES = {
    0: "no",
    1: 'yes',
};

export const getUserCrudAddressesValueByKey = (key) => {
    return USER_CRUD_ADDRESSES_VALUES[key];
};

export const getUserCrudAddressesByValue = (value) => {
    return Object.keys(USER_CRUD_ADDRESSES_VALUES).find((key) => USER_CRUD_ADDRESSES_VALUES[key] === value);
};


export const WISHLIST_FLAG_VALUES = {
    0 : 'inactive',
    1 : 'active',
};


// Function to extract the value when given the key
export const getWishListFlagValueByKey = (key) => {
    return WISHLIST_FLAG_VALUES[key];
};

// Function to get the key when given the value
export const getWishListFlagByValue = (value) => {
    return Object.keys(WISHLIST_FLAG_VALUES).find((key) => WISHLIST_FLAG_VALUES[key] === value);
};


export const PRODUCT_REVIEW_FLAG_VALUES = {
    0 : 'inactive',
    1 : 'active',
};


// Function to extract the value when given the key
export const getProductReviewFlagValueByKey = (key) => {
    return PRODUCT_REVIEW_FLAG_VALUES[key];
};

// Function to get the key when given the value
export const getProductReviewFlagByValue = (value) => {
    return Object.keys(PRODUCT_REVIEW_FLAG_VALUES).find((key) => PRODUCT_REVIEW_FLAG_VALUES[key] === value);
};



export const ADD_TO_CART_FLAG_VALUES = {
    0 : 'inactive',
    1 : 'active',
};


// Function to extract the value when given the key
export const getAddToCartFlagValueByKey = (key) => {
    return ADD_TO_CART_FLAG_VALUES[key];
};

// Function to get the key when given the value
export const getAddToCartFlagFlagByValue = (value) => {
    return Object.keys(ADD_TO_CART_FLAG_VALUES).find((key) => ADD_TO_CART_FLAG_VALUES[key] === value);
};


export const REGISTER_LOGIN_VALUES = {
    0 : 'inactive',
    1 : 'active',
};


// Function to extract the value when given the key
export const getRegisterLoginValueByKey = (key) => {
    return REGISTER_LOGIN_VALUES[key];
};

// Function to get the key when given the value
export const getRegisterLoginByValue = (value) => {
    return Object.keys(REGISTER_LOGIN_VALUES).find((key) => REGISTER_LOGIN_VALUES[key] === value);
};


export const MAINTENANCE_MODE_VALUES = {
    0 : 'inactive',
    1 : 'active',
};


// Function to extract the value when given the key
export const getMaintenanceModeValueByKey = (key) => {
    return MAINTENANCE_MODE_VALUES[key];
};

// Function to get the key when given the value
export const getMaintenanceModeByValue = (value) => {
    return Object.keys(MAINTENANCE_MODE_VALUES).find((key) => MAINTENANCE_MODE_VALUES[key] === value);
};


export const COMING_SOON_MODE_VALUES = {
    0 : 'inactive',
    1 : 'active'
};


// Function to extract the value when given the key
export const getComingSoonModeValueByKey = (key) => {
    return COMING_SOON_MODE_VALUES[key];
};

// Function to get the key when given the value
export const getComingSoonModeByValue = (value) => {
    return Object.keys(COMING_SOON_MODE_VALUES).find((key) => COMING_SOON_MODE_VALUES[key] === value);
};


export const LEGAL_INFORMATION_VALUES = {
    0 : 'inactive',
    1 : 'active'
};


// Function to extract the value when given the key
export const getLegalInformationValueByKey = (key) => {
    return LEGAL_INFORMATION_VALUES[key];
};

// Function to get the key when given the value
export const getLegalInformationByValue = (value) => {
    return Object.keys(LEGAL_INFORMATION_VALUES).find((key) => LEGAL_INFORMATION_VALUES[key] === value);
};

export const PURCHASE_PROCESS_VALUES = {
    0 : 'inactive',
    1 : 'active'
};


// Function to extract the value when given the key
export const getPurchaseProcessValueByKey = (key) => {
    return PURCHASE_PROCESS_VALUES[key];
};

// Function to get the key when given the value
export const getPurchaseProcessByValue = (value) => {
    return Object.keys(PURCHASE_PROCESS_VALUES).find((key) => PURCHASE_PROCESS_VALUES[key] === value);
};

export const SHIPMENT_INFORMATION_VALUES = {
    0 : 'inactive',
    1 : 'active'
};


// Function to extract the value when given the key
export const getShipmentInformationValueByKey = (key) => {
    return SHIPMENT_INFORMATION_VALUES[key];
};

// Function to get the key when given the value
export const getShipmentInformationByValue = (value) => {
    return Object.keys(SHIPMENT_INFORMATION_VALUES).find((key) => SHIPMENT_INFORMATION_VALUES[key] === value);
};

export const PRODUCT_TAX_FLAG_VALUES = {
    0 : 'inactive',
    1 : 'active'
};


// Function to extract the value when given the key
export const getProductTaxFlagValueByKey = (key) => {
    return PRODUCT_TAX_FLAG_VALUES[key];
};

// Function to get the key when given the value
export const getProductTaxFlagByValue = (value) => {
    return Object.keys(PRODUCT_TAX_FLAG_VALUES).find((key) => PRODUCT_TAX_FLAG_VALUES[key] === value);
};


