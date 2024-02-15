export function cnpjFormat(text?: string) {
  if (!text) return text;

  if (text.length !== 14) return text;

  return text.replace(
    /^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/,
    "$1.$2.$3/$4-$5"
  );
}
