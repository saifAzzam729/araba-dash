import {
    Activity, AlertTriangle,
    Aperture, BarChart,
    Bell,
    Box, Calendar, CheckSquare,
    Circle, Clipboard,
    Command,
    CreditCard, Database,
    DollarSign,
    File,
    FileText,
    Flag,
    Folder, Gift,
    Globe,
    Grid,
    Hash, HelpCircle,
    Home,
    Info, Key,
    Layout,
    Link,
    List,
    Map,
    MessageCircle,
    MessageSquare,
    Monitor, Navigation,
    Package, Percent,
    Settings, Share,
    ShoppingBag,
    ShoppingCart,
    Slack, Sliders,
    Smartphone, Speaker, Star, Tag,
    Target,
    Terminal, Tool, TrendingUp,
    Truck,
    Twitch,
    User,
    UserCheck,
    Users, Volume,
} from "react-feather";
import {PERMISSIONS_NAMES} from "../utility/context/PermissionProvider/PERMISSIONS_NAMES";

export default [
    {
        header: 'pages'
    },
    {
        id: "home",
        title: "Home",
        icon: <Home size={20}/>,
        navLink: "/home",
        // permission: PERMISSIONS_NAMES.ACCESS_TO_DASHBOARD,
    },
    {
        id: "sale-order-menu",
        title: "Sale Orders",
        icon: <ShoppingCart size={20}/>,
        navLink: "/sale-orders",
        permission: PERMISSIONS_NAMES.ROLE_SALE_ORDER_LIST,
    },
    {
        id: "contact-us",
        title: "Contact Us",
        icon: <MessageCircle size={20}/>,
        navLink: "/contact-us",
        permission: PERMISSIONS_NAMES.ROLE_CONTACT_US_LIST,
    },
    {
        header: 'apps'
    },
    {
        id: "users",
        title: "Users",
        icon: <Users size={20}/>,
        children: [
            {
                id: "users",
                title: "users",
                icon: <User size={20}/>,
                navLink: "/users",
                permission: PERMISSIONS_NAMES.ROLE_USER_LIST,
            },
            {
                id: "company",
                title: "company",
                icon: <Database size={20}/>,
                navLink: "/company",
                permission: PERMISSIONS_NAMES.ROLE_USER_LIST,
            },
            {
                id: "registration-requests",
                title: "registration-requests",
                icon: <CheckSquare size={20}/>,
                navLink: "/registration-requests",
                permission: PERMISSIONS_NAMES.ROLE_USER_LIST,
            },
            {
                id: "user-groups",
                title: "user-groups",
                icon: <Grid size={20}/>,
                navLink: "/user-groups",
                permission: PERMISSIONS_NAMES.ROLE_USER_GROUP_LIST
            }
        ],
    },

    {
        id: "vendors",
        title: "vendors",
        icon: <Users size={20}/>,
        children: [
            {
                id: "vendors-requests",
                title: "vendors-requests",
                icon: <CheckSquare size={20}/>,
                navLink: "/vendor-requests",
                permission: PERMISSIONS_NAMES.ROLE_VENDOR_LIST,
            },
            {
                id: "vendors-list",
                title: "vendors",
                icon: <User size={20}/>,
                navLink: "/vendors",
                permission: PERMISSIONS_NAMES.ROLE_VENDOR_LIST,
            }
        ],
    },

    {
        id: "products-menu",
        title: "Product",
        icon: <Box size={20}/>,
        children: [
            {
                id: "products",
                title: "Products",
                icon: <Folder size={20}/>,
                navLink: "/products",
                permission: PERMISSIONS_NAMES.ROLE_PRODUCT_LIST,
            },
            {
                id: "categories-menu",
                title: "Categories",
                icon: <Tag size={20}/>,
                navLink: "/categories",
                permission: PERMISSIONS_NAMES.ROLE_CATEGORY_LIST,
            },
            {
                id: "brands-menu",
                title: "Brands",
                icon: <Star size={20}/>,
                navLink: "/brands",
                permission: PERMISSIONS_NAMES.ROLE_BRAND_LIST,
            },
            {
                id: "tags-menu",
                title: "Tags",
                icon: <Hash size={20}/>,
                navLink: "/tags",
                permission: PERMISSIONS_NAMES.ROLE_TAG_LIST,
            },
            {
                id: "product-reviews",
                title: "Product Reviews",
                icon: <Clipboard size={20}/>,
                navLink: "/product-reviews",
                permission: PERMISSIONS_NAMES.ROLE_REVIEW_LIST,
            },
            {
                id: "product-group-menu",
                title: "Product Group",
                icon: <Grid size={20}/>,
                navLink: "/product-group",
                permission: PERMISSIONS_NAMES.ROLE_PRODUCT_GROUP_LIST,
            },
            {
                id: "product-attributes",
                title: "Product Attributes",
                icon: <BarChart size={20}/>,
                navLink: "/product-attributes",
                permission: PERMISSIONS_NAMES.ROLE_PRODUCT_ATTRIBUTE_LIST,
            },
            {
                id: "model-compatibility",
                title: "model-compatibility",
                icon: <Activity size={20}/>,
                navLink: "/model-compatibility",
                permission: PERMISSIONS_NAMES.ROLE_MODEL_COMPATIBILITY_LIST,
            },
        ],
    },
    {
        id: "shippings",
        title: "shippings",
        icon: <Truck size={20}/>,
        children: [
            {
                id: "shippings",
                title: "Shippings",
                icon: <Truck size={20}/>,
                navLink: "/shippings",
                permission: PERMISSIONS_NAMES.ROLE_SHIPPING_LIST,
            },
            {
                id: "shipment-products",
                title: "shipment-products",
                icon: <Package size={20}/>,
                navLink: "/shipment-products",
                permission: PERMISSIONS_NAMES.ROLE_SHIPMENT_PRODUCT_LIST,
            },
            {
                id: "shipment-packages",
                title: "shipment-packages",
                icon: <Box size={20}/>,
                navLink: "/shipment-packages",
                permission: PERMISSIONS_NAMES.ROLE_SHIPMENT_PACKAGE_LIST,
            },
            {
                id: "shipment-shippers",
                title: "shipment-shippers",
                icon: <User size={20}/>,
                navLink: "/shipment-shippers",
                permission: PERMISSIONS_NAMES.ROLE_SHIPMENT_SHIPPER_LIST,
            },
        ],
    },

    {
        id: "notifications",
        title: "notifications",
        icon: <Bell size={20} />,
        children: [
            {
                id: "notifications-events",
                title: "notifications-events",
                icon: <Calendar size={12}/>,
                navLink: "/notifications-events",
                permission: PERMISSIONS_NAMES.ROLE_NOTIFICATION_LIST,
            },
            {
                id: "broadcast-notifications",
                title: "broadcast-notifications",
                icon: <Bell size={12}/>,
                navLink: "/notifications",
                permission: PERMISSIONS_NAMES.ROLE_NOTIFICATION_LIST,
            }
        ],
    },

    {
        id: "discounts",
        title: "discounts",
        icon: <Percent size={12}/>,
        children: [
            {
                id: "auto-discounts",
                title: "auto-discounts",
                icon: <Tag size={12}/>,
                navLink: "/auto-discounts",
                permission: PERMISSIONS_NAMES.ROLE_DISCOUNT_LIST,
            },
            {
                id: "coupon-discounts",
                title: "coupon-discounts",
                icon: <Gift size={12}/>,
                navLink: "/coupon-discounts",
                permission: PERMISSIONS_NAMES.ROLE_DISCOUNT_LIST,
            },
        ],
    },

    {
        id: "marketing",
        title: "marketing",
        icon: <Activity size={20}/>,
        children: [
            {
                id: "affiliates",
                title: "affiliates",
                icon: <Users size={20}/>,
                navLink: "/affiliates",
                permission: PERMISSIONS_NAMES.ROLE_AFFILIATE_LIST,
            },
            {
                id: "seo",
                title: "Seo",
                icon: <TrendingUp size={20}/>,
                navLink: "/seo",
                permission: PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_LIST,
            },
        ],
    },

    {
        id: "payments-settings",
        title: "Payments Settings",
        icon: <DollarSign size={20}/>,
        children: [
            {
                id: "payment-methods-menu",
                title: "Payment Methods",
                icon: <CreditCard size={20}/>,
                navLink: "/payment-methods",
                permission: PERMISSIONS_NAMES.ROLE_PAYMENT_METHOD_LIST,
            },
            {
                id: "currencies-menu",
                title: "Currencies",
                icon: <Globe size={20}/>,
                navLink: "/currencies",
                permission: PERMISSIONS_NAMES.ROLE_CURRENCY_LIST,
            },
            {
                id: "tax",
                title: "tax",
                icon: <Percent size={20}/>,
                navLink: "/tax",
                permission: PERMISSIONS_NAMES.ROLE_TAX_LIST,
            },
        ],
    },

    {
    id: "reports",
    title: "Reports",
    icon: <TrendingUp size={20} />,
    children: [
      {
        id: "user-details",
        title: "User Details",
        icon: <User size={20} />,
        navLink: "/reports/user-details",
        permission: PERMISSIONS_NAMES.ROLE_USER_HISTORY_REPORT,
      },
      {
        id: "sales-details",
        title: "Sales Details",
        icon: <ShoppingCart size={20} />,
        navLink: "/reports/sales-details",
        permission: PERMISSIONS_NAMES.ROLE_SALES_DETAILS_REPORT,
      },
      {
        id: "date-wise-sales",
        title: "Date-wise Sales",
        icon: <Calendar size={20} />,
        navLink: "/reports/date-wise-sales",
        permission: PERMISSIONS_NAMES.ROLE_DATE_WISES_SALES_REPORT,
      },
      {
        id: "country-wise-sales",
        title: "Country-wise Sales",
        icon: <Globe size={20} />,
        navLink: "/reports/country-wise-sales",
        permission: PERMISSIONS_NAMES.ROLE_COUNTRY_WISES_SALES_REPORT,
      },
      {
        id: "customer-wise-sales",
        title: "Customer-wise Sales",
        icon: <Users size={20} />,
        navLink: "/reports/customer-wise-sales",
        permission: PERMISSIONS_NAMES.ROLE_CUSTOMER_WISE_SALES_REPORT,
      },
      {
        id: "item-wise-sales",
        title: "Item-wise Sales",
        icon: <Box size={20} />,
        navLink: "/reports/item-wise-sales",
        permission: PERMISSIONS_NAMES.ROLE_ITEM_WISE_SALES_REPORT,
      },
      {
        id: "latest-products-sales",
        title: "Latest Products Sales",
        icon: <TrendingUp size={20} />,
        navLink: "/reports/latest-products-sales",
        permission: PERMISSIONS_NAMES.ROLE_LATEST_PRODUCT_SALES_REPORT,
      },
    ],
    },

    {
        id: "store-settings",
        title: "Settings",
        icon: <Settings size={20}/>,
        children: [
            {
                id: "store-info",
                title: "store-info",
                icon: <Info size={12}/>,
                navLink: "/settings/store-info",
                permission: PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_LIST,
            },
            {
                id: "social-media-links",
                title: "social-media-links",
                icon: <Share size={12}/>,
                navLink: "/settings/social-media-links",
                permission: PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_LIST,
            },
            {
                id: "functionality-settings",
                title: "functionality-settings",
                icon: <Sliders size={12}/>,
                navLink: "/settings/functionality-settings",
                permission: PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_LIST,
            },
            {
                id: "countries",
                title: "Countries",
                icon: <Flag size={20}/>,
                navLink: "/countries",
                permission: PERMISSIONS_NAMES.ROLE_COUNTRY_LIST,
            },
            {
                id: "states",
                title: "States",
                icon: <Map size={20}/>,
                navLink: "/states",
                permission: PERMISSIONS_NAMES.ROLE_STATES_LIST,
            },
            {
                id: "cities",
                title: "Cities",
                icon: <Navigation size={20}/>,
                navLink: "/cities",
                permission: PERMISSIONS_NAMES.ROLE_CITIES_LIST,
            },
        ],
    },

    {
        id: "store-appearance",
        title: "Website Content",
        icon: <Layout size={20}/>,
        children: [
            {
                id: "visual-settings",
                title: "Static Pages",
                icon: <FileText size={20}/>,
                navLink: "/visual-settings",
                permission: PERMISSIONS_NAMES.ROLE_VISUAL_SETTING_LIST,
            },
            {
                id: "mobile-sliders",
                title: "mobile-sliders",
                icon: <Smartphone size={20}/>,
                navLink: "/mobile-sliders",
                permission: PERMISSIONS_NAMES.ROLE_SLIDER_LIST,
            },
            {
                id: "desktop-sliders",
                title: "desktop-sliders",
                icon: <Monitor size={20}/>,
                navLink: "/desktop-sliders",
                permission: PERMISSIONS_NAMES.ROLE_SLIDER_LIST,
            },
            {
                id: "website-themes",
                title: "Website-Themes",
                icon: <Layout size={20}/>,
                navLink: "/website-themes",
                permission: PERMISSIONS_NAMES.ROLE_MULTI_TYPE_SETTING_LIST,
            },
            {
                id: "faqs-menu",
                title: "Faqs",
                icon: <HelpCircle size={20}/>,
                navLink: "/faqs",
                permission: PERMISSIONS_NAMES.ROLE_FAQ_LIST,
            },
        ],
    },

    {
        id: "store-admins",
        title: "store-admins",
        icon: <Users size={20}/>,
        children: [
            {
                id: "admins",
                title: "admins",
                icon: <UserCheck size={20}/>,
                navLink: "/admins",
                permission: PERMISSIONS_NAMES.ROLE_USER_LIST,
            },
            {
                id: "roles",
                title: "Roles",
                icon: <Key size={20}/>,
                navLink: "/roles",
                permission: PERMISSIONS_NAMES.ROLE_SYSTEM_ROLE_LIST,
            },
        ]
    },


    {
        id: "maintenance",
        title: "Maintenance",
        icon: <Tool size={20}/>,
        children: [
            {
                id: "error-logs",
                title: "Error Logs",
                icon: <AlertTriangle size={20}/>,
                navLink: "/error-logs",
                permission: PERMISSIONS_NAMES.ROLE_ERROR_LOG_LIST,
            },
        ],
    },
    {
        id: "Ebay",
        title: "Ebay",
        icon: <ShoppingCart size={20} />,
        children: [
            {
                id: "ebay",
                title: "ebay",
                icon: <Twitch size={12}/>,
                navLink: "/ebay",
                permission: PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_LIST,
            },
            {
                id: "ebay-listing",
                title: "ebay-listing",
                icon: <List size={12}/>,
                navLink: "/ebay-listing",
                permission: PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_LIST,
            },
            {
                id: "ebay-orders",
                title: "ebay-orders",
                icon: <ShoppingBag size={20}/>,
                navLink: "/ebay-sale-orders",
                permission: PERMISSIONS_NAMES.ROLE_SALE_ORDER_LIST,
            },
            {
                id: "sale-orders-shipments",
                title: "sale-orders-shipments",
                icon: <Truck size={20}/>,
                navLink: "/sale-orders-shipments",
                permission: PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_LIST,
            },
            {
                id: "ebay-categories",
                title: "ebay-categories",
                icon: <Tag size={20}/>,
                navLink: "/ebay-categories",
                permission: PERMISSIONS_NAMES.ROLE_EBAY_ACCOUNT_LIST,
            },

        ],
    },
//   {
//     id: "dhl",
//     title: "dhl",
//     children: [
//       {
//         id: "sale-orders-requests",
//         title: "sale-orders-requests",
//         icon: <FileText size={20} />,
//         navLink: "/sale-orders-requests",
//         permission: PERMISSIONS_NAMES.ROLE_SALE_ORDER_LIST,
//       },
//       {
//         id: "sale-orders-shipments",
//         title: "sale-orders-shipments",
//         icon: <Truck size={20} />,
//         navLink: "/sale-orders-shipments",
//         permission: PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_LIST,
//       },
//     ],
//   },
//   {
//     id: "deutsche",
//     title: "deutsche",
//     children: [
//       {
//         id: "deutsche-sale-orders-requests",
//         title: "deutsche-sale-orders-requests",
//         icon: <FileText size={20} />,
//         navLink: "/deutsche-sale-orders-requests",
//         permission: PERMISSIONS_NAMES.ROLE_SALE_ORDER_LIST,
//       },
//       {
//         id: "deutsche-sale-orders-shipments",
//         title: "deutsche-sale-orders-shipments",
//         icon: <Truck size={20} />,
//         navLink: "/deutsche-sale-orders-shipments",
//         permission: PERMISSIONS_NAMES.ROLE_SALE_ORDER_SHIPMENT_LIST,
//       },
//     ],
//   },

];
