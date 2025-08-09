export class ProductXml {
  code: string;
  description: string;
  ncm: string;
  price: number;
  quantity: number;

  constructor(
    code: string,
    description: string,
    ncm: string,
    price: number,
    quantity: number
  ) {
    this.code = code;
    this.description = description;
    this.ncm = ncm;
    this.price = price;
    this.quantity = quantity;
  }
}
