export interface Received{
  id_cart: number,
  id_user: number,
  date: string,
  subtotal: number,
  discount: number,
  total: number,
  status: number
}

export interface Product{
  id_product:string,
  name:string,
  color:string,
  price:number,
  description:string,
  trending:number,
  gender:number,
  img:string,
  sub_img:string
  stock:any,
  sizeMan:Size[],
  sizeWoman:Size[]
}
export interface Size{
  id_size: number,
  id_brand: string,
  gender: number,
  size: number
}

export interface Detail{
  id: number,
  cart_id: number,
  consignee: string,
  consignee_phone: string,
  delivery_address: string,
  delivery_method: string,
  payment_method: string,
  detailCart: ItemCart[]
}
export interface ItemCart{
  id: number,
  id_product: string,
  cart_id: number,
  img: string,
  size: number,
  quantity: number,
  price_prod: number,
  total_prod: number,
  color: string,
  name: string
}
