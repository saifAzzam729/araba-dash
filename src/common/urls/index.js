const BASE_BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const API_BASE_BACKEND_URL = `${BASE_BACKEND_URL}/api`;
const MAIN_SLIDERS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/main-sliders`,
};

const FAQS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/faqs`,
};

const BRANDS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/brands`,
};
const PRODUCT_REVIEWS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/product-reviews`,
};
const KITCHENS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/kitchens`,
};
const KITCHENSIMAGES_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/kitchen-images`,
};
const PRODUCTS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/products`,
};
const PRODUCT_CATEGORIES_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/categories`,
};
const CONTACT_US_APPLICATIONS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/contact-us`,
};

const AWARDS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/awards`,
};

const NUTRITION_FACTS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/nutrition-facts`,
};

const TESTIMONIALS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/testimonials`,
};
const TEAM_MEMBERS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/team-members`,
};

const AUTH_URLS = {
    LOGIN: `${API_BASE_BACKEND_URL}/admin/auth/login`,
    REFRESH_TOKEN: `${API_BASE_BACKEND_URL}/token/refresh`,
};
const USERS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/users`,
    USER_GROUPS: `${API_BASE_BACKEND_URL}/admin/user-groups`
};
const ROLE_GROUPS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/roles-groups`,
    ROLES: `${API_BASE_BACKEND_URL}/admin/roles`,
    ROLES_BY_SECTION: `${API_BASE_BACKEND_URL}/admin/roles/by-section`,
};
const COUNTRIES_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/countries`,
};

const PETS_URL = {
    PET_TYPES: `${API_BASE_BACKEND_URL}/admin/pets`,
    PET_BREEDS: `${API_BASE_BACKEND_URL}/admin/pet-breeds`,
    USER_PETS: `${API_BASE_BACKEND_URL}/admin/user-pet-breeds`,
};
const PAYMENT_METHODS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/payment-providers`,
};

const CURRENCIES_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/currencies`,
    DEFAULT_CURRENCY: `${API_BASE_BACKEND_URL}/admin/currencies/system-currency`
};

const SLIDERS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/sliders`,
};
const VISUAL_SETTINGS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/visual-settings`,
};
const SALE_ORDERS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/sale-orders`,
    STATUS: `${API_BASE_BACKEND_URL}/admin/sale-orders/status`,
};
const REVIEWS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/reviews`,
};

const SETTINGS_URL = {
    MULTI_TYPE: `${API_BASE_BACKEND_URL}/admin/multi-type-settings`,
    MULTI_TYPE_BULK_UPDATE: `${API_BASE_BACKEND_URL}/admin/multi-type-settings/bulk-update`
};
const SUB_HERO_ICON_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/sub-hero-icons`,
};
const OPTIONS_URL = {
    MULTI_TYPE: `${API_BASE_BACKEND_URL}/options/multi-settings/types`,
    SALES_ORDER_STATUS: `${API_BASE_BACKEND_URL}/options/sale-orders/status`,
    PRICE_TYPES: `${API_BASE_BACKEND_URL}/options/price-types`,
    GENDER_TYPE: `${API_BASE_BACKEND_URL}/options/users/gender/types`,
    APPLICABLE_TO: `${API_BASE_BACKEND_URL}/options/discount/applies-to`,
    USER_STATUS: `${API_BASE_BACKEND_URL}/options/users-as-company-status`,
    DHL_LABEL_FORMAT: `${API_BASE_BACKEND_URL}/options/dhl-label/format`,
    STATISTIC_DIMENSION: `${API_BASE_BACKEND_URL}/options/statistic/uom/dimension`,
    STATISTIC_WEIGHT: `${API_BASE_BACKEND_URL}/options/statistic/uom/weight`,
    COUNTRY_LOCALE : `${API_BASE_BACKEND_URL}/options/country-locale`
};
const PRODUCT_IMAGES_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/product-images`,
    IMAGES_UPSERT: `${API_BASE_BACKEND_URL}/admin/product-images/upsert`,
};
const STATISTIC_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/statistics`,
};

const PROFILE_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/auth/me/profile`,
};
const PRODUCT_TYPES_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/product-types`,
};
const TAGS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/tags`,
};
const ADMIN_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/auth/me`,
};
const DISCOUNTS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/discounts`,
};

const PRODUCT_GROUP = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/product-groups`,
};

const PRODUCT_ATTRIBUTES = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/attributes`,
};

const PRODUCT_OPTIONS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/options`,
};

const SINGLE_PRODUCT_ATTRIBUTES = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/product-attributes/bulk-upsert`,
};

