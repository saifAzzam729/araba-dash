/**
 * Product Feature Flags Configuration
 * 
 * This file contains feature flags that control the visibility of various product-related
 * UI elements and functionality throughout the product management system.
 */

/**
 * WITH_EXTRA_PRODUCT_DETAILS
 * 
 * When set to false (default):
 * - In Add Product page: Hides country of origin dropdown, SKU field, tax field, and "Add Extra Info" button
 * - In View Product Info tab: Hides country of origin dropdown, SKU field, and tax field
 * - In View Product page: Hides the entire "Extra Info" tab
 * 
 * When set to true:
 * - All extra product detail fields and tabs are visible and accessible
 */
export const WITH_EXTRA_PRODUCT_DETAILS = false;

/**
 * WITH_PRODUCT_OPTIONS_AND_VARIANTS
 * 
 * When set to false (default):
 * - In Product View Page: Hides the following tabs:
 *   - Options (Sort Options tab)
 *   - Options Sort tab
 *   - Product Variants tab
 *   - Options Images tab
 * 
 * When set to true:
 * - All product options and variants tabs are visible and accessible
 */
export const WITH_PRODUCT_OPTIONS_AND_VARIANTS = false;

