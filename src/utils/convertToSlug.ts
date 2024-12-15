export const convertToSlug = (str: string) => {
  return str
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
}
