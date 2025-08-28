"use server";
export async function findSupplierByTaxId(taxId: string) {
  const request = await fetch(`https://www.receitaws.com.br/v1/cnpj/${taxId}`);

  const supplier = await request.json();

  return supplier;
}
