import Home from "../../views/pages/home/Home";
import Users from "../../views/pages/users/users/UsersPage";
import ProductsPage from "../../views/pages/products/ProductsPage";
import SaleOrdersPage from "@src/views/pages/sale-orders/SaleOrdersPage";

import {lazy} from 'react';
import EbayProductDetailsPage from "@src/views/pages/eBay/listings/products/pages/EbayProductDetailsPage";

const ProfilePage = lazy(() => import('@src/views/pages/users/ProfilePage'));
const AddProducts = lazy(() => import('@src/views/pages/products/pages/add/AddPage'));
const ViewProducts = lazy(() => import('@src/views/pages/products/pages/view/ViewPage'));
const ViewSaleOrder = lazy(() => import('@src/views/pages/sale-orders/pages/ViewPage'));
const Profile = lazy(() => import('@src/views/pages/admin/profile'));
const CountriesPage = lazy(() => import('@src/views/pages/locations/countries/CountriesPage'));
const ContactUsPage = lazy(() => import('@src/views/pages/contact-us/ContactUsPage'));
const TagsPage = lazy(() => import('@src/views/pages/tags/TagsPage'));
const RolesPage = lazy(() => import('@src/views/pages/roles/RolesPage'));
const BrandsPage = lazy(() => import('@src/views/pages/brands/BrandsPage'));
const FaqsPage = lazy(() => import('@src/views/pages/faqs/FaqsPage'));
const CategoriesPage = lazy(() => import('@src/views/pages/categories/CategoriesPage'));
const PaymentMethodsPage = lazy(() => import('@src/views/pages/payment-methods/PaymentMethodsPage'));
const CurrenciesPage = lazy(() => import('@src/views/pages/currencies/CurrenciesPage'));
const VisualSettingsPage = lazy(() => import('@src/views/pages/visual-settings/VisualSettingsPage'));
const ViewVisualSettings = lazy(() => import('@src/views/pages/visual-settings/pages/ViewPage'));
const EditVisualSettings = lazy(() => import('@src/views/pages/visual-settings/pages/EditPage'));
const WebsiteThemesPage = lazy(() => import('@src/views/pages/website-themes/WebsiteThemesPage'));
const AddDesktopSliders = lazy(() => import('@src/views/pages/sliders/desktop-sliders/pages/AddPage'));
const EditDesktopSliders = lazy(() => import('@src/views/pages/sliders/desktop-sliders/pages/EditPage'));
const ViewDesktopSliders = lazy(() => import('@src/views/pages/sliders/desktop-sliders/pages/ViewPage'));
const AutoDiscountsPage = lazy(() => import('@src/views/pages/discounts/auto-discounts/AutoDiscountsPage'));
const CouponDiscountsPage = lazy(() => import('@src/views/pages/discounts/coupon-discounts/CouponDiscountsPage'));
const SeoMetaDataPage = lazy(() => import('@src/views/pages/seo-metaData/SeoMetaDataPage'));
const ProductsAttributesPage = lazy(() => import('@src/views/pages/products-attributes/ProductsAttributesPage'));
const ProductGroupPage = lazy(() => import('@src/views/pages/product-group/ProductGroupPage'));
const AddProductGroup = lazy(() => import('@src/views/pages/product-group/pages/add/AddPage'));
const EditProductGroup = lazy(() => import('@src/views/pages/product-group/pages/edit/EditPage'));
const ErrorLogsPage = lazy(() => import('@src/views/pages/error-logs/ErrorLogsPage'));
const ShippingsPage = lazy(() => import('@src/views/pages/shippings/ShippingsPage'));
const StatesPage = lazy(() => import('@src/views/pages/locations/states-crud/StatesPage'));
const CitiesPage = lazy(() => import('@src/views/pages/locations/cities/CitiesPage'));
const ViewStatesPage = lazy(() => import('@src/views/pages/locations/states-crud/pages/ViewPage'));
const ViewCountriesPage = lazy(() => import('@src/views/pages/locations/countries/pages/ViewPage'));
const WebsiteUiSettings = lazy(() => import('@src/views/pages/website-ui-settings/WebsiteUiSettings'));
const AffiliatesPage = lazy(() => import('@src/views/pages/affiliates/AffiliatesPage'));
const ViewAffiliatePage = lazy(() => import('@src/views/pages/affiliates/pages/view/ViewPage'));
const ModalCompatibilityPage = lazy(() => import('@src/views/pages/model-compatibility/ModelCompatibilityPage'));
const StoreInfoSettingsPage = lazy(() => import('@src/views/pages/multi-type-settings/store-info-settings/StoreInfoSettingsPage'));
const StoreSocialLinksSettingsPage = lazy(() => import('@src/views/pages/multi-type-settings/store-social-links-settings/StoreSocialLinksSettingsPage'));
const AdminsPage = lazy(() => import('@src/views/pages/users/admins/AdminsPage'));
const CompaniesPage = lazy(() => import('@src/views/pages/users/company/CompaniesPage'));
const UserGroupsPage = lazy(() => import('@src/views/pages/user-groups/UserGroupsPage'));
const ViewUserGroupPage = lazy(() => import('@src/views/pages/user-groups/pages/ViewPage'));
const RegistrationRequestsPage = lazy(() => import('@src/views/pages/users/registration-requests/RegistrationRequestsPage'));
const VendorsPage = lazy(() => import('@src/views/pages/vendors/vendors/VendorsPage'));
const VendorRequestsPage = lazy(() => import('@src/views/pages/vendors/vendor-requests/VendorRequestsPage'));
const VendorProfilePage = lazy(() => import('@src/views/pages/vendors/ProfilePage'));
const NotificationsEventsPage = lazy(() => import('@src/views/pages/notifications/notifications-events/NotificationsEventsPage'))
const NotificationsPage = lazy(() => import('@src/views/pages/notifications/notifications-crud/NotificationsPage'))
const ProductReviewsPage = lazy(() => import('@src/views/pages/product-reviews/ProductReviewsPage'))
const TaxPage = lazy(() => import('@src/views/pages/tax/TaxPage'))

