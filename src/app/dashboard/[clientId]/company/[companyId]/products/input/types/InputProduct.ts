export class InputProduct {
  id: string;
  productId: string | null;
  inputSupplierId: string;
  code: string;
  description: string;
  ncm: string;
  price: number;
  quantity: number;
  storageQuantity: number;

  constructor(
    id: string | null,
    productId: string | null,
    inputSupplierId: string,
    code: string,
    description: string,
    ncm: string,
    price: number,
    quantity: number,
    storageQuantity = 0
  ) {
    this.id = id ?? crypto.randomUUID();
    this.productId = productId;
    this.inputSupplierId = inputSupplierId;
    this.code = code;
    this.description = description;
    this.ncm = ncm;
    this.price = price;
    this.quantity = quantity;
    this.storageQuantity = storageQuantity;
  }
}
