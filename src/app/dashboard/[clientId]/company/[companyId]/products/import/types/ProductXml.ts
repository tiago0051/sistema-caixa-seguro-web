export class ProductXml {
  description: string;
  ncm: string;
  price: number;
  quantity: number;

  constructor(
    description: string,
    ncm: string,
    price: number,
    quantity: number
  ) {
    this.description = description;
    this.ncm = ncm;
    this.price = price;
    this.quantity = quantity;
  }
}