const MobileSlidersPage = lazy(() => import('@src/views/pages/sliders/mobile-sliders/MobileSlidersPage'))
const AddMobileSlider = lazy(() => import('@src/views/pages/sliders/mobile-sliders/pages/AddPage'))
const EditMobileSlider = lazy(() => import('@src/views/pages/sliders/mobile-sliders/pages/EditPage'))
const ViewMobileSlider = lazy(() => import('@src/views/pages/sliders/mobile-sliders/pages/ViewPage'))
const DesktopSlidersPage = lazy(() => import('@src/views/pages/sliders/desktop-sliders/DesktopSlidersPage'))
const ShipmentProductsPage = lazy(() => import('@src/views/pages/shipments/shipment-products/ShipmentProductsPage'))
const ShipmentPackagesPage = lazy(() => import('@src/views/pages/shipments/shipment-packages/ShipmentPackagesPage'))
const ShipmentShippersPage = lazy(() => import('@src/views/pages/shipments/shipment-shippers/ShipmentShippersPage'))

const SaleOrdersRequestsPage = lazy(() => import('@src/views/pages/dhl/sale-orders-requests/SaleOrdersRequestsPage'))
const SaleOrdersShipmentsPage = lazy(() => import('@src/views/pages/eBay/orders/sale-orders-shipments/SaleOrdersShipmentsPage'))
const EditSaleOrdersShipmentsPage = lazy(() => import('@src/views/pages/eBay/orders/sale-orders-shipments/pages/EditPage'))

// EBAY ACCOUNTS
const EBayPage = lazy(() => import('@src/views/pages/eBay/accounts/EBayPage'))
const EBayDetailsPage = lazy(() => import('@src/views/pages/eBay/accounts/partials/EBayDetailsPage'))

// EBAY RETURN POLICY
const AddEbayReturnPolicy = lazy(() => import('@src/views/pages/eBay/policies/return/pages/AddReturnPolicy'))
const ReturnPolicyDetailsPage = lazy(() => import('@src/views/pages/eBay/policies/return/pages/ReturnPolicyDetailsPage'))

