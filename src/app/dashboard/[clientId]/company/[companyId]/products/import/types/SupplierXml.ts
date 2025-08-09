export class SupplierXml {
  name: string;
  taxId: string | null;

  constructor(name: string, taxId: string | null) {
    this.name = name;
    this.taxId = taxId;
  }
}
