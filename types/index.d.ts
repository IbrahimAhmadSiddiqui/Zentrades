interface Product {
  subcategory: string;
  title: string;
  price: string;
  popularity: string;
}

interface Products {
  [productId: string]: Product;
}

interface IResponse {
  count: number;
  products: Products;
}
