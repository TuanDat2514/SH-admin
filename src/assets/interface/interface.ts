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
  stock:any
}
