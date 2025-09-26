/**
 * Constructs the full image URL from a filename
 * @param {string} imagePath - The image filename or path
 * @returns {string} - The full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return undefined;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, construct the full URL
  return `${import.meta.env.VITE_IMG_URL}${imagePath}`;
};

/**
 * Gets the image URL for a product
 * @param {Object} product - The product object
 * @returns {string|undefined} - The full image URL or undefined
 */
export const getProductImageUrl = (product) => {
  if (!product?.images?.[0]) return undefined;
  return getImageUrl(product.images[0]);
};

/**
 * Gets the image URL for a cart/wishlist item
 * @param {Object} item - The cart or wishlist item
 * @returns {string|undefined} - The full image URL or undefined
 */
export const getItemImageUrl = (item) => {
  if (!item?.image) return undefined;
  return getImageUrl(item.image);
};
