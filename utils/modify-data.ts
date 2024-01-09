export function sortProducts(products: Products): Products {
  let productArray: Product[] = [];

  // Convert the products object to an array
  for (let productId in products) {
    productArray.push(products[productId]);
  }

  // Sort the array
  productArray.sort((a, b) => parseInt(b.popularity) - parseInt(a.popularity));

  // Convert the array back to an object
  let sortedProducts: Products = {};
  for (let i = 0; i < productArray.length; i++) {
    sortedProducts[productArray[i].title] = productArray[i];
  }

  return sortedProducts;
}
