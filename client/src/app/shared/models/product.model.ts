export interface productModel {
    id_product: number;
    p_name: string;
    product_desc: string;
    short_desc: string;
    price: number;
    image: string;
    stock_status: string;
    category: string;
    quantity?: number;
}
  