// EBAY SHIPPING POLICY
const AddEbayShippingPolicyPage = lazy(() => import('@src/views/pages/eBay/policies/shipping/pages/AddShippingPolicyPage'));
const ShippingPolicyDetailsPage = lazy(() => import('@src/views/pages/eBay/policies/shipping/pages/ShippingPolicyDetailsPage'))

// EBAY SELLING POLICY
const AddSellingPolicyPage = lazy(() => import('@src/views/pages/eBay/policies/selling/pages/AddSellingPolicy'))
const SellingDetailsPage = lazy(() => import('@src/views/pages/eBay/policies/selling/pages/SellingDetailsPage'))

// EBAY LISTING PAGE
const EBayListingPage = lazy(() => import('@src/views/pages/eBay/listings/EBayListingPage'))
const EbayListingDetailsPage = lazy(() => import('@src/views/pages/eBay/listings/partials/EbayListingDetailsPage'))
const EbayProductDetails = lazy(() => import('@src/views/pages/eBay/listings/products/pages/EbayProductDetailsPage'))

// EBAY ORDERS
const EbayOrdersPage = lazy(() => import('@src/views/pages/eBay/orders/EbaySaleOrdersPage'))
const EbayOrdersDetailsTabs = lazy(() => import('@src/views/pages/eBay/orders/pages/OrderDetails'))

// EBAY CATEGORIES
const EbayCategoryPage = lazy(() => import('@src/views/pages/eBay/categories/CategoriesPage'))
const EbayCategoryDetails = lazy(() => import('@src/views/pages/eBay/categories/pages/EbayCategoriesDetailsPage'))

// Deutsch links

const DeutscheSaleOrdersRequestsPage = lazy(() => import('@src/views/pages/deutsche-post/sale-order-requests/SaleOrdersRequestsPage'))
const DeutscheSaleOrdersShipmentsPage = lazy(() => import('@src/views/pages/deutsche-post/sale-order-shipments/SaleOrdersShipmentsPage'))
const DeutscheEditSaleOrdersShipmentsPage = lazy(() => import('@src/views/pages/deutsche-post/sale-order-shipments/pages/EditPage'))
const DeutscheSaleOrderMultiShipments = lazy(() => import('@src/views/pages/deutsche-post/sale-order-requests/pages/DeutscheSaleOrderMultiShipments'))


const MultiSaleOrderShipments = lazy(() => import('@src/views/pages/dhl/sale-orders-requests/pages/SaleOrderMultiShipments'))

// Reports
const UserDetailsReportsPage = lazy(() => import("@src/views/pages/Reports/user-detail-report/UserDetailsReportsPage"));
const DateWiseSalesReportPage = lazy(() => import("@src/views/pages/Reports/date-wise-sales-reports/DateWiseSalesReportPage"));
const CountryWiseSalesReportPage = lazy(() => import("@src/views/pages/Reports/country-wise-sales-reports/CountryWiseSalesReportPage"));
const CustomerWiseSalesReportPage = lazy(() => import("@src/views/pages/Reports/customer-wise-sales-reports/CustomerWiseSalesReportPage"));
const ItemsWiseSalesReportPage = lazy(() => import("@src/views/pages/Reports/item-wise-sales/ItemsWiseSalesReportPage"));
const LatestProductsSalesReportPage = lazy(() => import("@src/views/pages/Reports/latest-products-sales-reports/LatestProductsSalesReportPage"));
const SalesDetailsReportPage = lazy(() => import("@src/views/pages/Reports/sales-details/SalesDetailsReportPage"));

