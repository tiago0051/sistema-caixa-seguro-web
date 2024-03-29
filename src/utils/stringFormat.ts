export function cnpjFormat(text?: string) {
  if (!text) return text;

  if (text.length !== 14) return text;

  return text.replace(
    /^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/,
    "$1.$2.$3/$4-$5"
  );
}

export function cpfMask(val: string) {
  let cpfValue = val?.trim();

  if (cpfValue) {
    cpfValue = cpfValue.replace(/\D/g, "");
    cpfValue = cpfValue.replace(/(\d{3})(\d)/, "$1.$2");
    cpfValue = cpfValue.replace(/(\d{3})(\d)/, "$1.$2");

    if (cpfValue.length > 13) {
      cpfValue = cpfValue.substring(0, 13);
    }

    cpfValue = cpfValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return cpfValue?.substring(0, 20);
}