const PRODUCT_ATTRIBUTES_SORT_ORDER = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/product-attributes`,
}

const ERRORS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/error-logs`,
};
const SHIPPING_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/shipping`,
};

const STATES = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/states`,
};
const CITIES = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/cities`,
};

const AFFILIATES = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/affiliates`,
    AFFILIATE_PAYMENT: `${API_BASE_BACKEND_URL}/admin/affiliate`,
};

const MODAL_COMPATIBILITY = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/modal-compatibility`,
};

const NOTIFICATIONS_EVENTS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/notification-events`,
};

const NOTIFICATIONS = {
    AUTH: `${API_BASE_BACKEND_URL}/admin/auth/subscribe-to-firebase-topics`,
    GENERAL: `${API_BASE_BACKEND_URL}/admin/auth/me/notifications`
};

const NOTIFICATIONS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/notifications`
};

const PRODUCTS_VARIANTS_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/products/variants`
}

const TAXES_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/taxes`
}

const SHIPMENT_PRODUCTS = {
	GENERAL: `${API_BASE_BACKEND_URL}/admin/shipmentProducts`
}

const SHIPMENT_PACKAGES = {
	GENERAL: `${API_BASE_BACKEND_URL}/admin/shipment-packages`
}
const SHIPMENT_SHIPPERS = {
	GENERAL: `${API_BASE_BACKEND_URL}/admin/shipment-shippers`
}
const SALE_ORDERS_SHIPMENTS = {
	GENERAL: `${API_BASE_BACKEND_URL}/admin/sale-orders/shipments`
}

const EBAY_ACCOUNT_URL = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/ebay-accounts`
}
const EBAY_LOCATION_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/ebay-accounts`
}
const EBAY_POLICIES_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/ebay-policies`
}


const EBAY_LISTINGS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/ebay-listings`
}

const EBAY_LISTINGS_PRODUCTS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/ebay-listing-products`
}
const EBAY_CATEGORIES_URLS = {
    GENERAL : `${API_BASE_BACKEND_URL}/admin/ebay-categories`
}

const REPORTS_URLS = {
    GENERAL : `${API_BASE_BACKEND_URL}/admin/reports`
}

const VENDORS_URLS = {
    GENERAL: `${API_BASE_BACKEND_URL}/admin/vendors`
};

const URLS = {
	BASE_BACKEND_URL,
	API_BASE_BACKEND_URL,
	MAIN_SLIDERS_URL,
	FAQS_URLS,
	BRANDS_URLS,
	PRODUCT_REVIEWS_URLS,
	PRODUCT_CATEGORIES_URLS,
	CONTACT_US_APPLICATIONS_URLS,
	AWARDS_URLS,
	NUTRITION_FACTS_URLS,
	TESTIMONIALS_URLS,
	TEAM_MEMBERS_URLS,
	AUTH_URLS,
	USERS_URL,
	ROLE_GROUPS_URL,
	COUNTRIES_URL,
	PRODUCTS_URLS,
	PETS_URL,
	PAYMENT_METHODS_URL,
	CURRENCIES_URL,
	KITCHENS_URLS,
	KITCHENSIMAGES_URLS,
	SLIDERS_URL,
	SALE_ORDERS_URL,
	REVIEWS_URL,
	SETTINGS_URL,
	SUB_HERO_ICON_URL,
	VISUAL_SETTINGS_URLS,
	OPTIONS_URL,
	PRODUCT_IMAGES_URL,
	STATISTIC_URL,
	PROFILE_URL,
	PRODUCT_TYPES_URL,
	TAGS_URL,
	ADMIN_URL,
	DISCOUNTS_URL,
	PRODUCT_GROUP,
	PRODUCT_ATTRIBUTES,
	PRODUCT_OPTIONS,
	SINGLE_PRODUCT_ATTRIBUTES,
	ERRORS,
	AFFILIATES,
	SHIPPING_URLS,
	STATES,
	CITIES,
	PRODUCT_ATTRIBUTES_SORT_ORDER,
	MODAL_COMPATIBILITY,
	NOTIFICATIONS_EVENTS,
	NOTIFICATIONS,
	NOTIFICATIONS_URL,
	PRODUCTS_VARIANTS_URL,
	TAXES_URL,
	SHIPMENT_PRODUCTS,
	SHIPMENT_PACKAGES,
	SHIPMENT_SHIPPERS,
	SALE_ORDERS_SHIPMENTS,
    EBAY_ACCOUNT_URL,
    EBAY_LOCATION_URLS,
    EBAY_POLICIES_URLS,
    EBAY_LISTINGS_URLS,
    EBAY_LISTINGS_PRODUCTS_URLS,
    EBAY_CATEGORIES_URLS,
    REPORTS_URLS,
    VENDORS_URLS,

};

export default URLS;
