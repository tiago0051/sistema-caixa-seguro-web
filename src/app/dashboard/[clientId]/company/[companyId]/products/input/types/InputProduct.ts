export class InputProduct {
  inputSupplierId: string;
  code: string;
  description: string;
  ncm: string;
  price: number;
  quantity: number;

  constructor(
    inputSupplierId: string,
    code: string,
    description: string,
    ncm: string,
    price: number,
    quantity: number
  ) {
    this.inputSupplierId = inputSupplierId;
    this.code = code;
    this.description = description;
    this.ncm = ncm;
    this.price = price;
    this.quantity = quantity;
  }
}