const CustomRoutesArray = [
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "admin/profile",
    element: <Profile />,
  },
  {
    path: "users/profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "roles",
    element: <RolesPage />,
  },
  {
    path: "countries",
    element: <CountriesPage />,
  },
  {
    path: "countries/view/:id",
    element: <ViewCountriesPage />,
  },
  {
    path: "brands",
    element: <BrandsPage />,
  },
  {
    path: "product-reviews",
    element: <ProductReviewsPage />,
  },
  {
    path: "shippings",
    element: <ShippingsPage />,
  },
  {
    path: "categories",
    element: <CategoriesPage />,
  },
  {
    path: "product-group",
    element: <ProductGroupPage />,
  },
  {
    path: "product-group/add",
    element: <AddProductGroup />,
  },
  {
    path: "product-group/edit/:id",
    element: <EditProductGroup />,
  },
  {
    path: "tags",
    element: <TagsPage />,
  },
  {
    path: "products",
    element: <ProductsPage />,
  },
  {
    path: "products/add",
    element: <AddProducts />,
  },
  {
    path: "products/view/:id",
    element: <ViewProducts />,
  },
  {
    path: "faqs",
    element: <FaqsPage />,
  },
  // {
  // 	path: "/pet-types",
  // 	element: <PetTypesPage />,
  // },
  // {
  // 	path: "/user-pets",
  // 	element: <UserPetsPage />,
  // },
  // {
  // 	path: "/pet-breeds",
  // 	element: <PetBreedsPage />,
  // },
  {
    path: "payment-methods",
    element: <PaymentMethodsPage />,
  },
  {
    path: "currencies",
    element: <CurrenciesPage />,
  },
  {
    path: "desktop-sliders",
    element: <DesktopSlidersPage />,
  },
  {
    path: "desktop-sliders/add",
    element: <AddDesktopSliders />,
  },
  {
    path: "desktop-sliders/edit/:id",
    element: <EditDesktopSliders />,
  },
  {
    path: "desktop-sliders/view/:id",
    element: <ViewDesktopSliders />,
  },
  {
    path: "mobile-sliders",
    element: <MobileSlidersPage />,
  },
  {
    path: "mobile-sliders/add",
    element: <AddMobileSlider />,
  },
  {
    path: "mobile-sliders/edit/:id",
    element: <EditMobileSlider />,
  },
  {
    path: "mobile-sliders/view/:id",
    element: <ViewMobileSlider />,
  },
  // {
  // 	path: "/awards",
  // 	element: <AwardsPage />
  // },
  {
    path: "visual-settings",
    element: <VisualSettingsPage />,
  },
  {
    path: "visual-settings/view/:settingKey",
    element: <ViewVisualSettings />,
  },
  {
    path: "visual-settings/edit/:settingKey",
    element: <EditVisualSettings />,
  },
  {
    path: "sale-orders",
    element: <SaleOrdersPage />,
  },
  {
    path: "sale-orders/view/:id",
    element: <ViewSaleOrder />,
  },
  {
    path: "settings/store-info",
    element: <StoreInfoSettingsPage />,
  },
  {
    path: "settings/social-media-links",
    element: <StoreSocialLinksSettingsPage />,
  },

  {
    path: "settings/functionality-settings",
    element: <WebsiteUiSettings />,
  },

  {
    path: "contact-us",
    element: <ContactUsPage />,
  },
  {
    path: "website-themes",
    element: <WebsiteThemesPage />,
  },
  {
    path: "auto-discounts",
    element: <AutoDiscountsPage />,
  },
  {
    path: "coupon-discounts",
    element: <CouponDiscountsPage />,
  },
  {
    path: "seo",
    element: <SeoMetaDataPage />,
  },
  {
    path: "product-attributes",
    element: <ProductsAttributesPage />,
  },
  {
    path: "error-logs",
    element: <ErrorLogsPage />,
  },
  {
    path: "affiliates",
    element: <AffiliatesPage />,
  },
  {
    path: "affiliates/view/:id",
    element: <ViewAffiliatePage />,
  },
  {
    path: "states",
    element: <StatesPage />,
  },
  {
    path: "states/view/:id",
    element: <ViewStatesPage />,
  },
  {
    path: "cities",
    element: <CitiesPage />,
  },
  {
    path: "admins",
    element: <AdminsPage />,
  },
  {
    path: "admins/profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "model-compatibility",
    element: <ModalCompatibilityPage />,
  },
  {
    path: "admins",
    element: <AdminsPage />,
  },
  {
    path: "company",
    element: <CompaniesPage />,
  },
  {
    path: "company/profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "user-groups",
    element: <UserGroupsPage />,
  },
  {
    path: "user-groups/view/:id",
    element: <ViewUserGroupPage />,
  },
  {
    path: "registration-requests",
    element: <RegistrationRequestsPage />,
  },
  {
    path: "vendors",
    element: <VendorsPage />,
  },
  {
    path: "vendors/profile/:id",
    element: <VendorProfilePage />,
  },
  {
    path: "vendor-requests",
    element: <VendorRequestsPage />,
  },
  {
    path: "notifications-events",
    element: <NotificationsEventsPage />,
  },
  {
    path: "notifications",
    element: <NotificationsPage />,
  },
  {
    path: "tax",
    element: <TaxPage />,
  },
  {
    path: "shipment-products",
    element: <ShipmentProductsPage />,
  },
  {
    path: "shipment-packages",
    element: <ShipmentPackagesPage />,
  },
  {
    path: "shipment-shippers",
    element: <ShipmentShippersPage />,
  },
  {
    path: "sale-orders-requests",
    element: <SaleOrdersRequestsPage />,
  },
  {
    path: "sale-orders-shipments",
    element: <SaleOrdersShipmentsPage />,
  },
  {
    path: "sale-orders-shipments/edit/:id",
    element: <EditSaleOrdersShipmentsPage />,
  },
  {
    path: "deutsche-sale-orders-requests",
    element: <DeutscheSaleOrdersRequestsPage />,
  },
  {
    path: "deutsche-sale-orders-shipments",
    element: <DeutscheSaleOrdersShipmentsPage />,
  },
  {
    path: "deutsche-sale-orders-shipments/edit/:id",
    element: <DeutscheEditSaleOrdersShipmentsPage />,
  },
  {
    path: "ebay",
    element: <EBayPage />,
  },
  {
    path: "eBay/view/:id",
    element: <EBayDetailsPage />,
  },
  {
    path: "ebay-policies/add/:id",
    element: <AddEbayReturnPolicy />,
  },
  {
    path: "ebay-return-policy/:id/view/:policyId",
    element: <ReturnPolicyDetailsPage />,
  },

  {
    path: "ebay-shipping-policy/add/:id",
    element: <AddEbayShippingPolicyPage />,
  },
  {
    path: "ebay-shipping-policy/:id/view/:policyId",
    element: <ShippingPolicyDetailsPage />,
  },
  {
    path: "ebay-selling-policy/add/:id",
    element: <AddSellingPolicyPage />,
  },
  {
    path: "ebay-selling-policy/:id/view/:policyId",
    element: <SellingDetailsPage />,
  },
  {
    path: "ebay-listing",
    element: <EBayListingPage />,
  },
  {
    path: "ebay-listing/view/:listId",
    element: <EbayListingDetailsPage />,
  },
  {
    path: "ebay-sale-orders",
    element: <EbayOrdersPage />,
  },
  {
    path: "ebay-sale-orders/view/:id",
    element: <EbayOrdersDetailsTabs />,
  },
  {
    path: "ebay-categories",
    element: <EbayCategoryPage />,
  },
  {
    path: "ebay-categories/view/:id",
    element: <EbayCategoryDetails />,
  },
  {
    path: "ebay-product-details/:id",
    element: <EbayProductDetailsPage />,
  },
  {
    path: "multi-shipments",
    element: <MultiSaleOrderShipments />,
  },
  {
    path: "deutsche-multi-shipments",
    element: <DeutscheSaleOrderMultiShipments />,
  },
  {
    path: "reports/user-details",
    element: <UserDetailsReportsPage />,
  },
  {
    path: "reports/date-wise-sales",
    element: <DateWiseSalesReportPage />,
  },
  {
    path: "reports/country-wise-sales",
    element: <CountryWiseSalesReportPage />,
  },
  {
    path: "reports/customer-wise-sales",
    element: <CustomerWiseSalesReportPage />,
  },
  {
    path: "reports/item-wise-sales",
    element: <ItemsWiseSalesReportPage />,
  },
  {
    path: "reports/latest-products-sales",
    element: <LatestProductsSalesReportPage />,
  },
  {
    path: "reports/sales-details",
    element: <SalesDetailsReportPage />,
  },
];

export default CustomRoutesArray;
