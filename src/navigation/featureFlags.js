/**
 * Feature Flags Configuration
 * 
 * This file controls which features are enabled in the application.
 * Setting a flag to false will:
 * - Remove the feature from the navigation menu (NavItems.js)
 * - Remove the feature's routes from the router (CustomRoutesArray.js)
 */

/**
 * Controls the eBay integration feature
 * When enabled, includes:
 * - eBay menu section in navigation (accounts, listings, orders, categories, shipments)
 * - All eBay-related routes (accounts, policies, listings, orders, categories)
 */
export const WITH_EBAY = false;

/**
 * Controls the Maintenance feature
 * When enabled, includes:
 * - Maintenance menu section in navigation (Error Logs)
 * - Error logs route and page
 */
export const WITH_MAINTENANCE = false;

/**
 * Controls the Reports feature
 * When enabled, includes:
 * - Reports menu section in navigation (User Details, Sales Details, Date-wise Sales, etc.)
 * - All report routes (user-details, sales-details, date-wise-sales, country-wise-sales, etc.)
 */
export const WITH_REPORTS = false;

/**
 * Controls the Affiliate feature
 * When enabled, includes:
 * - Affiliates menu item in the Marketing section
 * - Affiliate routes (affiliates list and view pages)
 */
export const WITH_AFFILIATE = false;

/**
 * Controls the Shipping feature
 * When enabled, includes:
 * - Shippings menu section in navigation (Shippings, Shipment Products, Packages, Shippers)
 * - Shipping-related routes (shippings, shipment-products, shipment-packages, shipment-shippers)
 */
export const WITH_SHIPPING = false;

