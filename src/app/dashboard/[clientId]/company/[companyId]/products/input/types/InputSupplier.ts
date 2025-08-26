export class InputSupplier {
  id: string;
  supplierId: string | null;
  name: string;
  taxId: string | null;

  constructor(
    id: string | null,
    supplierId: string | null,
    name: string,
    taxId: string | null
  ) {
    this.id = id ?? crypto.randomUUID();
    this.supplierId = supplierId;
    this.name = name;
    this.taxId = taxId;
  }
}
